import React, { useState, useEffect, useRef } from 'react';
import { GoogleReview } from '../../types/reviews';
import ReviewCard from './ReviewCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getTopRatedReviews } from '../../data/googleReviews';
import LoadingSkeleton from '../ui/LoadingSkeleton';
import AnimatedContainer from '../ui/AnimatedContainer';
import MobileOptimizedSection from '../ui/MobileOptimizedSection';

interface ReviewsSliderProps {
  autoRotateInterval?: number;
  className?: string;
  transitionDuration?: number;
}

export default function ReviewsSlider({ 
  autoRotateInterval = 5000, 
  className = '',
  transitionDuration = 500
}: ReviewsSliderProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef<number | null>(null);
  
  const getVisibleSlidesCount = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1; // Mobile
    if (window.innerWidth < 1024) return 2; // Tablet
    return 3; // Desktop
  };
  
  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlidesCount());
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newVisibleSlides = getVisibleSlidesCount();
      if (newVisibleSlides !== visibleSlides) {
        setVisibleSlides(newVisibleSlides);
        setCurrentIndex(0);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [visibleSlides]);
  
  // Initialize reviews with loading state
  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const topReviews = getTopRatedReviews();
      const minimumReviews = visibleSlides * 2;
      let extendedReviews = [...topReviews];
      
      while (extendedReviews.length < minimumReviews) {
        extendedReviews = [...extendedReviews, ...topReviews];
      }
      
      setReviews(extendedReviews);
      setIsLoading(false);
    };
    
    loadReviews();
  }, [visibleSlides]);
  
  // Auto-rotate timer
  useEffect(() => {
    const startTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      
      if (!isPaused && !isTransitioning && reviews.length > visibleSlides && !isLoading) {
        timerRef.current = window.setTimeout(() => {
          goToNext();
        }, autoRotateInterval);
      }
    };
    
    startTimer();
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPaused, reviews.length, autoRotateInterval, visibleSlides, isTransitioning, isLoading]);
  
  const goToPrevious = () => {
    if (isTransitioning || reviews.length <= visibleSlides) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? Math.max(0, reviews.length - visibleSlides) : newIndex;
    });
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, transitionDuration);
  };
  
  const goToNext = () => {
    if (isTransitioning || reviews.length <= visibleSlides) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex > reviews.length - visibleSlides ? 0 : newIndex;
    });
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, transitionDuration);
  };
  
  const goToSlide = (index: number) => {
    if (isTransitioning || reviews.length <= visibleSlides) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, transitionDuration);
  };

  const slideWidth = 100 / visibleSlides;
  const translateX = currentIndex * slideWidth;

  return (
    <MobileOptimizedSection 
      background="gray" 
      padding="large" 
      className={className}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex justify-between items-center mb-8 sm:mb-12">
        <AnimatedContainer animation="slideLeft">
          <h2 className="section-title text-left mb-0">
            <span className="relative inline-block">
              What Our Customers Say
              <span className="absolute -bottom-1 left-0 w-full h-3 bg-primary-100 -z-10 transform -rotate-1"></span>
            </span>
          </h2>
        </AnimatedContainer>
        
        {/* Desktop Navigation */}
        {!isLoading && reviews.length > visibleSlides && (
          <AnimatedContainer animation="slideRight" className="hidden sm:flex items-center space-x-4">
            <button
              onClick={goToPrevious}
              disabled={isTransitioning}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-700" />
            </button>
            
            <button
              onClick={goToNext}
              disabled={isTransitioning}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5 text-neutral-700" />
            </button>
          </AnimatedContainer>
        )}
      </div>
      
      {/* Reviews Slider */}
      <div className="overflow-hidden">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: visibleSlides }, (_, i) => (
              <div key={i} className="card p-6">
                <div className="flex items-center mb-4">
                  <LoadingSkeleton variant="circle" width="48px" height="48px" className="mr-3" />
                  <div className="flex-1">
                    <LoadingSkeleton variant="text" width="60%" height="16px" className="mb-2" />
                    <LoadingSkeleton variant="text" width="40%" height="12px" />
                  </div>
                </div>
                <LoadingSkeleton variant="text" lines={4} />
                <LoadingSkeleton variant="text" width="30%" height="12px" className="mt-4" />
              </div>
            ))}
          </div>
        ) : (
          <div 
            className="flex transition-all ease-out"
            style={{ 
              transform: `translateX(-${translateX}%)`,
              transitionDuration: `${transitionDuration}ms`
            }}
          >
            {reviews.map((review, index) => (
              <div 
                key={`${review.id}-${index}`}
                className="px-3"
                style={{ 
                  flex: `0 0 ${slideWidth}%`,
                  maxWidth: `${slideWidth}%`
                }}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Mobile Navigation Controls */}
      {!isLoading && reviews.length > visibleSlides && (
        <div className="flex justify-center mt-8 sm:hidden">
          <div className="flex items-center space-x-4">
            <button
              onClick={goToPrevious}
              disabled={isTransitioning}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 focus-ring"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-700" />
            </button>
            
            {/* Mobile dots */}
            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.min(5, Math.max(1, reviews.length - visibleSlides + 1)) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  disabled={isTransitioning}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-primary-600 w-6' : 'bg-neutral-300'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={goToNext}
              disabled={isTransitioning}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 focus-ring"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5 text-neutral-700" />
            </button>
          </div>
        </div>
      )}
    </MobileOptimizedSection>
  );
}