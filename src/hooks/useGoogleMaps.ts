import { useState, useEffect } from 'react';
import { googleMapsService } from '../services/googleMapsService';

export interface UseGoogleMapsResult {
  isLoaded: boolean;
  loadError: string | null;
}

/**
 * Hook to manage Google Maps API loading state
 */
export const useGoogleMaps = (): UseGoogleMapsResult => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        // Check if already loaded
        if (googleMapsService.isGoogleMapsLoaded()) {
          setIsLoaded(true);
          return;
        }

        // Wait for Google Maps to load
        await googleMapsService.waitForLoad();
        setIsLoaded(true);
        setLoadError(null);
      } catch (error) {
        console.error('Failed to load Google Maps:', error);
        setLoadError(error instanceof Error ? error.message : 'Failed to load Google Maps');
        setIsLoaded(false);
      }
    };

    loadGoogleMaps();
  }, []);

  return { isLoaded, loadError };
};