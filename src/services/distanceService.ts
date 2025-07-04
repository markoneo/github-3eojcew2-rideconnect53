import { nominatimService } from './nominatimService';

export interface DistanceResult {
  distance: number; // in kilometers
  duration: number; // estimated duration in minutes
}

/**
 * Calculate distance and estimated travel time between two addresses
 * Uses OpenStreetMap/Nominatim for geocoding
 */
export async function calculateDistance(
  pickup: string,
  dropoff: string
): Promise<DistanceResult> {
  try {
    // Get coordinates for both addresses
    const [pickupResults, dropoffResults] = await Promise.all([
      nominatimService.searchAddresses(pickup),
      nominatimService.searchAddresses(dropoff)
    ]);

    if (pickupResults.length === 0) {
      throw new Error(`Could not find coordinates for pickup address: ${pickup}`);
    }

    if (dropoffResults.length === 0) {
      throw new Error(`Could not find coordinates for dropoff address: ${dropoff}`);
    }

    // Use the first (most relevant) result for each
    const pickupCoords = pickupResults[0].coordinates;
    const dropoffCoords = dropoffResults[0].coordinates;

    // Calculate straight-line distance
    const straightLineDistance = nominatimService.calculateDistance(
      pickupCoords.lat,
      pickupCoords.lon,
      dropoffCoords.lat,
      dropoffCoords.lon
    );

    // Estimate driving distance (add 30% to account for roads)
    const drivingDistance = straightLineDistance * 1.3;

    // Estimate duration (assume average speed of 60 km/h)
    const estimatedDuration = (drivingDistance / 60) * 60; // in minutes

    return {
      distance: Math.round(drivingDistance * 10) / 10, // Round to 1 decimal
      duration: Math.round(estimatedDuration)
    };
  } catch (error) {
    console.error('Error calculating distance:', error);
    
    // Fallback: estimate based on common routes
    const fallbackDistance = estimateDistanceFromAddresses(pickup, dropoff);
    
    return {
      distance: fallbackDistance,
      duration: Math.round((fallbackDistance / 60) * 60) // Assume 60 km/h average speed
    };
  }
}

/**
 * Fallback distance estimation based on common routes and keywords
 */
function estimateDistanceFromAddresses(pickup: string, dropoff: string): number {
  const pickupLower = pickup.toLowerCase();
  const dropoffLower = dropoff.toLowerCase();

  // Common route distances (approximate)
  const routes = [
    {
      keywords: [['trieste', 'venice'], ['venice', 'trieste']],
      distance: 160
    },
    {
      keywords: [['ljubljana', 'venice'], ['venice', 'ljubljana']],
      distance: 240
    },
    {
      keywords: [['zagreb', 'venice'], ['venice', 'zagreb']],
      distance: 380
    },
    {
      keywords: [['trieste', 'ljubljana'], ['ljubljana', 'trieste']],
      distance: 120
    },
    {
      keywords: [['split', 'zagreb'], ['zagreb', 'split']],
      distance: 380
    }
  ];

  // Check for matching routes
  for (const route of routes) {
    for (const [keyword1, keyword2] of route.keywords) {
      if ((pickupLower.includes(keyword1) && dropoffLower.includes(keyword2)) ||
          (pickupLower.includes(keyword2) && dropoffLower.includes(keyword1))) {
        return route.distance;
      }
    }
  }

  // Country-based estimates
  const countries = {
    slovenia: 150,
    croatia: 200,
    italy: 250,
    austria: 180
  };

  for (const [country, distance] of Object.entries(countries)) {
    if (pickupLower.includes(country) || dropoffLower.includes(country)) {
      return distance;
    }
  }

  // Default estimate
  return 200;
}