import React from 'react';
import { Users, Briefcase, UserCheck, Star, Droplets } from 'lucide-react';
import { Vehicle } from '../../types/vehicles';
import VehicleStats from './VehicleStats';
import OptimizedImage from '../ui/OptimizedImage';
import AnimatedContainer from '../ui/AnimatedContainer';

export default function VehicleCard({
  name,
  type,
  passengers,
  luggage,
  description,
}: Vehicle) {
  // Get the correct image URL based on vehicle type
  const getVehicleImage = () => {
    switch (type) {
      case 'standard':
        return 'https://i.postimg.cc/13TZCwmp/Skoda-Octavia-PNG-Transparent-1775970813.png';
      case 'executive':
        return 'https://i.postimg.cc/4dRRZGhy/executive-car.png';
      case 'van':
        return 'https://i.postimg.cc/y8WHyvH1/opel-vivaro-ready-2831090158.png';
      case 'minivan':
        return 'https://i.postimg.cc/DzX3t00R/979f86245703bdf377eeb76804c724e5-996114475-1.png';
      default:
        return 'https://i.postimg.cc/13TZCwmp/Skoda-Octavia-PNG-Transparent-1775970813.png';
    }
  };

  return (
    <AnimatedContainer animation="slideUp" className="h-full">
      <div className="relative group overflow-hidden h-full">
        {/* Animated background glow - optimized for performance */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-primary-400 opacity-0 group-hover:opacity-30 rounded-2xl blur-lg transition-opacity duration-500 will-change-opacity"></div>
        
        <div className="card-elevated h-full flex flex-col">
          {/* Image Container - Mobile Optimized */}
          <div className="relative h-32 sm:h-40 bg-gradient-to-br from-primary-50 to-neutral-50 p-3 sm:p-4 flex items-center justify-center overflow-hidden">
            {/* Decorative bubble elements - hidden on mobile for performance */}
            <div className="hidden sm:block absolute top-6 left-6 w-12 h-12 bg-primary-400/10 rounded-full animate-float"></div>
            <div className="hidden sm:block absolute bottom-8 right-8 w-8 h-8 bg-primary-500/10 rounded-full animate-float-reverse"></div>
            
            {/* Vehicle image with optimized loading */}
            <div className="relative z-10 w-full h-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105 will-change-transform">
              <OptimizedImage
                src={getVehicleImage()}
                alt={name}
                className="max-h-28 sm:max-h-36 max-w-full"
                objectFit="contain"
                sizes="(max-width: 640px) 200px, 300px"
              />
            </div>
          </div>
          
          {/* Content Container */}
          <div className="p-4 sm:p-6 bg-white backdrop-blur-sm flex-1 flex flex-col border-t border-primary-50">
            <div className="relative flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                {name}
              </h3>
              <p className="text-neutral-600 mb-4 text-sm sm:text-base line-clamp-2">
                {description}
              </p>
              
              <div className="mt-auto">
                <VehicleStats passengers={passengers} luggage={luggage} type={type} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
}