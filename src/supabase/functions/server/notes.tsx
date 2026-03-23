import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const app = new Hono();

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
  polygon?: Array<{ lat: number; lng: number }>; // For area-based notes
}

// Get all notes for a property
app.get('/notes/:propertyId', async (c) => {
  try {
    const propertyId = c.req.param('propertyId');
    console.log('GET /notes - Fetching notes for property:', propertyId);
    const prefix = `note:${propertyId}:`;
    console.log('GET /notes - Using prefix:', prefix);
    
    const notes = await kv.getByPrefix(prefix);
    console.log('GET /notes - Raw notes from database:', notes);
    
    // getByPrefix returns array of {key, value} objects
    const validNotes = notes
      .filter(item => item && item.value)
      .map(item => item.value)
      .filter(note => note && note.id && note.title);
    
    console.log('GET /notes - Valid notes after filtering:', validNotes);
    
    return c.json({ 
      success: true, 
      notes: validNotes 
    });
  } catch (error) {
    console.error('GET /notes - Error fetching notes:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch notes',
      details: error.message 
    }, 500);
  }
});

// Create a new note
app.post('/notes', async (c) => {
  try {
    const note = await c.req.json() as Note;
    
    console.log('POST /notes - Received note:', note);
    
    if (!note.id || !note.propertyId) {
      console.log('POST /notes - Missing ID or propertyId');
      return c.json({ 
        success: false, 
        error: 'Note ID and property ID are required' 
      }, 400);
    }
    
    const key = `note:${note.propertyId}:${note.id}`;
    console.log('POST /notes - Saving with key:', key);
    await kv.set(key, note);
    console.log('POST /notes - Note saved successfully');
    
    // Verify the save by reading it back
    const savedNote = await kv.get(key);
    console.log('POST /notes - Verification read:', savedNote);
    
    return c.json({ 
      success: true, 
      note 
    });
  } catch (error) {
    console.error('Error creating note:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to create note',
      details: error.message 
    }, 500);
  }
});

// Update an existing note
app.put('/notes/:propertyId/:noteId', async (c) => {
  try {
    const propertyId = c.req.param('propertyId');
    const noteId = c.req.param('noteId');
    const updatedNote = await c.req.json() as Note;
    
    const key = `note:${propertyId}:${noteId}`;
    await kv.set(key, updatedNote);
    
    return c.json({ 
      success: true, 
      note: updatedNote 
    });
  } catch (error) {
    console.error('Error updating note:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to update note',
      details: error.message 
    }, 500);
  }
});

// Delete a note
app.delete('/notes/:propertyId/:noteId', async (c) => {
  try {
    const propertyId = c.req.param('propertyId');
    const noteId = c.req.param('noteId');
    
    const key = `note:${propertyId}:${noteId}`;
    await kv.del(key);
    
    return c.json({ 
      success: true 
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to delete note',
      details: error.message 
    }, 500);
  }
});

export default app;