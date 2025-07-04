import React from 'react';
import { Check } from 'lucide-react';

interface VehicleOption {
  type: 'standard' | 'executive' | 'van' | 'minibus';
  name: string;
  image: string;
  maxPassengers: number;
}

const vehicles: VehicleOption[] = [
  {
    type: 'standard',
    name: 'Standard',
    image: 'https://imagedelivery.net/9dYZtR9yV_EhgbKhN9AJFw/e8c0c5c9-c2c4-4f7d-4c7c-c0f4c6a5c800/public',
    maxPassengers: 4
  },
  {
    type: 'executive',
    name: 'Executive',
    image: 'https://imagedelivery.net/9dYZtR9yV_EhgbKhN9AJFw/c8c0c5c9-c2c4-4f7d-4c7c-c0f4c6a5c900/public',
    maxPassengers: 3
  },
  {
    type: 'van',
    name: 'Van',
    image: 'https://imagedelivery.net/9dYZtR9yV_EhgbKhN9AJFw/b8c0c5c9-c2c4-4f7d-4c7c-c0f4c6a5d000/public',
    maxPassengers: 8
  },
  {
    type: 'minibus',
    name: 'Minibus',
    image: 'https://imagedelivery.net/9dYZtR9yV_EhgbKhN9AJFw/a8c0c5c9-c2c4-4f7d-4c7c-c0f4c6a5d100/public',
    maxPassengers: 16
  }
];

interface VehicleSelectionProps {
  value: string;
  onChange: (type: 'standard' | 'executive' | 'van' | 'minibus') => void;
  passengers: number;
}

export default function VehicleSelection({ value, onChange, passengers }: VehicleSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {vehicles.map((vehicle) => {
        const isDisabled = passengers > vehicle.maxPassengers;
        const isSelected = value === vehicle.type;
        
        return (
          <button
            key={vehicle.type}
            onClick={() => !isDisabled && onChange(vehicle.type)}
            disabled={isDisabled}
            className={`
              relative flex items-center gap-4 p-4 rounded-lg border-2 text-left
              transition-all duration-200
              ${isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:border-blue-300'}
              ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
            `}
          >
            <div className="w-24 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{vehicle.name}</h4>
              {isDisabled && (
                <p className="text-xs text-red-500 mt-1">
                  Not available for {passengers} passengers
                </p>
              )}
            </div>
            {isSelected && (
              <div className="absolute top-2 right-2">
                <Check className="w-5 h-5 text-blue-500" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}