import { projectId, publicAnonKey } from "./supabase/info";

/**
 * Add missing department data without clearing existing data.
 * This is safe to run and won't delete anything.
 */
export async function seedMissingData(): Promise<{ success: boolean; message: string }> {
  try {
    console.log("[SEED] Seeding missing department data...");
    console.log("[SEED] Calling endpoint:", `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab/departments/seed-missing`);
    
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab/departments/seed-missing`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("[SEED] Response status:", response.status);
    console.log("[SEED] Response ok:", response.ok);

    if (!response.ok) {
      const error = await response.text();
      console.error("[SEED] Failed to seed missing data:", error);
      return {
        success: false,
        message: `Failed to seed missing data: ${response.statusText} - ${error}`,
      };
    }

    const data = await response.json();
    console.log("[SEED] Seeding successful:", data);

    return {
      success: true,
      message: `Seeding successful. Results: ${JSON.stringify(data.results, null, 2)}`,
    };
  } catch (error) {
    console.error("[SEED] Error seeding missing data:", error);
    return {
      success: false,
      message: `Error seeding missing data: ${String(error)}`,
    };
  }
}

/**
 * Reset the entire database by clearing all data and triggering re-seeding.
 * This should only be used for development/debugging purposes.
 */
export async function resetDatabase(): Promise<{ success: boolean; message: string }> {
  try {
    console.log("[RESET] Resetting database...");
    
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab/debug/reinit-all`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("[RESET] Failed to reset database:", error);
      return {
        success: false,
        message: `Failed to reset database: ${response.statusText}`,
      };
    }

    const data = await response.json();
    console.log("[RESET] Database reset successful:", data);

    return {
      success: true,
      message: `Database reset successful. Cleared ${data.clearedKeys} keys.`,
    };
  } catch (error) {
    console.error("[RESET] Error resetting database:", error);
    return {
      success: false,
      message: `Error resetting database: ${error}`,
    };
  }
}

/**
 * Call this from browser console to seed missing data (SAFE - doesn't delete anything):
 * 
 * await seedMissingData()
 * 
 * Or to fully reset database (DESTRUCTIVE):
 * 
 * await resetDatabase()
 */