/**
 * Billing Checkout API
 *
 * POST /api/billing/create-checkout
 * Creates a Stripe checkout session for plan subscription.
 */

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PLANS, type PlanId } from '@/lib/stripe-config'

// Lazy initialization to avoid build-time errors
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(key, {
    apiVersion: '2025-08-27.basil',
  })
}

export async function POST(request: Request) {
  try {
    const stripe = getStripe()
    const { planId, customerEmail } = await request.json()

    // Validate plan exists
    if (!planId || !(planId in PLANS)) {
      return NextResponse.json(
        { error: 'Invalid plan ID' },
        { status: 400 }
      )
    }

    const plan = PLANS[planId as PlanId]

    // Enterprise plan requires sales contact
    if (planId === 'enterprise') {
      return NextResponse.json(
        { error: 'Enterprise plans require sales contact' },
        { status: 400 }
      )
    }

    // Get the base URL for success/cancel redirects
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Get Stripe price ID from environment or create dynamic pricing
    let priceId = plan.stripePriceId

    // If no pre-configured price ID, create a dynamic price
    if (!priceId) {
      // Create checkout session with inline price data
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `SolarVoice ${plan.name} Plan`,
                description: `Up to ${plan.maxAgents} voice agents, ${plan.maxCallsMonthly.toLocaleString()} calls/month`,
                metadata: {
                  planId,
                },
              },
              unit_amount: plan.priceMonthly,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/billing?success=true&plan=${planId}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/billing/plans?canceled=true`,
        customer_email: customerEmail,
        metadata: {
          planId,
          type: 'subscription',
        },
        subscription_data: {
          metadata: {
            planId,
          },
        },
        allow_promotion_codes: true,
      })

      return NextResponse.json({
        sessionId: session.id,
        url: session.url,
      })
    }

    // Use pre-configured Stripe price ID
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/billing?success=true&plan=${planId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/billing/plans?canceled=true`,
      customer_email: customerEmail,
      metadata: {
        planId,
        type: 'subscription',
      },
      subscription_data: {
        metadata: {
          planId,
        },
      },
      allow_promotion_codes: true,
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
