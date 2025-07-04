import React, { useState } from 'react';
import { MapPin, Star, Shield, Clock, ExternalLink, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import Button from '../ui/Button';
import VehicleSlider from './VehicleSlider';
import TransferForm from './TransferForm';
import { sendTransferBookingEmail } from '../../services/emailService';

const TRIESTE_PORT = 'Port of Trieste, Punto Franco Vecchio, 34135 Trieste TS, Italy';
const VENICE_AIRPORT = 'Venice Marco Polo Airport, Via Galileo Galilei, 30173 Venezia VE, Italy';

const VEHICLE_OPTIONS = [
  { 
    type: 'standard', 
    name: 'Standard Car', 
    price: 240, 
    maxPassengers: 3,
    image: 'https://i.postimg.cc/13TZCwmp/Skoda-Octavia-PNG-Transparent-1775970813.png',
    paymentLink: 'https://buy.stripe.com/9AQ9DW7yr09Nh0IfZj'
  },
  { 
    type: 'executive', 
    name: 'Executive Car', 
    price: 290, 
    maxPassengers: 3,
    image: 'https://i.postimg.cc/4dRRZGhy/executive-car.png',
    paymentLink: 'https://buy.stripe.com/eVa9DW2e73lZaCk5kG'
  },
  { 
    type: 'van', 
    name: 'Van', 
    price: 380, 
    maxPassengers: 8,
    image: 'https://i.postimg.cc/y8WHyvH1/opel-vivaro-ready-2831090158.png',
    paymentLink: 'https://buy.stripe.com/3cs6rK05Z9Kn4dW4gD'
  },
  { 
    type: 'minibus', 
    name: 'Minibus', 
    price: 650, 
    maxPassengers: 16,
    image: 'https://i.postimg.cc/DzX3t00R/979f86245703bdf377eeb76804c724e5-996114475-1.png',
    paymentLink: 'https://buy.stripe.com/00gcQ89Gzg8LbGobJ6'
  }
];

export default function TriesteVeniceTransfer() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState({
    pickup: TRIESTE_PORT,
    dropoff: VENICE_AIRPORT
  });

  const handleQuickBook = (vehicleType: string) => {
    setSelectedVehicle(vehicleType);
    setShowBookingForm(true);
  };

  const handleSwapLocations = () => {
    setSelectedRoute(prev => ({
      pickup: prev.dropoff,
      dropoff: prev.pickup
    }));
  };

  const handleBookingSubmit = async (formData: { 
    date: string; 
    time: string;
    name: string;
    email: string;
    phone: string;
    specialRequirements: string;
  }) => {
    if (!selectedVehicle) {
      alert('Please select a vehicle type');
      return;
    }

    try {
      // Get the selected vehicle data
      const selectedVehicleData = VEHICLE_OPTIONS.find(v => v.type === selectedVehicle);
      
      if (!selectedVehicleData) {
        throw new Error('Vehicle type not found');
      }

      // Send booking confirmation email
      await sendTransferBookingEmail({
        ...formData,
        pickup: selectedRoute.pickup,
        dropoff: selectedRoute.dropoff,
        vehicleType: selectedVehicleData.name,
        price: selectedVehicleData.price
      });

      // Redirect to Stripe payment
      window.location.href = selectedVehicleData.paymentLink;
    } catch (error) {
      console.error('Error processing booking:', error);
      alert('There was an error processing your booking. Please try again.');
    }
  };

  return (
    <section className="relative py-12 bg-blue-50">
      {/* Removed background image div */}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Book Taxi Transfer: Trieste Cruise Port ⇄ Venice Airport
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Private taxi service with fixed prices, professional English-speaking drivers, and 24/7 availability
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <a 
              href="https://www.viator.com/tours/Trieste/Trieste-Port-to-Venice-Marco-Polo-Airport/d4239-361400P5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              <img 
                src="https://i.postimg.cc/0NMKFYpx/6033e12ff82f810004782cc0-4274402750.png"
                alt="Viator"
                className="h-5 w-auto object-contain"
              />
              <span>5.0 on Viator</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { icon: Shield, text: 'Free Cancellation' },
            { icon: MapPin, text: 'Airport Meet & Greet' },
            { icon: Star, text: '500+ 5-Star Reviews' },
            { icon: Clock, text: '24/7 Support' }
          ].map((badge, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-700 bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-100">
              <badge.icon className="w-4 h-4 text-blue-600" />
              <span className="text-sm">{badge.text}</span>
            </div>
          ))}
          
          {/* TripAdvisor Review Link */}
          <a 
            href="https://www.tripadvisor.com/UserReviewEdit-g187813-d26838504-Transfer_Trieste_Port_Cruise_ship_to_Marco_Polo_Airport_or_Venice-Trieste_Province_of_Tries.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white bg-green-600 rounded-full px-3 py-1.5 shadow-sm border border-green-500 hover:bg-green-700 transition-colors"
          >
            <img 
              src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" 
              alt="TripAdvisor" 
              className="w-4 h-4 filter brightness-0 invert"
            />
            <span className="text-sm">Write a Review</span>
            <ExternalLink size={12} className="text-white" />
          </a>
        </div>

        {/* Vehicle Slider */}
        <VehicleSlider 
          vehicles={VEHICLE_OPTIONS}
          onSelect={handleQuickBook}
        />

        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4">Select Date & Time</h3>
                
                {/* Route Display */}
                <div className="mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <div className="text-center mb-4">
                      <h4 className="font-semibold text-gray-700">Selected Route</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-500">From:</div>
                        <div className="font-medium text-gray-900">{selectedRoute.pickup}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">To:</div>
                        <div className="font-medium text-gray-900">{selectedRoute.dropoff}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button
                      variant="secondary"
                      onClick={handleSwapLocations}
                      className="text-sm"
                    >
                      Swap Locations {selectedRoute.pickup === TRIESTE_PORT ? 
                        "(Trieste Port to Venice Airport)" : 
                        "(Venice Airport to Trieste Port)"}
                    </Button>
                  </div>
                </div>

                {/* Transfer Form */}
                <TransferForm
                  onSubmit={handleBookingSubmit}
                  onCancel={() => setShowBookingForm(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}