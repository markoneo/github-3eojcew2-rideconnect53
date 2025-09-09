import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, ArrowUpDown, Clock, Users, ChevronDown, Map as Swap } from 'lucide-react';
import GoogleAddressInput from '../form/GoogleAddressInput';
import Button from '../ui/Button';
import { StepOneData } from '../../types/booking';
import { calculatePrice } from '../../services/pricingService';

// Validation function to check if booking is at least 24 hours in advance
const isBookingTooSoon = (date: string, time: string): boolean => {
  if (!date || !time) return false;
  
  const now = new Date();
  const bookingDateTime = new Date(`${date}T${time}`);
  const twentyFourHoursFromNow = new Date(now.getTime() + (24 * 60 * 60 * 1000));
  
  return bookingDateTime < twentyFourHoursFromNow;
};

interface BookingStepOneProps {
  formData: StepOneData;
  onChange: (data: Partial<StepOneData>) => void;
  onNext: () => void;
}

export default function BookingStepOne({ formData, onChange, onNext }: BookingStepOneProps) {
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);
  const [shouldShowPrice, setShouldShowPrice] = useState(false);
  const [addresses, setAddresses] = useState({
    pickup: formData.pickupAddress,
    dropoff: formData.dropoffAddress
  });

  useEffect(() => {
    setAddresses({
      pickup: formData.pickupAddress,
      dropoff: formData.dropoffAddress
    });
  }, [formData.pickupAddress, formData.dropoffAddress]);

  // Check booking time validation whenever date or time changes
  useEffect(() => {
    if (formData.date && formData.time) {
      if (isBookingTooSoon(formData.date, formData.time)) {
        setTimeError('Bookings must be made at least 24 hours in advance. Please select a later date or time.');
      } else {
        setTimeError(null);
      }
    } else {
      setTimeError(null);
    }
  }, [formData.date, formData.time]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addresses.pickup || !addresses.dropoff) {
      setError('Please enter pickup and dropoff addresses');
      return;
    }
    
    // Check 24-hour rule before proceeding
    if (isBookingTooSoon(formData.date, formData.time)) {
      setTimeError('Bookings must be made at least 24 hours in advance. Please select a later date or time.');
      return;
    }
    
    onNext();
  };

  useEffect(() => {
    const getPriceEstimate = async () => {
      if (addresses.pickup && addresses.dropoff) {
        // Clear previous price and show loading state
        setIsPriceLoading(true);
        setShouldShowPrice(false);
        setError(null);
        onChange({ priceEstimate: undefined }); // Clear previous estimate
        
        try {
          const estimate = await calculatePrice(
            addresses.pickup,
            addresses.dropoff,
            formData.passengers
          );
          onChange({ priceEstimate: estimate });
          setShouldShowPrice(true);
        } catch (error) {
          console.error('Error getting price estimate:', error);
          setError('Unable to calculate price. Please check the addresses and try again.');
        } finally {
          setIsPriceLoading(false);
        }
      } else {
        // Clear price when addresses are incomplete
        setShouldShowPrice(false);
        onChange({ priceEstimate: undefined });
      }
    };

    // Debounce the price calculation to prevent too many API calls
    const timeoutId = setTimeout(getPriceEstimate, 800);
    return () => clearTimeout(timeoutId);
  }, [addresses.pickup, addresses.dropoff, formData.passengers, onChange]);

  const handleAddressChange = (type: 'pickup' | 'dropoff', value: string) => {
    setAddresses(prev => ({ ...prev, [type]: value }));
    const updateKey = type === 'pickup' ? 'pickupAddress' : 'dropoffAddress';
    onChange({ [updateKey]: value });
  };

  const handleSwapAddresses = () => {
    const newAddresses = {
      pickup: addresses.dropoff,
      dropoff: addresses.pickup
    };
    setAddresses(newAddresses);
    onChange({
      pickupAddress: newAddresses.pickup,
      dropoffAddress: newAddresses.dropoff
    });
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Get minimum date (today + 1 day to ensure 24-hour minimum)
  const getMinimumDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get minimum time for today (if today is selected)
  const getMinimumTime = () => {
    if (!formData.date) return '';
    
    const selectedDate = new Date(formData.date);
    const today = new Date();
    
    // If selected date is today, minimum time is current time + 24 hours
    if (selectedDate.toDateString() === today.toDateString()) {
      const minTime = new Date(today.getTime() + (24 * 60 * 60 * 1000));
      const hours = String(minTime.getHours()).padStart(2, '0');
      const minutes = String(minTime.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    
    return '';
  };

  // Set default values if empty
  useEffect(() => {
    if (!formData.date) {
      onChange({ date: getMinimumDate() });
    }
    if (!formData.time) {
      onChange({ time: getCurrentTime() });
    }
  }, [formData.date, formData.time, onChange]);

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-block bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          Reserve Now and Pay Later - Secure your spot while staying flexible
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
          Book Your Private Transfer
        </h1>
        <p className="text-slate-600 text-lg">
          Professional drivers, comfortable vehicles, competitive prices
        </p>
      </div>

      {/* Main Booking Form Container */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Address Fields Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative">
            {/* From Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <MapPin size={16} className="inline mr-2 text-cyan-500" />
                From
              </label>
              <div className="relative">
                <GoogleAddressInput
                  label=""
                  name="pickupAddress"
                  value={addresses.pickup}
                  onChange={(value) => handleAddressChange('pickup', value)}
                  placeholder="Airport, city, or address..."
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-0 transition-colors text-lg"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="lg:absolute lg:left-1/2 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-10 flex justify-center lg:block">
              <button
                type="button"
                onClick={handleSwapAddresses}
                className="bg-white border-2 border-gray-200 hover:border-cyan-500 hover:bg-cyan-50 p-3 rounded-full shadow-md transition-all duration-200 group"
                title="Swap addresses"
              >
                <ArrowUpDown size={20} className="text-slate-600 group-hover:text-cyan-600 transition-colors" />
              </button>
            </div>

            {/* To Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <MapPin size={16} className="inline mr-2 text-orange-500" />
                To
              </label>
              <div className="relative">
                <GoogleAddressInput
                  label=""
                  name="dropoffAddress"
                  value={addresses.dropoff}
                  onChange={(value) => handleAddressChange('dropoff', value)}
                  placeholder="Airport, city, or address..."
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-0 transition-colors text-lg"
                />
              </div>
            </div>
          </div>

          {/* Date, Time, and Passengers Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Date Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Calendar size={16} className="inline mr-2 text-cyan-500" />
                Departure Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => onChange({ date: e.target.value })}
                  min={getTodayDate()}
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-0 transition-colors text-lg"
                />
              </div>
            </div>

            {/* Time Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Clock size={16} className="inline mr-2 text-cyan-500" />
                Departure Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => onChange({ time: e.target.value })}
                  min={getMinimumTime()}
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-0 transition-colors text-lg"
                />
              </div>
            </div>

            {/* Passengers Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Users size={16} className="inline mr-2 text-cyan-500" />
                Passengers
              </label>
              <div className="relative">
                <select
                  value={formData.passengers}
                  onChange={(e) => onChange({ passengers: parseInt(e.target.value) })}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-0 transition-colors text-lg appearance-none bg-white"
                >
                  {Array.from({ length: 16 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'passenger' : 'passengers'}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
          </div>

          {/* Price Display Section */}
          {shouldShowPrice && formData.priceEstimate && !isPriceLoading && (
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Estimated Price</p>
                  <p className="text-2xl font-bold text-slate-800">
                    €{formData.priceEstimate.price}
                  </p>
                </div>
                <div className="text-right text-sm text-slate-500">
                  <p>{Math.round(formData.priceEstimate.distance)} km</p>
                  <p>~{Math.round(formData.priceEstimate.duration)} min</p>
                </div>
              </div>
            </div>
          )}

          {/* Time Restriction Error */}
          {timeError && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <p className="text-red-700 text-center font-medium">{timeError}</p>
            </div>
          )}

          {/* Loading and Error States */}
          {isPriceLoading && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 animate-pulse">
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                <span className="text-blue-700 font-medium">Calculating best price...</span>
              </div>
              <div className="mt-2 text-center">
                <div className="inline-flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <p className="text-red-700 text-center font-medium">{error}</p>
            </div>
          )}

          {/* Book Transfer Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isPriceLoading || !addresses.pickup || !addresses.dropoff || !!timeError || !shouldShowPrice}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isPriceLoading ? 'Calculating...' : 'Book Transfer'}
              <ArrowUpDown className="rotate-90" size={20} />
            </button>
          </div>

          {/* Additional Info */}
          <div className="text-center pt-4">
            <div className="inline-flex items-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Free cancellation up to 24h before pickup • Minimum 24h advance booking required</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}