import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedContainer from '../ui/AnimatedContainer';

const guides = [
  {
    title: 'How to Get from Venice Airport to Cortina d\'Ampezzo',
    description: 'Complete guide to transfers from Venice Marco Polo Airport to the heart of the Dolomites, including scenic route options and mountain resort transfers.',
    category: 'Week 1 - Featured',
    date: '27 January 2025',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function ToursSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedContainer animation="slideUp">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Travel Tips & Guides
            </h2>
            <div className="w-20 h-1 bg-cyan-400 mx-auto mb-6"></div>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              Weekly insights, travel tips, and guides for your Dolomites journey. Expert advice from our professional drivers and local knowledge.
            </p>
          </AnimatedContainer>
        </div>

        {/* Featured Guide */}
        <AnimatedContainer animation="slideUp" delay={200}>
          <div className="bg-slate-50 rounded-3xl p-8 lg:p-12">
            <div className="inline-block bg-cyan-400 text-slate-800 font-bold px-4 py-2 rounded-full text-sm mb-6">
              {guides[0].category}
            </div>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4 lg:mb-0 lg:mr-8">
                {guides[0].title}
              </h3>
              
              <div className="flex items-center gap-6 text-slate-500 text-sm whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{guides[0].date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{guides[0].readTime}</span>
                </div>
              </div>
            </div>

            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              {guides[0].description}
            </p>

            <Button
              href="https://rideconnecttours.netlify.app/"
              className="bg-cyan-400 hover:bg-cyan-500 text-slate-800 font-bold py-3 px-8 rounded-2xl transition-colors duration-200 inline-flex items-center gap-2"
            >
              <span>Read Full Guide</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}