'use client';

import { useState } from 'react';
import { Play, MessageSquare, Zap, Building2, Factory, Users, Star, Shield, Clock, ArrowRight, ChevronRight } from 'lucide-react';

export default function Home() {
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedBot, setSelectedBot] = useState('commercial');

  const chatBots = {
    commercial: {
      name: 'NEXUS Commercial',
      description: 'Commercial solar construction specialist',
      price: '$149.99/month',
      avatar: '🏢',
      color: 'from-blue-500 to-blue-600'
    },
    industrial: {
      name: 'NEXUS Industrial', 
      description: 'Industrial & utility-scale expert',
      price: '$299.99/month',
      avatar: '🏭',
      color: 'from-purple-500 to-purple-600'
    },
    enterprise: {
      name: 'NEXUS Enterprise',
      description: 'Fortune 500 project management',
      price: '$499.99/month', 
      avatar: '🏛️',
      color: 'from-orange-500 to-red-600'
    }
  };

  const currentBot = chatBots[selectedBot];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">NetZero Bot</h1>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://solarvoice.ai" className="text-slate-700 hover:text-blue-600 transition-colors">Platform</a>
            <a href="https://netzerocalculator.com" className="text-slate-700 hover:text-blue-600 transition-colors">Calculator</a>
            <a href="https://netzeroexpert.com" className="text-slate-700 hover:text-blue-600 transition-colors">Expert</a>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start Free Trial
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600/10 px-4 py-2 rounded-full">
              <span className="text-blue-600 font-medium">🚀 Deploy AI Chatbots in 30 Seconds</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Enterprise AI Chatbot
            <span className="block text-blue-600">Platform</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-4xl mx-auto">
            Professional conversational AI for <strong>Commercial, C&I, Industrial & Utility-Scale</strong> solar construction projects.
            Deploy specialized chatbots instantly with subscription-based access.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all flex items-center gap-2">
              <Play className="h-5 w-5" />
              Try Live Demo
            </button>
            <button className="bg-white text-slate-800 px-8 py-4 rounded-lg text-lg font-semibold border border-slate-200 hover:border-blue-300 transition-all flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Browse Chatbots
            </button>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>24/7 Availability</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>

        {/* Chatbot Selection */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Choose Your AI Specialist</h3>
            <p className="text-lg text-slate-600">Professional chatbots tailored for commercial solar construction</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {Object.entries(chatBots).map(([key, bot]) => (
              <div 
                key={key}
                className={`cursor-pointer transition-all p-6 rounded-xl border-2 ${
                  selectedBot === key 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-200 bg-white hover:border-blue-300'
                }`}
                onClick={() => setSelectedBot(key)}
              >
                <div className="text-center">
                  <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${bot.color} flex items-center justify-center text-2xl mx-auto mb-4`}>
                    {bot.avatar}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{bot.name}</h4>
                  <p className="text-slate-600 mb-3">{bot.description}</p>
                  <p className="text-2xl font-bold text-blue-600">{bot.price}</p>
                  <div className="flex items-center justify-center gap-2 mt-2 text-sm text-slate-500">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.9/5 rating</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Chat Interface */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="flex items-center justify-between border-b pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${currentBot.color} flex items-center justify-center text-xl`}>
                {currentBot.avatar}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{currentBot.name}</h3>
                <p className="text-slate-600 text-sm">{currentBot.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Online</span>
            </div>
          </div>
          
          {/* Sample Conversation */}
          <div className="space-y-6 mb-8">
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-lg px-6 py-4 max-w-lg">
                <p className="text-slate-800">
                  Hello! I'm {currentBot.name}, your AI specialist for commercial solar construction. 
                  I can help with project planning, regulatory compliance, ROI calculations, and team coordination. 
                  What's your current project scope?
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white rounded-lg px-6 py-4 max-w-lg">
                <p>We're planning a 2.5MW commercial installation for a Fortune 500 client. Need help with timeline and compliance requirements.</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-lg px-6 py-4 max-w-xl">
                <p className="text-slate-800">
                  Excellent! For a 2.5MW commercial project, I recommend a 12-16 week timeline. Key compliance requirements include:
                  <br />• Utility interconnection approval (6-8 weeks)
                  <br />• Local permitting and inspections (4-6 weeks) 
                  <br />• OSHA safety protocols for construction teams
                  <br /><br />
                  Would you like me to generate a detailed project timeline with critical milestones?
                </p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Ask about project planning, compliance, ROI calculations..."
              className="flex-1 px-6 py-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
            />
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Send
            </button>
          </div>
        </div>

        {/* Enterprise Features */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Enterprise Chatbot Capabilities</h3>
            <p className="text-lg text-slate-600">Professional-grade AI conversation flows for complex solar projects</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Project Planning</h4>
              <p className="text-slate-600">Automated timeline creation and milestone tracking for commercial installations</p>
            </div>
            
            <div className="text-center p-6">
              <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Compliance Tracking</h4>
              <p className="text-slate-600">Real-time regulatory compliance monitoring and documentation</p>
            </div>
            
            <div className="text-center p-6">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">ROI Calculations</h4>
              <p className="text-slate-600">Instant financial modeling and return on investment analysis</p>
            </div>
            
            <div className="text-center p-6">
              <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Team Coordination</h4>
              <p className="text-slate-600">Multi-stakeholder communication and project status updates</p>
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-12 text-center max-w-5xl mx-auto text-white">
          <h3 className="text-4xl font-bold mb-6">Ready to Deploy Enterprise AI Chatbots?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join industry leaders using professional AI conversation platforms for commercial solar construction projects
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
              <Play className="h-5 w-5" />
              Start 30-Day Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Schedule Demo
            </button>
          </div>
          <div className="flex items-center justify-center gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>99.9% Uptime SLA</span>
            </div>
          </div>
        </div>

        {/* Enterprise Trust Metrics */}
        <div className="flex justify-center items-center gap-12 mt-16 text-slate-500">
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-800">50K+</div>
            <div className="text-sm">Conversations Handled</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-800">99.9%</div>
            <div className="text-sm">Uptime Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-800">24/7</div>
            <div className="text-sm">Enterprise Support</div>
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