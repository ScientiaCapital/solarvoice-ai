'use client';

import { useState } from 'react';

export default function Home() {
  const [monthlyBill, setMonthlyBill] = useState('200');
  const [zipCode, setZipCode] = useState('');
  const [roofSize, setRoofSize] = useState('1500');

  // Calculate basic savings
  const annualBill = parseInt(monthlyBill) * 12;
  const systemSize = Math.ceil((annualBill / 1200) * 1.2); // Rough estimate
  const systemCost = systemSize * 3000; // $3/watt average
  const federalCredit = systemCost * 0.30;
  const netCost = systemCost - federalCredit;
  const annualSavings = annualBill * 0.90; // 90% offset
  const paybackYears = (netCost / annualSavings).toFixed(1);
  const lifetimeSavings = (annualSavings * 25 - netCost).toLocaleString();

  // Days until ITC expires (Dec 31, 2026)
  const daysUntilExpiry = Math.floor((new Date('2026-12-31').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold text-yellow-600">NetZero Calculator</h1>
          <div className="space-x-6">
            <a href="https://solarvoice.ai" className="text-gray-700 hover:text-yellow-600">Platform</a>
            <a href="https://netzerobot.com" className="text-gray-700 hover:text-yellow-600">AI Chat</a>
            <a href="https://netzeroexpert.com" className="text-gray-700 hover:text-yellow-600">Expert</a>
          </div>
        </nav>

        {/* Urgency Banner */}
        <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 mb-8 text-center">
          <h2 className="text-2xl font-bold text-red-800">
            ⚠️ 30% Federal Tax Credit Expires in {daysUntilExpiry} Days!
          </h2>
          <p className="text-red-700 mt-2">
            Sales must close by August 31st for year-end installation. Act NOW!
          </p>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="text-6xl mb-6">🧮</div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Solar Savings Calculator
          </h2>
          <p className="text-xl md:text-2xl text-gray-700">
            See your exact savings with solar panels. Includes all incentives & tax credits.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Your Energy Profile</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Electric Bill
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(e.target.value)}
                    className="w-full pl-8 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  placeholder="Enter ZIP for local incentives"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roof Size (sq ft)
                </label>
                <input
                  type="number"
                  value={roofSize}
                  onChange={(e) => setRoofSize(e.target.value)}
                  className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>

              <button className="w-full bg-yellow-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition">
                Calculate My Savings
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Your Solar Investment</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">System Size Needed</span>
                <span className="font-bold">{systemSize} kW</span>
              </div>
              
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">System Cost</span>
                <span className="font-bold">${systemCost.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b text-green-600">
                <span>30% Federal Tax Credit</span>
                <span className="font-bold">-${federalCredit.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b text-lg">
                <span className="font-semibold">Net Cost After Incentives</span>
                <span className="font-bold">${netCost.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Payback Period</span>
                <span className="font-bold">{paybackYears} years</span>
              </div>
              
              <div className="flex justify-between py-3 text-xl bg-green-50 rounded-lg px-4">
                <span className="font-semibold text-green-800">25-Year Savings</span>
                <span className="font-bold text-green-800">${lifetimeSavings}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This is an estimate. Actual savings depend on sun exposure, 
                utility rates, and local incentives.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">Ready to Go Solar?</h3>
          <p className="text-xl text-gray-700 mb-8">
            Get exact quotes from certified installers in your area
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://solarvoice.ai" className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transform hover:scale-105 transition">
              Find Installers Now
            </a>
            <a href="https://netzeroexpert.com" className="bg-white border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-50 transform hover:scale-105 transition">
              Talk to an Expert
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}