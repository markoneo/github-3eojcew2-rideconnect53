import React, { useEffect, useRef } from 'react';
import { UserCheck, Clock, MapPin, Sparkles } from 'lucide-react';

const features = [
  {
    icon: UserCheck,
    title: 'Professional Chauffeur',
    description: 'Experienced, well-dressed drivers who prioritize your comfort',
    delay: 0
  },
  {
    icon: Clock,
    title: 'Flight Monitoring',
    description: 'We track your flight to adjust pickup time if needed',
    delay: 0.1
  },
  {
    icon: MapPin,
    title: 'Terminal Meeting',
    description: 'Driver meets you at arrivals with a name board',
    delay: 0.2
  },
  {
    icon: Sparkles,
    title: 'Complimentary Wait Time',
    description: '60 minutes of free waiting time at airports',
    delay: 0.3
  }
];

export default function MeetGreet() {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  // Floating animation effect
  useEffect(() => {
    if (!featuresRef.current) return;
    
    const icons = featuresRef.current.querySelectorAll('.feature-icon');
    
    icons.forEach((icon, index) => {
      // Alternate floating direction and timing
      const delay = index * 0.2;
      const direction = index % 2 === 0 ? 1 : -1;
      
      icon.animate(
        [
          { transform: 'translateY(0px)' },
          { transform: `translateY(${6 * direction}px)` },
          { transform: 'translateY(0px)' }
        ],
        {
          duration: 3000 + index * 500,
          iterations: Infinity,
          easing: 'ease-in-out',
          delay: delay * 1000
        }
      );
    });
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 mt-16 rounded-xl overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-reverse" style={{ animationDuration: '20s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 relative">
              <span className="relative z-10">Complimentary Meet & Greet Service</span>
              <span className="absolute -bottom-1 left-0 w-full h-3 bg-blue-100 -z-10 transform -rotate-1"></span>
            </h3>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every airport pickup includes our premium meet and greet service at no additional cost
          </p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
              style={{ transitionDelay: `${feature.delay}s` }}
            >
              {/* Glassmorphic highlight on top */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Bottom glow on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="feature-icon w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-500 relative">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                  
                  {/* Subtle pulsing glow behind icon */}
                  <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500"></div>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{feature.title}</h4>
                <p className="text-gray-600 text-sm transition-colors duration-300 group-hover:text-gray-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}