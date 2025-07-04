declare global {
  interface Window {
    google: any;
  }
}

interface RegionalPricing {
  baseFare: number;
  pricePerKm: number;
}

interface VehicleOption {
  name: string;
  premium: number;
  capacity: number;
}

interface PriceResult {
  vehicle: string;
  price: number;
  provider: string;
  capacity: number;
}

export class TaxiCalculator {
  private italyPricing: RegionalPricing;
  private sloveniaPricing: RegionalPricing;
  private croatiaPricing: RegionalPricing;
  private vehicleOptions: VehicleOption[] = [
    { name: 'Standard Car', premium: 1, capacity: 4 },
    { name: 'Executive Car', premium: 1.2, capacity: 3 },
    { name: 'Van', premium: 1.4, capacity: 8 }
  ];

  constructor(baseFare: number, pricePerKm: number) {
    // Set Italian prices as base
    this.italyPricing = {
      baseFare,
      pricePerKm
    };

    // Calculate Slovenia prices (20% lower)
    const slovenianDiscount = 0.8; // 20% off
    this.sloveniaPricing = {
      baseFare: baseFare * slovenianDiscount,
      pricePerKm: pricePerKm * slovenianDiscount
    };

    // Calculate Croatia prices (20% lower)
    const croatianDiscount = 0.8; // 20% off
    this.croatiaPricing = {
      baseFare: baseFare * croatianDiscount,
      pricePerKm: pricePerKm * croatianDiscount
    };
  }

  calculatePrice(distance: number, country: string, vehicleType: string = 'Standard Car'): number {
    const pricing = this.getPricingForCountry(country);
    const vehicle = this.vehicleOptions.find(v => v.name === vehicleType) || this.vehicleOptions[0];
    const basePrice = pricing.baseFare + (distance * pricing.pricePerKm);
    const priceWithVehiclePremium = basePrice * vehicle.premium;
    
    // Apply 10% discount for distances over 50km
    if (distance > 50) {
      return priceWithVehiclePremium * 0.9; // 10% discount
    }
    
    return priceWithVehiclePremium;
  }

  private getPricingForCountry(country: string): RegionalPricing {
    switch (country.toLowerCase()) {
      case 'slovenia':
        return this.sloveniaPricing;
      case 'croatia':
        return this.croatiaPricing;
      default: // Italy is default
        return this.italyPricing;
    }
  }

  getVehicleOptions(): VehicleOption[] {
    return this.vehicleOptions;
  }
}

// Initialize standard calculators with base Italian prices in euros
export const ridewaysStandard = new TaxiCalculator(10, 1.8); // €10 base, €1.8/km
export const connectoTransfersStandard = new TaxiCalculator(12, 2.2); // €12 base, €2.2/km

// Helper function to determine country from addresses
function determineCountry(pickup: string, dropoff: string): string {
  const lowerPickup = pickup.toLowerCase();
  const lowerDropoff = dropoff.toLowerCase();
  
  // Check for country names and common cities
  const slovenianKeywords = ['slovenia', 'ljubljana', 'maribor', 'koper', 'portorož', 'piran'];
  const croatianKeywords = ['croatia', 'zagreb', 'split', 'dubrovnik', 'pula', 'rijeka'];
  
  // Check if any Slovenian keywords are present
  if (slovenianKeywords.some(keyword => lowerPickup.includes(keyword) || lowerDropoff.includes(keyword))) {
    return 'slovenia';
  }
  
  // Check if any Croatian keywords are present
  if (croatianKeywords.some(keyword => lowerPickup.includes(keyword) || lowerDropoff.includes(keyword))) {
    return 'croatia';
  }
  
  // Default to Italian pricing
  return 'italy';
}

// Helper function to wait for Google Maps to load
async function waitForGoogleMaps(): Promise<void> {
  const maxAttempts = 50; // 5 seconds total
  let attempts = 0;

  while (!window.google?.maps && attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }

  if (!window.google?.maps) {
    throw new Error('Google Maps failed to load');
  }

  // Ensure the Distance Matrix Service is loaded
  await window.google.maps.importLibrary("routes");
}

