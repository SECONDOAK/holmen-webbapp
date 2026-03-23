import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const app = new Hono();

interface Property {
  id: string;
  userId: string;
  name: string;
  area: number;
  type: string;
  location: string;
  imageUrl: string;
  coordinates: { lat: number; lng: number }[][];
  center: { lat: number; lng: number };
}

// Seed properties for John Doe (user id: "1")
const johnProperties: Property[] = [
  {
    id: "1",
    userId: "1",
    name: "LEMESJÖ 1:52",
    area: 45.2,
    type: "Skogsfastighet",
    location: "Sundsvall",
    imageUrl: "",
    center: { lat: 57.72, lng: 15.38 },
    coordinates: [
      // Rad 1 (5 avdelningar längst upp)
      [
        { lat: 57.725, lng: 15.375 },
        { lat: 57.725, lng: 15.377 },
        { lat: 57.723, lng: 15.377 },
        { lat: 57.723, lng: 15.375 },
      ],
      [
        { lat: 57.725, lng: 15.377 },
        { lat: 57.725, lng: 15.379 },
        { lat: 57.723, lng: 15.379 },
        { lat: 57.723, lng: 15.377 },
      ],
      [
        { lat: 57.725, lng: 15.379 },
        { lat: 57.725, lng: 15.381 },
        { lat: 57.723, lng: 15.381 },
        { lat: 57.723, lng: 15.379 },
      ],
      [
        { lat: 57.725, lng: 15.381 },
        { lat: 57.725, lng: 15.383 },
        { lat: 57.723, lng: 15.383 },
        { lat: 57.723, lng: 15.381 },
      ],
      [
        { lat: 57.725, lng: 15.383 },
        { lat: 57.725, lng: 15.385 },
        { lat: 57.723, lng: 15.385 },
        { lat: 57.723, lng: 15.383 },
      ],
      // Rad 2 (5 avdelningar)
      [
        { lat: 57.723, lng: 15.375 },
        { lat: 57.723, lng: 15.377 },
        { lat: 57.721, lng: 15.377 },
        { lat: 57.721, lng: 15.375 },
      ],
      [
        { lat: 57.723, lng: 15.377 },
        { lat: 57.723, lng: 15.379 },
        { lat: 57.721, lng: 15.379 },
        { lat: 57.721, lng: 15.377 },
      ],
      [
        { lat: 57.723, lng: 15.379 },
        { lat: 57.723, lng: 15.381 },
        { lat: 57.721, lng: 15.381 },
        { lat: 57.721, lng: 15.379 },
      ],
      [
        { lat: 57.723, lng: 15.381 },
        { lat: 57.723, lng: 15.383 },
        { lat: 57.721, lng: 15.383 },
        { lat: 57.721, lng: 15.381 },
      ],
      [
        { lat: 57.723, lng: 15.383 },
        { lat: 57.723, lng: 15.385 },
        { lat: 57.721, lng: 15.385 },
        { lat: 57.721, lng: 15.383 },
      ],
      // Rad 3 (5 avdelningar)
      [
        { lat: 57.721, lng: 15.375 },
        { lat: 57.721, lng: 15.377 },
        { lat: 57.719, lng: 15.377 },
        { lat: 57.719, lng: 15.375 },
      ],
      [
        { lat: 57.721, lng: 15.377 },
        { lat: 57.721, lng: 15.379 },
        { lat: 57.719, lng: 15.379 },
        { lat: 57.719, lng: 15.377 },
      ],
      [
        { lat: 57.721, lng: 15.379 },
        { lat: 57.721, lng: 15.381 },
        { lat: 57.719, lng: 15.381 },
        { lat: 57.719, lng: 15.379 },
      ],
      [
        { lat: 57.721, lng: 15.381 },
        { lat: 57.721, lng: 15.383 },
        { lat: 57.719, lng: 15.383 },
        { lat: 57.719, lng: 15.381 },
      ],
      [
        { lat: 57.721, lng: 15.383 },
        { lat: 57.721, lng: 15.385 },
        { lat: 57.719, lng: 15.385 },
        { lat: 57.719, lng: 15.383 },
      ],
      // Rad 4 (5 avdelningar längst ner)
      [
        { lat: 57.719, lng: 15.375 },
        { lat: 57.719, lng: 15.377 },
        { lat: 57.717, lng: 15.377 },
        { lat: 57.717, lng: 15.375 },
      ],
      [
        { lat: 57.719, lng: 15.377 },
        { lat: 57.719, lng: 15.379 },
        { lat: 57.717, lng: 15.379 },
        { lat: 57.717, lng: 15.377 },
      ],
      [
        { lat: 57.719, lng: 15.379 },
        { lat: 57.719, lng: 15.381 },
        { lat: 57.717, lng: 15.381 },
        { lat: 57.717, lng: 15.379 },
      ],
      [
        { lat: 57.719, lng: 15.381 },
        { lat: 57.719, lng: 15.383 },
        { lat: 57.717, lng: 15.383 },
        { lat: 57.717, lng: 15.381 },
      ],
      [
        { lat: 57.719, lng: 15.383 },
        { lat: 57.719, lng: 15.385 },
        { lat: 57.717, lng: 15.385 },
        { lat: 57.717, lng: 15.383 },
      ],
    ],
  },
  {
    id: "2",
    userId: "1",
    name: "BERGVIK 2:15",
    area: 22.8,
    type: "Skogsfastighet",
    location: "Bergvik",
    imageUrl: "",
    center: { lat: 57.75, lng: 15.45 },
    coordinates: [
      [
        { lat: 57.752, lng: 15.448 },
        { lat: 57.752, lng: 15.452 },
        { lat: 57.748, lng: 15.452 },
        { lat: 57.748, lng: 15.448 },
      ],
    ],
  },
  {
    id: "3",
    userId: "1",
    name: "SKOGSHEM 3:7",
    area: 18.5,
    type: "Skogsfastighet",
    location: "Norrköping",
    imageUrl: "",
    center: { lat: 57.68, lng: 15.32 },
    coordinates: [
      [
        { lat: 57.682, lng: 15.318 },
        { lat: 57.682, lng: 15.322 },
        { lat: 57.678, lng: 15.322 },
        { lat: 57.678, lng: 15.318 },
      ],
    ],
  },
];

