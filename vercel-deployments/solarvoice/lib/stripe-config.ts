/**
 * Stripe Configuration
 *
 * Subscription plans and Stripe client initialization.
 * Follows Vozlux PLANS pattern for consistency.
 */

import { loadStripe, Stripe } from "@stripe/stripe-js"

// Singleton promise to avoid loading Stripe multiple times
let stripePromise: Promise<Stripe | null> | null = null

/**
 * Get or initialize Stripe.js client
 */
export function getStripe() {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (!key) {
      console.error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY")
      return null
    }
    stripePromise = loadStripe(key)
  }
  return stripePromise
}

/**
 * Subscription plan configuration
 */
export const PLANS = {
  starter: {
    id: "starter",
    name: "Starter",
    priceMonthly: 14900, // $149.00 in cents
    maxAgents: 3,
    maxCallsMonthly: 500,
    features: [
      "Up to 3 voice agents",
      "500 calls/month included",
      "Basic call analytics",
      "Email support",
      "Standard voice quality",
    ],
    featuresHighlight: [
      "Perfect for small contractors",
      "Get started with voice AI",
    ],
    stripePriceId: process.env.STRIPE_STARTER_PRICE_ID,
  },
  pro: {
    id: "pro",
    name: "Professional",
    priceMonthly: 29900, // $299.00 in cents
    maxAgents: 10,
    maxCallsMonthly: 2000,
    features: [
      "Up to 10 voice agents",
      "2,000 calls/month included",
      "Advanced call analytics",
      "Priority support",
      "HD voice quality",
      "Custom greetings",
      "Call recordings",
    ],
    featuresHighlight: [
      "Most popular for growing businesses",
      "Best value for multi-trade contractors",
    ],
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
    recommended: true,
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: 49900, // $499.00 in cents
    maxAgents: 50,
    maxCallsMonthly: 10000,
    features: [
      "Up to 50 voice agents",
      "10,000 calls/month included",
      "Real-time analytics dashboard",
      "Dedicated account manager",
      "Ultra HD voice quality",
      "Custom integrations",
      "API access",
      "SLA 99.9% uptime",
      "White-label options",
    ],
    featuresHighlight: [
      "For enterprise contractors",
      "Full customization and support",
    ],
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
  },
} as const

export type PlanId = keyof typeof PLANS
export type Plan = (typeof PLANS)[PlanId]

/**
 * Get plan by ID
 */
export function getPlan(planId: PlanId): Plan {
  return PLANS[planId]
}

/**
 * Format price from cents to display string
 */
export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceInCents / 100)
}

/**
 * Calculate overage price per call
 */
export const OVERAGE_PRICE_PER_CALL = 15 // $0.15 per call in cents

/**
 * Agent rental pricing tiers based on scale
 */
export const AGENT_PRICING_TIERS = {
  residential: {
    priceMonthly: 9900, // $99
    label: "Residential",
    description: "Perfect for home service calls",
  },
  commercial: {
    priceMonthly: 14900, // $149
    label: "Commercial",
    description: "For business and commercial projects",
  },
  industrial: {
    priceMonthly: 19900, // $199
    label: "Industrial/Utility",
    description: "Large-scale industrial operations",
  },
} as const

/**
 * Checkout session configuration
 */
export interface CheckoutSessionConfig {
  agentSlug: string
  planId?: PlanId
  successUrl: string
  cancelUrl: string
  customerEmail?: string
}

/**
 * Create checkout session options for Stripe API
 */
export function createCheckoutOptions(config: CheckoutSessionConfig) {
  return {
    mode: "subscription" as const,
    success_url: config.successUrl,
    cancel_url: config.cancelUrl,
    customer_email: config.customerEmail,
    metadata: {
      agentSlug: config.agentSlug,
      planId: config.planId,
    },
  }
}