// Helper function to calculate straight-line distance between coordinates
function calculateStraightLineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Helper function to get coordinates from address with retries
async function getCoordinates(address: string, retries = 3): Promise<google.maps.LatLngLiteral> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < retries; i++) {
    try {
      const geocoder = new google.maps.Geocoder();
      
      const result = await new Promise<google.maps.GeocoderResult>((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results?.[0]) {
            resolve(results[0]);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      });
      
      return {
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng()
      };
    } catch (error) {
      lastError = error as Error;
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  throw lastError || new Error(`Failed to get coordinates for ${address}`);
}

// Helper function to calculate distance between two points using Google Maps Distance Matrix
export async function calculateDistance(
  pickup: string,
  dropoff: string
): Promise<number> {
  try {
    // Wait for Google Maps to load
    await waitForGoogleMaps();
    
    const service = new window.google.maps.DistanceMatrixService();
    
    // Try Distance Matrix first
    try {
      const response = await new Promise<google.maps.DistanceMatrixResponse>((resolve, reject) => {
        service.getDistanceMatrix({
          origins: [pickup],
          destinations: [dropoff],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, (result, status) => {
          if (status === 'OK') {
            resolve(result);
          } else {
            reject(new Error(`Distance Matrix failed: ${status}`));
          }
        });
      });

      if (response.rows[0]?.elements[0]?.status === 'OK') {
        // Convert meters to kilometers
        return response.rows[0].elements[0].distance.value / 1000;
      }
    } catch (error) {
      console.warn('Distance Matrix calculation failed, falling back to straight-line distance');
    }

    // If Distance Matrix fails, try calculating straight-line distance
    console.log('Calculating straight-line distance...');
    const pickupCoords = await getCoordinates(pickup);
    const dropoffCoords = await getCoordinates(dropoff);
    
    const straightLineDistance = calculateStraightLineDistance(
      pickupCoords.lat,
      pickupCoords.lng,
      dropoffCoords.lat,
      dropoffCoords.lng
    );

    // Add 30% to straight-line distance to approximate driving distance
    return straightLineDistance * 1.3;
  } catch (error) {
    console.warn('Distance calculation failed, using estimated distance based on region');
    // If all else fails, estimate based on address analysis
    const country = determineCountry(pickup, dropoff);
    
    // Return reasonable defaults based on country and common routes
    const lowerPickup = pickup.toLowerCase();
    const lowerDropoff = dropoff.toLowerCase();
    
    // Common route distances
    if (
      (lowerPickup.includes('trieste') && lowerDropoff.includes('venice')) ||
      (lowerPickup.includes('venice') && lowerDropoff.includes('trieste'))
    ) {
      return 160; // Approximate distance between Trieste and Venice
    }
    
    if (
      (lowerPickup.includes('ljubljana') && lowerDropoff.includes('venice')) ||
      (lowerPickup.includes('venice') && lowerDropoff.includes('ljubljana'))
    ) {
      return 240; // Approximate distance between Ljubljana and Venice
    }
    
    // Default distances by country
    switch (country) {
      case 'slovenia':
        return 150; // Average cross-country distance in Slovenia
      case 'croatia':
        return 200; // Average cross-country distance in Croatia
      default:
        return 250; // Average cross-country distance in Italy
    }
  }
}

export async function calculatePrices(details: { pickup: string; dropoff: string }): Promise<{
  country: string;
  distance: number;
  prices: PriceResult[];
}> {
  try {
    const distance = await calculateDistance(details.pickup, details.dropoff);
    const country = determineCountry(details.pickup, details.dropoff);
    
    // Calculate prices for all vehicle types
    const vehicleOptions = ridewaysStandard.getVehicleOptions();
    const prices = vehicleOptions.map(vehicle => {
      const ridewaysPrice = ridewaysStandard.calculatePrice(distance, country, vehicle.name);
      const connectoPrice = connectoTransfersStandard.calculatePrice(distance, country, vehicle.name);
      
      const cheaperPrice = Math.min(ridewaysPrice, connectoPrice);
      
      return {
        vehicle: vehicle.name,
        price: Math.ceil(cheaperPrice), // Round up to nearest euro
        provider: 'RideConnect',
        capacity: vehicle.capacity
      };
    });

    return {
      country,
      distance,
      prices
    };
  } catch (error) {
    console.error('Error calculating prices:', error);
    // Return fallback prices with estimated distance
    const country = determineCountry(details.pickup, details.dropoff);
    const estimatedDistance = country === 'slovenia' ? 150 : country === 'croatia' ? 200 : 250;
    
    return {
      country,
      distance: estimatedDistance,
      prices: ridewaysStandard.getVehicleOptions().map(vehicle => ({
        vehicle: vehicle.name,
        price: Math.ceil(ridewaysStandard.calculatePrice(estimatedDistance, country, vehicle.name)),
        provider: 'RideConnect',
        capacity: vehicle.capacity
      }))
    };
  }
}