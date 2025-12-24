import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedContainer from '../ui/AnimatedContainer';

export default function MarketplaceSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <div className="section-container">
        <AnimatedContainer animation="fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div
              className="relative px-8 py-16 text-center bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://baldus.sirv.com/GTO/Screenshot%202025-11-26%20at%2004.08.42.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-slate-900/40"></div>

              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 whitespace-pre-line">
                  {t('offers.marketplace.title')}
                </h2>

                <p className="text-2xl sm:text-3xl text-white font-semibold mb-8">
                  www.gettransferoffer.com
                </p>

                <a
                  href="https://gettransferoffer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-xl hover:bg-gray-50 transform transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl group"
                >
                  {t('offers.marketplace.visitWebsite')}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
