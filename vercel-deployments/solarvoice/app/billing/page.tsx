'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { PLANS, formatPrice, AGENT_PRICING_TIERS } from '@/lib/stripe-config'
import {
  Wallet,
  CreditCard,
  TrendingUp,
  Phone,
  Clock,
  CheckCircle2,
  ArrowRight,
  Zap,
  Building2,
  Factory,
  Home,
} from 'lucide-react'

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Current plan state (would come from API/database in production)
  const currentPlan = {
    id: 'pro' as const,
    name: PLANS.pro.name,
    price: formatPrice(PLANS.pro.priceMonthly),
    nextBillingDate: 'Jan 15, 2026',
    usedCalls: 1847,
    maxCalls: PLANS.pro.maxCallsMonthly,
    usedAgents: 3,
    maxAgents: PLANS.pro.maxAgents,
  }

  const usagePercentage = (currentPlan.usedCalls / currentPlan.maxCalls) * 100
  const agentPercentage = (currentPlan.usedAgents / currentPlan.maxAgents) * 100

  // Transaction history (would come from API/database in production)
  const transactions = [
    { id: '1', date: 'Dec 15, 2025', description: 'Professional Plan - Monthly', amount: 29900, type: 'subscription' as const },
    { id: '2', date: 'Dec 10, 2025', description: 'Overage: 50 additional calls', amount: 750, type: 'overage' as const },
    { id: '3', date: 'Nov 15, 2025', description: 'Professional Plan - Monthly', amount: 29900, type: 'subscription' as const },
    { id: '4', date: 'Oct 15, 2025', description: 'Professional Plan - Monthly', amount: 29900, type: 'subscription' as const },
  ]

  const handleUpgrade = async () => {
    setIsLoading(true)
    // Navigate to plans page
    window.location.href = '/billing/plans'
  }

  return (
    <div className="space-y-8 p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground mt-2">
            Manage your subscription, usage, and payment methods
          </p>
        </div>
        <Link href="/billing/plans">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Zap className="mr-2 h-4 w-4" />
            View Plans
          </Button>
        </Link>
      </div>

      {/* Current Plan & Usage Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Plan Card */}
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Wallet className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">{currentPlan.name} Plan</CardTitle>
                  <CardDescription className="text-lg font-semibold text-blue-600">
                    {currentPlan.price}/month
                  </CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Next billing date</span>
              <span className="font-medium">{currentPlan.nextBillingDate}</span>
            </div>
            <Button
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={handleUpgrade}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Change Plan'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Usage Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Monthly Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Calls Usage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  AI Calls
                </span>
                <span className="font-medium">
                  {currentPlan.usedCalls.toLocaleString()} / {currentPlan.maxCalls.toLocaleString()}
                </span>
              </div>
              <Progress value={usagePercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {Math.round(usagePercentage)}% used this month
              </p>
            </div>

            {/* Agents Usage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Active Agents
                </span>
                <span className="font-medium">
                  {currentPlan.usedAgents} / {currentPlan.maxAgents}
                </span>
              </div>
              <Progress value={agentPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {currentPlan.maxAgents - currentPlan.usedAgents} agent slots available
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Pricing Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Agent Pricing</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {Object.entries(AGENT_PRICING_TIERS).map(([key, tier]) => {
            const icons = {
              residential: Home,
              commercial: Building2,
              industrial: Factory,
            }
            const Icon = icons[key as keyof typeof icons]

            return (
              <Card key={key} className="hover:border-blue-300 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                      <Icon className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{tier.label}</p>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatPrice(tier.priceMonthly)}
                    <span className="text-sm font-normal text-muted-foreground">/mo per agent</span>
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your recent billing activity</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    tx.type === 'subscription' ? 'bg-blue-100' : 'bg-orange-100'
                  }`}>
                    {tx.type === 'subscription' ? (
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    ) : (
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(tx.amount)}</p>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Paid
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment information</CardDescription>
            </div>
            <Button variant="outline">Update</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-16 items-center justify-center rounded-md border bg-slate-50">
              <CreditCard className="h-6 w-6 text-slate-600" />
            </div>
            <div>
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/26</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enterprise CTA */}
      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Need more capacity?</h3>
              <p className="text-slate-300">
                Enterprise plans include unlimited agents, dedicated support, and custom integrations.
              </p>
              <ul className="flex flex-wrap gap-4 text-sm text-slate-300 mt-4">
                <li className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  Custom integrations
                </li>
                <li className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  Volume discounts
                </li>
                <li className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  Dedicated support
                </li>
                <li className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  99.9% SLA
                </li>
              </ul>
            </div>
            <Link href="/billing/plans">
              <Button className="bg-white text-slate-900 hover:bg-slate-100">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
