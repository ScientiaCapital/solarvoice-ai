export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold text-orange-600">SolarVoice.ai</h1>
          <div className="space-x-6">
            <a href="https://netzerobot.com" className="text-gray-700 hover:text-orange-600">AI Chat</a>
            <a href="https://netzerocalculator.com" className="text-gray-700 hover:text-orange-600">Calculator</a>
            <a href="https://netzeroexpert.com" className="text-gray-700 hover:text-orange-600">Expert</a>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700">
              Start Free Trial
            </button>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AI Agents for Solar & Construction
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Rent AI agents like you rent equipment. 30-second setup. No contracts.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transform hover:scale-105 transition">
              Browse AI Agents
            </button>
            <button className="bg-white border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-50 transform hover:scale-105 transition">
              Watch 30s Demo
            </button>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">30-Second Setup</h3>
              <p className="text-gray-600">Pick an agent, enter payment, get instant phone number. That&apos;s it.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Industry-Specific</h3>
              <p className="text-gray-600">200+ agents trained for solar, HVAC, roofing, and construction.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Pay As You Go</h3>
              <p className="text-gray-600">From $149/month per agent. Cancel anytime. BNPL available.</p>
            </div>
          </div>
        </div>

        {/* Agent Preview Section */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-center mb-12">Popular AI Agents</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Solar Sales Pro", role: "Qualifies leads, books appointments", price: "$149/mo" },
              { name: "Permit Master", role: "Handles permit applications", price: "$199/mo" },
              { name: "Safety Inspector", role: "OSHA compliance monitoring", price: "$249/mo" },
              { name: "Project Manager", role: "Coordinates crews & schedules", price: "$299/mo" }
            ].map((agent, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
                <h4 className="font-bold text-lg mb-2">{agent.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{agent.role}</p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600 font-bold">{agent.price}</span>
                  <button className="text-orange-600 hover:text-orange-700 font-medium">
                    Try Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgency Banner */}
        <div className="mt-16 bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-red-800 mb-2">
            ⚠️ 30% Solar Tax Credit Expires in 487 Days!
          </h3>
          <p className="text-red-700 mb-4">
            Most solar companies stop selling by August. Act now to secure your tax savings.
          </p>
          <a href="https://netzerocalculator.com" className="text-red-800 underline font-medium">
            Calculate Your Savings →
          </a>
        </div>
      </div>
    </main>
  );
}
