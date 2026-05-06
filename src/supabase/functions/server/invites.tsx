import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const app = new Hono();

export interface PendingInvite {
  id: string;
  userId: string; // The owner who sent the invite
  email: string;
  invitedDate: string;
  entities: string[];
}

const keyFor = (userId: string, id: string) => `invite:${userId}:${id}`;
const prefixFor = (userId: string) => `invite:${userId}:`;

// Get all pending invites for a user
app.get('/invites/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const items = await kv.getByPrefix(prefixFor(userId));
    const invites = items
      .filter((it) => it && it.value)
      .map((it) => it.value)
      .filter((inv) => inv && inv.id && inv.email);
    return c.json({ success: true, invites });
  } catch (error) {
    console.error('GET /invites - Error:', error);
    return c.json(
      { success: false, error: 'Failed to fetch invites', details: String(error) },
      500,
    );
  }
});

// Create or replace a pending invite
app.post('/invites', async (c) => {
  try {
    const invite = (await c.req.json()) as PendingInvite;
    if (!invite.id || !invite.userId || !invite.email) {
      return c.json(
        { success: false, error: 'id, userId and email are required' },
        400,
      );
    }
    await kv.set(keyFor(invite.userId, invite.id), invite);
    return c.json({ success: true, invite });
  } catch (error) {
    console.error('POST /invites - Error:', error);
    return c.json(
      { success: false, error: 'Failed to create invite', details: String(error) },
      500,
    );
  }
});

// Delete a pending invite
app.delete('/invites/:userId/:id', async (c) => {
  try {
    const userId = c.req.param('userId');
    const id = c.req.param('id');
    await kv.del(keyFor(userId, id));
    return c.json({ success: true });
  } catch (error) {
    console.error('DELETE /invites - Error:', error);
    return c.json(
      { success: false, error: 'Failed to delete invite', details: String(error) },
      500,
    );
  }
});

export default app;
