'use client';

import { useState } from 'react';

export default function Home() {
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold text-green-600">NetZero Bot</h1>
          <div className="space-x-6">
            <a href="https://solarvoice.ai" className="text-gray-700 hover:text-green-600">Platform</a>
            <a href="https://netzerocalculator.com" className="text-gray-700 hover:text-green-600">Calculator</a>
            <a href="https://netzeroexpert.com" className="text-gray-700 hover:text-green-600">Expert</a>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="text-6xl mb-6">🌱</div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your AI Energy Advisor
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Free AI chatbot that answers your energy questions instantly.
            Solar, efficiency, incentives - we&apos;ve got you covered.
          </p>
        </div>

        {/* Chat Interface Preview */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 mb-16">
          <div className="border-b pb-4 mb-4">
            <h3 className="font-semibold text-gray-800">Chat with Zoe - AI Energy Expert</h3>
          </div>
          
          {/* Sample Messages */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-xs">
                <p className="text-sm">Hi! I&apos;m Zoe, your AI Energy Advisor. How can I help you save on energy today?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-green-600 text-white rounded-lg px-4 py-2 max-w-xs">
                <p className="text-sm">How much can I save with solar panels?</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-md">
                <p className="text-sm">Great question! With solar panels, you could save $1,200-$1,500 per year. To get exact numbers for your home, I&apos;ll need your zip code and average monthly bill. Would you like a detailed calculation?</p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask about solar, efficiency, or incentives..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
            />
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
              Send
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2">Instant Answers</h3>
            <p className="text-gray-600">Get energy advice in seconds, not days</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🆓</div>
            <h3 className="text-xl font-bold mb-2">Always Free</h3>
            <p className="text-gray-600">No credit card, no trials, just help</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Personalized</h3>
            <p className="text-gray-600">Advice tailored to your location & needs</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-green-50 rounded-2xl p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">Ready to Save on Energy?</h3>
          <p className="text-xl text-gray-700 mb-8">
            Join thousands getting free energy advice from our AI expert
          </p>
          <button className="bg-green-600 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transform hover:scale-105 transition">
            Start Chatting Now - It&apos;s Free!
          </button>
          <p className="text-sm text-gray-600 mt-4">
            No signup required • 100% free • Available 24/7
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center items-center gap-8 mt-16 text-gray-500">
          <div className="text-center">
            <div className="text-3xl font-bold">50K+</div>
            <div className="text-sm">Questions Answered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">4.9/5</div>
            <div className="text-sm">User Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-sm">Always Available</div>
          </div>
        </div>
      </div>
    </main>
  );
}