// Seed properties for Jane Doe (user id: "2")
const janeProperties: Property[] = [
  {
    id: "4",
    userId: "2",
    name: "BJÖRKLUND 4:21",
    area: 32.7,
    type: "Skogsfastighet",
    location: "Linköping",
    imageUrl: "",
    center: { lat: 57.80, lng: 15.50 },
    coordinates: [
      // 12 avdelningar i ett 3x4 grid
      // Rad 1
      [
        { lat: 57.805, lng: 15.495 },
        { lat: 57.805, lng: 15.498 },
        { lat: 57.803, lng: 15.498 },
        { lat: 57.803, lng: 15.495 },
      ],
      [
        { lat: 57.805, lng: 15.498 },
        { lat: 57.805, lng: 15.501 },
        { lat: 57.803, lng: 15.501 },
        { lat: 57.803, lng: 15.498 },
      ],
      [
        { lat: 57.805, lng: 15.501 },
        { lat: 57.805, lng: 15.504 },
        { lat: 57.803, lng: 15.504 },
        { lat: 57.803, lng: 15.501 },
      ],
      [
        { lat: 57.805, lng: 15.504 },
        { lat: 57.805, lng: 15.507 },
        { lat: 57.803, lng: 15.507 },
        { lat: 57.803, lng: 15.504 },
      ],
      // Rad 2
      [
        { lat: 57.803, lng: 15.495 },
        { lat: 57.803, lng: 15.498 },
        { lat: 57.801, lng: 15.498 },
        { lat: 57.801, lng: 15.495 },
      ],
      [
        { lat: 57.803, lng: 15.498 },
        { lat: 57.803, lng: 15.501 },
        { lat: 57.801, lng: 15.501 },
        { lat: 57.801, lng: 15.498 },
      ],
      [
        { lat: 57.803, lng: 15.501 },
        { lat: 57.803, lng: 15.504 },
        { lat: 57.801, lng: 15.504 },
        { lat: 57.801, lng: 15.501 },
      ],
      [
        { lat: 57.803, lng: 15.504 },
        { lat: 57.803, lng: 15.507 },
        { lat: 57.801, lng: 15.507 },
        { lat: 57.801, lng: 15.504 },
      ],
      // Rad 3
      [
        { lat: 57.801, lng: 15.495 },
        { lat: 57.801, lng: 15.498 },
        { lat: 57.799, lng: 15.498 },
        { lat: 57.799, lng: 15.495 },
      ],
      [
        { lat: 57.801, lng: 15.498 },
        { lat: 57.801, lng: 15.501 },
        { lat: 57.799, lng: 15.501 },
        { lat: 57.799, lng: 15.498 },
      ],
      [
        { lat: 57.801, lng: 15.501 },
        { lat: 57.801, lng: 15.504 },
        { lat: 57.799, lng: 15.504 },
        { lat: 57.799, lng: 15.501 },
      ],
      [
        { lat: 57.801, lng: 15.504 },
        { lat: 57.801, lng: 15.507 },
        { lat: 57.799, lng: 15.507 },
        { lat: 57.799, lng: 15.504 },
      ],
    ],
  },
];

