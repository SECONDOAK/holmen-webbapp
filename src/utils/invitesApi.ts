import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab`;

/**
 * Roll som styr vilka delar av appen den inbjudna användaren ser.
 *   - `full-read` — Full läsbehörighet: ser fastighet, anteckningar,
 *     kontrakt och fakturor.
 *   - `overview` — Fastighetsöversikt: ser bara fastighet och
 *     skogsbruksplan.
 *
 * Äldre invites kan ha värdena 'read'/'write'; vi mappar dem till
 * 'full-read' vid inläsning för bakåtkompatibilitet.
 */
export type InvitePermission = 'full-read' | 'overview';

export interface PendingInvite {
  id: string;
  userId: string;
  email: string;
  invitedDate: string;
  entities: string[];
  permission?: InvitePermission;
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `HTTP ${response.status}`;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.error || errorJson.details || errorMessage;
    } catch {
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

export const invitesApi = {
  async list(userId: string): Promise<PendingInvite[]> {
    try {
      const data = await fetchWithAuth(`${API_BASE}/invites/${userId}`);
      return Array.isArray(data.invites) ? data.invites : [];
    } catch (error) {
      console.error('Error fetching invites:', error);
      return [];
    }
  },

  async upsert(invite: PendingInvite): Promise<PendingInvite> {
    const data = await fetchWithAuth(`${API_BASE}/invites`, {
      method: 'POST',
      body: JSON.stringify(invite),
    });
    return data.invite;
  },

  async remove(userId: string, id: string): Promise<void> {
    await fetchWithAuth(`${API_BASE}/invites/${userId}/${id}`, {
      method: 'DELETE',
    });
  },
};
