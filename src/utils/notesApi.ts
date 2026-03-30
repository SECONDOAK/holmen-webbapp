import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab`;

export interface Note {
  id: string;
  title: string;
  department: string;
  date: string;
  color: string;
  category: string;
  type: string;
  comment: string;
  coordinates?: { lat: number; lng: number };
  propertyId?: string;
  resolved?: boolean;
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Unknown error';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error || errorJson.message || errorJson.details || errorMessage;
      } catch {
        errorMessage = errorText || `HTTP ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    // If it's a network error or fetch error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to server');
    }
    throw error;
  }
}

export const notesApi = {
  // Get all notes for a property
  async getNotes(propertyId: string): Promise<Note[]> {
    try {
      const data = await fetchWithAuth(`${API_BASE}/notes/${propertyId}`);
      // Ensure we always return an array and filter out null values
      const notes = Array.isArray(data.notes) ? data.notes : [];
      return notes.filter(note => note != null && note.id && note.title);
    } catch (error) {
      console.error('Error fetching notes:', error);
      // Return empty array instead of throwing to prevent UI crashes
      return [];
    }
  },

  // Create a new note
  async createNote(note: Note): Promise<Note> {
    try {
      const data = await fetchWithAuth(`${API_BASE}/notes`, {
        method: 'POST',
        body: JSON.stringify(note),
      });
      return data.note;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  // Update an existing note
  async updateNote(note: Note): Promise<Note> {
    try {
      if (!note.propertyId) {
        throw new Error('Property ID is required');
      }
      const data = await fetchWithAuth(
        `${API_BASE}/notes/${note.propertyId}/${note.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(note),
        }
      );
      return data.note;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  // Delete a note
  async deleteNote(propertyId: string, noteId: string): Promise<void> {
    try {
      await fetchWithAuth(`${API_BASE}/notes/${propertyId}/${noteId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },
};