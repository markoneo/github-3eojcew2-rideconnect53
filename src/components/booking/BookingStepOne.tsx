import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, ArrowUpDown, Clock, Ban } from 'lucide-react';
import AddressInput from '../form/AddressInput';
import FormInput from '../form/FormInput';
import Button from '../ui/Button';
import { StepOneData } from '../../types/booking';
import { calculatePrice } from '../../services/pricingService';
import PassengerCounter from '../form/PassengerCounter';

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
    onChange({ [`${type}Address`]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-container">
          <div className="relative">
            <AddressInput
              label="From (airport, port, address)"
              name="pickupAddress"
              value={addresses.pickup}
              onChange={(value) => handleAddressChange('pickup', value)}
              required
              className="mb-4"
            />
            
            <AddressInput
              label="To (airport, port, address)"
              name="dropoffAddress"
              value={addresses.dropoff}
              onChange={(value) => handleAddressChange('dropoff', value)}
              required
            />
            
            <button
              type="button"
              onClick={() => {
                const temp = addresses.pickup;
                handleAddressChange('pickup', addresses.dropoff);
                handleAddressChange('dropoff', temp);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-neutral-100 transition-colors focus-ring"
              aria-label="Swap addresses"
            >
              <ArrowUpDown className="w-5 h-5 text-neutral-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-container">
            <FormInput
              label="Select Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={(e) => onChange({ date: e.target.value })}
              required
              icon={Calendar}
              className="w-full"
            />
          </div>

          <div className="form-container">
            <FormInput
              label="Select Time"
              name="time"
              type="time"
              value={formData.time}
              onChange={(e) => onChange({ time: e.target.value })}
              required
              icon={Clock}
              className="w-full"
            />
          </div>
        </div>

        <div className="form-container">
          <PassengerCounter
            value={formData.passengers}
            onChange={(value) => onChange({ passengers: value })}
          />
          <div className="mt-4 flex items-center gap-2 text-sm text-neutral-600 border-t border-neutral-100 pt-4">
            <Ban className="w-4 h-4 text-secondary-500" />
            <span>Free cancellation up to 24h before pickup</span>
          </div>
        </div>
        
        {/* Fixed height container for loading/error messages */}
        <div className="h-16">
          {error && (
            <div className="text-center p-4 bg-red-50 rounded-lg text-red-600 border border-red-200">
              {error}
            </div>
          )}

          {isPriceLoading && (
            <div className="text-center p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="animate-pulse text-neutral-600">Calculating prices...</div>
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          className="btn-primary w-full py-4 text-lg"
        >
          Continue
        </Button>
      </form>
    </div>
  );
}