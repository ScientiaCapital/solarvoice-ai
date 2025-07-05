'use client';

import { useState } from 'react';

export default function Home() {
  const [selectedService, setSelectedService] = useState('audit');

  const experts = [
    {
      name: "Dr. Sarah Chen",
      title: "Chief Energy Strategist",
      expertise: "20+ years in renewable energy",
      rating: 4.9,
      sessions: 500
    },
    {
      name: "Michael Rodriguez",
      title: "Solar Finance Expert",
      expertise: "Tax credits & incentive specialist",
      rating: 4.8,
      sessions: 350
    },
    {
      name: "Emily Thompson",
      title: "Net Zero Architect",
      expertise: "Whole-home electrification",
      rating: 5.0,
      sessions: 275
    }
  ];

  const services = [
    {
      id: 'audit',
      title: 'Energy Audit',
      price: '$299',
      description: 'Comprehensive home energy assessment',
      features: ['2-hour virtual walkthrough', 'Custom efficiency report', 'ROI calculations', '30-day support']
    },
    {
      id: 'roadmap',
      title: 'Net Zero Roadmap',
      price: '$599',
      description: 'Complete path to zero emissions',
      features: ['5-year implementation plan', 'Technology recommendations', 'Contractor vetting', 'Quarterly check-ins']
    },
    {
      id: 'premium',
      title: 'Premium Support',
      price: '$1,299',
      description: 'End-to-end project management',
      features: ['Dedicated project manager', 'Contractor negotiations', 'Permit assistance', '1-year support']
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold text-purple-600">NetZero Expert</h1>
          <div className="space-x-6">
            <a href="https://solarvoice.ai" className="text-gray-700 hover:text-purple-600">Platform</a>
            <a href="https://netzerobot.com" className="text-gray-700 hover:text-purple-600">AI Chat</a>
            <a href="https://netzerocalculator.com" className="text-gray-700 hover:text-purple-600">Calculator</a>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="text-6xl mb-6">🎓</div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Expert Energy Consulting
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            1-on-1 guidance from certified energy experts. Get your personalized net zero plan.
          </p>
          <button className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transform hover:scale-105 transition">
            Book Free 15-Min Consultation
          </button>
        </div>

        {/* Service Packages */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Choose Your Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`bg-white rounded-xl shadow-lg p-8 cursor-pointer transition transform hover:scale-105 ${
                  selectedService === service.id ? 'ring-4 ring-purple-600' : ''
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <h4 className="text-2xl font-bold mb-2">{service.title}</h4>
                <p className="text-3xl font-bold text-purple-600 mb-4">{service.price}</p>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 bg-purple-100 text-purple-700 py-2 rounded-lg hover:bg-purple-200 transition">
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Profiles */}
        <div className="mb-16 max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Meet Your Experts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experts.map((expert, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-20 h-20 bg-purple-200 rounded-full mx-auto mb-4"></div>
                <h4 className="text-xl font-bold text-center">{expert.name}</h4>
                <p className="text-purple-600 text-center mb-2">{expert.title}</p>
                <p className="text-gray-600 text-sm text-center mb-4">{expert.expertise}</p>
                <div className="flex justify-center items-center gap-4 text-sm">
                  <span className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    {expert.rating}
                  </span>
                  <span className="text-gray-500">
                    {expert.sessions} sessions
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-4xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Book Your Session</h4>
                <p className="text-gray-600">Choose a service package and schedule with an expert</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Energy Assessment</h4>
                <p className="text-gray-600">Expert analyzes your home, bills, and energy goals</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Get Your Plan</h4>
                <p className="text-gray-600">Receive customized roadmap with guaranteed savings</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Start Your Net Zero Journey Today</h3>
          <p className="text-xl mb-8 opacity-90">
            Join 10,000+ homeowners who&apos;ve achieved energy independence
          </p>
          <button className="bg-white text-purple-600 px-12 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition">
            Schedule Expert Consultation
          </button>
          <p className="text-sm mt-4 opacity-75">
            100% Satisfaction Guaranteed • No obligation
          </p>
        </div>
      </div>
    </main>
  );
}