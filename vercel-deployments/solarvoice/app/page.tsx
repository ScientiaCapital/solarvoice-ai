"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Wrench,
  Clock,
  Phone,
  MapPin,
  ChevronRight,
  Truck,
  Shield,
  Calculator
} from "lucide-react"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Top Bar - Industrial Style */}
      <div className="bg-rental-darkgray text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              24/7 Support: 1-800-AI-SOLAR
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Nationwide Coverage
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/dashboard/agents" className="hover:text-rental-yellow font-bold">🎙️ Voice Agents</a>
            <a href="/dashboard/agents/create" className="hover:text-rental-yellow font-bold">➕ Create Agent</a>
            <a href="/dashboard/agents/test" className="hover:text-rental-yellow font-bold">🧪 Test Voice</a>
            <a href="/dashboard" className="hover:text-rental-yellow">Dashboard</a>
          </div>
        </div>
      </div>

      {/* Header - Equipment Rental Style */}
      <header className="bg-white border-b-4 border-rental-orange sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-rental-orange text-white px-3 py-2 font-bold text-2xl">
                SOLARVOICE
              </div>
              <span className="text-rental-darkgray font-semibold">
                AI Equipment Rentals
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="/catalog" className="text-rental-darkgray hover:text-rental-orange font-semibold">
                Equipment Catalog
              </a>
              <a href="/rates" className="text-rental-darkgray hover:text-rental-orange font-semibold">
                Rental Rates
              </a>
              <a href="/rentals" className="text-rental-darkgray hover:text-rental-orange font-semibold">
                My Rentals
              </a>
              <Button className="bg-rental-orange hover:bg-rental-yellow text-white font-bold">
                Get Quote
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Industrial Style */}
      <section className="bg-rental-lightgray py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-rental-darkgray mb-4">
                AI EQUIPMENT RENTALS
              </h1>
              <p className="text-2xl text-rental-gray mb-2">
                Solar Construction Intelligence On-Demand
              </p>
              <div className="flex items-center justify-center gap-8 mt-6 text-rental-darkgray">
                <span className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-rental-orange" />
                  No Contracts
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-rental-orange" />
                  Deploy in Minutes
                </span>
                <span className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-rental-orange" />
                  24/7 Support
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex gap-4">
                <Input
                  placeholder="What type of solar project are you working on?"
                  className="flex-1 text-lg border-2 border-rental-gray focus:border-rental-orange"
                />
                <Button className="bg-rental-orange hover:bg-rental-yellow text-white font-bold px-8">
                  Search Equipment
                </Button>
              </div>
              <div className="flex gap-4 mt-4">
                <button className="text-rental-orange hover:underline">Commercial (50kW-2MW)</button>
                <button className="text-rental-orange hover:underline">Utility-Scale (10MW+)</button>
                <button className="text-rental-orange hover:underline">Performance Analytics</button>
                <button className="text-rental-orange hover:underline">All Equipment</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Catalog Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-rental-darkgray mb-2">
              Available AI Equipment
            </h2>
            <p className="text-rental-gray">
              5 Specialist Models Ready for Immediate Deployment
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Equipment Card 1 - Commercial Project Manager */}
            <Card className="border-2 hover:border-rental-orange transition-colors">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-rental-gray text-sm font-semibold mb-1">
                      MODEL CPM-24
                    </div>
                    <CardTitle className="text-xl text-rental-darkgray">
                      Commercial Project Manager
                    </CardTitle>
                    <Badge variant="outline" className="mt-2 border-rental-orange text-rental-orange">
                      Available Now
                    </Badge>
                  </div>
                  <Wrench className="h-8 w-8 text-rental-orange" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-rental-gray">
                    Specialized AI for managing commercial and industrial solar installations (50kW-2MW systems)
                  </p>
                  
                  <div className="bg-rental-lightgray p-3 rounded">
                    <div className="text-sm font-semibold text-rental-darkgray mb-2">
                      Rental Rates:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Hourly: <span className="font-bold">$4.99</span></div>
                      <div>Daily: <span className="font-bold">$99</span></div>
                      <div>Weekly: <span className="font-bold">$499</span></div>
                      <div>Monthly: <span className="font-bold">$1,499</span></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-rental-orange hover:bg-rental-yellow text-white font-bold">
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="border-2 border-rental-orange text-rental-orange hover:bg-rental-orange hover:text-white">
                      Get Quote
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Equipment Card 2 - Customer Success */}
            <Card className="border-2 hover:border-rental-orange transition-colors">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-rental-gray text-sm font-semibold mb-1">
                      MODEL CSS-24
                    </div>
                    <CardTitle className="text-xl text-rental-darkgray">
                      Customer Success Specialist
                    </CardTitle>
                    <Badge variant="outline" className="mt-2 border-rental-orange text-rental-orange">
                      Available Now
                    </Badge>
                  </div>
                  <Wrench className="h-8 w-8 text-rental-orange" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-rental-gray">
                    Dedicated AI for managing solar customer relationships and post-installation support
                  </p>
                  
                  <div className="bg-rental-lightgray p-3 rounded">
                    <div className="text-sm font-semibold text-rental-darkgray mb-2">
                      Rental Rates:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Hourly: <span className="font-bold">$3.99</span></div>
                      <div>Daily: <span className="font-bold">$79</span></div>
                      <div>Weekly: <span className="font-bold">$399</span></div>
                      <div>Monthly: <span className="font-bold">$1,199</span></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-rental-orange hover:bg-rental-yellow text-white font-bold">
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="border-2 border-rental-orange text-rental-orange hover:bg-rental-orange hover:text-white">
                      Get Quote
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Equipment Card 3 - Performance Analytics */}
            <Card className="border-2 hover:border-rental-orange transition-colors">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-rental-gray text-sm font-semibold mb-1">
                      MODEL PAS-24
                    </div>
                    <CardTitle className="text-xl text-rental-darkgray">
                      Performance Analytics
                    </CardTitle>
                    <Badge variant="outline" className="mt-2 border-rental-orange text-rental-orange">
                      Available Now
                    </Badge>
                  </div>
                  <Wrench className="h-8 w-8 text-rental-orange" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-rental-gray">
                    Advanced AI for solar energy production analysis, optimization, and predictive maintenance
                  </p>
                  
                  <div className="bg-rental-lightgray p-3 rounded">
                    <div className="text-sm font-semibold text-rental-darkgray mb-2">
                      Rental Rates:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Hourly: <span className="font-bold">$5.99</span></div>
                      <div>Daily: <span className="font-bold">$119</span></div>
                      <div>Weekly: <span className="font-bold">$599</span></div>
                      <div>Monthly: <span className="font-bold">$1,799</span></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-rental-orange hover:bg-rental-yellow text-white font-bold">
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="border-2 border-rental-orange text-rental-orange hover:bg-rental-orange hover:text-white">
                      Get Quote
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Equipment Card 4 - Sales & Lead Generation */}
            <Card className="border-2 hover:border-rental-orange transition-colors">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-rental-gray text-sm font-semibold mb-1">
                      MODEL SLG-24
                    </div>
                    <CardTitle className="text-xl text-rental-darkgray">
                      Sales & Lead Generation
                    </CardTitle>
                    <Badge variant="outline" className="mt-2 border-rental-orange text-rental-orange">
                      Available Now
                    </Badge>
                  </div>
                  <Wrench className="h-8 w-8 text-rental-orange" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-rental-gray">
                    AI-powered sales assistant specialized in solar energy system sales and lead conversion
                  </p>
                  
                  <div className="bg-rental-lightgray p-3 rounded">
                    <div className="text-sm font-semibold text-rental-darkgray mb-2">
                      Rental Rates:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Hourly: <span className="font-bold">$4.49</span></div>
                      <div>Daily: <span className="font-bold">$89</span></div>
                      <div>Weekly: <span className="font-bold">$449</span></div>
                      <div>Monthly: <span className="font-bold">$1,349</span></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-rental-orange hover:bg-rental-yellow text-white font-bold">
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="border-2 border-rental-orange text-rental-orange hover:bg-rental-orange hover:text-white">
                      Get Quote
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Equipment Card 5 - Utility Integration */}
            <Card className="border-2 hover:border-rental-orange transition-colors">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-rental-gray text-sm font-semibold mb-1">
                      MODEL UIC-24
                    </div>
                    <CardTitle className="text-xl text-rental-darkgray">
                      Utility Integration
                    </CardTitle>
                    <Badge variant="outline" className="mt-2 border-rental-orange text-rental-orange">
                      Available Now
                    </Badge>
                  </div>
                  <Wrench className="h-8 w-8 text-rental-orange" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-rental-gray">
                    Enterprise AI for coordinating massive solar installations (10MW+ utility and grid-scale projects)
                  </p>
                  
                  <div className="bg-rental-lightgray p-3 rounded">
                    <div className="text-sm font-semibold text-rental-darkgray mb-2">
                      Rental Rates:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Hourly: <span className="font-bold">$5.49</span></div>
                      <div>Daily: <span className="font-bold">$109</span></div>
                      <div>Weekly: <span className="font-bold">$549</span></div>
                      <div>Monthly: <span className="font-bold">$1,649</span></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-rental-orange hover:bg-rental-yellow text-white font-bold">
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="border-2 border-rental-orange text-rental-orange hover:bg-rental-orange hover:text-white">
                      Get Quote
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Browse All Card */}
            <Card className="border-2 border-dashed border-rental-gray hover:border-rental-orange transition-colors">
              <CardContent className="flex flex-col items-center justify-center h-full min-h-[400px]">
                <Calculator className="h-16 w-16 text-rental-orange mb-4" />
                <h3 className="text-xl font-bold text-rental-darkgray mb-2">
                  Need a Custom Solution?
                </h3>
                <p className="text-sm text-rental-gray text-center mb-6">
                  Contact us for enterprise rates and custom AI equipment packages
                </p>
                <Button className="bg-rental-orange hover:bg-rental-yellow text-white font-bold">
                  Request Custom Quote
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-rental-lightgray py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-rental-darkgray mb-8 text-center">
            How AI Equipment Rental Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-rental-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold text-rental-darkgray mb-2">Select Equipment</h3>
              <p className="text-sm text-rental-gray">
                Choose the AI model that fits your solar project needs
              </p>
            </div>
            <div className="text-center">
              <div className="bg-rental-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold text-rental-darkgray mb-2">Choose Duration</h3>
              <p className="text-sm text-rental-gray">
                Rent by the hour, day, week, or month - no contracts
              </p>
            </div>
            <div className="text-center">
              <div className="bg-rental-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold text-rental-darkgray mb-2">Deploy Instantly</h3>
              <p className="text-sm text-rental-gray">
                AI equipment deploys in minutes to your project
              </p>
            </div>
            <div className="text-center">
              <div className="bg-rental-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-bold text-rental-darkgray mb-2">24/7 Support</h3>
              <p className="text-sm text-rental-gray">
                Technical support available around the clock
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-rental-darkgray text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Rent AI Equipment for Your Solar Project?
          </h2>
          <p className="text-xl mb-8">
            Join contractors using AI to complete projects faster and more efficiently
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-rental-orange hover:bg-rental-yellow text-white font-bold text-lg px-8 py-3">
              Browse Equipment Catalog
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-rental-darkgray font-bold text-lg px-8 py-3">
              Get Enterprise Quote
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-8">
            <span className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              1-800-AI-SOLAR
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              24/7 Support
            </span>
            <span className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              No Contracts Required
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-rental-orange py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-rental-darkgray mb-4">Equipment Categories</h3>
              <ul className="space-y-2 text-sm text-rental-gray">
                <li><a href="#" className="hover:text-rental-orange">Commercial Solar</a></li>
                <li><a href="#" className="hover:text-rental-orange">Utility-Scale</a></li>
                <li><a href="#" className="hover:text-rental-orange">Performance Analytics</a></li>
                <li><a href="#" className="hover:text-rental-orange">Customer Success</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-rental-darkgray mb-4">Rental Information</h3>
              <ul className="space-y-2 text-sm text-rental-gray">
                <li><a href="#" className="hover:text-rental-orange">Rental Rates</a></li>
                <li><a href="#" className="hover:text-rental-orange">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-rental-orange">Fleet Portal</a></li>
                <li><a href="#" className="hover:text-rental-orange">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-rental-darkgray mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-rental-gray">
                <li><a href="#" className="hover:text-rental-orange">About Us</a></li>
                <li><a href="#" className="hover:text-rental-orange">Contact</a></li>
                <li><a href="#" className="hover:text-rental-orange">Careers</a></li>
                <li><a href="#" className="hover:text-rental-orange">Locations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-rental-darkgray mb-4">Contact Us</h3>
              <p className="text-sm text-rental-gray mb-2">
                24/7 Support: 1-800-AI-SOLAR
              </p>
              <p className="text-sm text-rental-gray mb-2">
                sales@solarvoice.ai
              </p>
              <p className="text-sm text-rental-gray">
                Enterprise quotes available
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-rental-gray text-center text-sm text-rental-gray">
            © 2024 SolarVoice AI Equipment Rentals. All rights reserved. | Private Beta
          </div>
        </div>
      </footer>
    </main>
  )
}