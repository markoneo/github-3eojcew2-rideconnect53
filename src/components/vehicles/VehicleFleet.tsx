import React, { useEffect } from 'react';
import { vehicles } from '../../constants/vehicles';
import VehicleCard from './VehicleCard';
import SectionTitle from '../ui/SectionTitle';
import MeetGreet from './MeetGreet';

export default function VehicleFleet() {
  // Initialize Sirv
  useEffect(() => {
    // Check if Sirv script already exists to avoid duplicates
    if (!document.getElementById('sirv-script')) {
      const script = document.createElement('script');
      script.id = 'sirv-script';
      script.src = 'https://scripts.sirv.com/sirvjs/v3/sirv.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-8 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title={
            <span className="relative inline-block">
              Airport Taxis for Any Kind of Trip
              <span className="absolute -bottom-1 left-0 w-full h-2 bg-blue-100 -z-10 transform -rotate-1"></span>
            </span>
          }
          subtitle="Choose from our diverse fleet of vehicles to match your specific needs. From standard cars to spacious minivans, we have the perfect vehicle for your journey."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-6">
          {vehicles.map((vehicle, index) => (
            <div 
              key={vehicle.id} 
              className="transition-all duration-500"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transform: `translateY(${index % 2 === 0 ? '0' : '10px'})` 
              }}
            >
              <VehicleCard {...vehicle} />
            </div>
          ))}
        </div>

        <MeetGreet />
      </div>
    </section>
  );
}