'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PLANS, formatPrice, type PlanId } from '@/lib/stripe-config'
import {
  Check,
  Zap,
  Building2,
  Rocket,
  ArrowLeft,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'

export default function PlansPage() {
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null)
  const [currentPlan] = useState<PlanId>('pro') // Would come from API

  const planIcons = {
    starter: Zap,
    pro: Building2,
    enterprise: Rocket,
  }

  const handleSelectPlan = async (planId: PlanId) => {
    if (planId === currentPlan) return

    setLoadingPlan(planId)

    try {
      // For enterprise, redirect to contact
      if (planId === 'enterprise') {
        // In production, this would open a contact modal or redirect
        window.location.href = 'mailto:sales@solarvoice.ai?subject=Enterprise%20Plan%20Inquiry'
        return
      }

      // Create checkout session
      const response = await fetch('/api/billing/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (error) {
      console.error('Failed to create checkout:', error)
      // Show error toast in production
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/billing">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Choose Your Plan</h1>
          <p className="text-muted-foreground mt-1">
            Select the plan that best fits your business needs
          </p>
        </div>
      </div>

      {/* Billing Toggle (Annual/Monthly) */}
      <div className="flex items-center justify-center gap-4">
        <span className="text-sm font-medium">Monthly</span>
        <Button variant="outline" size="sm" disabled>
          Save 20% with Annual
        </Button>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Coming Soon
        </Badge>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {(Object.entries(PLANS) as [PlanId, typeof PLANS[PlanId]][]).map(([planId, plan]) => {
          const Icon = planIcons[planId]
          const isCurrentPlan = planId === currentPlan
          const isRecommended = 'recommended' in plan && plan.recommended

          return (
            <Card
              key={planId}
              className={`relative ${
                isRecommended
                  ? 'border-blue-500 shadow-lg shadow-blue-100'
                  : isCurrentPlan
                  ? 'border-green-500'
                  : ''
              }`}
            >
              {/* Recommended Badge */}
              {isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                </div>
              )}

              {/* Current Plan Badge */}
              {isCurrentPlan && (
                <div className="absolute -top-3 right-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Current Plan
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pt-8">
                <div className="flex justify-center mb-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-full ${
                    isRecommended ? 'bg-blue-600 text-white' : 'bg-slate-100'
                  }`}>
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-4xl font-bold text-foreground">
                    {formatPrice(plan.priceMonthly)}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{plan.maxAgents}</p>
                    <p className="text-xs text-muted-foreground">Voice Agents</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {plan.maxCallsMonthly.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Calls/Month</p>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Highlight */}
                {'featuresHighlight' in plan && plan.featuresHighlight && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    {plan.featuresHighlight.map((highlight, index) => (
                      <p key={index} className="text-sm text-blue-800">
                        {highlight}
                      </p>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    isRecommended
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : isCurrentPlan
                      ? 'bg-green-600 hover:bg-green-600'
                      : ''
                  }`}
                  variant={isCurrentPlan ? 'secondary' : 'default'}
                  disabled={isCurrentPlan || loadingPlan === planId}
                  onClick={() => handleSelectPlan(planId)}
                >
                  {loadingPlan === planId ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : isCurrentPlan ? (
                    'Current Plan'
                  ) : planId === 'enterprise' ? (
                    'Contact Sales'
                  ) : (
                    `Upgrade to ${plan.name}`
                  )}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* FAQ Section */}
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-semibold mb-2">What happens if I exceed my call limit?</h4>
            <p className="text-sm text-muted-foreground">
              You will be charged $0.15 per additional call beyond your monthly limit.
              We will notify you when you reach 80% of your quota.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Can I change plans at any time?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! You can upgrade or downgrade your plan at any time. Changes take
              effect immediately, with prorated billing.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards (Visa, Mastercard, American Express)
              and ACH bank transfers for enterprise customers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Is there a free trial?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! All plans include a 14-day free trial. No credit card required
              to start. Cancel anytime.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Enterprise CTA */}
      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <CardContent className="py-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Need a custom solution?</h3>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Our enterprise plans offer unlimited agents, custom integrations, dedicated support,
              and volume discounts for large-scale deployments.
            </p>
            <Button
              className="bg-white text-slate-900 hover:bg-slate-100"
              onClick={() => handleSelectPlan('enterprise')}
            >
              Talk to Sales
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
