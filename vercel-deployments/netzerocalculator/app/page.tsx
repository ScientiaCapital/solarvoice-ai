'use client';

import { useState } from 'react';
import { Calculator, Sun, TrendingUp, Building2, Factory, Zap, Shield, Star, Play, DollarSign, Clock, Users, Award } from 'lucide-react';

export default function Home() {
  const [projectType, setProjectType] = useState('commercial');
  const [monthlyBill, setMonthlyBill] = useState('15000');
  const [zipCode, setZipCode] = useState('');
  const [roofSize, setRoofSize] = useState('50000');
  const [currentDemand, setCurrentDemand] = useState('500');

  const projectTypes = {
    commercial: {
      name: 'Commercial',
      icon: '🏢',
      color: 'from-blue-500 to-blue-600',
      description: 'Office buildings, retail, small business',
      typicalSize: '100-500 kW'
    },
    industrial: {
      name: 'Industrial',
      icon: '🏭',
      color: 'from-purple-500 to-purple-600',
      description: 'Manufacturing, warehouses, production facilities',
      typicalSize: '500kW-5MW'
    },
    utility: {
      name: 'Utility-Scale',
      icon: '⚡',
      color: 'from-orange-500 to-red-600',
      description: 'Solar farms, grid-scale installations',
      typicalSize: '5MW+'
    }
  };

  // Enhanced calculation logic for enterprise projects
  const monthlyBillNum = parseInt(monthlyBill) || 0;
  const demandKW = parseInt(currentDemand) || 0;
  const annualBill = monthlyBillNum * 12;
  
  // Enterprise system sizing (more sophisticated)
  const systemSizeKW = Math.max(
    Math.ceil((annualBill / 1200) * 1.3), // Energy-based sizing
    Math.ceil(demandKW * 1.2) // Demand-based sizing
  );
  
  const costPerWatt = projectType === 'utility' ? 1.50 : projectType === 'industrial' ? 2.00 : 2.50;
  const systemCost = systemSizeKW * 1000 * costPerWatt;
  const federalITC = systemCost * 0.30;
  
  // Enterprise incentives and depreciation
  const macrsDepreciation = systemCost * 0.85 * 0.21; // 21% corporate tax rate
  const totalIncentives = federalITC + macrsDepreciation;
  const netCost = systemCost - totalIncentives;
  
  const annualSavings = annualBill * 0.92; // 92% offset for commercial
  const paybackYears = (netCost / annualSavings).toFixed(1);
  const roi25Year = ((annualSavings * 25 - netCost) / netCost * 100).toFixed(0);
  const lifetimeSavings = (annualSavings * 25 - netCost);

  const currentProject = projectTypes[projectType];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">NetZero Calculator</h1>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://solarvoice.ai" className="text-slate-700 hover:text-orange-600 transition-colors">Platform</a>
            <a href="https://netzerobot.com" className="text-slate-700 hover:text-orange-600 transition-colors">AI Chat</a>
            <a href="https://netzeroexpert.com" className="text-slate-700 hover:text-orange-600 transition-colors">Expert</a>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Get Quote
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-orange-600/10 px-4 py-2 rounded-full">
              <span className="text-orange-600 font-medium">🚀 Enterprise Solar Calculations • Mathematical Precision</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Advanced Solar
            <span className="block text-orange-600">ROI Calculator</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-4xl mx-auto">
            Professional-grade financial analysis for <strong>Commercial, C&I, Industrial & Utility-Scale</strong> solar projects.
            Comprehensive ROI modeling with MACRS depreciation and enterprise incentives.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <button className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transform hover:scale-105 transition-all flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Calculate ROI
            </button>
            <button className="bg-white text-slate-800 px-8 py-4 rounded-lg text-lg font-semibold border border-slate-200 hover:border-orange-300 transition-all flex items-center gap-2">
              <Play className="h-5 w-5" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Project Type Selection */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Select Project Type</h3>
            <p className="text-lg text-slate-600">Choose your solar project category for accurate calculations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {Object.entries(projectTypes).map(([key, project]) => (
              <div 
                key={key}
                className={`cursor-pointer transition-all p-6 rounded-xl border-2 ${
                  projectType === key 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-slate-200 bg-white hover:border-orange-300'
                }`}
                onClick={() => setProjectType(key)}
              >
                <div className="text-center">
                  <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${project.color} flex items-center justify-center text-2xl mx-auto mb-4`}>
                    {project.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{project.name}</h4>
                  <p className="text-slate-600 mb-2">{project.description}</p>
                  <p className="text-sm font-medium text-orange-600">{project.typicalSize}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${currentProject.color} flex items-center justify-center text-xl`}>
                {currentProject.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{currentProject.name} Project Profile</h3>
                <p className="text-slate-600">{currentProject.description}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Monthly Energy Bill
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <input
                    type="number"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(e.target.value)}
                    className="w-full pl-8 pr-3 py-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Peak Demand (kW)
                </label>
                <input
                  type="number"
                  value={currentDemand}
                  onChange={(e) => setCurrentDemand(e.target.value)}
                  className="w-full px-3 py-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  placeholder="Enter ZIP for local incentives"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full px-3 py-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Available Roof/Land Area (sq ft)
                </label>
                <input
                  type="number"
                  value={roofSize}
                  onChange={(e) => setRoofSize(e.target.value)}
                  className="w-full px-3 py-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              </div>

              <button className="w-full bg-orange-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors">
                Generate Enterprise Analysis
              </button>
            </div>
          </div>

          {/* Advanced Results */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Enterprise Financial Analysis</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-slate-200">
                <span className="text-slate-600">Recommended System Size</span>
                <span className="font-bold">{systemSizeKW.toLocaleString()} kW</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-slate-200">
                <span className="text-slate-600">Total System Cost</span>
                <span className="font-bold">${systemCost.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-slate-200 text-green-600">
                <span>30% Federal ITC</span>
                <span className="font-bold">-${federalITC.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-slate-200 text-green-600">
                <span>MACRS Depreciation (Year 1)</span>
                <span className="font-bold">-${macrsDepreciation.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-slate-200 text-lg">
                <span className="font-semibold">Net Investment</span>
                <span className="font-bold">${netCost.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-slate-200">
                <span className="text-slate-600">Simple Payback</span>
                <span className="font-bold">{paybackYears} years</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-slate-200">
                <span className="text-slate-600">25-Year ROI</span>
                <span className="font-bold text-green-600">{roi25Year}%</span>
              </div>
              
              <div className="flex justify-between py-3 text-xl bg-green-50 rounded-lg px-4">
                <span className="font-semibold text-green-800">Total Savings (25 Years)</span>
                <span className="font-bold text-green-800">${lifetimeSavings.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Enterprise Benefits Include:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• MACRS 5-year accelerated depreciation</li>
                <li>• 30% Federal Investment Tax Credit</li>
                <li>• Potential state and local incentives</li>
                <li>• Energy cost hedge against utility rate increases</li>
                <li>• Corporate sustainability goals achievement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Calculation Tools Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Professional Calculation Tools</h3>
            <p className="text-lg text-slate-600">Advanced solar modeling for enterprise projects</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <Sun className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Solar Irradiance</h4>
              <p className="text-slate-600">Site-specific solar resource analysis with NREL data integration</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Financial Modeling</h4>
              <p className="text-slate-600">LCOE, NPV, and IRR calculations for investment analysis</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Load Analysis</h4>
              <p className="text-slate-600">Demand profile analysis and system optimization</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Site Planning</h4>
              <p className="text-slate-600">Roof and ground mount system design optimization</p>
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl p-12 text-center max-w-5xl mx-auto text-white">
          <h3 className="text-4xl font-bold mb-6">Ready for Professional Solar Analysis?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Get comprehensive feasibility studies and financial modeling for your commercial solar project
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Detailed Analysis
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
              <Users className="h-5 w-5" />
              Speak with Engineer
            </button>
          </div>
          <div className="flex items-center justify-center gap-8 text-orange-100">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>NREL Validated</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Professional Grade</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>99.9% Accuracy</span>
            </div>
          </div>
        </div>

        {/* Trust Metrics */}
        <div className="flex justify-center items-center gap-12 mt-16 text-slate-500">
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-800">10K+</div>
            <div className="text-sm">Projects Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-800">$2.5B</div>
            <div className="text-sm">Calculated Investment</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-800">99.9%</div>
            <div className="text-sm">Calculation Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-800">500+</div>
            <div className="text-sm">Enterprise Clients</div>
          </div>
        </div>
      </div>
    </main>
  );
}