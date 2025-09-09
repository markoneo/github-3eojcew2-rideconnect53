import React from 'react';
import Button from './ui/Button';
import { Star, Mountain, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedContainer from './ui/AnimatedContainer';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="relative bg-slate-800 text-white overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"></div>
      
      {/* Content */}
      <div className="relative z-20 section-container py-16 lg:py-24">
        {/* Top tagline */}
        <AnimatedContainer animation="fadeIn" delay={200}>
          <div className="text-center mb-12">
            <p className="text-cyan-400 text-lg lg:text-xl font-medium">
              Reserve Now and Pay Later - Secure your spot while staying flexible
            </p>
          </div>
        </AnimatedContainer>
        
        {/* Main Hero Content */}
        <div className="text-center mb-16">
          <AnimatedContainer animation="slideUp" delay={400}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight">
              Dolomites Transfer Service.
              <br />
              <span className="text-cyan-400">Simpler than ever.</span>
            </h1>
          </AnimatedContainer>
          
          {/* Stats Section */}
          <AnimatedContainer animation="scaleIn" delay={600}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-slate-800" />
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold">2000+</div>
                  <div className="text-slate-300">Completed rides</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center">
                  <Mountain className="w-8 h-8 text-slate-800" />
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold">8+</div>
                  <div className="text-slate-300">Years of service</div>
                </div>
              </div>
            </div>
          </AnimatedContainer>
          
          <AnimatedContainer animation="fadeIn" delay={800}>
            <p className="text-cyan-400 text-lg lg:text-xl font-medium">
              Reserve Now and Pay Later - Secure your spot while staying flexible
            </p>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
}