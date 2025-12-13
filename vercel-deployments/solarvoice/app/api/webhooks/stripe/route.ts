import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/db'
import { SubscriptionStatus, SubscriptionPlan } from '@prisma/client'

// =============================================================
// STRIPE WEBHOOK HANDLER - PRODUCTION READY
// =============================================================
// Events:
// - checkout.session.completed
// - customer.subscription.updated
// - customer.subscription.deleted
// - invoice.payment_succeeded
// - invoice.payment_failed
// =============================================================

// Lazy initialization to avoid build errors when key is missing
function getStripeClient(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    console.warn('[STRIPE] Secret key not configured')
    return null
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-08-27.basil',
  })
}

// Map Stripe subscription status to our database enum
function mapSubscriptionStatus(stripeStatus: Stripe.Subscription.Status): SubscriptionStatus {
  const statusMap: Record<Stripe.Subscription.Status, SubscriptionStatus> = {
    active: 'ACTIVE',
    canceled: 'CANCELLED',
    incomplete: 'TRIAL',
    incomplete_expired: 'EXPIRED',
    past_due: 'SUSPENDED',
    trialing: 'TRIAL',
    unpaid: 'SUSPENDED',
    paused: 'SUSPENDED',
  }
  return statusMap[stripeStatus] || 'SUSPENDED'
}

// Map plan metadata to SubscriptionPlan enum
function mapSubscriptionPlan(plan?: string): SubscriptionPlan {
  if (!plan) return 'SOLO'
  const planUpper = plan.toUpperCase()
  if (planUpper === 'SOLO' || planUpper === 'TEAM' || planUpper === 'ENTERPRISE') {
    return planUpper as SubscriptionPlan
  }
  return 'CUSTOM'
}

