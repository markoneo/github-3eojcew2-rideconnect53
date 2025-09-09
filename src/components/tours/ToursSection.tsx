import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import SectionTitle from '../ui/SectionTitle';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const tours = [
  {
    title: 'Enchanting Lake Bled and Bled Castle',
    image: 'https://i.postimg.cc/tCDjQ85t/BLED4.jpg',
    alt: 'Lake Bled with castle on cliff'
  },
  {
    title: 'Postojna Cave & Predjama Castle Tour',
    image: 'https://i.postimg.cc/tgq26Cn8/POS3.jpg',
    alt: 'Predjama Castle built into cave mouth'
  },
  {
    title: 'Rovinj: A Mediterranean Jewel',
    image: 'https://i.postimg.cc/nzQ7j626/port-rovinj-croatia-384489812.jpg',
    alt: 'Rovinj harbor and old town'
  },
  {
    title: 'Roman Heritage in Pula',
    image: 'https://i.postimg.cc/65C01GdD/pula-arena-von-pula-01-foto-art-frank-heuer-752392495.jpg',
    alt: 'Pula Arena Roman amphitheater'
  },
  {
    title: 'Wine Tasting in Vipava Valley',
    image: 'https://i.postimg.cc/sgk3fqBB/WINE.jpg',
    alt: 'Vipava Valley vineyards'
  }
];

export default function ToursSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % tours.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + tours.length) % tours.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Calculate visible tours based on screen size
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;  // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };

  const visibleCount = getVisibleCount();
  const visibleTours = [];
  
  for (let i = 0; i < visibleCount; i++) {
    const index = (currentIndex + i) % tours.length;
    visibleTours.push(tours[index]);
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Discover Our Tours"
          subtitle="Experience the most beautiful destinations in Europe with our tours"
        />

        <div className="relative max-w-6xl mx-auto mt-12">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous tour"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next tour"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Tours Slider */}
          <div 
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {tours.map((tour, index) => (
                <div 
                  key={index}
                  className={`w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 p-4 transition-opacity duration-500 ${
                    index >= currentIndex && index < currentIndex + visibleCount
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full transform hover:scale-105 transition-all duration-300">
                    <div className="relative pt-[66.67%]"> {/* 3:2 aspect ratio */}
                      <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src={tour.image}
                        alt={tour.alt}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {tour.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {tours.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-blue-600 w-4' : 'bg-gray-300'
                }`}
                aria-label={`Go to tour ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            href="https://rideconnecttours.netlify.app/"
            variant="secondary"
            className="border border-blue-600"
          >
            View all tours
          </Button>
        </div>
      </div>
    </section>
  );
}