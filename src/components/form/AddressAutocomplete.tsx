import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { createAutocomplete } from '../../services/mapsService';
import FormError from './FormError';

interface AddressAutocompleteProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

export default function AddressAutocomplete({
  label,
  name,
  value,
  onChange,
  required = false,
  error
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoaded, loadError } = useGoogleMaps();

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    const instance = createAutocomplete(inputRef.current);
    if (!instance) return;

    instance.addListener('place_changed', () => {
      const place = instance.getPlace();
      if (place.formatted_address) {
        onChange(place.formatted_address);
      }
    });

    return () => {
      if (instance) {
        google.maps.event.clearInstanceListeners(instance);
      }
    };
  }, [isLoaded, onChange]);

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <MapPin size={18} />
        {label}
      </label>
      <div className="relative">
        <MapPin 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`
            w-full px-4 py-2 pl-10 border rounded-md 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? 'border-red-300' : 'border-gray-300'}
          `}
          placeholder={isLoaded ? "Start typing an address..." : "Loading address search..."}
          disabled={!isLoaded}
          autoComplete="off"
        />
      </div>
      {error && <FormError message={error} />}
      {loadError && <FormError message="Address search is currently unavailable" />}
    </div>
  );
}