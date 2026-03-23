import { Hono } from "npm:hono";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Forestry action types
type ActionType = 
  | "Slutavverkning" 
  | "Gallring" 
  | "Röjning" 
  | "Plantering" 
  | "Markberedning"
  | "Föryngringsavverkning"
  | "Naturvård";

// Forestry plan action interface
interface ForestryAction {
  id: string; // Format: "action:{propertyId}:{departmentId}:{actionId}"
  propertyId: string;
  departmentId: number;
  actionType: ActionType;
  plannedYear: number;
  priority: "Hög" | "Medel" | "Låg";
  estimatedVolume?: number; // m³sk (for harvesting actions)
  estimatedCost?: number; // SEK
  estimatedRevenue?: number; // SEK
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// Seed forestry plan data for Jane's property BJÖRKLUND 4:21 (propertyId: "4")
const bjorklundForestryPlan: ForestryAction[] = [
  // High priority actions
  {
    id: "action:4:1:1",
    propertyId: "4",
    departmentId: 1,
    actionType: "Gallring",
    plannedYear: 2025,
    priority: "Hög",
    estimatedVolume: 85,
    estimatedRevenue: 127500,
    estimatedCost: 15300,
    description: "Första gallring av granen. Uppskattad volym 85 m³sk. Bra körbarhet.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "action:4:6:1",
    propertyId: "4",
    departmentId: 6,
    actionType: "Slutavverkning",
    plannedYear: 2025,
    priority: "Hög",
    estimatedVolume: 312,
    estimatedRevenue: 780000,
    estimatedCost: 62400,
    description: "Mogen granbestånd redo för slutavverkning. Mycket god ekonomi. Plantera gran efter avverkning.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "action:4:6:2",
    propertyId: "4",
    departmentId: 6,
    actionType: "Markberedning",
    plannedYear: 2026,
    priority: "Hög",
    estimatedCost: 9900,
    description: "Markberedning efter slutavverkning inför plantering. Välj skonsam metod pga brant terräng.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "action:4:6:3",
    propertyId: "4",
    departmentId: 6,
    actionType: "Plantering",
    plannedYear: 2026,
    priority: "Hög",
    estimatedCost: 23100,
    description: "Plantera gran 2200 pl/ha. Komplettera med contorta i fuktigare partier. Totalt ca 7260 plantor.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "action:4:10:1",
    propertyId: "4",
    departmentId: 10,
    actionType: "Gallring",
    plannedYear: 2025,
    priority: "Hög",
    estimatedVolume: 92,
    estimatedRevenue: 138000,
    estimatedCost: 16560,
    description: "Andra gallring i granbeståndet. Stark tillväxt. God ekonomi.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  
  // Medium priority actions
  {
    id: "action:4:2:1",
    propertyId: "4",
    departmentId: 2,
    actionType: "Gallring",
    plannedYear: 2026,
    priority: "Medel",
    estimatedVolume: 75,
    estimatedRevenue: 112500,
    estimatedCost: 13500,
    description: "Första gallring av tallbeståndet. Kuperad terräng, planera körvägar noggrant.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "action:4:4:1",
    propertyId: "4",
    departmentId: 4,
    actionType: "Gallring",
    plannedYear: 2026,
    priority: "Medel",
    estimatedVolume: 88,
    estimatedRevenue: 132000,
    estimatedCost: 15840,
    description: "Andra gallring av gran. Plant mark ger god framkomlighet.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "action:4:5:1",
    propertyId: "4",
    departmentId: 5,
    actionType: "Gallring",
    plannedYear: 2027,
    priority: "Medel",
    estimatedVolume: 63,
    estimatedRevenue: 94500,
    estimatedCost: 11340,
    description: "Första gallring av tall. Torr tallhed med måttlig bonitet.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "action:4:8:1",
    propertyId: "4",
    departmentId: 8,
    actionType: "Gallring",
    plannedYear: 2027,
    priority: "Medel",
    estimatedVolume: 78,
    estimatedRevenue: 117000,
    estimatedCost: 14040,
    description: "Första gallring av tallbestånd. Kuperad men god körbarhet.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "action:4:11:1",
    propertyId: "4",
    departmentId: 11,
    actionType: "Gallring",
    plannedYear: 2027,
    priority: "Medel",
    estimatedVolume: 70,
    estimatedRevenue: 105000,
    estimatedCost: 12600,
    description: "Första gallring av tall. Kuperat, bör utföras på tjäle.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "action:4:12:1",
    propertyId: "4",
    departmentId: 12,
    actionType: "Gallring",
    plannedYear: 2027,
    priority: "Medel",
    estimatedVolume: 85,
    estimatedRevenue: 127500,
    estimatedCost: 15300,
    description: "Andra gallring av gran. Brant mark kräver försiktig planering av körvägar.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Low priority actions
  {
    id: "action:4:3:1",
    propertyId: "4",
    departmentId: 3,
    actionType: "Röjning",
    plannedYear: 2028,
    priority: "Låg",
    estimatedCost: 7200,
    description: "Röjning av ungt björkbestånd. Fuktig mark, vänta till frost för bästa resultat.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "action:4:7:1",
    propertyId: "4",
    departmentId: 7,
    actionType: "Röjning",
    plannedYear: 2028,
    priority: "Låg",
    estimatedCost: 8400,
    description: "Röjning i ungt björkbestånd. Fuktig naturtyp, beakta naturvårdshänsyn.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "action:4:9:1",
    propertyId: "4",
    departmentId: 9,
    actionType: "Röjning",
    plannedYear: 2029,
    priority: "Låg",
    estimatedCost: 7500,
    description: "Röjning av ungt björkbestånd. Fuktig ståndort.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "action:4:3:2",
    propertyId: "4",
    departmentId: 3,
    actionType: "Naturvård",
    plannedYear: 2025,
    priority: "Medel",
    estimatedCost: 0,
    description: "Lämna 10 högstubbar och lämpliga lövträd vid framtida avverkning. Fuktig miljö värdefull för biologisk mångfald.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "action:4:7:2",
    propertyId: "4",
    departmentId: 7,
    actionType: "Naturvård",
    plannedYear: 2025,
    priority: "Medel",
    estimatedCost: 0,
    description: "Bevara grova björkar och aspar. Fuktig miljö, spara död ved.",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Seed forestry plan data
async function seedForestryPlans(force = false) {
  console.log("[FORESTRY PLANS] Seeding forestry plan data...", force ? "(forced)" : "");
  
  // Check if data already exists
  if (!force) {
    const existingData = await kv.getByPrefix("action:");
    if (existingData && existingData.length > 0) {
      console.log("[FORESTRY PLANS] Forestry plan data already seeded, skipping...");
      return;
    }
  }

  // Save all actions
  for (const action of bjorklundForestryPlan) {
    await kv.set(action.id, action);
  }

  console.log(`[FORESTRY PLANS] Seeded ${bjorklundForestryPlan.length} forestry actions for BJÖRKLUND 4:21`);
}

// Get all actions for a property
app.get("/forestry-plans/:propertyId", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    const prefix = `action:${propertyId}:`;
    
    const actions = await kv.getByPrefix(prefix);
    
    if (!actions || actions.length === 0) {
      return c.json({ actions: [] });
    }

    // Extract values and sort by planned year, then priority
    const priorityOrder = { "Hög": 1, "Medel": 2, "Låg": 3 };
    const values = actions.map((item: any) => item.value);
    const sorted = values.sort((a: ForestryAction, b: ForestryAction) => {
      if (a.plannedYear !== b.plannedYear) {
        return a.plannedYear - b.plannedYear;
      }
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    return c.json({ actions: sorted });
  } catch (error) {
    console.error("[FORESTRY PLANS] Error fetching actions:", error);
    return c.json({ error: "Failed to fetch forestry actions" }, 500);
  }
});

// Get actions for a specific department
app.get("/forestry-plans/:propertyId/:departmentId", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    const departmentId = c.req.param("departmentId");
    const prefix = `action:${propertyId}:${departmentId}:`;
    
    const actions = await kv.getByPrefix(prefix);
    
    if (!actions || actions.length === 0) {
      return c.json({ actions: [] });
    }

    const values = actions.map((item: any) => item.value);
    
    return c.json({ actions: values });
  } catch (error) {
    console.error("[FORESTRY PLANS] Error fetching department actions:", error);
    return c.json({ error: "Failed to fetch department actions" }, 500);
  }
});

// Get a specific action
app.get("/forestry-plans/:propertyId/:departmentId/:actionId", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    const departmentId = c.req.param("departmentId");
    const actionId = c.req.param("actionId");
    const id = `action:${propertyId}:${departmentId}:${actionId}`;
    
    const action = await kv.get(id);
    
    if (!action) {
      return c.json({ error: "Action not found" }, 404);
    }

    return c.json({ action });
  } catch (error) {
    console.error("[FORESTRY PLANS] Error fetching action:", error);
    return c.json({ error: "Failed to fetch action" }, 500);
  }
});

// Create a new action
app.post("/forestry-plans/:propertyId/:departmentId", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    const departmentId = c.req.param("departmentId");
    
    const body = await c.req.json();
    
    // Generate new action ID
    const existingActions = await kv.getByPrefix(`action:${propertyId}:${departmentId}:`);
    const nextActionId = existingActions.length + 1;
    const id = `action:${propertyId}:${departmentId}:${nextActionId}`;
    
    const newAction: ForestryAction = {
      id,
      propertyId,
      departmentId: parseInt(departmentId),
      actionType: body.actionType,
      plannedYear: body.plannedYear,
      priority: body.priority,
      estimatedVolume: body.estimatedVolume,
      estimatedCost: body.estimatedCost,
      estimatedRevenue: body.estimatedRevenue,
      description: body.description,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(id, newAction);

    return c.json({ action: newAction }, 201);
  } catch (error) {
    console.error("[FORESTRY PLANS] Error creating action:", error);
    return c.json({ error: "Failed to create action" }, 500);
  }
});

