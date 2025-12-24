import React from 'react';
import { Snowflake, MapPin, Calendar, Star, Sparkles, Mountain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedContainer from '../ui/AnimatedContainer';

interface WinterOffer {
  id: string;
  destination: string;
  description: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  duration: string;
  availability: string;
  highlights: string[];
  badge?: string;
  icon: React.ReactNode;
}

export default function WinterOffers() {
  const { t } = useTranslation();

  const handleBookNow = (offer: WinterOffer) => {
    const subject = t('offers.winter.email.subject', { destination: offer.destination });
    const body = t('offers.winter.email.body', {
      destination: offer.destination,
      price: offer.price,
      duration: offer.duration,
      availability: offer.availability,
      highlights: offer.highlights.join('\n• ')
    });

    const mailtoLink = `mailto:info.rideconnect@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const offers: WinterOffer[] = [
    {
      id: 'cortina',
      destination: t('offers.winter.cortina.destination'),
      description: t('offers.winter.cortina.description'),
      price: '380€',
      originalPrice: '450€',
      discount: '15%',
      duration: t('offers.winter.cortina.duration'),
      availability: t('offers.winter.cortina.availability'),
      highlights: [
        t('offers.winter.cortina.highlight1'),
        t('offers.winter.cortina.highlight2'),
        t('offers.winter.cortina.highlight3')
      ],
      badge: '2026 Olympics',
      icon: <Snowflake className="w-8 h-8" />
    },
    {
      id: 'altabadia',
      destination: t('offers.winter.altabadia.destination'),
      description: t('offers.winter.altabadia.description'),
      price: '440€',
      originalPrice: '520€',
      discount: '15%',
      duration: t('offers.winter.altabadia.duration'),
      availability: t('offers.winter.altabadia.availability'),
      highlights: [
        t('offers.winter.altabadia.highlight1'),
        t('offers.winter.altabadia.highlight2'),
        t('offers.winter.altabadia.highlight3')
      ],
      icon: <Star className="w-8 h-8" />
    },
    {
      id: 'valgardena',
      destination: t('offers.winter.valgardena.destination'),
      description: t('offers.winter.valgardena.description'),
      price: '460€',
      originalPrice: '540€',
      discount: '15%',
      duration: t('offers.winter.valgardena.duration'),
      availability: t('offers.winter.valgardena.availability'),
      highlights: [
        t('offers.winter.valgardena.highlight1'),
        t('offers.winter.valgardena.highlight2'),
        t('offers.winter.valgardena.highlight3')
      ],
      icon: <Sparkles className="w-8 h-8" />
    },
    {
      id: 'arabba',
      destination: t('offers.winter.arabba.destination'),
      description: t('offers.winter.arabba.description'),
      price: '440€',
      duration: t('offers.winter.arabba.duration'),
      availability: t('offers.winter.arabba.availability'),
      highlights: [
        t('offers.winter.arabba.highlight1'),
        t('offers.winter.arabba.highlight2'),
        t('offers.winter.arabba.highlight3'),
        t('offers.winter.arabba.highlight4')
      ],
      icon: <Mountain className="w-8 h-8" />
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
      </div>

      <div className="section-container relative z-10">
        <AnimatedContainer animation="fadeIn">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-4 py-2 rounded-full mb-4">
              <Snowflake className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                {t('offers.winter.badge')}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {t('offers.winter.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-400 mx-auto mb-6"></div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('offers.winter.subtitle')}
            </p>
          </div>
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {offers.map((offer, index) => (
            <AnimatedContainer
              key={offer.id}
              animation="slideUp"
              delay={index * 200}
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-teal-500/20 group h-full flex flex-col">
                {offer.badge && (
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-bold py-2 px-4 text-center uppercase tracking-wider">
                    {offer.badge}
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-5 rounded-2xl text-slate-700 group-hover:from-teal-50 group-hover:to-blue-50 group-hover:text-teal-600 transition-all duration-300">
                      {offer.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                    {offer.destination}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed text-center flex-grow">
                    {offer.description}
                  </p>

                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-5 mb-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      {offer.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {offer.originalPrice}
                        </span>
                      )}
                      <span className="text-3xl font-bold text-teal-600">
                        {t('offers.winter.from')} {offer.price}
                      </span>
                    </div>
                    {offer.discount && (
                      <div className="text-center">
                        <span className="inline-block bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {t('offers.winter.save')} {offer.discount}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5 text-teal-500 flex-shrink-0" />
                      <span className="text-sm">{offer.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span className="text-sm">{offer.availability}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                      {t('offers.winter.highlights')}:
                    </h4>
                    <ul className="space-y-2">
                      {offer.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleBookNow(offer)}
                    className="mt-6 w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-teal-600 hover:to-blue-700 transform transition-all duration-300 hover:scale-105 focus:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {t('offers.winter.bookNow')}
                  </button>
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>

        <AnimatedContainer animation="fadeIn" delay={600}>
          <div className="mt-12 text-center">
            <p className="text-teal-300 text-sm">
              {t('offers.winter.validUntil')}
            </p>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
