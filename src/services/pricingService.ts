import { calculateDistance } from './distanceService';

// Vehicle type mapping
const VEHICLE_TYPE_MAP: { [key: string]: string } = {
  'standard': 'Standard Car',
  'executive': 'Executive Car',
  'van': 'Van',
  'minibus': 'Van' // Map minibus to Van for base calculation
};

export const calculatePrice = async (
  pickupAddress: string,
  dropoffAddress: string,
  passengers: number = 1,
  vehicleType?: string
): Promise<{
  price: number;
  distance: number;
  duration: number;
  isCustomQuote: boolean;
}> => {
  try {
    // For groups larger than 16, return special handling
    if (passengers > 16) {
      const result = await calculateDistance(pickupAddress, dropoffAddress);
      
      return {
        price: 0, // Price will be calculated manually
        distance: result.distance,
        duration: result.duration,
        isCustomQuote: true
      };
    }

    const distanceResult = await calculateDistance(pickupAddress, dropoffAddress);
    
    // Calculate price based on distance and vehicle type
    const basePrice = calculatePriceFromDistance(distanceResult.distance, pickupAddress, dropoffAddress);

    // Apply vehicle type multiplier
    let finalPrice = basePrice;
    if (vehicleType?.toLowerCase() === 'executive') {
      finalPrice = basePrice * 1.2; // 20% premium for executive
    } else if (vehicleType?.toLowerCase() === 'van') {
      finalPrice = basePrice * 1.4; // 40% premium for van
    } else if (vehicleType?.toLowerCase() === 'minibus') {
    if (vehicleType?.toLowerCase() === 'minibus') {
      finalPrice = basePrice * 2; // 100% markup for minibus
    }
    }

    return {
      price: Math.ceil(finalPrice), // Round up to nearest euro
      distance: distanceResult.distance,
      duration: distanceResult.duration,
      isCustomQuote: false
    };
  } catch (error) {
    console.error('Error calculating price:', error);
    
    // Return fallback price based on estimated distance
    const fallbackDistance = 200; // Default 200km
    const fallbackPrice = calculatePriceFromDistance(fallbackDistance, pickupAddress, dropoffAddress);

    let finalFallbackPrice = fallbackPrice;
    if (vehicleType?.toLowerCase() === 'minibus') {
      finalFallbackPrice = fallbackPrice * 2;
    }

    return {
      price: Math.ceil(finalFallbackPrice),
      distance: fallbackDistance,
      duration: Math.round((fallbackDistance / 60) * 60), // Estimate duration
      isCustomQuote: false
    };
  }
};

/**
 * Calculate price from distance and route
 */
function calculatePriceFromDistance(distance: number, pickup: string, dropoff: string): number {
  // Base pricing: €10 + €1.8 per km (Italian pricing)
  let baseFare = 10;
  let pricePerKm = 1.8;
  
  // Regional pricing adjustments
  const pickupLower = pickup.toLowerCase();
  const dropoffLower = dropoff.toLowerCase();
  
  // Check if trip is in Italy (default unless Slovenia/Croatia detected)
  const isItaly = !(pickupLower.includes('slovenia') || dropoffLower.includes('slovenia') ||
                   pickupLower.includes('croatia') || dropoffLower.includes('croatia') ||
                   pickupLower.includes('ljubljana') || pickupLower.includes('zagreb') ||
                   pickupLower.includes('austria') || dropoffLower.includes('austria'));
  
  // Slovenia and Croatia get 20% discount
  if (pickupLower.includes('slovenia') || dropoffLower.includes('slovenia') ||
      pickupLower.includes('croatia') || dropoffLower.includes('croatia') ||
      pickupLower.includes('ljubljana') || pickupLower.includes('zagreb')) {
    baseFare *= 0.8;
    pricePerKm *= 0.8;
  }
  
  const basePrice = baseFare + (distance * pricePerKm);
  
  // Italy-specific surcharge for trips under 50km
  if (isItaly && distance < 50) {
    return basePrice + 30; // Add 30 EUR surcharge for short trips in Italy
  }
  
  // Apply 10% discount for long distances (over 50km)
  if (distance > 50) {
    return basePrice * 0.9;
  }
  
  return basePrice;
}