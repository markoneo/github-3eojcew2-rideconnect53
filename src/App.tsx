import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Features from './components/Features';
import BookingForm from './components/form/BookingForm';
import BookingSteps from './components/BookingSteps';
import VehicleFleet from './components/vehicles/VehicleFleet';
import PartnerSection from './components/PartnerSection';
import ToursSection from './components/tours/ToursSection';
import Chatbot from './components/chat/Chatbot';
import ReviewsSlider from './components/reviews/ReviewsSlider';
import TriesteVeniceTransfer from './components/transfers/TriesteVeniceTransfer';
import WinterOffers from './components/offers/WinterOffers';
import MarketplaceSection from './components/marketplace/MarketplaceSection';
import { trackVisitor } from './services/visitorTrackingService';

function App() {
  // Track visitor when the app loads
  useEffect(() => {
    // Small delay to ensure the page has loaded
    const timer = setTimeout(() => {
      trackVisitor().catch(err => console.error('Visitor tracking error:', err));
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Hero />

        <main>
          <div id="booking" className="w-full mx-auto -mt-16 relative z-10">
            <div className="bg-white p-4 sm:p-6 md:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Your Private Transfer</h2>
                <p className="text-gray-600">Fill out the form below, and we'll send you a personalized offer</p>
              </div>
              <BookingForm />
            </div>

            <Features />
          </div>

          <WinterOffers />
          <TriesteVeniceTransfer />
          <VehicleFleet />
          <BookingSteps />
          <ReviewsSlider />
          <ToursSection />
          <PartnerSection />
          <MarketplaceSection />
        </main>

        <Footer />
        <Chatbot />
      </div>
    </HelmetProvider>
  );
}

export default App;