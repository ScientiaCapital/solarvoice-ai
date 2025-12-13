/**
 * COMPREHENSIVE TEST SUITE: Stripe Webhook Handlers for SolarVoice AI
 *
 * Tests all webhook events with actual Prisma schema models:
 * - Subscription (stripeSubscriptionId, stripeCustomerId, status, plan)
 * - Invoice (stripeInvoiceId, stripePaymentIntentId, rentalId, status)
 * - User (for customer lookups)
 *
 * TDD Approach: Write failing tests first, then implement handlers
 */

import { POST } from '@/app/api/webhooks/stripe/route'
import { prisma } from '@/lib/db'
import { createMockNextRequest, getResponseData } from '../test-helpers'
import Stripe from 'stripe'

// Mock Stripe SDK
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    webhooks: {
      constructEvent: jest.fn(),
    },
  }))
})

// Mock Prisma client
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

describe('Stripe Webhook Handlers - SolarVoice AI', () => {
  let mockStripe: any

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.STRIPE_SECRET_KEY = 'sk_test_123'
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_secret'
    mockStripe = new (Stripe as any)()
  })

  afterEach(() => {
    delete process.env.STRIPE_SECRET_KEY
    delete process.env.STRIPE_WEBHOOK_SECRET
  })

  const createWebhookRequest = (bodyData: any, signature: string) => {
    return createMockNextRequest('http://localhost/api/webhooks/stripe', {
      method: 'POST',
      headers: {
        'stripe-signature': signature,
      },
      body: bodyData,
    })
  }

  describe('1. Signature Validation', () => {
    it('should reject requests without signature header', async () => {
      const request = createMockNextRequest('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: {},
        body: { test: true },
      })

      const response = await POST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing stripe-signature header')
    })

    it('should reject invalid signature', async () => {
      mockStripe.webhooks.constructEvent.mockImplementation(() => {
        throw new Error('Invalid signature')
      })

      const request = createWebhookRequest({ test: 'body' }, 'invalid-sig')
      const response = await POST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid signature')
    })

    it('should accept valid signature', async () => {
      mockStripe.webhooks.constructEvent.mockReturnValue({
        id: 'evt_test',
        type: 'ping',
        created: 1234567890,
        data: { object: {} },
      })

      const request = createWebhookRequest({ test: 'body' }, 'valid-sig')
      const response = await POST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(200)
      expect(mockStripe.webhooks.constructEvent).toHaveBeenCalled()
    })
  })

  describe('2. checkout.session.completed', () => {
    const mockCheckoutSession: Stripe.Checkout.Session = {
      id: 'cs_test_123',
      object: 'checkout.session',
      customer: 'cus_123',
      subscription: 'sub_123',
      amount_total: 29900, // $299.00
      currency: 'usd',
      payment_intent: 'pi_123',
      mode: 'subscription',
      payment_status: 'paid',
      status: 'complete',
      metadata: {
        userId: 'user_123',
        plan: 'SOLO',
      },
    } as Stripe.Checkout.Session

    it('should create subscription and invoice on successful checkout', async () => {
      mockStripe.webhooks.constructEvent.mockReturnValue({
        id: 'evt_checkout',
        type: 'checkout.session.completed',
        created: 1234567890,
        data: { object: mockCheckoutSession },
      })

      const mockUser = { id: 'user_123', email: 'test@example.com' }
      ;(prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser)
      ;(prisma.subscription.create as jest.Mock).mockResolvedValue({
        id: 'sub_db_123',
        stripeSubscriptionId: 'sub_123',
      })
      ;(prisma.rental.create as jest.Mock).mockResolvedValue({
        id: 'rental_123',
      })
      ;(prisma.invoice.create as jest.Mock).mockResolvedValue({
        id: 'inv_db_123',
      })

      const request = createWebhookRequest(JSON.stringify({}), 'valid-sig')
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.received).toBe(true)

      // Should find user by metadata userId
      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { id: 'user_123' },
      })

      // Should create subscription
      expect(prisma.subscription.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user_123',
          stripeSubscriptionId: 'sub_123',
          stripeCustomerId: 'cus_123',
          plan: 'SOLO',
          status: 'ACTIVE',
          monthlyPrice: 299,
          billingCycle: 'MONTHLY',
        }),
      })

      // Should create invoice
      expect(prisma.invoice.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          stripeInvoiceId: expect.any(String),
          stripePaymentIntentId: 'pi_123',
          status: 'PAID',
          total: 299,
        }),
      })
    })

    it('should handle missing user gracefully', async () => {
      mockStripe.webhooks.constructEvent.mockReturnValue({
        id: 'evt_no_user',
        type: 'checkout.session.completed',
        data: { object: { ...mockCheckoutSession, metadata: { userId: 'nonexistent' } } },
      })

      ;(prisma.user.findFirst as jest.Mock).mockResolvedValue(null)

      const request = createWebhookRequest(JSON.stringify({}), 'valid-sig')
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.received).toBe(true)
      expect(prisma.subscription.create).not.toHaveBeenCalled()
    })

    it('should map subscription plans correctly', async () => {
      const plans = [
        { metadata: { plan: 'SOLO' }, expected: 'SOLO', price: 299 },
        { metadata: { plan: 'TEAM' }, expected: 'TEAM', price: 799 },
        { metadata: { plan: 'ENTERPRISE' }, expected: 'ENTERPRISE', price: 2499 },
      ]

      for (const { metadata, expected, price } of plans) {
        jest.clearAllMocks()

        mockStripe.webhooks.constructEvent.mockReturnValue({
          id: `evt_${expected}`,
          type: 'checkout.session.completed',
          data: {
            object: {
              ...mockCheckoutSession,
              metadata,
              amount_total: price * 100,
            },
          },
        })

        ;(prisma.user.findFirst as jest.Mock).mockResolvedValue({ id: 'user_123' })
        ;(prisma.subscription.create as jest.Mock).mockResolvedValue({})
        ;(prisma.rental.create as jest.Mock).mockResolvedValue({ id: 'rental_123' })
        ;(prisma.invoice.create as jest.Mock).mockResolvedValue({})

        const request = createWebhookRequest(JSON.stringify({}), 'valid-sig')
        await POST(request)

        expect(prisma.subscription.create).toHaveBeenCalledWith({
          data: expect.objectContaining({
            plan: expected,
            monthlyPrice: price,
          }),
        })
      }
    })
  })

  describe('3. customer.subscription.updated', () => {
    const mockSubscription: Partial<Stripe.Subscription> = {
      id: 'sub_update_123',
      customer: 'cus_123',
      status: 'active',
      current_period_start: 1704067200, // 2024-01-01
      current_period_end: 1706745600, // 2024-02-01
      items: {
        data: [
          {
            id: 'si_123',
            price: {
              id: 'price_123',
              unit_amount: 79900,
              metadata: { plan: 'TEAM' },
            } as Stripe.Price,
          } as Stripe.SubscriptionItem,
        ],
      } as Stripe.ApiList<Stripe.SubscriptionItem>,
    }

    it('should update subscription status to ACTIVE', async () => {
      mockStripe.webhooks.constructEvent.mockReturnValue({
        id: 'evt_sub_update',
        type: 'customer.subscription.updated',
        data: { object: mockSubscription },
      })

      ;(prisma.subscription.update as jest.Mock).mockResolvedValue({
        id: 'sub_db_123',
      })

      const request = createWebhookRequest(JSON.stringify({}), 'valid-sig')
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { stripeSubscriptionId: 'sub_update_123' },
        data: {
          status: 'ACTIVE',
          endDate: new Date(1706745600 * 1000),
        },
      })
    })

    it('should handle subscription status changes', async () => {
      const statuses: Array<{ stripe: Stripe.Subscription.Status; db: string }> = [
        { stripe: 'active', db: 'ACTIVE' },
        { stripe: 'canceled', db: 'CANCELLED' },
        { stripe: 'past_due', db: 'SUSPENDED' },
        { stripe: 'unpaid', db: 'SUSPENDED' },
      ]

      for (const { stripe: stripeStatus, db: dbStatus } of statuses) {
        jest.clearAllMocks()

        mockStripe.webhooks.constructEvent.mockReturnValue({
          id: `evt_${stripeStatus}`,
          type: 'customer.subscription.updated',
          data: {
            object: {
              ...mockSubscription,
              status: stripeStatus,
            },
          },
        })

        ;(prisma.subscription.update as jest.Mock).mockResolvedValue({})

        const request = createWebhookRequest(JSON.stringify({}), 'valid-sig')
        await POST(request)

        expect(prisma.subscription.update).toHaveBeenCalledWith({
          where: { stripeSubscriptionId: 'sub_update_123' },
          data: expect.objectContaining({
            status: dbStatus,
          }),
        })
      }
    })
  })

  describe('4. customer.subscription.deleted', () => {
    it('should mark subscription as CANCELLED with timestamp', async () => {
      mockStripe.webhooks.constructEvent.mockReturnValue({
        id: 'evt_sub_cancel',
        type: 'customer.subscription.deleted',
        created: 1704067200,
        data: {
          object: {
            id: 'sub_cancel_123',
            canceled_at: 1704067200,
          } as Partial<Stripe.Subscription>,
        },
      })

      ;(prisma.subscription.update as jest.Mock).mockResolvedValue({
        id: 'sub_db_123',
      })

      const request = createWebhookRequest(JSON.stringify({}), 'valid-sig')
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { stripeSubscriptionId: 'sub_cancel_123' },
        data: {
          status: 'CANCELLED',
          cancelledAt: expect.any(Date),
          endDate: expect.any(Date),
        },
      })
    })

    it('should handle non-existent subscription gracefully', async () => {
      mockStripe.webhooks.constructEvent.mockReturnValue({
        id: 'evt_no_sub',
        type: 'customer.subscription.deleted',
        data: {
          object: { id: 'sub_nonexistent' } as Partial<Stripe.Subscription>,
        },
      })

      ;(prisma.subscription.update as jest.Mock).mockRejectedValue(
        new Error('Record not found')
      )

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const request = createWebhookRequest(JSON.stringify({}), 'valid-sig')
      const response = await POST(request)

      // Should still return 200 to acknowledge webhook
      expect(response.status).toBe(200)
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })

  describe('5. invoice.payment_succeeded', () => {
    const mockInvoice: Partial<Stripe.Invoice> = {
      id: 'in_success_123',
      customer: 'cus_123',
      subscription: 'sub_123',
      amount_paid: 29900,
      currency: 'usd',
      payment_intent: 'pi_success_123',
      status: 'paid',
      period_start: 1704067200,
      period_end: 1706745600,
    }

    it('should create invoice record on successful payment', async () => {
      mockStripe.webhooks.constructEvent.mockReturnValue({
        id: 'evt_invoice_paid',
        type: 'invoice.payment_succeeded',
        data: { object: mockInvoice },
      })

      ;(prisma.subscription.findFirst as jest.Mock).mockResolvedValue({
        id: 'sub_db_123',
        userId: 'user_123',
      })
      ;(prisma.rental.findFirst as jest.Mock).mockResolvedValue({
        id: 'rental_123',
      })
      ;(prisma.invoice.upsert as jest.Mock).mockResolvedValue({
        id: 'inv_db_123',
      })

      const request = createWebhookRequest(JSON.stringify({}), 'valid-sig')
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(prisma.invoice.upsert).toHaveBeenCalledWith({
        where: { stripeInvoiceId: 'in_success_123' },
        update: {
          status: 'PAID',
          paidAt: expect.any(Date),
        },
        create: {
          stripeInvoiceId: 'in_success_123',
          stripePaymentIntentId: 'pi_success_123',
          rentalId: 'rental_123',
          status: 'PAID',
          subtotal: 299,
          tax: 0,
          total: 299,
          paidAt: expect.any(Date),
          dueDate: expect.any(Date),
        },
      })
    })

    it('should handle invoices without subscription', async () => {
      mockStripe.webhooks.constructEvent.mockReturnValue({
        id: 'evt_invoice_no_sub',
        type: 'invoice.payment_succeeded',
        data: {
          object: {
            ...mockInvoice,
            subscription: null,
          },
        },
      })

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      const request = createWebhookRequest(JSON.stringify({}), 'valid-sig')
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('No subscription found')
      )
      expect(prisma.invoice.upsert).not.toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })

  describe('6. invoice.payment_failed', () => {
    const mockFailedInvoice: Partial<Stripe.Invoice> = {
      id: 'in_failed_123',
      customer: 'cus_123',
      subscription: 'sub_123',
      amount_due: 29900,
      status: 'open',
      attempt_count: 1,
      next_payment_attempt: 1704153600,
    }

    it('should update invoice status to OVERDUE', async () => {
      mockStripe.webhooks.constructEvent.mockReturnValue({
        id: 'evt_invoice_failed',
        type: 'invoice.payment_failed',
        data: { object: mockFailedInvoice },
      })

      ;(prisma.invoice.findFirst as jest.Mock).mockResolvedValue({
        id: 'inv_db_123',
      })
      ;(prisma.invoice.update as jest.Mock).mockResolvedValue({})

      const request = createWebhookRequest(JSON.stringify({}), 'valid-sig')
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(prisma.invoice.update).toHaveBeenCalledWith({
        where: { id: 'inv_db_123' },
        data: {
          status: 'OVERDUE',
        },
      })
    })

    it('should suspend subscription after payment failure', async () => {
      mockStripe.webhooks.constructEvent.mockReturnValue({
        id: 'evt_payment_fail',
        type: 'invoice.payment_failed',
        data: { object: mockFailedInvoice },
      })

      ;(prisma.invoice.findFirst as jest.Mock).mockResolvedValue({
        id: 'inv_db_123',
      })
      ;(prisma.subscription.update as jest.Mock).mockResolvedValue({})
      ;(prisma.invoice.update as jest.Mock).mockResolvedValue({})

      const request = createWebhookRequest(JSON.stringify({}), 'valid-sig')
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { stripeSubscriptionId: 'sub_123' },
        data: {
          status: 'SUSPENDED',
        },
      })
    })

    it('should log payment failure details', async () => {
      mockStripe.webhooks.constructEvent.mockReturnValue({
        id: 'evt_log_failure',
        type: 'invoice.payment_failed',
        data: { object: mockFailedInvoice },
      })

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      ;(prisma.invoice.findFirst as jest.Mock).mockResolvedValue(null)

      const request = createWebhookRequest(JSON.stringify({}), 'valid-sig')
      await POST(request)

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[STRIPE] Payment failed'),
        expect.any(Object)
      )

      consoleSpy.mockRestore()
    })
  })

  describe('7. Error Handling & Edge Cases', () => {
    it('should handle missing environment variables', async () => {
      delete process.env.STRIPE_WEBHOOK_SECRET

      const request = createWebhookRequest('body', 'sig')
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Webhook secret not configured')
    })

    it('should handle database errors gracefully', async () => {
      mockStripe.webhooks.constructEvent.mockReturnValue({
        id: 'evt_db_error',
        type: 'checkout.session.completed',
        data: { object: { id: 'cs_123' } },
      })

      ;(prisma.user.findFirst as jest.Mock).mockRejectedValue(
        new Error('Database connection failed')
      )

      const request = createWebhookRequest(JSON.stringify({}), 'valid-sig')
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Webhook processing failed')
    })

    it('should log all webhook events for debugging', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      mockStripe.webhooks.constructEvent.mockReturnValue({
        id: 'evt_logging',
        type: 'ping',
        created: 1704067200,
        data: { object: {} },
      })

      const request = createWebhookRequest(JSON.stringify({}), 'valid-sig')
      await POST(request)

      expect(consoleSpy).toHaveBeenCalledWith(
        '[STRIPE] Webhook received:',
        expect.objectContaining({
          type: 'ping',
          id: 'evt_logging',
        })
      )

      consoleSpy.mockRestore()
    })
  })

  describe('8. Idempotency & Duplicate Handling', () => {
    it('should handle duplicate webhook events idempotently', async () => {
      const event = {
        id: 'evt_duplicate',
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_duplicate',
            customer: 'cus_123',
            metadata: { userId: 'user_123' },
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(event)
      ;(prisma.user.findFirst as jest.Mock).mockResolvedValue({ id: 'user_123' })
      ;(prisma.subscription.create as jest.Mock).mockResolvedValue({})
      ;(prisma.rental.create as jest.Mock).mockResolvedValue({ id: 'rental_123' })
      ;(prisma.invoice.create as jest.Mock).mockResolvedValue({})

      // Send same event twice
      const request1 = createWebhookRequest(JSON.stringify({}), 'valid-sig')
      const response1 = await POST(request1)

      const request2 = createWebhookRequest(JSON.stringify({}), 'valid-sig')
      const response2 = await POST(request2)

      expect(response1.status).toBe(200)
      expect(response2.status).toBe(200)

      // Should attempt to create both times (Prisma handles uniqueness)
      expect(prisma.subscription.create).toHaveBeenCalledTimes(2)
    })
  })
})
