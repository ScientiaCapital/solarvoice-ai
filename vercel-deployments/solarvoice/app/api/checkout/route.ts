/**
 * Stripe Checkout API
 *
 * POST /api/checkout
 * Creates a Stripe checkout session for agent rental.
 */

import { NextResponse } from "next/server"
import Stripe from "stripe"
import { getAgentBySlug } from "@/lib/agent-types"

// Lazy initialization to avoid build-time errors
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured")
  }
  return new Stripe(key, {
    apiVersion: "2025-08-27.basil",
  })
}

export async function POST(request: Request) {
  try {
    const stripe = getStripe()
    const { agentSlug, customerEmail } = await request.json()

    // Validate agent exists
    const agent = getAgentBySlug(agentSlug)
    if (!agent) {
      return NextResponse.json(
        { error: "Agent not found" },
        { status: 404 }
      )
    }

    // Get the base URL for success/cancel redirects
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: agent.name,
              description: agent.description,
              metadata: {
                agentSlug: agent.slug,
                trade: agent.trade,
                scale: agent.scale,
              },
            },
            unit_amount: agent.monthlyPrice,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&agent=${agentSlug}`,
      cancel_url: `${baseUrl}/agents/${agentSlug}?canceled=true`,
      customer_email: customerEmail,
      metadata: {
        agentSlug,
        type: "agent_rental",
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
