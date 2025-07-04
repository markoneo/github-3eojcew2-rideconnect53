export interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon?: string;
}

export interface AddressSuggestion {
  id: string;
  label: string;
  value: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

/**
 * Nominatim API service for address autocomplete
 * Uses OpenStreetMap data - completely free and open source
 */
class NominatimService {
  private baseUrl = 'https://nominatim.openstreetmap.org';
  private cache = new Map<string, AddressSuggestion[]>();
  private abortController: AbortController | null = null;

  /**
   * Search for address suggestions
   */
  async searchAddresses(query: string): Promise<AddressSuggestion[]> {
    if (!query || query.length < 3) {
      return [];
    }

    // Check cache first
    const cacheKey = query.toLowerCase().trim();
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Cancel previous request
    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();

    try {
      const params = new URLSearchParams({
        q: query,
        format: 'json',
        limit: '8',
        addressdetails: '1',
        countrycodes: 'it,si,hr,at', // Limit to service area
        'accept-language': 'en'
      });

      const response = await fetch(`${this.baseUrl}/search?${params}`, {
        signal: this.abortController.signal,
        headers: {
          'User-Agent': 'RideConnect-Transfer-Service'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const results: NominatimResult[] = await response.json();
      
      const suggestions = results.map(result => ({
        id: result.place_id.toString(),
        label: this.formatDisplayName(result.display_name),
        value: result.display_name,
        coordinates: {
          lat: parseFloat(result.lat),
          lon: parseFloat(result.lon)
        }
      }));

      // Cache the results
      this.cache.set(cacheKey, suggestions);
      
      // Limit cache size
      if (this.cache.size > 100) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }

      return suggestions;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return [];
      }
      console.error('Nominatim search error:', error);
      return [];
    }
  }

  /**
   * Calculate distance between two coordinates
   */
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  /**
   * Format display name to be more user-friendly
   */
  private formatDisplayName(displayName: string): string {
    // Remove excessive detail and format nicely
    const parts = displayName.split(', ');
    
    // For airports and important places, keep the first part
    if (displayName.toLowerCase().includes('airport') || 
        displayName.toLowerCase().includes('aeroporto') ||
        displayName.toLowerCase().includes('letališče')) {
      return parts.slice(0, 3).join(', ');
    }
    
    // For ports
    if (displayName.toLowerCase().includes('port') || 
        displayName.toLowerCase().includes('porto')) {
      return parts.slice(0, 3).join(', ');
    }
    
    // For general addresses, show first 2-3 relevant parts
    return parts.slice(0, Math.min(3, parts.length)).join(', ');
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

export const nominatimService = new NominatimService();