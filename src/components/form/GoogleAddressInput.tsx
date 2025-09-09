import React, { useRef, useEffect, useState } from 'react';
import { MapPin, X, Loader2 } from 'lucide-react';
import { waitForGoogleMaps, createAutocomplete, isGoogleMapsReady } from '../../services/mapsService';
import FormError from './FormError';

interface GoogleAddressInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string, isConfirmed?: boolean) => void;
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
        
        // Get the best available address representation
        let selectedAddress = '';
        if (place.formatted_address) {
          selectedAddress = place.formatted_address;
        } else if (place.name) {
          // Fallback to place name if formatted_address is not available
          selectedAddress = place.name;
        } else {
          // Last resort: get the input value
          selectedAddress = inputRef.current?.value || '';
        }
        
        if (selectedAddress) {
          // Use setTimeout to ensure the autocomplete has finished updating
          setTimeout(() => {
            setInputValue(selectedAddress);
            onChange(selectedAddress, true); // Mark as confirmed when selected from autocomplete
            
            // Force update the input field to ensure it shows the correct value
            if (inputRef.current) {
              inputRef.current.value = selectedAddress;
            }
          }, 0);
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
    
    // Update parent but mark as not confirmed (user is typing)
    onChange(newValue, false);
  };

  // Handle input blur
  const handleBlur = () => {
    // Sync the input value with our state
    if (inputRef.current) {
      const actualInputValue = inputRef.current.value;
      if (actualInputValue !== inputValue) {
        setInputValue(actualInputValue);
        onChange(actualInputValue, false);
      }
    }
  };
  
  // Handle input focus to ensure sync
  const handleFocus = () => {
    if (inputRef.current) {
      const actualInputValue = inputRef.current.value;
      if (actualInputValue !== inputValue) {
        setInputValue(actualInputValue);
        onChange(actualInputValue, false);
      }
    }
  };

  // Clear input
  const clearInput = () => {
    setInputValue('');
    onChange('', false);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <div className={`space-y-2 w-full ${className}`}>
      {label && (
        <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
          <MapPin size={18} className="text-primary-600" />
          {label}
        </label>
      )}
      
      <div className="relative w-full">        
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          required={required}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''} ${className}`}
          placeholder={isLoaded ? placeholder : loadError ? 'Address search unavailable' : 'Loading address search...'}
          disabled={!isLoaded && !loadError}
          autoComplete="off"
        />
        
        {/* Clear button */}
        {inputValue && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
            aria-label="Clear address"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      {error && <FormError message={error} />}
      {loadError && <FormError message="Address search temporarily unavailable. You can still enter addresses manually." />}
      
      {!isLoaded && !loadError && (
        <div className="text-xs text-gray-500">Loading address autocomplete...</div>
      )}
    </div>
  );
}