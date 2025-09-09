import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, ArrowUpDown, Clock, Ban, ChevronDown, User } from 'lucide-react';
import GoogleAddressInput from '../form/GoogleAddressInput';
import FormInput from '../form/FormInput';
import Button from '../ui/Button';
import { StepOneData } from '../../types/booking';
import { calculatePrice } from '../../services/pricingService';

interface BookingStepOneProps {
  formData: StepOneData;
  onChange: (data: Partial<StepOneData>) => void;
  onNext: () => void;
}

export default function BookingStepOne({ formData, onChange, onNext }: BookingStepOneProps) {
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serviceClass, setServiceClass] = useState('Economy');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addresses.pickup || !addresses.dropoff) {
      setError('Please enter pickup and dropoff addresses');
      return;
    }
    onNext();
  };

  useEffect(() => {
    const getPriceEstimate = async () => {
      if (addresses.pickup && addresses.dropoff) {
        setIsPriceLoading(true);
        setError(null);
        try {
          const estimate = await calculatePrice(
            addresses.pickup,
            addresses.dropoff,
            formData.passengers
          );
          onChange({ priceEstimate: estimate });
        } catch (error) {
          console.error('Error getting price estimate:', error);
          setError('Unable to calculate price. Please check the addresses and try again.');
        } finally {
          setIsPriceLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(getPriceEstimate, 1000);
    return () => clearTimeout(timeoutId);
  }, [addresses.pickup, addresses.dropoff, formData.passengers, onChange]);

  const handleAddressChange = (type: 'pickup' | 'dropoff', value: string) => {
    setAddresses(prev => ({ ...prev, [type]: value }));
    const updateKey = type === 'pickup' ? 'pickupAddress' : 'dropoffAddress';
    onChange({ [updateKey]: value });
  };

  const serviceClasses = ['Economy', 'Business', 'Premium'];

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Class and Passenger Selection Row */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Service Class Dropdown */}
          <div className="relative">
            <select
              value={serviceClass}
              onChange={(e) => setServiceClass(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 font-medium hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {serviceClasses.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Passenger Selection */}
          <div className="relative">
            <select
              value={formData.passengers}
              onChange={(e) => onChange({ passengers: parseInt(e.target.value) })}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 font-medium hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Array.from({ length: 16 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Passenger' : 'Passengers'}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        {/* Main Booking Form - Horizontal Layout */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            {/* From Field */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <div className="relative">
                <GoogleAddressInput
                  label=""
                  name="pickupAddress"
                  value={addresses.pickup}
                  onChange={(e) => handleAddressChange('pickup', e.target.value)}
                  placeholder="City, airport or place"
                  required
                />
              </div>
            </div>

            {/* To Field */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <div className="relative">
                <GoogleAddressInput
                  label=""
                  name="dropoffAddress"
                  value={addresses.dropoff}
                  onChange={(e) => handleAddressChange('dropoff', e.target.value)}
                  placeholder="City, airport or place"
                  required
                />
              </div>
            </div>

            {/* Date Field */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                DATE
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => onChange({ date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                required
              />
            </div>

            {/* Time Field */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TIME
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => onChange({ time: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                required
              />
            </div>

            {/* Explore Button */}
            <div className="flex-shrink-0 lg:ml-4">
              <Button 
                type="submit" 
                className="w-full lg:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Explore
              </Button>
            </div>
          </div>

          {/* Free Cancellation Notice */}
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Free cancellation up to 24h before pickup</span>
          </div>
        </div>
        
        {/* Error/Loading Messages */}
        <div className="text-center">
          {error && (
            <div className="inline-block p-4 bg-red-50 rounded-lg text-red-600 border border-red-200">
              {error}
            </div>
          )}

          {isPriceLoading && !error && (
            <div className="inline-block p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                <span className="text-blue-700">Calculating prices...</span>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}