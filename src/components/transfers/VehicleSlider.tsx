import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, DollarSign, Check, ArrowRight, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';

interface Vehicle {
  type: string;
  name: string;
  price: number;
  maxPassengers: number;
  image: string;
}

interface VehicleSliderProps {
  vehicles: Vehicle[];
  onSelect: (vehicleType: string) => void;
}

export default function VehicleSlider({ vehicles, onSelect }: VehicleSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % vehicles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length);
  };

  const currentVehicle = vehicles[currentIndex];

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Navigation Buttons with improved hover effects */}
      <button
        onClick={prevSlide}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md 
                 hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Previous vehicle"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md 
                 hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Next vehicle"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Enhanced Vehicle Card - with animations removed */}
      <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-md border border-white/50 
                    p-5 mx-8 relative overflow-hidden group">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-blue-200/30 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        {/* Light beam effect removed */}
        
        {/* Bottom highlight border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 
                      transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
        
        <div className="text-center relative z-10">
          <h3 className="text-xl font-bold mb-3 text-blue-800 transition-colors duration-500 group-hover:text-blue-600">{currentVehicle.name}</h3>
          
          {/* Vehicle Image - animations removed */}
          <div className="w-full h-24 mb-4 relative">
            {/* Reflection effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-black/10 rounded-full blur-sm 
                          transform transition-all duration-500 group-hover:scale-x-110"></div>
            
            <img
              src={currentVehicle.image}
              alt={currentVehicle.name}
              className="w-full h-full object-contain transition-all duration-700 ease-in-out 
                       transform group-hover:scale-110"
              loading="lazy"
            />
          </div>

          <div className="flex justify-center items-center gap-6 mb-4">
            {/* Passengers info - animations removed */}
            <div className="text-center relative group/item transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-blue-50 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <p className="text-xs text-gray-600">Up to</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentVehicle.maxPassengers}
                </p>
                <p className="text-xs text-gray-600">Passengers</p>
              </div>
            </div>
            
            {/* Price info - animations removed */}
            <div className="text-center relative group/item transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-blue-50 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <p className="text-xs text-gray-600">Fixed Price</p>
                <p className="text-2xl font-bold text-blue-600">
                  €{currentVehicle.price}
                </p>
                <p className="text-xs text-gray-600">All inclusive</p>
              </div>
            </div>
          </div>
          
          {/* Features with checkmarks - animations removed */}
          <div className="space-y-1 mb-4">
            {['Airport Meet & Greet included', 'Free cancellation', 'Professional taxi driver'].map((feature, idx) => (
              <p key={idx} className="text-gray-600 text-sm flex items-center justify-center gap-1.5 group/feature">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-100 text-green-600
                              transform transition-all duration-300 group-hover/feature:bg-green-200 group-hover/feature:scale-110">
                  <Check size={10} />
                </span>
                <span className="transition-colors duration-300 group-hover/feature:text-blue-600">{feature}</span>
              </p>
            ))}
          </div>

          {/* Enhanced button - animations simplified */}
          <button
            onClick={() => onSelect(currentVehicle.type)}
            className="relative overflow-hidden w-full max-w-xs bg-blue-600 text-white py-2 px-4 rounded-md 
                     transition-all duration-500 hover:bg-blue-700 text-sm"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="font-medium">Book Now €{currentVehicle.price}</span>
              <ArrowRight size={14} />
            </div>
          </button>
          
          <div className="mt-6 space-y-4">
            <p className="text-gray-600 text-sm text-center">Book your airport taxi transfer through our trusted partners:</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a 
                href="https://taxis.booking.com/search/?affiliate=booking-taxi&currency=EUR&date=2025-12-30&dropoff=ChIJ59hm1Hlre0cRL1cO6BZvGUg&dropoffEstablishment=Trieste+Port&lang=en-gb&passengers=2&pickup=ChIJgQu1xE01eUcRmUhimHEy8SM&pickupEstablishment=Venice+Marco+Polo+Airport&preSelectedResultReference=1&time=12%3A00&aid=304142&label=gen173nr-1FEgp0YXhpLWluZGV4KIICOOgHSAlYBGjLAYgBAZgBCbgBB8gBDdgBAegBAfgBA4gCAagCA7gC0-OIvwbAAgHSAiRjYTYzOWM5Zi01ODU5LTRmM2QtYmYxZC04ODFjNTlmOGZjNTHYAgXgAgE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm w-full"
              >
                <img 
                  src="https://cf.bstatic.com/static/img/favicon/9ca83ba2a5a3293ff07452cb24949a5843af4592.svg"
                  alt="Booking.com"
                  className="w-4 h-4 filter brightness-0 invert"
                />
                <span>Book on Booking.com</span>
                <ExternalLink size={12} className="text-white" />
              </a>
              
              <a 
                href="https://www.viator.com/tours/Trieste/Trieste-Port-to-Venice-Marco-Polo-Airport/d4239-361400P5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors text-sm w-full"
              >
                <img 
                  src="https://i.postimg.cc/0NMKFYpx/6033e12ff82f810004782cc0-4274402750.png"
                  alt="Viator"
                  className="h-4 w-auto filter brightness-0 invert"
                />
                <span>Book on Viator</span>
                <ExternalLink size={12} className="text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Dots Indicator - made smaller */}
      <div className="flex justify-center gap-1.5 mt-3">
        {vehicles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 
                      ${index === currentIndex 
                        ? 'bg-blue-600 w-4' 
                        : 'bg-gray-300 hover:bg-blue-300'}`}
            aria-label={`Go to vehicle ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}