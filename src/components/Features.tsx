import React, { useEffect, useRef, useState } from 'react';
import { Mountain, Plane, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedContainer from './ui/AnimatedContainer';
import MobileOptimizedSection from './ui/MobileOptimizedSection';

const features = [
  {
    icon: Mountain,
    title: 'Scenic Dolomites Routes',
    description: 'Experience breathtaking alpine views on your journey through the UNESCO World Heritage Dolomites'
  },
  {
    icon: Plane,
    title: 'Airport Connections',
    description: 'Seamless transfers from Venice, Verona, and Innsbruck airports to your Dolomites destination'
  },
  {
    icon: Clock,
    title: '24/7 Mountain Service',
    description: 'Round-the-clock availability for early ski lifts and late mountain adventures'
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
    <div className="py-16 lg:py-24 bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <AnimatedContainer key={index} animation="slideUp" delay={index * 200}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-cyan-200 transition-colors duration-300">
                  <feature.icon className="w-10 h-10 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </div>
  );
}