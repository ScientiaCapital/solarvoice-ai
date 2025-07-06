"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Building2, 
  Factory, 
  Zap, 
  DollarSign, 
  Clock, 
  Star,
  Play,
  ArrowRight,
  Users,
  Shield,
  Award,
  TrendingUp
} from "lucide-react"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                🚀 Deploy AI Agents in 30 Seconds • Fortune 500 Trusted
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block">Enterprise AI Agent</span>
              <span className="block text-primary">Rental Marketplace</span>
            </h1>
            <p className="mx-auto mt-6 max-w-4xl text-base text-muted-foreground sm:text-lg md:text-xl">
              Professional AI agent deployment platform for <strong>Commercial, C&I, Industrial & Utility-Scale</strong> solar construction projects. 
              Access specialized expertise instantly for $50K+ installations with flexible financing options.
            </p>
            <div className="mx-auto mt-10 max-w-2xl space-y-6">
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="px-8 py-4 text-lg">
                  <Play className="mr-2 h-5 w-5" />
                  Explore AI Specialists
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                  <Clock className="mr-2 h-5 w-5" />
                  30-Second Demo
                </Button>
              </div>
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>$0.99 - $299.99 per deployment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Flexible financing available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>Enterprise security certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Enterprise AI Agent Marketplace
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Professional-grade AI specialists for Commercial, C&I, Industrial & Utility-Scale solar projects
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* TITAN Agent - Solar Construction Specialist */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">TITAN Agent</CardTitle>
                      <Badge variant="secondary" className="text-xs">Commercial Specialist</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">$149.99</p>
                    <p className="text-xs text-muted-foreground">per deployment</p>
                  </div>
                </div>
                <CardDescription>
                  Advanced project management for commercial and industrial solar installations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">4.9/5</span>
                    <span className="text-muted-foreground">(2,847 projects)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Streamlines large-scale commercial solar projects with automated compliance tracking and optimized scheduling.
                  </p>
                  <Button className="w-full group-hover:bg-primary/90" size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    Deploy in 30s
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* APOLLO Agent - Customer Success */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">APOLLO Agent</CardTitle>
                      <Badge variant="secondary" className="text-xs">Customer Success</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">$89.99</p>
                    <p className="text-xs text-muted-foreground">per deployment</p>
                  </div>
                </div>
                <CardDescription>
                  Strategic customer success management for utility-scale solar installations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">4.8/5</span>
                    <span className="text-muted-foreground">(1,923 deployments)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Delivers exceptional customer experiences with streamlined onboarding and comprehensive project oversight.
                  </p>
                  <Button className="w-full group-hover:bg-primary/90" size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    Deploy in 30s
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* NOVA Agent - Analytics Intelligence */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">NOVA Agent</CardTitle>
                      <Badge variant="secondary" className="text-xs">Analytics AI</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">$199.99</p>
                    <p className="text-xs text-muted-foreground">per deployment</p>
                  </div>
                </div>
                <CardDescription>
                  Comprehensive analytics and performance optimization for industrial-scale solar systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">5.0/5</span>
                    <span className="text-muted-foreground">(756 deployments)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Advanced analytics and predictive insights for utility-scale installations with comprehensive ROI tracking.
                  </p>
                  <Button className="w-full group-hover:bg-primary/90" size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    Deploy in 30s
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* HERMES Agent - Sales Intelligence */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">HERMES Agent</CardTitle>
                      <Badge variant="secondary" className="text-xs">Sales Intelligence</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">$129.99</p>
                    <p className="text-xs text-muted-foreground">per deployment</p>
                  </div>
                </div>
                <CardDescription>
                  Strategic sales optimization for enterprise commercial solar projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">4.9/5</span>
                    <span className="text-muted-foreground">(1,456 deals)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Streamlines complex sales processes with intelligent proposal automation and financial modeling.
                  </p>
                  <Button className="w-full group-hover:bg-primary/90" size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    Deploy in 30s
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* ATLAS Agent - Project Management */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                      <Factory className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">ATLAS Agent</CardTitle>
                      <Badge variant="secondary" className="text-xs">Project Management</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">$179.99</p>
                    <p className="text-xs text-muted-foreground">per deployment</p>
                  </div>
                </div>
                <CardDescription>
                  Comprehensive project coordination for utility-scale and megawatt solar installations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">4.8/5</span>
                    <span className="text-muted-foreground">(892 projects)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Manages complex utility-scale installations with timeline optimization and risk mitigation.
                  </p>
                  <Button className="w-full group-hover:bg-primary/90" size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    Deploy in 30s
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* View All Agents Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-dashed border-primary/30 hover:border-primary flex items-center justify-center">
              <CardContent className="text-center py-12">
                <div className="space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                    <ArrowRight className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">View All Agents</h3>
                    <p className="text-sm text-muted-foreground">50+ specialized AI agents available</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Browse Marketplace
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enterprise CTA Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Scale Your Solar Operations?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join industry leaders leveraging AI specialists for commercial, C&I, and utility-scale solar projects
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {/* Enterprise Onboarding */}
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Enterprise Deployment</CardTitle>
                <CardDescription>
                  For commercial solar contractors and Fortune 500 companies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" placeholder="Smith" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <Input id="email" placeholder="john@company.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input id="company" placeholder="Solar Construction Corp" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-size">Typical Project Size</Label>
                    <select className="w-full px-3 py-2 text-sm ring-offset-background bg-background border border-input rounded-md">
                      <option>$50K - $250K (Commercial)</option>
                      <option>$250K - $1M (C&I)</option>
                      <option>$1M - $10M (Industrial)</option>
                      <option>$10M+ (Utility-Scale)</option>
                    </select>
                  </div>
                  <Button className="w-full" size="lg">
                    <Play className="mr-2 h-4 w-4" />
                    Deploy First Agent (30s)
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Instant Demo */}
            <Card className="border-2 border-secondary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Live Demonstration</CardTitle>
                <CardDescription>
                  Experience enterprise AI agent deployment
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="space-y-4">
                  <div className="h-32 w-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                    <Play className="h-12 w-12 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">TITAN Agent: Commercial Solar Specialist</h3>
                    <p className="text-sm text-muted-foreground">
                      Discover how enterprise clients deploy specialized AI systems for large-scale solar construction projects with immediate access
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button className="w-full" size="lg" variant="outline">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo (2 min)
                  </Button>
                  <Button className="w-full" variant="ghost">
                    View All Specialists
                  </Button>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      <span>Financing Available</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      <span>SOC2 Certified</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
