/**
 * Simplified test suite for /api/webhooks/stripe route
 * Tests Stripe webhook processing functionality
 */

import { POST } from '@/app/api/webhooks/stripe/route'
import { createMockNextRequest, getResponseData } from './test-helpers'
import Stripe from 'stripe'

// Mock Stripe module
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    webhooks: {
      constructEvent: jest.fn(),
    },
  }))
})

// Mock database
jest.mock('@/lib/db', () => ({
  prisma: {
    webhookEvent: {
      create: jest.fn(),
      updateMany: jest.fn(),
    },
    payment: {
      create: jest.fn(),
      findFirst: jest.fn(),
      updateMany: jest.fn(),
    },
    subscription: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
      updateMany: jest.fn(),
    },
  },
}))

// Import mocked modules
import { prisma } from '@/lib/db'

describe('/api/webhooks/stripe - Simplified Tests', () => {
  let mockStripe: any

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.STRIPE_SECRET_KEY = 'sk_test_123'
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_123'
    
    // Get the mocked Stripe instance
    mockStripe = new (Stripe as any)()
  })

  describe('Webhook Signature Validation', () => {
    it('should return 400 if signature header is missing', async () => {
      const request = createMockNextRequest('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          // Missing stripe-signature header
        },
        body: { type: 'payment_intent.succeeded' },
      })

      const response = await POST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing signature')
    })

    it('should return 400 if signature verification fails', async () => {
      mockStripe.webhooks.constructEvent.mockImplementation(() => {
        throw new Error('Invalid signature')
      })

      const request = createMockNextRequest('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'invalid-signature',
        },
        body: { type: 'payment_intent.succeeded' },
      })

      const response = await POST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid signature')
    })

    it('should accept valid webhook signature', async () => {
      const mockEvent = {
        id: 'evt_123',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_123',
            amount: 10000,
            currency: 'usd',
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-123' })
      ;(prisma.payment.updateMany as jest.Mock).mockResolvedValue({ count: 1 })
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const request = createMockNextRequest('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: { type: 'payment_intent.succeeded' },
      })

      // Mock the text() method for webhook processing
      const originalText = request.text
      request.text = jest.fn().mockResolvedValue(JSON.stringify({ type: 'payment_intent.succeeded' }))

      const response = await POST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(200)
      expect(data.received).toBe(true)
    })
  })

  describe('Payment Intent Events', () => {
    it('should handle payment_intent.succeeded', async () => {
      const mockEvent = {
        id: 'evt_123',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_success_123',
            amount: 50000,
            currency: 'usd',
            payment_method: 'pm_card_123',
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-123' })
      ;(prisma.payment.updateMany as jest.Mock).mockResolvedValue({ count: 1 })
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const request = createMockNextRequest('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: mockEvent,
      })

      request.text = jest.fn().mockResolvedValue(JSON.stringify(mockEvent))

      await POST(request)

      expect(prisma.payment.updateMany).toHaveBeenCalledWith({
        where: { stripePaymentId: 'pi_success_123' },
        data: {
          status: 'COMPLETED',
          paidAt: expect.any(Date),
          metadata: {
            amount: 50000,
            currency: 'usd',
            paymentMethod: 'pm_card_123',
          },
        },
      })
    })

    it('should handle payment_intent.payment_failed', async () => {
      const mockEvent = {
        id: 'evt_fail_123',
        type: 'payment_intent.payment_failed',
        data: {
          object: {
            id: 'pi_failed_123',
            last_payment_error: {
              message: 'Card declined',
            },
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-123' })
      ;(prisma.payment.updateMany as jest.Mock).mockResolvedValue({ count: 1 })
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const request = createMockNextRequest('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: mockEvent,
      })

      request.text = jest.fn().mockResolvedValue(JSON.stringify(mockEvent))

      await POST(request)

      expect(prisma.payment.updateMany).toHaveBeenCalledWith({
        where: { stripePaymentId: 'pi_failed_123' },
        data: {
          status: 'FAILED',
          metadata: {
            error: 'Card declined',
          },
        },
      })
    })
  })

  describe('Subscription Events', () => {
    it('should handle customer.subscription.created', async () => {
      const mockEvent = {
        id: 'evt_sub_123',
        type: 'customer.subscription.created',
        data: {
          object: {
            id: 'sub_123',
            customer: 'cus_123',
            status: 'active',
            current_period_start: 1640995200,
            current_period_end: 1643673600,
            items: {
              data: [
                {
                  price: {
                    unit_amount: 99900,
                    metadata: {
                      tier: 'ENTERPRISE',
                    },
                  },
                },
              ],
            },
          },
        },
      }

      const mockPayment = {
        userId: 'user-123',
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-123' })
      ;(prisma.payment.findFirst as jest.Mock).mockResolvedValue(mockPayment)
      ;(prisma.subscription.upsert as jest.Mock).mockResolvedValue({ id: 'sub-db-123' })
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const request = createMockNextRequest('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: mockEvent,
      })

      request.text = jest.fn().mockResolvedValue(JSON.stringify(mockEvent))

      await POST(request)

      expect(prisma.subscription.upsert).toHaveBeenCalledWith({
        where: { stripeSubscriptionId: 'sub_123' },
        update: {
          status: 'ACTIVE',
          tier: 'ENTERPRISE',
          endDate: new Date(1643673600 * 1000),
        },
        create: {
          stripeSubscriptionId: 'sub_123',
          userId: 'user-123',
          status: 'ACTIVE',
          tier: 'ENTERPRISE',
          startDate: new Date(1640995200 * 1000),
          endDate: new Date(1643673600 * 1000),
        },
      })
    })

    it('should handle customer.subscription.deleted', async () => {
      const mockEvent = {
        id: 'evt_sub_cancel',
        type: 'customer.subscription.deleted',
        data: {
          object: {
            id: 'sub_cancelled_123',
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-cancel' })
      ;(prisma.subscription.updateMany as jest.Mock).mockResolvedValue({ count: 1 })
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const request = createMockNextRequest('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: mockEvent,
      })

      request.text = jest.fn().mockResolvedValue(JSON.stringify(mockEvent))

      await POST(request)

      expect(prisma.subscription.updateMany).toHaveBeenCalledWith({
        where: { stripeSubscriptionId: 'sub_cancelled_123' },
        data: {
          status: 'CANCELLED',
          cancelledAt: expect.any(Date),
        },
      })
    })
  })

  describe('Invoice Events', () => {
    it('should handle invoice.payment_succeeded', async () => {
      const mockEvent = {
        id: 'evt_invoice',
        type: 'invoice.payment_succeeded',
        data: {
          object: {
            id: 'inv_123',
            subscription: 'sub_123',
            customer: 'cus_123',
            amount_paid: 29900,
            currency: 'usd',
            payment_intent: 'pi_invoice_123',
            period_start: 1640995200,
            period_end: 1643673600,
          },
        },
      }

      const mockSubscription = {
        id: 'sub-db-123',
        userId: 'user-123',
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-invoice' })
      ;(prisma.subscription.findUnique as jest.Mock).mockResolvedValue(mockSubscription)
      ;(prisma.payment.create as jest.Mock).mockResolvedValue({ id: 'payment-123' })
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const request = createMockNextRequest('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: mockEvent,
      })

      request.text = jest.fn().mockResolvedValue(JSON.stringify(mockEvent))

      await POST(request)

      expect(prisma.payment.create).toHaveBeenCalledWith({
        data: {
          amount: 299, // 29900 / 100
          currency: 'USD',
          status: 'COMPLETED',
          stripePaymentId: 'pi_invoice_123',
          stripeCustomerId: 'cus_123',
          description: expect.stringContaining('Subscription payment for'),
          userId: 'user-123',
          subscriptionId: 'sub-db-123',
          paymentMethod: 'CARD',
          paidAt: expect.any(Date),
        },
      })
    })
  })

  describe('Tier Detection', () => {
    it('should detect ENTERPRISE tier for amounts >= $1000', async () => {
      const mockEvent = {
        id: 'evt_tier',
        type: 'customer.subscription.created',
        data: {
          object: {
            id: 'sub_tier',
            customer: 'cus_tier',
            status: 'active',
            current_period_start: 1640995200,
            current_period_end: 1643673600,
            items: {
              data: [
                {
                  price: {
                    unit_amount: 150000, // $1500
                  },
                },
              ],
            },
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-tier' })
      ;(prisma.payment.findFirst as jest.Mock).mockResolvedValue({ userId: 'user-tier' })
      ;(prisma.subscription.upsert as jest.Mock).mockResolvedValue({ id: 'sub-db-tier' })
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const request = createMockNextRequest('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: mockEvent,
      })

      request.text = jest.fn().mockResolvedValue(JSON.stringify(mockEvent))

      await POST(request)

      expect(prisma.subscription.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          create: expect.objectContaining({
            tier: 'ENTERPRISE',
          }),
        })
      )
    })
  })

  describe('Error Handling', () => {
    it('should handle database errors during event logging', async () => {
      const mockEvent = {
        id: 'evt_db_error',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_db_error',
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockRejectedValue(
        new Error('Database connection failed')
      )

      const request = createMockNextRequest('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: mockEvent,
      })

      request.text = jest.fn().mockResolvedValue(JSON.stringify(mockEvent))

      const response = await POST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(500)
      expect(data.error).toBe('Webhook processing failed')
    })
  })

  describe('Event Logging', () => {
    it('should log all webhook events to database', async () => {
      const mockEvent = {
        id: 'evt_123',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_123',
            amount: 10000,
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-123' })
      ;(prisma.payment.updateMany as jest.Mock).mockResolvedValue({ count: 1 })
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const request = createMockNextRequest('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: mockEvent,
      })

      request.text = jest.fn().mockResolvedValue(JSON.stringify(mockEvent))

      await POST(request)

      expect(prisma.webhookEvent.create).toHaveBeenCalledWith({
        data: {
          source: 'stripe',
          eventType: 'payment_intent.succeeded',
          payload: mockEvent,
        },
      })

      expect(prisma.webhookEvent.updateMany).toHaveBeenCalledWith({
        where: {
          source: 'stripe',
          eventType: 'payment_intent.succeeded',
          payload: {
            path: ['id'],
            equals: 'evt_123',
          },
        },
        data: {
          processed: true,
          processedAt: expect.any(Date),
        },
      })
    })
  })
})