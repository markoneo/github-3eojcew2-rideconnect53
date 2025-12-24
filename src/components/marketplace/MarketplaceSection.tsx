import React from 'react';
import { ArrowRight, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedContainer from '../ui/AnimatedContainer';

export default function MarketplaceSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <div className="section-container">
        <AnimatedContainer animation="fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative bg-gradient-to-r from-teal-600 via-blue-600 to-blue-700 px-8 py-12 text-center">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                  {t('marketplace.title')}
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
                  <span className="text-lg sm:text-xl font-semibold text-teal-100 uppercase tracking-wider">
                    {t('marketplace.privateTransfer')}
                  </span>
                  <span className="hidden sm:inline text-white/40">•</span>
                  <span className="text-lg sm:text-xl font-semibold text-blue-100 uppercase tracking-wider">
                    {t('marketplace.marketplace')}
                  </span>
                  <span className="hidden sm:inline text-white/40">•</span>
                  <span className="text-lg sm:text-xl font-semibold text-white uppercase tracking-wider">
                    {t('marketplace.compareOffers')}
                  </span>
                </div>

                <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                  {t('marketplace.description')}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-teal-300" />
                    <span className="text-sm sm:text-base">{t('marketplace.benefit1')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-teal-300" />
                    <span className="text-sm sm:text-base">{t('marketplace.benefit2')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-teal-300" />
                    <span className="text-sm sm:text-base">{t('marketplace.benefit3')}</span>
                  </div>
                </div>

                <a
                  href="https://gettransferoffer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-xl hover:bg-gray-50 transform transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl group"
                >
                  {t('marketplace.cta')}
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
