"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowLeft, Sparkles } from "lucide-react"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const pricingTiers = [
    {
      id: 'starter',
      name: 'Starter',
      badge: 'Free Forever',
      badgeVariant: 'secondary' as const,
      monthlyPrice: 0,
      annualPrice: 0,
      description: 'Perfect for trying out SolarVoice',
      features: [
        '100 AI calls per month',
        '1 AI voice agent',
        'Basic analytics',
        'Email support',
      ],
      cta: 'Get Started Free',
      highlighted: false
    },
    {
      id: 'professional',
      name: 'Professional',
      badge: 'Most Popular',
      badgeVariant: 'default' as const,
      monthlyPrice: 99,
      annualPrice: 79,
      description: 'For growing solar businesses',
      features: [
        '2,500 AI calls per month',
        '5 AI voice agents',
        'Advanced analytics',
        'Priority support',
        'Calendar integrations',
        'Custom hold music',
      ],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      badge: 'Contact Sales',
      badgeVariant: 'outline' as const,
      monthlyPrice: null,
      annualPrice: null,
      description: 'Custom solutions for large teams',
      features: [
        'Unlimited AI calls',
        'Unlimited AI voice agents',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantees',
        'White-label options',
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ]

  const getDisplayPrice = (tier: typeof pricingTiers[0]) => {
    if (tier.monthlyPrice === null) return 'Custom'
    if (tier.monthlyPrice === 0) return 'Free'

    const price = billingCycle === 'monthly' ? tier.monthlyPrice : tier.annualPrice
    return `$${price}`
  }

  const getPeriod = (tier: typeof pricingTiers[0]) => {
    if (tier.monthlyPrice === null || tier.monthlyPrice === 0) return ''
    return '/month'
  }

  const getSavings = () => {
    const professionalSavings = (99 - 79) * 12
    return professionalSavings
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Simple, Transparent <span className="text-primary">Pricing</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-12">
                Choose the perfect plan for your solar business. No hidden fees.
              </p>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4 mb-16">
                <span className={`text-sm font-medium transition-colors ${
                  billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  Monthly
                </span>

                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    billingCycle === 'annual' ? 'bg-primary' : 'bg-muted'
                  }`}
                  aria-label="Toggle billing cycle"
                >
                  <motion.div
                    className="absolute w-5 h-5 bg-white rounded-full top-1 shadow-md"
                    animate={{
                      x: billingCycle === 'annual' ? 28 : 4
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>

                <span className={`text-sm font-medium transition-colors ${
                  billingCycle === 'annual' ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  Annual
                </span>

                {billingCycle === 'annual' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Badge className="bg-green-500 hover:bg-green-500 text-white">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Save 20%
                    </Badge>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <Card className={`h-full relative overflow-hidden transition-all duration-300 ${
                  tier.highlighted
                    ? 'border-primary shadow-xl shadow-primary/20 scale-105'
                    : 'border-border hover:border-primary/50'
                }`}>
                  {tier.highlighted && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-600 to-primary" />
                  )}

                  <CardHeader className="text-center pb-8 pt-8">
                    <div className="mb-4">
                      <Badge variant={tier.badgeVariant} className="mb-4">
                        {tier.badge}
                      </Badge>
                    </div>

                    <CardTitle className="text-2xl font-bold mb-2">
                      {tier.name}
                    </CardTitle>

                    <CardDescription className="text-base mb-6">
                      {tier.description}
                    </CardDescription>

                    <div className="mb-2">
                      <div className="text-5xl font-bold">
                        {getDisplayPrice(tier)}
                        {getPeriod(tier) && (
                          <span className="text-lg font-normal text-muted-foreground">
                            {getPeriod(tier)}
                          </span>
                        )}
                      </div>
                      {tier.highlighted && billingCycle === 'annual' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-green-600 font-medium mt-2"
                        >
                          Save ${getSavings()}/year
                        </motion.div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <Button
                      className={`w-full mb-6 ${
                        tier.highlighted
                          ? 'bg-primary hover:bg-primary/90'
                          : ''
                      }`}
                      size="lg"
                      variant={tier.highlighted ? 'default' : 'outline'}
                    >
                      {tier.cta}
                    </Button>

                    <div className="space-y-4">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        What's included:
                      </p>

                      <ul className="space-y-3">
                        {tier.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <div className="mt-0.5">
                              <Check className="h-5 w-5 text-primary flex-shrink-0" />
                            </div>
                            <span className="text-sm text-foreground">
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Need a Custom Solution?
                  </h3>

                  <p className="text-lg text-muted-foreground mb-8">
                    Our Enterprise plan is tailored to your specific needs. Get dedicated support,
                    custom integrations, and white-label options for your solar business.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Contact Sales
                    </Button>
                    <Button size="lg" variant="outline">
                      Schedule Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
