interface Window {
  google: {
    maps: {
      importLibrary: (library: string) => Promise<any>;
      places: {
        Autocomplete: new (
          input: HTMLInputElement,
          options?: google.maps.places.AutocompleteOptions
        ) => google.maps.places.Autocomplete;
        PlacesService: new (
          attrContainer: HTMLDivElement | google.maps.Map
        ) => google.maps.places.PlacesService;
        PlacesServiceStatus: {
          OK: string;
          ZERO_RESULTS: string;
          OVER_QUERY_LIMIT: string;
          REQUEST_DENIED: string;
          INVALID_REQUEST: string;
          NOT_FOUND: string;
        };
      };
      DistanceMatrixService: new () => google.maps.DistanceMatrixService;
      DistanceMatrixStatus: {
        OK: string;
        INVALID_REQUEST: string;
        OVER_QUERY_LIMIT: string;
        REQUEST_DENIED: string;
        UNKNOWN_ERROR: string;
      };
      DistanceMatrixElementStatus: {
        OK: string;
        NOT_FOUND: string;
        ZERO_RESULTS: string;
        MAX_ROUTE_LENGTH_EXCEEDED: string;
      };
      TravelMode: {
        DRIVING: google.maps.TravelMode;
        WALKING: google.maps.TravelMode;
        BICYCLING: google.maps.TravelMode;
        TRANSIT: google.maps.TravelMode;
      };
      UnitSystem: {
        METRIC: google.maps.UnitSystem;
        IMPERIAL: google.maps.UnitSystem;
      };
      event: {
        clearInstanceListeners: (instance: any) => void;
      };
    };
  };
  googleMapsLoaded?: boolean;
  initGoogleMaps?: () => void;
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}

declare namespace google.maps {
  interface DistanceMatrixService {
    getDistanceMatrix(
      request: DistanceMatrixRequest,
      callback: (
        response: DistanceMatrixResponse | null,
        status: DistanceMatrixStatus
      ) => void
    ): void;
  }
}