// Update an action
app.put("/forestry-plans/:propertyId/:departmentId/:actionId", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    const departmentId = c.req.param("departmentId");
    const actionId = c.req.param("actionId");
    const id = `action:${propertyId}:${departmentId}:${actionId}`;
    
    const updates = await c.req.json();
    const existing = await kv.get(id) as ForestryAction | null;
    
    if (!existing) {
      return c.json({ error: "Action not found" }, 404);
    }

    const updated: ForestryAction = {
      ...existing,
      ...updates,
      id,
      propertyId,
      departmentId: parseInt(departmentId),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(id, updated);

    return c.json({ action: updated });
  } catch (error) {
    console.error("[FORESTRY PLANS] Error updating action:", error);
    return c.json({ error: "Failed to update action" }, 500);
  }
});

// Delete an action
app.delete("/forestry-plans/:propertyId/:departmentId/:actionId", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    const departmentId = c.req.param("departmentId");
    const actionId = c.req.param("actionId");
    const id = `action:${propertyId}:${departmentId}:${actionId}`;
    
    const action = await kv.get(id);
    
    if (!action) {
      return c.json({ error: "Action not found" }, 404);
    }

    await kv.del(id);

    return c.json({ message: "Action deleted successfully" });
  } catch (error) {
    console.error("[FORESTRY PLANS] Error deleting action:", error);
    return c.json({ error: "Failed to delete action" }, 500);
  }
});

