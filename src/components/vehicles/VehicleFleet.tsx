import React from 'react';
import AnimatedContainer from '../ui/AnimatedContainer';

const vehicles = [
  {
    name: 'Standard Car',
    description: 'Mercedes C-Class or similar (up to 3 people, 3 luggage)',
    price: '€250',
    features: [
      'Professional driver',
      'Door-to-door service', 
      'Free waiting time (60 min)',
      'Flight monitoring',
      'Complimentary water',
      'Child seats available'
    ],
    icon: '🚗',
    popular: false
  },
  {
    name: 'Van',
    description: 'Mercedes Vito or similar (up to 7 people, 10 luggage)',
    price: '€350',
    features: [
      'Professional driver',
      'Door-to-door service',
      'Free waiting time (60 min)', 
      'Flight monitoring',
      'Complimentary water'
    ],
    icon: '🚐',
    popular: true
  },
  {
    name: 'Minibus',
    description: '2 Mercedes Vito or similar (up to 14 people, 20 luggage)',
    price: '€650',
    features: [
      'Professional driver',
      'Door-to-door service',
      'Free waiting time (60 min)',
      'Flight monitoring', 
      'Complimentary water'
    ],
    icon: '🚌',
    popular: false
  }
];

export default function VehicleFleet() {
  return (
    <div className="py-16 lg:py-24 bg-slate-50">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedContainer animation="slideUp">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Additional Services
            </h2>
            <div className="w-20 h-1 bg-cyan-400 mx-auto mb-6"></div>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              Customize your Dolomites transfer to suit your mountain adventure schedule and luggage needs
            </p>
          </AnimatedContainer>
        </div>

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <AnimatedContainer key={index} animation="slideUp" delay={index * 200}>
              <div className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                vehicle.popular ? 'ring-2 ring-cyan-400' : ''
              }`}>
                {vehicle.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-cyan-400 text-slate-800 font-bold px-6 py-2 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">{vehicle.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{vehicle.name}</h3>
                  <p className="text-slate-600 text-sm mb-6">{vehicle.description}</p>
                  
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-slate-800">{vehicle.price}</div>
                    <div className="text-slate-500">per transfer</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {vehicle.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </div>
  );
}