import { Hono } from "npm:hono";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Seed data version – bump this whenever seed data changes to force a reseed
const SEED_VERSION = "3";

// Department data structure
interface DepartmentData {
  id: string; // Format: "property-{propertyId}-dept-{deptId}"
  propertyId: string;
  departmentId: number;
  skifte?: number; // Skifte number (1, 2, 3, etc.) – optional, only for properties with multiple skiften
  skifteDepartmentId?: number; // Department number within the skifte (restarts per skifte)
  area: number; // in hectares
  age: number; // in years
  cuttingClass: string; // K1, K2, R1, R2, G1, G2, S1, S2, S3, E1, E2, E3
  volume: number; // m³sk
  mainSpecies: "Gran" | "Tall" | "Björk" | "Contorta" | "Ek" | "Löv";
  site: "Frisk" | "Fuktig" | "Torr" | "Blöt";
  terrain: "Plant" | "Kuperat" | "Brant";
  siteIndex: string; // e.g. "G38", "T22", "B20"
  createdAt: string;
  updatedAt: string;
}

// Helper function to compute enriched department data
function enrichDepartmentData(dept: DepartmentData) {
  const volumePerHa = Math.round(dept.volume / dept.area);
  
  // Generate realistic species distribution based on mainSpecies
  let speciesDistribution: Record<string, number> = {};
  switch (dept.mainSpecies) {
    case "Gran":
      speciesDistribution = { "Gran": 65, "Tall": 20, "Björk": 10, "Löv": 5 };
      break;
    case "Tall":
      speciesDistribution = { "Tall": 60, "Gran": 20, "Björk": 15, "Löv": 5 };
      break;
    case "Björk":
      speciesDistribution = { "Björk": 55, "Gran": 20, "Tall": 15, "Löv": 10 };
      break;
    case "Contorta":
      speciesDistribution = { "Contorta": 70, "Tall": 15, "Björk": 10, "Löv": 5 };
      break;
    case "Ek":
      speciesDistribution = { "Ek": 50, "Björk": 20, "Gran": 15, "Löv": 15 };
      break;
    case "Löv":
      speciesDistribution = { "Löv": 45, "Björk": 30, "Gran": 15, "Tall": 10 };
      break;
    default:
      speciesDistribution = { [dept.mainSpecies]: 70, "Övrigt": 30 };
  }

  // Compute meanHeight based on age and site index  
  // Approximate: height grows with age, modified by site quality
  let siteMultiplier = 1.0;
  if (dept.siteIndex?.startsWith("G")) siteMultiplier = 1.1;
  else if (dept.siteIndex?.startsWith("T")) siteMultiplier = 0.95;
  else if (dept.siteIndex?.startsWith("B")) siteMultiplier = 0.85;
  const meanHeight = Math.round((dept.age * 0.35 * siteMultiplier) * 10) / 10;

  // Compute basalArea: approximate from volume and height
  // Formula approximation: basalArea ≈ volume / (height * 0.45) per ha
  const basalArea = Math.round((volumePerHa / (meanHeight * 0.45)) * 10) / 10;

  // Compute extractionVolume (uttagsvolym) based on cutting class
  // Higher cutting class = more mature forest = higher extraction potential
  let extractionFactor = 0;
  switch (dept.cuttingClass) {
    case "K1": case "K2": extractionFactor = 0; break;       // Kalmark – no extraction
    case "R1": case "R2": extractionFactor = 0; break;       // Young forest – no extraction
    case "G1": extractionFactor = 0.10; break;                // Normal thinning forest
    case "G2": extractionFactor = 0.20; break;                // Older thinning forest
    case "S1": extractionFactor = 0.30; break;                // Can be final felled
    case "S2": extractionFactor = 0.55; break;                // Ready for final felling
    case "S3": extractionFactor = 0.10; break;                // Should not be final felled
    case "E1": case "E2": case "E3": extractionFactor = 0.05; break; // Special forest types
    // Legacy A/B/C/D support
    case "A": extractionFactor = 0; break;
    case "B": extractionFactor = 0.15; break;
    case "C": extractionFactor = 0.30; break;
    case "D": extractionFactor = 0.55; break;
  }
  const extractionVolume = Math.round(dept.volume * extractionFactor);

  return {
    ...dept,
    volumePerHa,
    speciesDistribution,
    meanHeight,
    basalArea,
    extractionVolume,
  };
}

