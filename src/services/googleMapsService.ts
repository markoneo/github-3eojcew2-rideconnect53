/**
 * Google Maps Places API service for address autocomplete
 */
class GoogleMapsService {
  private isLoaded = false;
  private loadingPromise: Promise<void> | null = null;

  /**
   * Wait for Google Maps API to load
   */
  async waitForLoad(): Promise<void> {
    if (this.isLoaded) {
      return Promise.resolve();
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise((resolve, reject) => {
      // Check if already loaded
      if (window.google?.maps?.places) {
        this.isLoaded = true;
        resolve();
        return;
      }

      // Listen for the load event
      const handleLoad = () => {
        if (window.google?.maps?.places) {
          this.isLoaded = true;
          window.removeEventListener('google-maps-loaded', handleLoad);
          resolve();
        }
      };

      window.addEventListener('google-maps-loaded', handleLoad);

      // Timeout after 10 seconds
      setTimeout(() => {
        window.removeEventListener('google-maps-loaded', handleLoad);
        reject(new Error('Google Maps API failed to load within 10 seconds'));
      }, 10000);
    });

    return this.loadingPromise;
  }

  /**
   * Create Google Places Autocomplete instance
   */
  async createAutocomplete(
    input: HTMLInputElement,
    options: google.maps.places.AutocompleteOptions = {}
  ): Promise<google.maps.places.Autocomplete> {
    await this.waitForLoad();

    const defaultOptions: google.maps.places.AutocompleteOptions = {
      componentRestrictions: { country: ['it', 'si', 'hr', 'at'] }, // Italy, Slovenia, Croatia, Austria
      fields: ['formatted_address', 'geometry', 'name', 'place_id', 'types'],
      types: ['establishment', 'geocode'] // Include airports, cities, addresses
    };

    const autocomplete = new google.maps.places.Autocomplete(input, {
      ...defaultOptions,
      ...options
    });

    return autocomplete;
  }

  /**
   * Get place details from place ID
   */
  async getPlaceDetails(placeId: string): Promise<google.maps.places.PlaceResult> {
    await this.waitForLoad();

    const service = new google.maps.places.PlacesService(document.createElement('div'));

    return new Promise((resolve, reject) => {
      service.getDetails(
        {
          placeId,
          fields: ['formatted_address', 'geometry', 'name', 'place_id', 'types']
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            resolve(place);
          } else {
            reject(new Error(`Place details request failed: ${status}`));
          }
        }
      );
    });
  }

  /**
   * Calculate distance between two addresses using Google Maps Distance Matrix
   */
  async calculateDistance(
    origin: string,
    destination: string
  ): Promise<{ distance: number; duration: number }> {
    await this.waitForLoad();

    const service = new google.maps.DistanceMatrixService();

    return new Promise((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        },
        (response, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK && response) {
            const element = response.rows[0]?.elements[0];
            if (element?.status === google.maps.DistanceMatrixElementStatus.OK) {
              resolve({
                distance: element.distance.value / 1000, // Convert to kilometers
                duration: element.duration.value / 60 // Convert to minutes
              });
            } else {
              reject(new Error(`Distance calculation failed: ${element?.status}`));
            }
          } else {
            reject(new Error(`Distance Matrix request failed: ${status}`));
          }
        }
      );
    });
  }

  /**
   * Check if Google Maps is loaded
   */
  isGoogleMapsLoaded(): boolean {
    return this.isLoaded && !!window.google?.maps?.places;
  }
}

export const googleMapsService = new GoogleMapsService();