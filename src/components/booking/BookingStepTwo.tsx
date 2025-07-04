import React, { useState, useEffect, useRef } from 'react';
import { Users, Mail, Phone, User, MessageSquare, CheckCircle, X, UserCheck, Award, Droplets, Home, Calendar, Clock, DollarSign, FileText, Car, Info, Check } from 'lucide-react';
import FormInput from '../form/FormInput';
import Button from '../ui/Button';
import { StepTwoData } from '../../types/booking';
import LocationSummary from './LocationSummary';
import BookingConfirmation from './BookingConfirmation';
import { calculatePrice } from '../../services/pricingService';
import LoadingSkeleton from '../ui/LoadingSkeleton';
import AnimatedContainer from '../ui/AnimatedContainer';

interface BookingStepTwoProps {
  formData: StepTwoData;
  locationData: {
    pickupAddress: string;
    dropoffAddress: string;
    date: string;
    time: string;
    priceEstimate?: {
      price: number;
      distance: number;
      duration: number;
      isCustomQuote: boolean;
    };
  };
  passengers: number;
  onChange: (data: Partial<StepTwoData>) => void;
  onSubmit: () => Promise<void>;
  onBack: () => void;
  onReset?: () => void;
}

export default function BookingStepTwo({ 
  formData, 
  locationData,
  passengers,
  onChange, 
  onSubmit,
  onBack,
  onReset
}: BookingStepTwoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [vehiclePrices, setVehiclePrices] = useState<{[key: string]: number}>({});
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState('');
  
  const vehicles = [
    {
      type: 'standard',
      name: 'Standard Car',
      image: 'https://i.postimg.cc/13TZCwmp/Skoda-Octavia-PNG-Transparent-1775970813.png',
      maxPassengers: 4,
      features: ['Meet & Greet', 'Flight monitoring', '60min free waiting', 'Professional driver']
    },
    {
      type: 'executive',
      name: 'Executive Car',
      image: 'https://i.postimg.cc/4dRRZGhy/executive-car.png',
      maxPassengers: 3,
      features: ['Meet & Greet', 'Flight monitoring', '60min free waiting', 'Professional driver', 'Complimentary water']
    },
    {
      type: 'van',
      name: 'Van',
      image: 'https://i.postimg.cc/y8WHyvH1/opel-vivaro-ready-2831090158.png',
      maxPassengers: 8,
      features: ['Meet & Greet', 'Flight monitoring', '60min free waiting', 'Professional driver', 'Extra luggage space']
    },
    {
      type: 'minibus',
      name: 'Minibus',
      image: 'https://i.postimg.cc/DzX3t00R/979f86245703bdf377eeb76804c724e5-996114475-1.png',
      maxPassengers: 16,
      features: ['Meet & Greet', 'Flight monitoring', '60min free waiting', 'Professional driver', 'Group transport']
    }
  ];

  useEffect(() => {
    const calculatePrices = async () => {
      setIsLoadingPrices(true);
      const prices: {[key: string]: number} = {};
      
      for (const vehicle of vehicles) {
        try {
          const price = await calculatePrice(
            locationData.pickupAddress,
            locationData.dropoffAddress,
            passengers,
            vehicle.type
          );
          prices[vehicle.type] = price.price;
        } catch (error) {
          console.error(`Error calculating price for ${vehicle.type}:`, error);
          prices[vehicle.type] = 0;
        }
      }
      
      setVehiclePrices(prices);
      setIsLoadingPrices(false);
    };

    if (locationData.pickupAddress && locationData.dropoffAddress) {
      calculatePrices();
    }
  }, [locationData.pickupAddress, locationData.dropoffAddress, passengers]);

  const generateOrderNumber = () => {
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `RC-${timestamp}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    
    if (!formData.vehicleType) {
      setError('Please select a vehicle type');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit();
      const newOrderNumber = generateOrderNumber();
      setOrderNumber(newOrderNumber);
      setIsSubmitting(false);
      setShowSuccess(true);
    } catch (error) {
      setIsSubmitting(false);
      setError('There was an error submitting your booking. Please try again.');
      console.error('Booking error:', error);
    }
  };

  const handleHomeClick = () => {
    setShowSuccess(false);
    if (onReset) {
      onReset();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseConfirmation = () => {
    setShowSuccess(false);
  };

  const getBookingData = () => {
    return {
      ...formData,
      pickupAddress: locationData.pickupAddress,
      dropoffAddress: locationData.dropoffAddress,
      date: locationData.date,
      time: locationData.time,
      passengers,
      priceEstimate: {
        price: vehiclePrices[formData.vehicleType] || 0,
        distance: 0,
        duration: 0,
        isCustomQuote: false
      }
    };
  };

  if (showSuccess) {
    return (
      <BookingConfirmation
        bookingData={getBookingData()}
        orderNumber={orderNumber}
        onClose={handleCloseConfirmation}
        onReturnHome={handleHomeClick}
      />
    );
  }

  if (isSubmitting) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <AnimatedContainer animation="scaleIn">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm mx-auto">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-lg font-semibold text-neutral-900">Processing Your Booking</p>
            <p className="text-neutral-600 mt-2">Please wait while we submit your request...</p>
          </div>
        </AnimatedContainer>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <AnimatedContainer animation="slideUp">
        <h2 className="section-title">Complete Your Booking</h2>
      </AnimatedContainer>

      <AnimatedContainer animation="slideUp" delay={100}>
        <LocationSummary
          pickupAddress={locationData.pickupAddress}
          dropoffAddress={locationData.dropoffAddress}
          onReset={onReset || (() => {})}
        />
      </AnimatedContainer>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vehicle Selection */}
        <AnimatedContainer animation="slideUp" delay={200}>
          <div className="form-container">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Select Your Vehicle</h3>
            
            {isLoadingPrices ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vehicles.map((_, index) => (
                  <div key={index} className="card p-4">
                    <LoadingSkeleton variant="rectangular" height="120px" className="mb-4" />
                    <LoadingSkeleton variant="text" lines={2} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vehicles.map((vehicle, index) => {
                  const isDisabled = passengers > vehicle.maxPassengers;
                  const isSelected = formData.vehicleType === vehicle.type;
                  const price = vehiclePrices[vehicle.type];
                  
                  return (
                    <AnimatedContainer key={vehicle.type} animation="scaleIn" delay={index * 100}>
                      <button
                        onClick={() => !isDisabled && onChange({ vehicleType: vehicle.type })}
                        disabled={isDisabled}
                        className={`
                          relative flex flex-col text-left w-full h-full 
                          bg-white rounded-xl overflow-hidden p-4
                          transition-all duration-300 transform
                          border-2 shadow-md hover:shadow-lg active:scale-[0.98]
                          ${isDisabled ? 'opacity-50 cursor-not-allowed bg-neutral-50' : 'hover:border-primary-300 hover:-translate-y-1'}
                          ${isSelected ? 'border-primary-500 bg-primary-50' : 'border-neutral-200'}
                        `}
                        type="button"
                      >
                        {/* Vehicle Image */}
                        <div className="w-full h-24 bg-neutral-50 rounded-lg flex items-center justify-center mb-3">
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="max-h-20 max-w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Vehicle Info */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-neutral-900 text-sm">{vehicle.name}</h4>
                              <p className="text-xs text-neutral-600">
                                Up to {vehicle.maxPassengers} passengers
                              </p>
                            </div>
                            {!isDisabled && price && (
                              <div className="text-right">
                                <span className="text-lg font-bold text-primary-600">€{price}</span>
                              </div>
                            )}
                          </div>
                          
                          {isDisabled ? (
                            <p className="text-xs text-red-500 bg-red-50 p-2 rounded-md">
                              Not available for {passengers} passengers
                            </p>
                          ) : (
                            <div className="space-y-1">
                              {vehicle.features.slice(0, 3).map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-1 text-xs text-neutral-600">
                                  <Check size={12} className="text-secondary-500" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Selection Indicator */}
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    </AnimatedContainer>
                  );
                })}
              </div>
            )}
            
            {error && (
              <div className="text-red-500 text-sm text-center mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                {error}
              </div>
            )}
          </div>
        </AnimatedContainer>

        {/* Contact Information */}
        <AnimatedContainer animation="slideUp" delay={300}>
          <div className="form-container">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Contact Information</h3>
            
            <div className="space-y-4">
              <FormInput
                label="Full Name"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => onChange({ fullName: e.target.value })}
                required
                icon={User}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => onChange({ phone: e.target.value })}
                  required
                  icon={Phone}
                />

                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => onChange({ email: e.target.value })}
                  required
                  icon={Mail}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                  <MessageSquare size={18} className="text-primary-600" />
                  Special Requirements (Optional)
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => onChange({ specialRequests: e.target.value })}
                  rows={3}
                  className="form-input"
                  placeholder="Examples: Child seat needed, extra luggage space, etc."
                />
              </div>
            </div>
          </div>
        </AnimatedContainer>

        {/* Submit Buttons */}
        <AnimatedContainer animation="slideUp" delay={400}>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="secondary"
              onClick={onBack}
              type="button"
              className="w-full sm:w-auto sm:flex-1"
              disabled={isSubmitting}
            >
              ← Back
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-auto sm:flex-1"
              disabled={isSubmitting || !formData.vehicleType}
            >
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
            </Button>
          </div>
        </AnimatedContainer>
      </form>
    </div>
  );
}