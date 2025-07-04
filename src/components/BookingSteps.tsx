import React, { useEffect, useRef } from 'react';
import { ClipboardEdit, Mail, CheckCircle, UserCheck, Car } from 'lucide-react';

const steps = [
  {
    icon: ClipboardEdit,
    title: '1. Fill the Form',
    description: 'Complete the booking form with your travel details'
  },
  {
    icon: Mail,
    title: '2. Receive an Offer',
    description: 'Get a personalized quote via email'
  },
  {
    icon: CheckCircle,
    title: '3. Confirm Your Transfer',
    description: 'Accept the offer and secure your booking'
  },
  {
    icon: UserCheck,
    title: '4. Meet the Driver',
    description: 'Your driver will meet you at the pickup location'
  },
  {
    icon: Car,
    title: '5. Enjoy the Ride',
    description: 'Relax and enjoy your comfortable journey'
  }
];

export default function BookingSteps() {
  const stepsRef = useRef<HTMLDivElement>(null);
  
  // Floating animation effect
  useEffect(() => {
    if (!stepsRef.current) return;
    
    const icons = stepsRef.current.querySelectorAll('.step-icon');
    
    icons.forEach((icon, index) => {
      // Alternate floating direction and timing
      const delay = index * 0.2;
      const direction = index % 2 === 0 ? 1 : -1;
      
      icon.animate(
        [
          { transform: 'translateY(0px)' },
          { transform: `translateY(${8 * direction}px)` },
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
    <div id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
          How It Works
        </h2>
        
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center group"
            >
              <div className="relative">
                {/* Pulsing background effect */}
                <div className="absolute -inset-4 bg-blue-400 rounded-full opacity-30 blur-xl group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />
                
                {/* Icon container with glassmorphism */}
                <div className="step-icon relative w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg
                  backdrop-blur-sm border border-blue-400/50 z-10
                  transform transition-all duration-500 ease-out
                  group-hover:scale-110 group-hover:shadow-blue-400/30 group-hover:shadow-xl">
                  <step.icon className="w-10 h-10 text-white transition-transform duration-500 group-hover:scale-110" />
                  
                  {/* Glowing effect on hover */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 bg-blue-300 blur-md transition-opacity duration-500" />
                </div>
                
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-1">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transform -translate-y-1/2 rounded-full" />
                    
                    {/* Animated dots */}
                    <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-600 rounded-full transform -translate-y-1/2 animate-ping" style={{ animationDelay: `${index * 0.5}s` }} />
                    <div className="absolute top-1/2 left-2/4 w-2 h-2 bg-blue-600 rounded-full transform -translate-y-1/2 animate-ping" style={{ animationDelay: `${index * 0.5 + 0.2}s` }} />
                    <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-blue-600 rounded-full transform -translate-y-1/2 animate-ping" style={{ animationDelay: `${index * 0.5 + 0.4}s` }} />
                  </div>
                )}
              </div>
              
              {/* Text content with subtle float effect */}
              <div className="transform transition-transform duration-500 ease-out group-hover:translate-y-[-5px]">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}