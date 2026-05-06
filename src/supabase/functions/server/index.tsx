import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import notesRoutes from "./notes.tsx";
import departmentsRoutes, { initializeDepartments } from "./departments.tsx";
import propertiesRoutes from "./properties.tsx";
import forestryPlansRoutes from "./forestry-plans.tsx";
import usersRoutes from "./users.tsx";
import invitesRoutes from "./invites.tsx";

const app = new Hono();

// Initialize data on server start
console.log("[INIT] Initializing server data...");
initializeDepartments().then(() => {
  console.log("[INIT] Department initialization complete");
}).catch((error) => {
  console.error("[INIT] Failed to initialize departments:", error);
});

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-ffc89dab/health", (c) => {
  return c.json({ status: "ok" });
});

// Mount notes routes under the correct prefix
app.route("/make-server-ffc89dab", notesRoutes);

// Mount departments routes under the correct prefix
app.route("/make-server-ffc89dab", departmentsRoutes);

// Mount properties routes under the correct prefix
app.route("/make-server-ffc89dab", propertiesRoutes);

// Mount forestry plans routes under the correct prefix
app.route("/make-server-ffc89dab", forestryPlansRoutes);

// Mount users routes under the correct prefix
app.route("/make-server-ffc89dab", usersRoutes);

// Mount invites routes under the correct prefix
app.route("/make-server-ffc89dab", invitesRoutes);

// Debug endpoint to force re-initialization of all data
app.post("/make-server-ffc89dab/debug/reinit-all", async (c) => {
  try {
    console.log("[DEBUG] Force re-initializing all data...");
    
    // Clear all existing data
    const allKeys = await kv.getByPrefix("");
    console.log(`[DEBUG] Found ${allKeys.length} keys to clear`);
    
    for (const item of allKeys) {
      await kv.del(item.key);
    }
    
    console.log("[DEBUG] All data cleared, restarting server to trigger seeding...");
    
    return c.json({ 
      success: true, 
      message: "All data cleared. Server will reseed on next request.",
      clearedKeys: allKeys.length
    });
  } catch (error) {
    console.error("[DEBUG] Error re-initializing:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Debug: Log all registered routes
console.log("Server started with routes:");
app.routes.forEach(route => {
  console.log(`${route.method} ${route.path}`);
});

Deno.serve(app.fetch);