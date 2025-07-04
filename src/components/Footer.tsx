import React, { useState } from 'react';
import ContactForm from './contact/ContactForm';
import SocialLinks from './social/SocialLinks';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [showContactForm, setShowContactForm] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* RidePilot Section */}
        <div className="mb-12 text-center">
          <h3 className="text-xl font-semibold mb-3">Try RidePilot Dispatch Program - Free for 30 Days</h3>
          <p className="text-gray-400 mb-4">
            Never miss any rides. Keep your bookings, drivers, and clients perfectly organized.
          </p>
          <a
            href="https://www.ridepilot.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try RidePilot Free
            <ArrowUpRight size={18} />
          </a>
          <p className="text-sm text-gray-400 mt-2">
            Free for small to medium businesses
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          {/* Social Media Icons */}
          <SocialLinks />

          {/* Copyright */}
          <div className="text-center text-gray-400">
            <p>&copy; {currentYear} RideConnect. All rights reserved.</p>
          </div>

          {/* Additional Footer Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <button
              onClick={() => setShowContactForm(true)}
              className="hover:text-white transition-colors duration-200"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
    </footer>
  );
}