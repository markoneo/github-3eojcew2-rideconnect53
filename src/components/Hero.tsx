import React from 'react';
import { heroImages } from '../constants/images';
import Button from './ui/Button';
import { Search, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import OptimizedImage from './ui/OptimizedImage';
import AnimatedContainer from './ui/AnimatedContainer';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="relative h-[70vh] sm:h-[75vh] lg:h-[85vh] flex items-center mb-8 sm:mb-16 overflow-hidden">
      {/* Background image with optimized loading */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="https://i.postimg.cc/dt5FCggN/airport-transfer-2914522212.jpg"
          alt="Airport transfer service"
          className="w-full h-full"
          objectFit="cover"
          priority={true}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content overlay - Mobile Optimized */}
      <div className="relative z-20 section-container w-full text-center text-white">
        <AnimatedContainer animation="fadeIn" delay={200}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            {t('hero.title')}
          </h1>
        </AnimatedContainer>
        
        <AnimatedContainer animation="slideUp" delay={400}>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed px-4">
            {t('hero.subtitle')}
          </p>
        </AnimatedContainer>
        
        {/* Search Engine Feature Description - Mobile Optimized */}
        <AnimatedContainer animation="scaleIn" delay={600}>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-6 max-w-xl mx-auto my-6 sm:my-8 mx-4 sm:mx-auto">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Search size={20} className="text-primary-400" />
              <Star size={20} className="text-accent-400" />
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed">
              {t('hero.searchDescription')}
            </p>
          </div>
        </AnimatedContainer>

        <AnimatedContainer animation="slideUp" delay={800}>
          <Button 
            href="#booking" 
            className="px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold transform hover:scale-105 focus:scale-105 transition-transform"
          >
            {t('hero.bookButton')}
          </Button>
        </AnimatedContainer>
      </div>
    </div>
  );
}