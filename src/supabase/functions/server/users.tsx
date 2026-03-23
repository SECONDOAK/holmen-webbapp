import { Hono } from "npm:hono";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Get user data by ID
app.get("/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    console.log(`[USER] Fetching user data for: ${userId}`);

    const key = `user:${userId}:profile`;
    const userData = await kv.get(key);

    if (!userData) {
      console.log(`[USER] User not found: ${userId}`);
      return c.json({ 
        name: userId === '1' ? 'John Doe' : 'Jane Doe',
        email: userId === '1' ? 'john.doe@holmen.com' : 'jane.doe@holmen.com',
        phone: userId === '1' ? '123 456 78 90' : '123 456 78 91',
        address: {},
        bank: {},
        notifications: {}
      });
    }

    console.log(`[USER] User data found for: ${userId}`);
    return c.json(userData);
  } catch (error) {
    console.error("[USER] Error fetching user:", error);
    return c.json({ error: "Failed to fetch user data" }, 500);
  }
});

// Update user profile
app.put("/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const body = await c.req.json();
    console.log(`[USER] Updating user profile for: ${userId}`, body);

    const key = `user:${userId}:profile`;
    
    // Get existing data
    const existingData = await kv.get(key) || {};
    
    // Merge with new data
    const updatedData = {
      ...existingData,
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: {
        street: body.address?.street || '',
        postalCode: body.address?.postalCode || '',
        city: body.address?.city || '',
      },
      bank: {
        bankName: body.bank?.bankName || '',
        accountNumber: body.bank?.accountNumber || '',
      },
      updatedAt: new Date().toISOString(),
    };

    await kv.set(key, updatedData);
    console.log(`[USER] User profile updated for: ${userId}`);

    return c.json({ success: true, data: updatedData });
  } catch (error) {
    console.error("[USER] Error updating user profile:", error);
    return c.json({ error: "Failed to update user profile" }, 500);
  }
});

// Update user notifications
app.put("/user/:userId/notifications", async (c) => {
  try {
    const userId = c.req.param("userId");
    const body = await c.req.json();
    console.log(`[USER] Updating notifications for: ${userId}`, body);

    const key = `user:${userId}:profile`;
    
    // Get existing data
    const existingData = await kv.get(key) || {};
    
    // Update notifications
    const updatedData = {
      ...existingData,
      notifications: body,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(key, updatedData);
    console.log(`[USER] Notifications updated for: ${userId}`);

    return c.json({ success: true, data: updatedData });
  } catch (error) {
    console.error("[USER] Error updating notifications:", error);
    return c.json({ error: "Failed to update notifications" }, 500);
  }
});

export default app;