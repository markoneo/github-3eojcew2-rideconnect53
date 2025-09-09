import React, { useRef, useEffect, useState } from 'react';
import { MapPin, X, Loader2 } from 'lucide-react';
import { waitForGoogleMaps, createAutocomplete, isGoogleMapsReady } from '../../services/mapsService';
import FormError from './FormError';

interface GoogleAddressInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  className?: string;
  placeholder?: string;
}

export default function GoogleAddressInput({
  label,
  name,
  value,
  onChange,
  required = false,
  error,
  className = '',
  placeholder = 'Start typing an address...'
}: GoogleAddressInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Update input value when prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Initialize Google Maps
  useEffect(() => {
    const initGoogleMaps = async () => {
      try {
        if (isGoogleMapsReady()) {
          setIsLoaded(true);
          return;
        }

        await waitForGoogleMaps();
        setIsLoaded(true);
        setLoadError(null);
      } catch (error) {
        console.error('Failed to load Google Maps:', error);
        setLoadError('Failed to load Google Maps');
        setIsLoaded(false);
      }
    };

    initGoogleMaps();
  }, []);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current || loadError) {
      return;
    }

    try {
      const autocomplete = createAutocomplete(inputRef.current);
      
      if (!autocomplete) {
        throw new Error('Failed to create autocomplete instance');
      }

      autocompleteRef.current = autocomplete;

      // Listen for place selection
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          const address = place.formatted_address;
          setInputValue(address);
          onChange(address);
        }
      });
    } catch (error) {
      console.error('Failed to initialize Google Places Autocomplete:', error);
      setLoadError('Failed to initialize address search');
    }

    // Cleanup
    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [isLoaded, onChange, loadError]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Only update parent if user is typing (not from autocomplete)
    if (e.target === document.activeElement) {
      onChange(newValue);
    }
  };

  // Handle input blur
  const handleBlur = () => {
    // Update parent with current input value
    onChange(inputValue);
  };

  // Clear input
  const clearInput = () => {
    setInputValue('');
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={`space-y-2 w-full ${className}`}>
      <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
        <MapPin size={18} className="text-primary-600" />
        {label}
      </label>
      
      <div className="relative w-full group">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 group-hover:text-primary-500 transition-colors duration-300 pointer-events-none">
          {!isLoaded && !loadError ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <MapPin size={18} />
          )}
        </div>
        
        {/* Enhanced focus ring */}
        <div className="absolute inset-0 border border-primary-300 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
        
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required={required}
          className={`form-input pl-10 pr-10 ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
          placeholder={isLoaded ? placeholder : loadError ? 'Address search unavailable' : 'Loading address search...'}
          disabled={!isLoaded && !loadError}
          autoComplete="off"
        />
        
        {/* Clear button */}
        {inputValue && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 p-1 rounded-full hover:bg-neutral-100"
            aria-label="Clear address"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      {error && <FormError message={error} />}
      {loadError && <FormError message="Google Maps failed to load. Please refresh the page." />}
      
      {!isLoaded && !loadError && (
        <div className="text-xs text-neutral-500">Loading address autocomplete...</div>
      )}
    </div>
  );
}