// Initialize properties in database on server start
async function initializeProperties() {
  try {
    console.log('[PROPERTIES] Initializing properties data...');
    
    // Check if properties already exist
    const existingProperties = await kv.getByPrefix('property:');
    
    if (existingProperties.length === 0) {
      console.log('[PROPERTIES] No properties found, seeding initial data...');
      
      // Seed John's properties
      for (const property of johnProperties) {
        await kv.set(`property:${property.id}`, property);
        console.log(`[PROPERTIES] Seeded property ${property.name} for John Doe`);
      }
      
      // Seed Jane's property
      for (const property of janeProperties) {
        await kv.set(`property:${property.id}`, property);
        console.log(`[PROPERTIES] Seeded property ${property.name} for Jane Doe`);
      }
      
      console.log('[PROPERTIES] Successfully seeded all properties');
    } else {
      console.log(`[PROPERTIES] Found ${existingProperties.length} existing properties`);
    }
  } catch (error) {
    console.error('[PROPERTIES] Error initializing properties:', error);
  }
}

// Initialize on server start
initializeProperties();

// Get all properties for a specific user
app.get('/properties/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    console.log(`[PROPERTIES] Fetching properties for user ${userId}`);
    
    const allPropertiesData = await kv.getByPrefix('property:');
    console.log(`[PROPERTIES] Raw data from kv.getByPrefix:`, allPropertiesData);
    
    // getByPrefix returns array of {key, value} objects, extract values
    const allProperties = allPropertiesData.map((item: any) => item.value || item);
    const userProperties = allProperties.filter((prop: Property) => prop && prop.userId === userId);
    
    console.log(`[PROPERTIES] Found ${userProperties.length} properties for user ${userId}`);
    console.log(`[PROPERTIES] Properties:`, userProperties.map((p: Property) => ({ id: p.id, name: p.name })));
    
    return c.json({ success: true, properties: userProperties });
  } catch (error) {
    console.error('[PROPERTIES] Error fetching properties:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get a specific property
app.get('/properties/:userId/:propertyId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const propertyId = c.req.param('propertyId');
    
    const property = await kv.get(`property:${propertyId}`) as Property | null;
    
    if (!property) {
      return c.json({ success: false, error: 'Property not found' }, 404);
    }
    
    if (property.userId !== userId) {
      return c.json({ success: false, error: 'Unauthorized' }, 403);
    }
    
    return c.json({ success: true, property });
  } catch (error) {
    console.error('[PROPERTIES] Error fetching property:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Debug endpoint to view all properties
app.get('/debug/all-properties', async (c) => {
  try {
    const allProperties = await kv.getByPrefix('property:');
    return c.json({ 
      success: true, 
      count: allProperties.length,
      properties: allProperties 
    });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Debug endpoint to clear all properties
app.delete('/debug/clear-properties', async (c) => {
  try {
    const allProperties = await kv.getByPrefix('property:');
    for (const property of allProperties) {
      await kv.del(`property:${property.id}`);
    }
    return c.json({ success: true, message: `Cleared ${allProperties.length} properties` });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

export default app;