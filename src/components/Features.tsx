import React, { useEffect, useRef, useState } from 'react';
import { Shield, Car, HeadphonesIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedContainer from './ui/AnimatedContainer';
import MobileOptimizedSection from './ui/MobileOptimizedSection';

const features = [
  {
    icon: Shield,
    title: 'Professional Service',
    description: 'Experienced and courteous drivers at your service'
  },
  {
    icon: Car,
    title: 'Comfortable Vehicles',
    description: 'Modern fleet of vehicles for a luxurious journey'
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for your peace of mind'
  }
];

export default function Features() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check screen size for mobile optimization
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <MobileOptimizedSection padding="medium">
      {/* Mobile carousel controls */}
      {isMobile && (
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={prevSlide}
            className="bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all active:scale-95"
            aria-label="Previous feature"
          >
            <ChevronLeft size={20} className="text-primary-600" />
          </button>
          
          <div className="flex space-x-2">
            {features.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-primary-600 w-6' : 'bg-neutral-300'
                }`}
                aria-label={`Go to feature ${idx + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextSlide}
            className="bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all active:scale-95"
            aria-label="Next feature"
          >
            <ChevronRight size={20} className="text-primary-600" />
          </button>
        </div>
      )}
      
      {/* Features container */}
      <div className="overflow-hidden">
        <div 
          className={`transition-transform duration-500 ease-in-out ${
            isMobile ? 'flex' : 'grid grid-cols-1 md:grid-cols-3 gap-6'
          }`}
          style={isMobile ? { 
            transform: `translateX(-${currentIndex * 100}%)` 
          } : {}}
        >
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`${isMobile ? 'flex-shrink-0 w-full px-2' : ''}`}
            >
              <AnimatedContainer 
                animation="slideUp" 
                delay={index * 100}
                className="h-full"
              >
                <div className="card-elevated h-full p-4 sm:p-6 text-center group">
                  {/* Icon with mobile-optimized size */}
                  <div className="relative inline-block mb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:bg-primary-200 group-hover:scale-110">
                      <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-full bg-primary-400/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-semibold mb-2 text-neutral-900 group-hover:text-primary-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-neutral-600 transition-colors duration-300 group-hover:text-neutral-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedContainer>
            </div>
          ))}
        </div>
      </div>
      
      {/* Desktop pagination dots */}
      {!isMobile && (
        <div className="flex justify-center mt-8 space-x-2">
          {features.map((_, idx) => (
            <div
              key={idx}
              className="w-2 h-2 rounded-full bg-primary-600 opacity-30"
            />
          ))}
        </div>
      )}
    </MobileOptimizedSection>
  );
}