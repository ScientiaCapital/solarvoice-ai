"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Mic, 
  Play, 
  ArrowRight,
  Building2,
  Factory,
  Users,
  TrendingUp,
  Calculator,
  Globe
} from "lucide-react"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  const subscriptionTiers = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small solar contractors',
      monthlyPrice: 99,
      annualPrice: 990,
      popular: false,
      projects: '1-10 projects',
      features: [
        'Up to 10 active projects',
        'Basic AI agent deployments',
        'Voice command interface',
        'Standard support',
        'Project templates',
        'Basic analytics',
        '3 agent types included'
      ],
      agentCredits: 50,
      limitations: ['Limited to 3 agent types', 'Email support only']
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing solar businesses',
      monthlyPrice: 299,
      annualPrice: 2990,
      popular: true,
      projects: '11-50 projects',
      features: [
        'Up to 50 active projects',
        'All AI agent types',
        'Advanced voice commands',
        'Priority support',
        'Custom project templates',
        'Advanced analytics & reporting',
        'Team collaboration tools',
        'API access',
        'White-label options'
      ],
      agentCredits: 200,
      limitations: []
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large solar companies & enterprise clients',
      monthlyPrice: 999,
      annualPrice: 9990,
      popular: false,
      projects: '51+ projects',
      features: [
        'Unlimited projects',
        'All AI agents + custom agents',
        'Voice biometric authentication',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security features',
        'Multi-tenant architecture',
        'SLA guarantees',
        'Custom training & onboarding'
      ],
      agentCredits: 1000,
      limitations: []
    }
  ]

  const agentPricing = [
    {
      id: 'commercial-manager',
      name: 'Commercial Project Manager',
      specialty: 'Commercial & Industrial Solar Projects',
      icon: Building2,
      price: 149.99,
      description: 'Advanced project management for commercial solar installations',
      features: ['Automated compliance tracking', 'Resource optimization', 'Risk assessment']
    },
    {
      id: 'customer-success',
      name: 'Customer Success Specialist',
      specialty: 'Utility-Scale Customer Management',
      icon: Users,
      price: 89.99,
      description: 'Strategic customer success for utility-scale installations',
      features: ['Customer onboarding', 'Satisfaction tracking', 'Renewal optimization']
    },
    {
      id: 'performance-analyst',
      name: 'Performance Analytics Specialist',
      specialty: 'Solar System Analytics & Optimization',
      icon: TrendingUp,
      price: 199.99,
      description: 'Comprehensive analytics and performance optimization',
      features: ['Predictive analytics', 'ROI tracking', 'Custom reporting']
    },
    {
      id: 'sales-specialist',
      name: 'Sales Automation Specialist',
      specialty: 'Solar Sales & Lead Management',
      icon: Zap,
      price: 129.99,
      description: 'Strategic sales optimization for enterprise projects',
      features: ['Lead qualification', 'Proposal automation', 'Pipeline management']
    },
    {
      id: 'utility-coordinator',
      name: 'Utility-Scale Coordinator',
      specialty: 'Utility-Scale & Megawatt Projects',
      icon: Factory,
      price: 179.99,
      description: 'Comprehensive coordination for utility-scale installations',
      features: ['Timeline optimization', 'Resource allocation', 'Quality assurance']
    }
  ]

  const getPrice = (tier: typeof subscriptionTiers[0]) => {
    const price = billingCycle === 'monthly' ? tier.monthlyPrice : tier.annualPrice
    const period = billingCycle === 'monthly' ? 'month' : 'year'
    const savings = billingCycle === 'annual' ? tier.monthlyPrice * 12 - tier.annualPrice : 0
    return { price, period, savings }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Badge className="glass-card px-6 py-3 mb-4 text-sm font-medium border-2 border-primary/30 bg-primary/10 text-primary">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-2"
                >
                  <Mic className="h-4 w-4" />
                </motion.div>
                Voice-Activated Pricing Calculator
              </Badge>
              
              {/* Interactive Voice Calculator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="glass-card p-4 max-w-md mx-auto border border-primary/20"
              >
                <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Try saying:</span>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium text-primary">
                    "Calculate pricing for 100kW commercial solar"
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Or "Compare Professional vs Enterprise plans"
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              <span className="gradient-text-ai">Transparent Pricing</span><br />
              <span className="gradient-text-solar">for Solar Innovation</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              Choose the perfect plan for your solar business. From small contractors to enterprise companies.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex items-center justify-center gap-4 mb-12"
            >
              <span className={billingCycle === 'monthly' ? 'font-semibold' : 'text-muted-foreground'}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className={`relative w-16 h-8 rounded-full transition-colors ${
                  billingCycle === 'annual' ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-9' : 'translate-x-1'
                }`} />
              </button>
              <span className={billingCycle === 'annual' ? 'font-semibold' : 'text-muted-foreground'}>
                Annual
                <Badge className="ml-2 bg-green-500">Save 17%</Badge>
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subscription Tiers */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {subscriptionTiers.map((tier, index) => {
              const { price, period, savings } = getPrice(tier)
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="relative"
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <Card className={`h-full ${tier.popular ? 'border-primary shadow-xl scale-105' : 'border-border'} transition-all duration-300 hover:shadow-lg`}>
                    <CardHeader className="text-center pb-8">
                      <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                      <CardDescription className="text-base">{tier.description}</CardDescription>
                      <div className="mt-6">
                        <div className="text-4xl font-bold">
                          ${price}
                          <span className="text-lg font-normal text-muted-foreground">/{period}</span>
                        </div>
                        {savings > 0 && (
                          <div className="text-green-600 text-sm mt-1">
                            Save ${savings} annually!
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">{tier.projects}</div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <Badge variant="outline" className="px-3 py-1">
                            {tier.agentCredits} Agent Credits/Month
                          </Badge>
                        </div>
                        
                        <ul className="space-y-3">
                          {tier.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {tier.limitations.length > 0 && (
                          <div className="pt-4 border-t">
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">Limitations:</h4>
                            <ul className="space-y-1">
                              {tier.limitations.map((limitation, limitIndex) => (
                                <li key={limitIndex} className="text-xs text-muted-foreground">
                                  • {limitation}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <Button 
                          className={`w-full mt-6 ${tier.popular ? 'btn-energy' : ''}`}
                          size="lg"
                          onClick={() => setSelectedTier(tier.id)}
                        >
                          <Mic className="mr-2 h-4 w-4" />
                          Get Started
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Agent Pricing */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              <span className="gradient-text-ai">AI Agent Specialists</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deploy specialized AI agents on-demand. Pay per deployment with voice activation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {agentPricing.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card border-0 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <agent.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${agent.price}</div>
                        <div className="text-xs text-muted-foreground">per deployment</div>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {agent.specialty}
                    </Badge>
                    <CardDescription className="mt-2">
                      {agent.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Key Capabilities:</h4>
                        <ul className="space-y-1">
                          {agent.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button variant="outline" className="w-full" size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        Try Voice Command
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass-card border-0 max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <Globe className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">
                Need Something Custom?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                We work with enterprise companies to build custom AI solutions for their solar operations. 
                Get dedicated support, custom integrations, and white-label options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-energy">
                  <Mic className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline">
                  <Shield className="mr-2 h-5 w-5" />
                  Enterprise Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How do voice commands work with pricing?",
                answer: "Simply say 'Deploy Titan agent' and the system will automatically charge your account based on your subscription tier and available credits."
              },
              {
                question: "Can I switch between subscription tiers?",
                answer: "Yes! You can upgrade or downgrade your subscription at any time. Changes take effect at the next billing cycle."
              },
              {
                question: "What happens if I exceed my agent credits?",
                answer: "You'll be charged per-deployment rates for additional usage. We'll send notifications when you're approaching your limits."
              },
              {
                question: "Is there a free trial available?",
                answer: "Yes! All new customers get a 14-day free trial with access to all features and 25 complimentary agent deployments."
              }
            ].map((faq, index) => (
              <Card key={index} className="glass-card border-0">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">{faq.question}</h4>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}