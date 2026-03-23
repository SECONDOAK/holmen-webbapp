import { projectId, publicAnonKey } from './supabase/info.tsx';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab`;

export interface Property {
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

export const propertiesApi = {
  async getPropertiesForUser(userId: string): Promise<Property[]> {
    try {
      console.log('[PROPERTIES API] Fetching properties for user:', userId);
      console.log('[PROPERTIES API] URL:', `${BASE_URL}/properties/${userId}`);
      
      const response = await fetch(`${BASE_URL}/properties/${userId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('[PROPERTIES API] Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[PROPERTIES API] Error response:', errorText);
        throw new Error(`Failed to fetch properties: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('[PROPERTIES API] Response data:', data);
      console.log('[PROPERTIES API] Properties array:', data.properties);
      
      return data.properties || [];
    } catch (error) {
      console.error('[PROPERTIES API] Error fetching properties:', error);
      throw error;
    }
  },

  async getProperty(userId: string, propertyId: string): Promise<Property | null> {
    try {
      const response = await fetch(`${BASE_URL}/properties/${userId}/${propertyId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch property: ${response.statusText}`);
      }

      const data = await response.json();
      return data.property || null;
    } catch (error) {
      console.error('Error fetching property:', error);
      throw error;
    }
  },
};