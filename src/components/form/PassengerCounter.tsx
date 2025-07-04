import React from 'react';
import { Minus, Plus, Users } from 'lucide-react';

interface PassengerCounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function PassengerCounter({
  value,
  onChange,
  min = 1,
  max = 16
}: PassengerCounterProps) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-3">
        <Users size={18} className="text-primary-600" />
        Passengers
      </label>
      
      {/* Mobile-optimized counter */}
      <div className="flex items-center justify-center bg-neutral-50 rounded-xl p-3 sm:p-4 gap-4 sm:gap-6">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 transform active:scale-95 ${
            value <= min
              ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 shadow-sm hover:shadow-md focus:ring-2 focus:ring-primary-500/20'
          }`}
          aria-label="Decrease passengers"
        >
          <Minus size={18} />
        </button>

        <div className="text-center min-w-[60px]">
          <span className="text-2xl sm:text-3xl font-bold text-neutral-900 block">
            {value}
          </span>
          <span className="text-xs sm:text-sm text-neutral-500 block">
            {value === 1 ? 'passenger' : 'passengers'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 transform active:scale-95 ${
            value >= max
              ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 shadow-sm hover:shadow-md focus:ring-2 focus:ring-primary-500/20'
          }`}
          aria-label="Increase passengers"
        >
          <Plus size={18} />
        </button>
      </div>
      
      {/* Mobile-friendly capacity indicator */}
      <div className="mt-3 text-center">
        <div className="flex justify-center">
          <div className="bg-primary-50 rounded-full px-3 py-1">
            <span className="text-xs text-primary-700 font-medium">
              Min: {min} • Max: {max}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}