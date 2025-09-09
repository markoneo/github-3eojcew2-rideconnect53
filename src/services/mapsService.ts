/**
 * Google Maps service for address autocomplete and distance calculations
 */

declare global {
  interface Window {
    google: any;
    googleMapsLoaded?: boolean;
  }
}

/**
 * Wait for Google Maps API to load
 */
export const waitForGoogleMaps = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if Google Maps is already loaded
    if (window.google?.maps?.places) {
      resolve();
      return;
    }

    // Listen for the load event
    const handleLoad = () => {
      if (window.google?.maps?.places) {
        window.removeEventListener('google-maps-loaded', handleLoad);
        resolve();
      }
    };

    window.addEventListener('google-maps-loaded', handleLoad);

    // Set a timeout to reject if it takes too long
    setTimeout(() => {
      window.removeEventListener('google-maps-loaded', handleLoad);
      reject(new Error('Google Maps API failed to load'));
    }, 10000);
  });
};

/**
 * Create Google Places Autocomplete instance
 */
export const createAutocomplete = (input: HTMLInputElement): google.maps.places.Autocomplete | null => {
  if (!window.google?.maps?.places?.Autocomplete) {
    console.error('Google Maps Places API not loaded');
    return null;
  }

  try {
    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: ['it', 'si', 'hr', 'at'] }, // Italy, Slovenia, Croatia, Austria
      fields: ['formatted_address', 'geometry', 'name', 'place_id', 'types'],
      types: ['establishment', 'geocode'] // Include airports, cities, addresses
    });

    return autocomplete;
  } catch (error) {
    console.error('Failed to create Google Places Autocomplete:', error);
    return null;
  }
};

/**
 * Calculate distance between two addresses using Google Maps Distance Matrix
 */
export const calculateDistanceWithGoogle = (
  origin: string,
  destination: string
): Promise<{ distance: number; duration: number }> => {
  return new Promise((resolve, reject) => {
    if (!window.google?.maps?.DistanceMatrixService) {
      reject(new Error('Google Maps Distance Matrix service not available'));
      return;
    }

    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, (response, status) => {
      if (status === 'OK' && response?.rows[0]?.elements[0]?.status === 'OK') {
        const element = response.rows[0].elements[0];
        resolve({
          distance: element.distance.value / 1000, // Convert to kilometers
          duration: element.duration.value / 60 // Convert to minutes
        });
      } else {
        reject(new Error(`Distance calculation failed: ${status}`));
      }
    });
  });
};

/**
 * Check if Google Maps API is loaded and ready
 */
export const isGoogleMapsReady = (): boolean => {
  return !!(window.google?.maps?.places?.Autocomplete);
};