/**
 * TDD Test Suite: Stripe Webhook Handlers for SolarVoice AI
 *
 * Tests webhook event processing with actual Prisma schema:
 * - Subscription, Invoice, User, Rental models
 * - checkout.session.completed, subscription events, invoice events
 *
 * TDD RED PHASE: These tests should FAIL until handlers are implemented
 */

import { POST } from '@/app/api/webhooks/stripe/route'
import { prisma } from '@/lib/db'
import { createMockNextRequest, getResponseData } from '../test-helpers'
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

// Mock NextResponse
jest.mock('next/server', () => ({
  ...jest.requireActual('next/server'),
  NextResponse: {
    json: jest.fn((body: any, init?: ResponseInit) => {
      return new Response(JSON.stringify(body), {
        ...init,
        headers: {
          ...init?.headers,
          'content-type': 'application/json',
        },
      })
    }),
  },
}))

// Mock Stripe
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    webhooks: {
      constructEvent: jest.fn(),
    },
  }))
})

// Mock Prisma
jest.mock('@/lib/db', () => ({
  prisma: {
    subscription: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      upsert: jest.fn(),
    },
    invoice: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      upsert: jest.fn(),
    },
    user: {
      findFirst: jest.fn(),
    },
    rental: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}))

describe('Stripe Webhook Handlers - TDD', () => {
  let mockStripe: any

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.STRIPE_SECRET_KEY = 'sk_test_123'
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_secret'
    mockStripe = new (Stripe as any)()
  })

  const createRequest = (event: any, signature = 'valid-sig') => {
    mockStripe.webhooks.constructEvent.mockReturnValue(event)
    return createMockNextRequest('http://localhost/api/webhooks/stripe', {
      method: 'POST',
      headers: { 'stripe-signature': signature },
      body: {},
    })
  }

  describe('checkout.session.completed', () => {
    it('should create Subscription and Invoice on successful checkout', async () => {
      const event = {
        id: 'evt_1',
        type: 'checkout.session.completed',
        created: 1704067200,
        data: {
          object: {
            id: 'cs_123',
            customer: 'cus_123',
            subscription: 'sub_123',
            amount_total: 29900,
            metadata: { userId: 'user_123', plan: 'SOLO' },
          } as Partial<Stripe.Checkout.Session>,
        },
      }

      ;(prisma.user.findFirst as jest.Mock).mockResolvedValue({ id: 'user_123' })
      ;(prisma.subscription.create as jest.Mock).mockResolvedValue({ id: 'sub_db_123' })
      ;(prisma.rental.create as jest.Mock).mockResolvedValue({ id: 'rental_123' })
      ;(prisma.invoice.create as jest.Mock).mockResolvedValue({ id: 'inv_123' })

      const request = createRequest(event)
      const response = await POST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(200)
      expect(data.received).toBe(true)

      expect(prisma.subscription.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user_123',
          stripeSubscriptionId: 'sub_123',
          stripeCustomerId: 'cus_123',
          plan: 'SOLO',
          status: 'ACTIVE',
        }),
      })
    })

    it('should handle missing user', async () => {
      const event = {
        id: 'evt_2',
        type: 'checkout.session.completed',
        created: 1704067200,
        data: {
          object: {
            metadata: { userId: 'nonexistent' },
          } as Partial<Stripe.Checkout.Session>,
        },
      }

      ;(prisma.user.findFirst as jest.Mock).mockResolvedValue(null)

      const request = createRequest(event)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(prisma.subscription.create).not.toHaveBeenCalled()
    })
  })

  describe('customer.subscription.updated', () => {
    it('should update Subscription status', async () => {
      const event = {
        id: 'evt_3',
        type: 'customer.subscription.updated',
        created: 1704067200,
        data: {
          object: {
            id: 'sub_456',
            status: 'active',
            current_period_end: 1706745600,
          } as Partial<Stripe.Subscription>,
        },
      }

      ;(prisma.subscription.update as jest.Mock).mockResolvedValue({})

      const request = createRequest(event)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { stripeSubscriptionId: 'sub_456' },
        data: {
          status: 'ACTIVE',
          endDate: new Date(1706745600 * 1000),
        },
      })
    })

    it('should map subscription statuses correctly', async () => {
      const tests = [
        { stripe: 'active', db: 'ACTIVE' },
        { stripe: 'canceled', db: 'CANCELLED' },
        { stripe: 'past_due', db: 'SUSPENDED' },
      ]

      for (const { stripe: stripeStatus, db: dbStatus } of tests) {
        jest.clearAllMocks()

        const event = {
          id: `evt_${stripeStatus}`,
          type: 'customer.subscription.updated',
          created: 1704067200,
          data: {
            object: {
              id: 'sub_test',
              status: stripeStatus,
              current_period_end: 1706745600,
            } as Partial<Stripe.Subscription>,
          },
        }

        ;(prisma.subscription.update as jest.Mock).mockResolvedValue({})

        const request = createRequest(event)
        await POST(request)

        expect(prisma.subscription.update).toHaveBeenCalledWith({
          where: { stripeSubscriptionId: 'sub_test' },
          data: expect.objectContaining({
            status: dbStatus,
          }),
        })
      }
    })
  })

  describe('customer.subscription.deleted', () => {
    it('should mark subscription as CANCELLED', async () => {
      const event = {
        id: 'evt_4',
        type: 'customer.subscription.deleted',
        created: 1704067200,
        data: {
          object: {
            id: 'sub_789',
            canceled_at: 1704067200,
          } as Partial<Stripe.Subscription>,
        },
      }

      ;(prisma.subscription.update as jest.Mock).mockResolvedValue({})

      const request = createRequest(event)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { stripeSubscriptionId: 'sub_789' },
        data: {
          status: 'CANCELLED',
          cancelledAt: expect.any(Date),
          endDate: expect.any(Date),
        },
      })
    })
  })

  describe('invoice.payment_succeeded', () => {
    it('should create Invoice record', async () => {
      const event = {
        id: 'evt_5',
        type: 'invoice.payment_succeeded',
        created: 1704067200,
        data: {
          object: {
            id: 'in_123',
            subscription: 'sub_123',
            payment_intent: 'pi_123',
            amount_paid: 29900,
            status: 'paid',
          } as Partial<Stripe.Invoice>,
        },
      }

      ;(prisma.subscription.findFirst as jest.Mock).mockResolvedValue({
        id: 'sub_db_123',
        userId: 'user_123',
      })
      ;(prisma.rental.findFirst as jest.Mock).mockResolvedValue({
        id: 'rental_123',
      })
      ;(prisma.invoice.upsert as jest.Mock).mockResolvedValue({})

      const request = createRequest(event)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(prisma.invoice.upsert).toHaveBeenCalledWith({
        where: { stripeInvoiceId: 'in_123' },
        update: {
          status: 'PAID',
          paidAt: expect.any(Date),
        },
        create: expect.objectContaining({
          stripeInvoiceId: 'in_123',
          stripePaymentIntentId: 'pi_123',
          rentalId: 'rental_123',
          status: 'PAID',
        }),
      })
    })

    it('should skip invoices without subscription', async () => {
      const event = {
        id: 'evt_6',
        type: 'invoice.payment_succeeded',
        created: 1704067200,
        data: {
          object: {
            id: 'in_456',
            subscription: null,
          } as Partial<Stripe.Invoice>,
        },
      }

      const request = createRequest(event)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(prisma.invoice.upsert).not.toHaveBeenCalled()
    })
  })

  describe('invoice.payment_failed', () => {
    it('should update Invoice to OVERDUE and suspend Subscription', async () => {
      const event = {
        id: 'evt_7',
        type: 'invoice.payment_failed',
        created: 1704067200,
        data: {
          object: {
            id: 'in_789',
            subscription: 'sub_789',
            status: 'open',
          } as Partial<Stripe.Invoice>,
        },
      }

      ;(prisma.invoice.findFirst as jest.Mock).mockResolvedValue({ id: 'inv_db_123' })
      ;(prisma.invoice.update as jest.Mock).mockResolvedValue({})
      ;(prisma.subscription.update as jest.Mock).mockResolvedValue({})

      const request = createRequest(event)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(prisma.invoice.update).toHaveBeenCalledWith({
        where: { id: 'inv_db_123' },
        data: { status: 'OVERDUE' },
      })
      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { stripeSubscriptionId: 'sub_789' },
        data: { status: 'SUSPENDED' },
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle missing signature', async () => {
      const request = createMockNextRequest('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: {},
        body: {},
      })

      const response = await POST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing stripe-signature header')
    })

    it('should handle invalid signature', async () => {
      mockStripe.webhooks.constructEvent.mockImplementation(() => {
        throw new Error('Invalid signature')
      })

      const request = createMockNextRequest('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: { 'stripe-signature': 'invalid' },
        body: {},
      })

      const response = await POST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid signature')
    })

    it('should handle database errors gracefully', async () => {
      const event = {
        id: 'evt_error',
        type: 'checkout.session.completed',
        created: 1704067200,
        data: { object: { metadata: { userId: 'user_123' } } },
      }

      ;(prisma.user.findFirst as jest.Mock).mockRejectedValue(new Error('DB Error'))

      const request = createRequest(event)
      const response = await POST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(500)
      expect(data.error).toBe('Webhook processing failed')
    })
  })
})
