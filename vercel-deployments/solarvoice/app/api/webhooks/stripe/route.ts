import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')
    
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }
    
    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }
    
    // Log webhook event
    await prisma.webhookEvent.create({
      data: {
        source: 'stripe',
        eventType: event.type,
        payload: event as any,
      },
    })
    
    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent)
        break
        
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object as Stripe.PaymentIntent)
        break
        
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object as Stripe.Subscription)
        break
        
      case 'customer.subscription.deleted':
        await handleSubscriptionCancellation(event.data.object as Stripe.Subscription)
        break
        
      case 'invoice.payment_succeeded':
        await handleInvoicePayment(event.data.object as Stripe.Invoice)
        break
        
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
    
    // Mark webhook as processed
    await prisma.webhookEvent.updateMany({
      where: {
        source: 'stripe',
        eventType: event.type,
        payload: {
          path: ['id'],
          equals: event.id,
        },
      },
      data: {
        processed: true,
        processedAt: new Date(),
      },
    })
    
    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  // Update payment record
  await prisma.payment.updateMany({
    where: { stripePaymentId: paymentIntent.id },
    data: {
      status: 'COMPLETED',
      paidAt: new Date(),
      metadata: {
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        paymentMethod: paymentIntent.payment_method,
      },
    },
  })
  
  console.log(`Payment successful: ${paymentIntent.id}`)
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  // Update payment record
  await prisma.payment.updateMany({
    where: { stripePaymentId: paymentIntent.id },
    data: {
      status: 'FAILED',
      metadata: {
        error: paymentIntent.last_payment_error?.message,
      },
    },
  })
  
  console.log(`Payment failed: ${paymentIntent.id}`)
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  
  // Find user by Stripe customer ID
  const payment = await prisma.payment.findFirst({
    where: { stripeCustomerId: customerId },
    select: { userId: true },
  })
  
  if (!payment) {
    console.error(`No user found for customer: ${customerId}`)
    return
  }
  
  // Update or create subscription
  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: subscription.id },
    update: {
      status: subscription.status === 'active' ? 'ACTIVE' : 'SUSPENDED',
      tier: detectSubscriptionTier(subscription),
      endDate: subscription.current_period_end 
        ? new Date(subscription.current_period_end * 1000) 
        : null,
    },
    create: {
      stripeSubscriptionId: subscription.id,
      userId: payment.userId,
      status: subscription.status === 'active' ? 'ACTIVE' : 'SUSPENDED',
      tier: detectSubscriptionTier(subscription),
      startDate: new Date(subscription.current_period_start * 1000),
      endDate: subscription.current_period_end 
        ? new Date(subscription.current_period_end * 1000) 
        : null,
    },
  })
  
  console.log(`Subscription updated: ${subscription.id}`)
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: 'CANCELLED',
      cancelledAt: new Date(),
    },
  })
  
  console.log(`Subscription cancelled: ${subscription.id}`)
}

async function handleInvoicePayment(invoice: Stripe.Invoice) {
  if (!invoice.subscription) return
  
  // Create payment record for subscription invoice
  const subscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: invoice.subscription as string },
  })
  
  if (subscription) {
    await prisma.payment.create({
      data: {
        amount: invoice.amount_paid / 100, // Convert from cents
        currency: invoice.currency.toUpperCase(),
        status: 'COMPLETED',
        stripePaymentId: invoice.payment_intent as string,
        stripeCustomerId: invoice.customer as string,
        description: `Subscription payment for ${invoice.period_start} - ${invoice.period_end}`,
        userId: subscription.userId,
        subscriptionId: subscription.id,
        paymentMethod: 'CARD',
        paidAt: new Date(),
      },
    })
  }
  
  console.log(`Invoice paid: ${invoice.id}`)
}

function detectSubscriptionTier(subscription: Stripe.Subscription): string {
  // Logic to determine tier based on price or product metadata
  const price = subscription.items.data[0]?.price
  
  if (price?.metadata?.tier) {
    return price.metadata.tier.toUpperCase()
  }
  
  // Fallback based on amount
  const amount = price?.unit_amount || 0
  if (amount >= 100000) return 'ENTERPRISE' // $1000+
  if (amount >= 50000) return 'PROFESSIONAL' // $500+
  return 'BASIC'
}