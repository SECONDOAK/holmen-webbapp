// Utility functions for generating Google Maps Static API snapshots

const GOOGLE_MAPS_API_KEY = "AIzaSyBoS_o7b6YFixPfFNOZAU7qNcsyaHPNfHs";

interface Coordinate {
  lat: number;
  lng: number;
}

/**
 * Generate a Google Maps Static API URL for a property snapshot
 */
export function generatePropertySnapshot(
  center: Coordinate,
  boundary: Coordinate[],
  width: number = 400,
  height: number = 300,
  zoom: number = 14
): string {
  const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
  
  // Create path string for the boundary
  const pathCoords = boundary
    .map(coord => `${coord.lat},${coord.lng}`)
    .join("|");
  
  // Add first coordinate again to close the polygon
  const firstCoord = boundary[0];
  const closedPath = `${pathCoords}|${firstCoord.lat},${firstCoord.lng}`;
  
  // Base parameters
  // Using 'roadmap' for static snapshots as requested
  let url = `${baseUrl}?center=${center.lat},${center.lng}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap&key=${GOOGLE_MAPS_API_KEY}&scale=2`;
  
  // Add the polygon path - white stroke with semi-transparent white fill
  // We manually construct this to avoid encoding issues with pipes/commas/colons
  const pathParam = `color:0xFFFFFFFF|weight:2|fillcolor:0xFFFFFF40|${closedPath}`;
  const encodedPath = encodeURIComponent(pathParam)
    .replace(/%3A/g, ':')
    .replace(/%2C/g, ',')
    .replace(/%7C/g, '|'); // Google Maps Static API often works better with raw pipes too, but let's try standard first. 
    // Actually, strictly speaking, pipes should be encoded in query params, but Google's examples often show them unencoded.
    // However, the previous debug showed %7C. Let's try KEEPING pipes encoded as %7C since that's standard URL encoding.
    // BUT, some environments double-encode. 
    // Let's stick to the previous strategy that the User verified looked "Correct" (encoded pipes), but fix the center comma.
    
  // Revert to the strategy: Encode everything, then decode specific chars we want readable.
  // Note: encodeURIComponent encodes | as %7C.
  const finalPath = encodeURIComponent(pathParam)
    .replace(/%3A/g, ':')
    .replace(/%2C/g, ',');
    
  return `${url}&path=${finalPath}`;
}

/**
 * Generate a Google Maps Static API URL for a department/subdivision snapshot
 */
export function generateDepartmentSnapshot(
  coordinates: Coordinate[],
  width: number = 400,
  height: number = 300,
  zoom: number = 16,
  highlight: boolean = false
): string {
  const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
  
  // Calculate center of department
  const avgLat = coordinates.reduce((sum, coord) => sum + coord.lat, 0) / coordinates.length;
  const avgLng = coordinates.reduce((sum, coord) => sum + coord.lng, 0) / coordinates.length;
  const center = { lat: avgLat, lng: avgLng };
  
  // Create path string for the boundary
  const pathCoords = coordinates
    .map(coord => `${coord.lat},${coord.lng}`)
    .join("|");
  
  // Add first coordinate again to close the polygon
  const firstCoord = coordinates[0];
  const closedPath = `${pathCoords}|${firstCoord.lat},${firstCoord.lng}`;
  
  // Base parameters
  // Using 'roadmap' for static snapshots as requested
  let url = `${baseUrl}?center=${center.lat},${center.lng}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap&key=${GOOGLE_MAPS_API_KEY}&scale=2`;
  
  // Different colors for highlighted vs normal
  const fillColor = highlight ? "0xFFD70080" : "0xFFFFFF40"; // Gold for highlighted, white for normal
  const strokeColor = "0xFFFFFFFF"; // White stroke
  
  const pathParam = `color:${strokeColor}|weight:2|fillcolor:${fillColor}|${closedPath}`;
  
  // Encode path but keep colons and commas
  const encodedPath = encodeURIComponent(pathParam)
    .replace(/%3A/g, ':')
    .replace(/%2C/g, ',');
  
  return `${url}&path=${encodedPath}`;
}

/**
 * Generate a thumbnail snapshot for property list views
 */
export function generatePropertyThumbnail(
  center: Coordinate,
  boundary: Coordinate[],
  width: number = 160,
  height: number = 96
): string {
  return generatePropertySnapshot(center, boundary, width, height, 13);
}

/**
 * Generate a thumbnail snapshot for department list views
 */
export function generateDepartmentThumbnail(
  coordinates: Coordinate[],
  width: number = 160,
  height: number = 96
): string {
  return generateDepartmentSnapshot(coordinates, width, height, 15, false);
}
