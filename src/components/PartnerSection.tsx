import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import PartnerApplicationForm from './partner/PartnerApplicationForm';

export default function PartnerSection() {
  const [showForm, setShowForm] = useState(false);

  // Load Elfsight script
  useEffect(() => {
    // Check if script already exists to avoid duplicates
    if (!document.getElementById('elfsight-script')) {
      const script = document.createElement('script');
      script.id = 'elfsight-script';
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Clean up script when component unmounts
        if (document.getElementById('elfsight-script')) {
          document.body.removeChild(document.getElementById('elfsight-script')!);
        }
      };
    }
  }, []);

  return (
    <section id="partners" className="py-24 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-reverse" style={{ animationDuration: '20s' }}></div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 relative inline-block">
            <span className="relative z-10">Our Partners</span>
            <span className="absolute -bottom-1 left-0 w-full h-3 bg-blue-100 -z-10 transform -rotate-1"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We work with leading travel companies to provide you with the best service
          </p>
        </div>

        {/* Elfsight Logo Showcase */}
        <div className="mb-12">
          <div className="elfsight-app-d9aa0d19-fed0-42fe-bbe4-a45e16697731" data-elfsight-app-lazy></div>
        </div>

        <div className="text-center">
          <Button 
            onClick={() => setShowForm(true)}
            variant="secondary"
            className="relative group overflow-hidden border border-blue-600 bg-transparent hover:bg-blue-50 z-10"
          >
            {/* Button glowing effect */}
            <span className="absolute inset-0 w-full h-full bg-blue-600 opacity-10 group-hover:opacity-20 transition-opacity duration-500"></span>
            
            {/* Moving highlight effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></span>
            
            <span className="relative z-10 font-medium text-blue-600">Become our partner</span>
          </Button>
        </div>
      </div>

      {showForm && <PartnerApplicationForm onClose={() => setShowForm(false)} />}
    </section>
  );
}