// Calculate monthly price from amount
function calculateMonthlyPrice(amountInCents: number | null): number {
  if (!amountInCents) return 0
  return Math.round(amountInCents / 100)
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

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
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

// =============================================================
// EVENT HANDLERS
// =============================================================

/**
 * Handle checkout.session.completed
 * Creates Subscription and Invoice records when a customer completes payment
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('[STRIPE] Processing checkout session:', session.id)

  const userId = session.metadata?.userId
  const plan = session.metadata?.plan || 'SOLO'

  if (!userId) {
    console.error('[STRIPE] No userId in checkout session metadata')
    return
  }

  // Verify user exists
  const user = await prisma.user.findFirst({
    where: { id: userId },
  })

  if (!user) {
    console.error('[STRIPE] User not found:', userId)
    return
  }

  // Create subscription record
  if (session.subscription) {
    const monthlyPrice = calculateMonthlyPrice(session.amount_total)

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        stripeSubscriptionId: session.subscription as string,
        stripeCustomerId: session.customer as string,
        plan: mapSubscriptionPlan(plan),
        status: 'ACTIVE',
        monthlyPrice,
        billingCycle: 'MONTHLY',
        startDate: new Date(),
        modelsIncluded: plan === 'ENTERPRISE' ? 999 : plan === 'TEAM' ? 15 : 5,
        voiceMinutes: plan === 'ENTERPRISE' ? 999999 : plan === 'TEAM' ? 5000 : 1000,
      },
    })

    console.log('[STRIPE] Subscription created:', subscription.id)

    // Create a rental record for tracking usage
    const rental = await prisma.rental.create({
      data: {
        userId,
        modelId: 'default', // Placeholder - would be set when user selects model
        rentalType: 'MONTHLY',
        duration: 1,
        totalCost: monthlyPrice,
        status: 'ACTIVE',
        endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    })

    // Create invoice record
    if (session.payment_intent) {
      await prisma.invoice.create({
        data: {
          rentalId: rental.id,
          stripeInvoiceId: `checkout_${session.id}`,
          stripePaymentIntentId: session.payment_intent as string,
          status: 'PAID',
          subtotal: monthlyPrice,
          tax: 0,
          total: monthlyPrice,
          paidAt: new Date(),
          dueDate: new Date(),
        },
      })

      console.log('[STRIPE] Invoice created for checkout session')
    }
  }
}

/**
 * Handle customer.subscription.updated
 * Updates subscription status when Stripe subscription changes
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('[STRIPE] Processing subscription update:', subscription.id)

  const currentPeriodEnd = (subscription as any).current_period_end as number | undefined
  const updateData: any = {
    status: mapSubscriptionStatus(subscription.status),
  }

  if (currentPeriodEnd) {
    updateData.endDate = new Date(currentPeriodEnd * 1000)
  }

  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: updateData,
  })

  console.log('[STRIPE] Subscription updated:', subscription.id)
}

/**
 * Handle customer.subscription.deleted
 * Marks subscription as cancelled when customer cancels
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('[STRIPE] Processing subscription deletion:', subscription.id)

  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: 'CANCELLED',
      cancelledAt: new Date(subscription.canceled_at! * 1000),
      endDate: new Date(),
    },
  })

  console.log('[STRIPE] Subscription cancelled:', subscription.id)
}

/**
 * Handle invoice.payment_succeeded
 * Creates invoice record when payment succeeds
 */
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('[STRIPE] Processing successful invoice payment:', invoice.id)

  // Get subscription from invoice (use any to bypass type checking)
  const invoiceData = invoice as any
  const subscriptionId = typeof invoiceData.subscription === 'string' ? invoiceData.subscription : invoiceData.subscription?.id as string | undefined

  // Skip invoices without subscription (one-time payments)
  if (!subscriptionId) {
    console.log('[STRIPE] No subscription found for invoice, skipping')
    return
  }

  // Find the subscription in our database
  const subscription = await prisma.subscription.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
  })

  if (!subscription) {
    console.error('[STRIPE] Subscription not found for invoice:', subscriptionId)
    return
  }

  // Find or create a rental record
  let rental = await prisma.rental.findFirst({
    where: {
      userId: subscription.userId,
      status: 'ACTIVE',
    },
    orderBy: { createdAt: 'desc' },
  })

  if (!rental) {
    // Create a rental record if none exists
    rental = await prisma.rental.create({
      data: {
        userId: subscription.userId,
        modelId: 'default',
        rentalType: 'MONTHLY',
        duration: 1,
        totalCost: calculateMonthlyPrice(invoiceData.amount_paid),
        status: 'ACTIVE',
        endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    })
  }

  // Get payment intent ID
  const paymentIntentId = typeof invoiceData.payment_intent === 'string' ? invoiceData.payment_intent : (invoiceData.payment_intent?.id as string || '')

  // Upsert invoice record
  await prisma.invoice.upsert({
    where: { stripeInvoiceId: invoice.id || 'temp' },
    update: {
      status: 'PAID',
      paidAt: new Date(),
    },
    create: {
      rentalId: rental.id,
      stripeInvoiceId: invoice.id || null,
      stripePaymentIntentId: paymentIntentId || null,
      status: 'PAID',
      subtotal: calculateMonthlyPrice(invoiceData.amount_paid as number),
      tax: 0,
      total: calculateMonthlyPrice(invoiceData.amount_paid as number),
      paidAt: new Date(),
      dueDate: new Date((invoiceData.period_end || Date.now() / 1000) * 1000),
    },
  })

  console.log('[STRIPE] Invoice payment recorded:', invoice.id)
}

/**
 * Handle invoice.payment_failed
 * Updates invoice status and suspends subscription when payment fails
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  // Get subscription from invoice (use any to bypass type checking)
  const invoiceData = invoice as any
  const subscriptionId = typeof invoiceData.subscription === 'string' ? invoiceData.subscription : invoiceData.subscription?.id as string | undefined

  console.error('[STRIPE] Payment failed for invoice:', invoice.id, {
    customer: invoice.customer,
    subscription: subscriptionId,
    amount: invoiceData.amount_due,
  })

  // Find invoice in database
  if (invoice.id) {
    const dbInvoice = await prisma.invoice.findFirst({
      where: { stripeInvoiceId: invoice.id },
    })

    if (dbInvoice) {
      // Update invoice status to OVERDUE
      await prisma.invoice.update({
        where: { id: dbInvoice.id },
        data: { status: 'OVERDUE' },
      })
    }
  }

  // Suspend subscription if exists
  if (subscriptionId) {
    await prisma.subscription.update({
      where: { stripeSubscriptionId: subscriptionId },
      data: { status: 'SUSPENDED' },
    })

    console.log('[STRIPE] Subscription suspended due to payment failure:', subscriptionId)
  }
}