// Seed initial department data for existing properties
const seedDepartmentData = async (force = false) => {
  console.log("Seeding department data...", force ? "(forced)" : "");
  
  // Check if data already exists (skip if not forced)
  if (!force) {
    // Check seed version – reseed if version has changed
    const storedVersion = await kv.get("dept:__seed_version__");
    if (storedVersion && (storedVersion as any).value === SEED_VERSION) {
      console.log(`Department data already seeded (v${SEED_VERSION}), skipping...`);
      return;
    }
    console.log(`Seed version changed (stored: ${(storedVersion as any)?.value}, current: ${SEED_VERSION}), re-seeding...`);
    // Clear old data before re-seeding
    const oldData = await kv.getByPrefix("dept:");
    if (oldData && oldData.length > 0) {
      for (const item of oldData) {
        await kv.del(item.key);
      }
      console.log(`Cleared ${oldData.length} old department entries`);
    }
  }

  // Seed data for LEMESJÖ 1:52 (property id: "1", 20 departments across 2 skiften)
  // Skifte 1: 12 departments (global ID 1-12, skifte-local ID 1-12)
  // Skifte 2: 8 departments (global ID 13-20, skifte-local ID 1-8)
  // cuttingClass mapped from age + siteIndex:
  //   G38 high productivity: G1(35-50), G2(50-60), S1(60-70), S2(70+)
  //   T22 moderate: G1(40-55), G2(55-65), S1(65-80), S2(80+)
  //   B20 lower: R2(25-40), G1(40-50), G2(50-60)
  const lemesjoData: DepartmentData[] = [
    // Skifte 1 – avdelning 1-12
    { id: "dept:1:1", propertyId: "1", departmentId: 1, skifte: 1, skifteDepartmentId: 1, area: 3.2, age: 45, cuttingClass: "G1", volume: 245, mainSpecies: "Gran", site: "Frisk", terrain: "Plant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:2", propertyId: "1", departmentId: 2, skifte: 1, skifteDepartmentId: 2, area: 4.1, age: 62, cuttingClass: "G2", volume: 312, mainSpecies: "Tall", site: "Torr", terrain: "Kuperat", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:3", propertyId: "1", departmentId: 3, skifte: 1, skifteDepartmentId: 3, area: 2.8, age: 38, cuttingClass: "R2", volume: 178, mainSpecies: "Björk", site: "Fuktig", terrain: "Plant", siteIndex: "B20", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:4", propertyId: "1", departmentId: 4, skifte: 1, skifteDepartmentId: 4, area: 5.3, age: 55, cuttingClass: "G2", volume: 287, mainSpecies: "Gran", site: "Frisk", terrain: "Brant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:5", propertyId: "1", departmentId: 5, skifte: 1, skifteDepartmentId: 5, area: 3.6, age: 48, cuttingClass: "G1", volume: 221, mainSpecies: "Tall", site: "Torr", terrain: "Plant", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:6", propertyId: "1", departmentId: 6, skifte: 1, skifteDepartmentId: 6, area: 4.8, age: 52, cuttingClass: "G2", volume: 268, mainSpecies: "Gran", site: "Frisk", terrain: "Kuperat", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:7", propertyId: "1", departmentId: 7, skifte: 1, skifteDepartmentId: 7, area: 2.9, age: 41, cuttingClass: "G1", volume: 195, mainSpecies: "Björk", site: "Fuktig", terrain: "Plant", siteIndex: "B20", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:8", propertyId: "1", departmentId: 8, skifte: 1, skifteDepartmentId: 8, area: 5.1, age: 59, cuttingClass: "G2", volume: 298, mainSpecies: "Tall", site: "Torr", terrain: "Brant", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:9", propertyId: "1", departmentId: 9, skifte: 1, skifteDepartmentId: 9, area: 3.4, age: 44, cuttingClass: "G1", volume: 212, mainSpecies: "Gran", site: "Frisk", terrain: "Plant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:10", propertyId: "1", departmentId: 10, skifte: 1, skifteDepartmentId: 10, area: 4.2, age: 56, cuttingClass: "G2", volume: 276, mainSpecies: "Tall", site: "Torr", terrain: "Kuperat", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:11", propertyId: "1", departmentId: 11, skifte: 1, skifteDepartmentId: 11, area: 3.7, age: 47, cuttingClass: "G1", volume: 229, mainSpecies: "Gran", site: "Frisk", terrain: "Plant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:12", propertyId: "1", departmentId: 12, skifte: 1, skifteDepartmentId: 12, area: 5.5, age: 78, cuttingClass: "S2", volume: 424, mainSpecies: "Tall", site: "Torr", terrain: "Brant", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    // Skifte 2 – avdelning 1-8 (global ID 13-20)
    { id: "dept:1:13", propertyId: "1", departmentId: 13, skifte: 2, skifteDepartmentId: 1, area: 2.6, age: 15, cuttingClass: "R1", volume: 42, mainSpecies: "Björk", site: "Fuktig", terrain: "Plant", siteIndex: "B20", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:14", propertyId: "1", departmentId: 14, skifte: 2, skifteDepartmentId: 2, area: 4.6, age: 62, cuttingClass: "S1", volume: 382, mainSpecies: "Gran", site: "Frisk", terrain: "Kuperat", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:15", propertyId: "1", departmentId: 15, skifte: 2, skifteDepartmentId: 3, area: 3.9, age: 49, cuttingClass: "G1", volume: 241, mainSpecies: "Tall", site: "Torr", terrain: "Plant", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:16", propertyId: "1", departmentId: 16, skifte: 2, skifteDepartmentId: 4, area: 5.2, age: 68, cuttingClass: "S1", volume: 395, mainSpecies: "Gran", site: "Frisk", terrain: "Brant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:17", propertyId: "1", departmentId: 17, skifte: 2, skifteDepartmentId: 5, area: 3.1, age: 3, cuttingClass: "K2", volume: 0, mainSpecies: "Tall", site: "Torr", terrain: "Plant", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:18", propertyId: "1", departmentId: 18, skifte: 2, skifteDepartmentId: 6, area: 4.4, age: 51, cuttingClass: "G2", volume: 264, mainSpecies: "Gran", site: "Frisk", terrain: "Kuperat", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:19", propertyId: "1", departmentId: 19, skifte: 2, skifteDepartmentId: 7, area: 3.5, age: 46, cuttingClass: "G1", volume: 218, mainSpecies: "Björk", site: "Fuktig", terrain: "Plant", siteIndex: "B20", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:1:20", propertyId: "1", departmentId: 20, skifte: 2, skifteDepartmentId: 8, area: 4.9, age: 70, cuttingClass: "S1", volume: 389, mainSpecies: "Tall", site: "Torr", terrain: "Brant", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];

  // Seed data for VITSIPPAN 7 (property id: "2", 3 departments)
  const vitsippanData: DepartmentData[] = [
    { id: "dept:2:1", propertyId: "2", departmentId: 1, area: 6.2, age: 85, cuttingClass: "S2", volume: 485, mainSpecies: "Tall", site: "Torr", terrain: "Plant", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:2:2", propertyId: "2", departmentId: 2, area: 3.7, age: 42, cuttingClass: "G1", volume: 198, mainSpecies: "Gran", site: "Frisk", terrain: "Kuperat", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:2:3", propertyId: "2", departmentId: 3, area: 4.5, age: 48, cuttingClass: "G1", volume: 256, mainSpecies: "Contorta", site: "Fuktig", terrain: "Plant", siteIndex: "B20", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];

  // Seed data for SKOGSSTJÄRNAN 12 (property id: "3", 5 departments)
  const skogsstjarnanData: DepartmentData[] = [
    { id: "dept:3:1", propertyId: "3", departmentId: 1, area: 2.9, age: 22, cuttingClass: "R2", volume: 82, mainSpecies: "Björk", site: "Frisk", terrain: "Plant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:3:2", propertyId: "3", departmentId: 2, area: 5.1, age: 58, cuttingClass: "G2", volume: 298, mainSpecies: "Gran", site: "Fuktig", terrain: "Kuperat", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:3:3", propertyId: "3", departmentId: 3, area: 3.8, age: 52, cuttingClass: "G1", volume: 234, mainSpecies: "Tall", site: "Torr", terrain: "Brant", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:3:4", propertyId: "3", departmentId: 4, area: 4.6, age: 72, cuttingClass: "S1", volume: 412, mainSpecies: "Gran", site: "Frisk", terrain: "Plant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:3:5", propertyId: "3", departmentId: 5, area: 3.4, age: 41, cuttingClass: "G1", volume: 189, mainSpecies: "Tall", site: "Torr", terrain: "Kuperat", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];

  // Seed data for BJÖRKLUND 4:21 (property id: "4", 12 departments) - Jane's property
  const bjorklundData: DepartmentData[] = [
    { id: "dept:4:1", propertyId: "4", departmentId: 1, area: 2.7, age: 52, cuttingClass: "G2", volume: 265, mainSpecies: "Gran", site: "Frisk", terrain: "Plant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:4:2", propertyId: "4", departmentId: 2, area: 3.1, age: 48, cuttingClass: "G1", volume: 234, mainSpecies: "Tall", site: "Torr", terrain: "Kuperat", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:4:3", propertyId: "4", departmentId: 3, area: 2.4, age: 30, cuttingClass: "R2", volume: 96, mainSpecies: "Björk", site: "Fuktig", terrain: "Plant", siteIndex: "B20", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:4:4", propertyId: "4", departmentId: 4, area: 2.9, age: 55, cuttingClass: "G2", volume: 278, mainSpecies: "Gran", site: "Frisk", terrain: "Plant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:4:5", propertyId: "4", departmentId: 5, area: 2.6, age: 44, cuttingClass: "G1", volume: 198, mainSpecies: "Tall", site: "Torr", terrain: "Kuperat", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:4:6", propertyId: "4", departmentId: 6, area: 3.3, age: 65, cuttingClass: "S1", volume: 372, mainSpecies: "Gran", site: "Frisk", terrain: "Brant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:4:7", propertyId: "4", departmentId: 7, area: 2.8, age: 42, cuttingClass: "G1", volume: 187, mainSpecies: "Björk", site: "Fuktig", terrain: "Plant", siteIndex: "B20", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:4:8", propertyId: "4", departmentId: 8, area: 3.0, age: 50, cuttingClass: "G1", volume: 245, mainSpecies: "Tall", site: "Torr", terrain: "Kuperat", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:4:9", propertyId: "4", departmentId: 9, area: 2.5, age: 8, cuttingClass: "R1", volume: 18, mainSpecies: "Björk", site: "Fuktig", terrain: "Plant", siteIndex: "B20", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:4:10", propertyId: "4", departmentId: 10, area: 2.9, age: 58, cuttingClass: "G2", volume: 289, mainSpecies: "Gran", site: "Frisk", terrain: "Plant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:4:11", propertyId: "4", departmentId: 11, area: 2.7, age: 47, cuttingClass: "G1", volume: 221, mainSpecies: "Tall", site: "Torr", terrain: "Kuperat", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: "dept:4:12", propertyId: "4", departmentId: 12, area: 2.8, age: 53, cuttingClass: "G2", volume: 267, mainSpecies: "Gran", site: "Frisk", terrain: "Brant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];

  // Save all department data
  const allData = [...lemesjoData, ...vitsippanData, ...skogsstjarnanData, ...bjorklundData];
  for (const dept of allData) {
    await kv.set(dept.id, dept);
  }

  // Store the current seed version
  await kv.set("dept:__seed_version__", { value: SEED_VERSION });

  console.log(`Seeded ${allData.length} departments successfully`);
};

// Initialize seed data - export for use in main server
export const initializeDepartments = () => seedDepartmentData();

// Get all departments for a property
app.get("/departments/:propertyId", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    const prefix = `dept:${propertyId}:`;
    
    const departments = await kv.getByPrefix(prefix);
    
    if (!departments || departments.length === 0) {
      return c.json({ departments: [] });
    }

    // Extract values from KV store format and sort by department ID
    const values = departments.map((item: any) => item.value);
    const sorted = values.sort((a: DepartmentData, b: DepartmentData) => 
      a.departmentId - b.departmentId
    );

    return c.json({ departments: sorted.map(enrichDepartmentData) });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return c.json({ error: "Failed to fetch departments" }, 500);
  }
});

// Get a specific department
app.get("/departments/:propertyId/:departmentId", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    const departmentId = c.req.param("departmentId");
    const id = `dept:${propertyId}:${departmentId}`;
    
    console.log(`Fetching department with id: ${id}`);
    
    const department = await kv.get(id);
    
    console.log("KV result:", JSON.stringify(department));
    
    if (!department) {
      console.log("Department not found, checking what exists in DB...");
      // Debug: Check what departments exist for this property
      const allDepts = await kv.getByPrefix(`dept:${propertyId}:`);
      console.log(`Found ${allDepts?.length || 0} departments for property ${propertyId}`);
      if (allDepts && allDepts.length > 0) {
        console.log("Available department IDs:", allDepts.map(d => d.key));
      }
      return c.json({ error: "Department not found" }, 404);
    }

    // kv.get() already returns the value directly, no need to unwrap
    console.log("Returning department:", JSON.stringify(department));

    return c.json({ department: enrichDepartmentData(department as DepartmentData) });
  } catch (error) {
    console.error("Error fetching department:", error);
    return c.json({ error: `Failed to fetch department: ${error.message}` }, 500);
  }
});

// Update department data
app.put("/departments/:propertyId/:departmentId", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    const departmentId = c.req.param("departmentId");
    const id = `dept:${propertyId}:${departmentId}`;
    
    const updates = await c.req.json();
    const existing = await kv.get(id);
    
    if (!existing) {
      return c.json({ error: "Department not found" }, 404);
    }

    const updated: DepartmentData = {
      ...existing,
      ...updates,
      id,
      propertyId,
      departmentId: parseInt(departmentId),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(id, updated);

    return c.json({ department: updated });
  } catch (error) {
    console.error("Error updating department:", error);
    return c.json({ error: "Failed to update department" }, 500);
  }
});

// Endpoint to add missing department data without clearing existing data
app.post("/departments/seed-missing", async (c) => {
  try {
    console.log("[SEED] Checking for missing department data...");
    
    // Check what properties need seeding
    const propertyIds = ["1", "2", "3", "4"];
    const results = [];
    
    for (const propertyId of propertyIds) {
      const existingDepts = await kv.getByPrefix(`dept:${propertyId}:`);
      const deptCount = existingDepts?.length || 0;
      
      console.log(`[SEED] Property ${propertyId} has ${deptCount} departments`);
      
      // Seed missing data based on property
      let expectedCount = 0;
      let dataToSeed: DepartmentData[] = [];
      
      if (propertyId === "1") {
        expectedCount = 20;
        if (deptCount < expectedCount) {
          // Generate all lemesjoData again
          dataToSeed = Array.from({ length: 20 }, (_, i) => {
            const deptId = i + 1;
            const key = `dept:1:${deptId}`;
            
            // Only add if not exists
            if (!existingDepts?.find(d => d.key === key)) {
              return {
                id: key,
                propertyId: "1",
                departmentId: deptId,
                area: 2.5 + Math.random() * 2,
                age: 30 + Math.floor(Math.random() * 40),
                cuttingClass: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
                volume: 150 + Math.floor(Math.random() * 150),
                mainSpecies: ["Gran", "Tall", "Björk", "Ek"][Math.floor(Math.random() * 4)],
                site: ["Frisk", "Torr", "Blött"][Math.floor(Math.random() * 3)],
                terrain: ["Plant", "Kuperat", "Brant"][Math.floor(Math.random() * 3)],
                siteIndex: ["G38", "T22", "B20"][Math.floor(Math.random() * 3)],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };
            }
            return null;
          }).filter(Boolean) as DepartmentData[];
        }
      } else if (propertyId === "4") {
        expectedCount = 12;
        if (deptCount < expectedCount) {
          // Seed Jane's property departments with actual data (BJÖRKLUND 4:21)
          const bjorklundFullData: DepartmentData[] = [
            { id: "dept:4:1", propertyId: "4", departmentId: 1, area: 2.7, age: 52, cuttingClass: "C", volume: 265, mainSpecies: "Gran", site: "Frisk", terrain: "Plant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: "dept:4:2", propertyId: "4", departmentId: 2, area: 3.1, age: 48, cuttingClass: "B", volume: 234, mainSpecies: "Tall", site: "Torr", terrain: "Kuperat", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: "dept:4:3", propertyId: "4", departmentId: 3, area: 2.4, age: 38, cuttingClass: "A", volume: 156, mainSpecies: "Björk", site: "Fuktig", terrain: "Plant", siteIndex: "B20", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: "dept:4:4", propertyId: "4", departmentId: 4, area: 2.9, age: 55, cuttingClass: "C", volume: 278, mainSpecies: "Gran", site: "Frisk", terrain: "Plant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: "dept:4:5", propertyId: "4", departmentId: 5, area: 2.6, age: 44, cuttingClass: "B", volume: 198, mainSpecies: "Tall", site: "Torr", terrain: "Kuperat", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: "dept:4:6", propertyId: "4", departmentId: 6, area: 3.3, age: 60, cuttingClass: "C", volume: 312, mainSpecies: "Gran", site: "Frisk", terrain: "Brant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: "dept:4:7", propertyId: "4", departmentId: 7, area: 2.8, age: 42, cuttingClass: "B", volume: 187, mainSpecies: "Björk", site: "Fuktig", terrain: "Plant", siteIndex: "B20", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: "dept:4:8", propertyId: "4", departmentId: 8, area: 3.0, age: 50, cuttingClass: "B", volume: 245, mainSpecies: "Tall", site: "Torr", terrain: "Kuperat", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: "dept:4:9", propertyId: "4", departmentId: 9, area: 2.5, age: 36, cuttingClass: "A", volume: 145, mainSpecies: "Björk", site: "Fuktig", terrain: "Plant", siteIndex: "B20", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: "dept:4:10", propertyId: "4", departmentId: 10, area: 2.9, age: 58, cuttingClass: "C", volume: 289, mainSpecies: "Gran", site: "Frisk", terrain: "Plant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: "dept:4:11", propertyId: "4", departmentId: 11, area: 2.7, age: 47, cuttingClass: "B", volume: 221, mainSpecies: "Tall", site: "Torr", terrain: "Kuperat", siteIndex: "T22", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: "dept:4:12", propertyId: "4", departmentId: 12, area: 2.8, age: 53, cuttingClass: "C", volume: 267, mainSpecies: "Gran", site: "Frisk", terrain: "Brant", siteIndex: "G38", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          ];
          
          dataToSeed = bjorklundFullData.filter(dept => 
            !existingDepts?.find(d => d.key === dept.id)
          );
        }
      }
      
      // Save missing data
      if (dataToSeed.length > 0) {
        for (const dept of dataToSeed) {
          await kv.set(dept.id, dept);
        }
        console.log(`[SEED] Added ${dataToSeed.length} missing departments for property ${propertyId}`);
      }
      
      results.push({
        propertyId,
        hadDepartments: deptCount,
        expectedDepartments: expectedCount,
        addedDepartments: dataToSeed.length,
      });
    }
    
    return c.json({
      success: true,
      message: "Missing department data seeded",
      results,
    });
  } catch (error) {
    console.error("[SEED] Error seeding missing data:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Migrate existing departments to add siteIndex field
app.post("/departments/migrate-site-index", async (c) => {
  try {
    console.log("[MIGRATION] Starting siteIndex migration...");
    
    // Get all departments
    const allDepts = await kv.getByPrefix("dept:");
    
    if (!allDepts || allDepts.length === 0) {
      return c.json({ 
        success: true, 
        message: "No departments to migrate",
        updated: 0 
      });
    }
    
    console.log(`[MIGRATION] Found ${allDepts.length} departments`);
    
    let updatedCount = 0;
    
    for (const item of allDepts) {
      const dept = item.value;
      
      // Check if siteIndex is missing or undefined
      if (!dept.siteIndex) {
        // Assign siteIndex based on mainSpecies
        let siteIndex = "G38"; // default
        
        switch (dept.mainSpecies) {
          case "Gran":
            siteIndex = "G38";
            break;
          case "Tall":
            siteIndex = "T22";
            break;
          case "Björk":
            siteIndex = "B20";
            break;
          case "Contorta":
            siteIndex = "T18";
            break;
          case "Ek":
            siteIndex = "G32";
            break;
          case "Löv":
            siteIndex = "B20";
            break;
          default:
            siteIndex = "G38";
        }
        
        // Update the department with siteIndex
        const updated = {
          ...dept,
          siteIndex,
          updatedAt: new Date().toISOString(),
        };
        
        await kv.set(item.key, updated);
        updatedCount++;
        
        console.log(`[MIGRATION] Updated ${item.key} with siteIndex: ${siteIndex}`);
      }
    }
    
    console.log(`[MIGRATION] Migration complete. Updated ${updatedCount} departments`);
    
    return c.json({
      success: true,
      message: `Successfully migrated ${updatedCount} departments`,
      total: allDepts.length,
      updated: updatedCount,
    });
  } catch (error) {
    console.error("[MIGRATION] Error during migration:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Debug endpoint to check seeding status
app.get("/departments/debug/status", async (c) => {
  try {
    const allDepts = await kv.getByPrefix("dept:");
    const byProperty: Record<string, number> = {};
    
    if (allDepts && allDepts.length > 0) {
      for (const dept of allDepts) {
        const propId = dept.value?.propertyId || 'unknown';
        byProperty[propId] = (byProperty[propId] || 0) + 1;
      }
    }
    
    return c.json({ 
      totalDepartments: allDepts?.length || 0,
      byProperty,
      keys: allDepts?.map(d => d.key) || []
    });
  } catch (error) {
    console.error("Error checking department status:", error);
    return c.json({ error: "Failed to check status" }, 500);
  }
});

// Debug endpoint to clear all department data (for development)
app.delete("/departments/debug/clear-all", async (c) => {
  try {
    const allDepts = await kv.getByPrefix("dept:");
    console.log(`Clearing ${allDepts?.length || 0} departments...`);
    
    if (allDepts && allDepts.length > 0) {
      for (const dept of allDepts) {
        await kv.del(dept.key); // Use dept.key, not dept.id
      }
    }
    
    console.log("Departments cleared, now re-seeding with force=true...");
    
    // Re-seed after clearing with force flag
    await seedDepartmentData(true);
    
    // Verify seeding
    const newDepts = await kv.getByPrefix("dept:");
    console.log(`Re-seeded ${newDepts?.length || 0} departments`);
    
    return c.json({ 
      message: "All departments cleared and re-seeded", 
      clearedCount: allDepts?.length || 0,
      seededCount: newDepts?.length || 0
    });
  } catch (error) {
    console.error("Error clearing departments:", error);
    return c.json({ error: "Failed to clear departments" }, 500);
  }
});

export default app;