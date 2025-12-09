import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// =============================================================
// STRIPE WEBHOOK HANDLER
// =============================================================
// Status: STUB - Ready for full implementation
// Requires: STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET env vars
// Schema: Needs WebhookEvent and Payment models in Prisma
// =============================================================

// Lazy initialization to avoid build errors when key is missing
function getStripeClient(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    console.warn('[STRIPE] Secret key not configured')
    return null
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-07-30.basil',
  })
}

export async function POST(request: NextRequest) {
  const stripe = getStripeClient()

  if (!stripe) {
    return NextResponse.json(
      {
        error: 'Stripe not configured',
        message: 'Set STRIPE_SECRET_KEY in environment variables',
      },
      { status: 503 }
    )
  }

  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('[STRIPE] Webhook secret not configured')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('[STRIPE] Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Log the event for debugging
    console.log('[STRIPE] Webhook received:', {
      type: event.type,
      id: event.id,
      created: new Date(event.created * 1000).toISOString(),
    })

    // TODO: Implement full webhook handlers when schema is ready
    // Current schema missing: WebhookEvent, Payment models

    // Handle different event types (stubbed)
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('[STRIPE] Payment succeeded:', (event.data.object as Stripe.PaymentIntent).id)
        // TODO: Update payment record in database
        break

      case 'payment_intent.payment_failed':
        console.log('[STRIPE] Payment failed:', (event.data.object as Stripe.PaymentIntent).id)
        // TODO: Update payment record in database
        break

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        console.log('[STRIPE] Subscription updated:', (event.data.object as Stripe.Subscription).id)
        // TODO: Update subscription in database
        break

      case 'customer.subscription.deleted':
        console.log('[STRIPE] Subscription cancelled:', (event.data.object as Stripe.Subscription).id)
        // TODO: Update subscription in database
        break

      case 'invoice.payment_succeeded':
        console.log('[STRIPE] Invoice paid:', (event.data.object as Stripe.Invoice).id)
        // TODO: Create payment record in database
        break

      default:
        console.log('[STRIPE] Unhandled event type:', event.type)
    }

    return NextResponse.json({
      received: true,
      type: event.type,
      id: event.id,
    })

  } catch (error) {
    console.error('[STRIPE] Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
