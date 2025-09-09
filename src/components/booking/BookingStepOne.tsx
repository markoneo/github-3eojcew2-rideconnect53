import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, ArrowUpDown, Clock, ArrowRight } from 'lucide-react';
import GoogleAddressInput from '../form/GoogleAddressInput';
import Button from '../ui/Button';
import { StepOneData } from '../../types/booking';
import { calculatePrice } from '../../services/pricingService';
import AnimatedContainer from '../ui/AnimatedContainer';

interface BookingStepOneProps {
  formData: StepOneData;
  onChange: (data: Partial<StepOneData>) => void;
  onNext: () => void;
}

export default function BookingStepOne({ formData, onChange, onNext }: BookingStepOneProps) {
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const swapAddresses = () => {
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

  return (
    <div className="bg-slate-800 -mt-8 relative z-10">
      <div className="section-container pb-16">
        <AnimatedContainer animation="slideUp" delay={200}>
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Address Fields Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
                {/* From Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    FROM
                  </label>
                  <div className="relative">
                    <select
                      value={addresses.pickup}
                      onChange={(e) => handleAddressChange('pickup', e.target.value)}
                      className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl bg-white text-slate-700 font-medium hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none text-lg"
                    >
                      <option value="">Select pickup location</option>
                      <option value="Venice Marco Polo Airport (VCE), Venezia VE, Italy">Venice Airport (VCE)</option>
                      <option value="Cortina d'Ampezzo, BL, Italy">Cortina d'Ampezzo</option>
                      <option value="Bolzano, BZ, Italy">Bolzano</option>
                      <option value="Val Gardena, BZ, Italy">Val Gardena</option>
                      <option value="Selva di Val Gardena, BZ, Italy">Selva di Val Gardena</option>
                      <option value="Ortisei, BZ, Italy">Ortisei</option>
                      <option value="San Martino di Castrozza, TN, Italy">San Martino di Castrozza</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* To Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    TO
                  </label>
                  <div className="relative">
                    <select
                      value={addresses.dropoff}
                      onChange={(e) => handleAddressChange('dropoff', e.target.value)}
                      className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl bg-white text-slate-700 font-medium hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none text-lg"
                    >
                      <option value="">Select destination</option>
                      <option value="Cortina d'Ampezzo, BL, Italy">Cortina d'Ampezzo</option>
                      <option value="Bolzano, BZ, Italy">Bolzano</option>
                      <option value="Val Gardena, BZ, Italy">Val Gardena</option>
                      <option value="Selva di Val Gardena, BZ, Italy">Selva di Val Gardena</option>
                      <option value="Ortisei, BZ, Italy">Ortisei</option>
                      <option value="San Martino di Castrozza, TN, Italy">San Martino di Castrozza</option>
                      <option value="Venice Marco Polo Airport (VCE), Venezia VE, Italy">Venice Airport (VCE)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
                  <button
                    type="button"
                    onClick={swapAddresses}
                    className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg border-2 border-white"
                  >
                    <ArrowUpDown className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Date Field */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    WHEN
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => onChange({ date: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl bg-white text-slate-700 font-medium hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-lg"
                    placeholder="dd.mm.yyyy"
                    required
                  />
                </div>

                {/* Book Transfer Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isPriceLoading || !addresses.pickup || !addresses.dropoff}
                    className="w-full bg-cyan-400 hover:bg-cyan-500 text-slate-800 font-bold py-4 px-8 rounded-2xl transition-colors duration-200 flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Book Transfer</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Hidden Time Field for form compatibility */}
              <input
                type="hidden"
                value={formData.time || '12:00'}
                onChange={(e) => onChange({ time: e.target.value })}
              />

              {/* Error/Loading Messages */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center">
                  {error}
                </div>
              )}

              {isPriceLoading && !error && (
                <div className="bg-cyan-50 border border-cyan-200 px-4 py-3 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-cyan-600 border-t-transparent"></div>
                    <span className="text-cyan-700">Calculating prices...</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}