// Debug endpoint to check seeding status
app.get("/forestry-plans/debug/status", async (c) => {
  try {
    const allActions = await kv.getByPrefix("action:");
    const byProperty: Record<string, number> = {};
    
    if (allActions && allActions.length > 0) {
      for (const action of allActions) {
        const propId = action.value?.propertyId || 'unknown';
        byProperty[propId] = (byProperty[propId] || 0) + 1;
      }
    }
    
    return c.json({ 
      totalActions: allActions?.length || 0,
      byProperty,
      actions: allActions?.map(a => a.value) || []
    });
  } catch (error) {
    console.error("[FORESTRY PLANS] Error checking status:", error);
    return c.json({ error: "Failed to check status" }, 500);
  }
});

// Debug endpoint to clear and re-seed
app.delete("/forestry-plans/debug/clear-all", async (c) => {
  try {
    const allActions = await kv.getByPrefix("action:");
    console.log(`[FORESTRY PLANS] Clearing ${allActions?.length || 0} actions...`);
    
    if (allActions && allActions.length > 0) {
      for (const action of allActions) {
        await kv.del(action.key);
      }
    }
    
    console.log("[FORESTRY PLANS] Actions cleared, now re-seeding...");
    await seedForestryPlans(true);
    
    const newActions = await kv.getByPrefix("action:");
    console.log(`[FORESTRY PLANS] Re-seeded ${newActions?.length || 0} actions`);
    
    return c.json({ 
      message: "All actions cleared and re-seeded", 
      clearedCount: allActions?.length || 0,
      seededCount: newActions?.length || 0
    });
  } catch (error) {
    console.error("[FORESTRY PLANS] Error clearing actions:", error);
    return c.json({ error: "Failed to clear actions" }, 500);
  }
});

// Initialize seed data on server start
seedForestryPlans().catch(console.error);

export default app;
