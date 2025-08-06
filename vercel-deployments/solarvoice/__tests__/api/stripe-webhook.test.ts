/**
 * Test suite for /api/webhooks/stripe route
 * Tests Stripe webhook signature validation, event processing, and error handling
 */

import { NextRequest } from 'next/server'
import { POST } from '@/app/api/webhooks/stripe/route'
import { prisma } from '@/lib/db'
import Stripe from 'stripe'
import { createMocks } from 'node-mocks-http'

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
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}))

describe('/api/webhooks/stripe', () => {
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
      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          // Missing stripe-signature header
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing signature')
    })

    it('should return 400 if signature verification fails', async () => {
      mockStripe.webhooks.constructEvent.mockImplementation(() => {
        throw new Error('Invalid signature')
      })

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'invalid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

      const response = await POST(request)
      const data = await response.json()

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
            payment_method: 'pm_123',
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-123' })
      ;(prisma.payment.updateMany as jest.Mock).mockResolvedValue({ count: 1 })
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.received).toBe(true)
      expect(mockStripe.webhooks.constructEvent).toHaveBeenCalledWith(
        'raw-body-string',
        'valid-signature',
        'whsec_test_123'
      )
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

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

      await POST(request)

      expect(prisma.webhookEvent.create).toHaveBeenCalledWith({
        data: {
          source: 'stripe',
          eventType: 'payment_intent.succeeded',
          payload: mockEvent,
        },
      })
    })

    it('should mark webhook as processed after handling', async () => {
      const mockEvent = {
        id: 'evt_456',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_456',
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-456' })
      ;(prisma.payment.updateMany as jest.Mock).mockResolvedValue({ count: 1 })
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

      await POST(request)

      expect(prisma.webhookEvent.updateMany).toHaveBeenCalledWith({
        where: {
          source: 'stripe',
          eventType: 'payment_intent.succeeded',
          payload: {
            path: ['id'],
            equals: 'evt_456',
          },
        },
        data: {
          processed: true,
          processedAt: expect.any(Date),
        },
      })
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

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

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

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

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

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

      await POST(request)

      expect(prisma.payment.findFirst).toHaveBeenCalledWith({
        where: { stripeCustomerId: 'cus_123' },
        select: { userId: true },
      })

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

    it('should handle customer.subscription.updated', async () => {
      const mockEvent = {
        id: 'evt_sub_update',
        type: 'customer.subscription.updated',
        data: {
          object: {
            id: 'sub_456',
            customer: 'cus_456',
            status: 'active',
            current_period_end: 1643673600,
            items: {
              data: [
                {
                  price: {
                    unit_amount: 29900,
                    metadata: {
                      tier: 'PROFESSIONAL',
                    },
                  },
                },
              ],
            },
          },
        },
      }

      const mockPayment = {
        userId: 'user-456',
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-456' })
      ;(prisma.payment.findFirst as jest.Mock).mockResolvedValue(mockPayment)
      ;(prisma.subscription.upsert as jest.Mock).mockResolvedValue({ id: 'sub-db-456' })
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

      await POST(request)

      expect(prisma.subscription.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          update: {
            status: 'ACTIVE',
            tier: 'PROFESSIONAL',
            endDate: new Date(1643673600 * 1000),
          },
        })
      )
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

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

      await POST(request)

      expect(prisma.subscription.updateMany).toHaveBeenCalledWith({
        where: { stripeSubscriptionId: 'sub_cancelled_123' },
        data: {
          status: 'CANCELLED',
          cancelledAt: expect.any(Date),
        },
      })
    })

    it('should handle missing user for subscription', async () => {
      const mockEvent = {
        id: 'evt_sub_no_user',
        type: 'customer.subscription.created',
        data: {
          object: {
            id: 'sub_no_user',
            customer: 'cus_no_user',
            status: 'active',
            items: {
              data: [
                {
                  price: {
                    unit_amount: 9900,
                  },
                },
              ],
            },
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-no-user' })
      ;(prisma.payment.findFirst as jest.Mock).mockResolvedValue(null) // No user found
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.received).toBe(true)
      expect(consoleSpy).toHaveBeenCalledWith('No user found for customer: cus_no_user')
      expect(prisma.subscription.upsert).not.toHaveBeenCalled()

      consoleSpy.mockRestore()
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

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

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

    it('should skip invoice without subscription', async () => {
      const mockEvent = {
        id: 'evt_invoice_no_sub',
        type: 'invoice.payment_succeeded',
        data: {
          object: {
            id: 'inv_no_sub',
            subscription: null, // No subscription
            customer: 'cus_123',
            amount_paid: 10000,
            currency: 'usd',
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-no-sub' })
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

      await POST(request)

      expect(prisma.subscription.findUnique).not.toHaveBeenCalled()
      expect(prisma.payment.create).not.toHaveBeenCalled()
    })
  })

  describe('Tier Detection', () => {
    const tierTestCases = [
      {
        amount: 150000,
        expectedTier: 'ENTERPRISE',
        description: 'amounts >= $1000',
      },
      {
        amount: 75000,
        expectedTier: 'PROFESSIONAL',
        description: 'amounts >= $500',
      },
      {
        amount: 9900,
        expectedTier: 'BASIC',
        description: 'amounts < $500',
      },
    ]

    tierTestCases.forEach(({ amount, expectedTier, description }) => {
      it(`should detect ${expectedTier} tier for ${description}`, async () => {
        const mockEvent = {
          id: `evt_tier_${amount}`,
          type: 'customer.subscription.created',
          data: {
            object: {
              id: `sub_tier_${amount}`,
              customer: 'cus_tier',
              status: 'active',
              current_period_start: 1640995200,
              current_period_end: 1643673600,
              items: {
                data: [
                  {
                    price: {
                      unit_amount: amount,
                      // No metadata tier specified
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

        const { req } = createMocks({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'stripe-signature': 'valid-signature',
          },
          body: 'raw-body-string',
        })

        const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
          method: 'POST',
          headers: req.headers as HeadersInit,
          body: req.body,
        }))

        await POST(request)

        expect(prisma.subscription.upsert).toHaveBeenCalledWith(
          expect.objectContaining({
            create: expect.objectContaining({
              tier: expectedTier,
            }),
            update: expect.objectContaining({
              tier: expectedTier,
            }),
          })
        )
      })
    })

    it('should use metadata tier if available', async () => {
      const mockEvent = {
        id: 'evt_metadata_tier',
        type: 'customer.subscription.created',
        data: {
          object: {
            id: 'sub_metadata',
            customer: 'cus_metadata',
            status: 'active',
            items: {
              data: [
                {
                  price: {
                    unit_amount: 100, // Low amount
                    metadata: {
                      tier: 'premium', // But metadata says premium
                    },
                  },
                },
              ],
            },
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-metadata' })
      ;(prisma.payment.findFirst as jest.Mock).mockResolvedValue({ userId: 'user-metadata' })
      ;(prisma.subscription.upsert as jest.Mock).mockResolvedValue({ id: 'sub-db-metadata' })
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

      await POST(request)

      expect(prisma.subscription.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          create: expect.objectContaining({
            tier: 'PREMIUM', // Should be uppercase from metadata
          }),
        })
      )
    })
  })

  describe('Unhandled Events', () => {
    it('should log but still process unhandled event types', async () => {
      const mockEvent = {
        id: 'evt_unhandled',
        type: 'charge.dispute.created', // Unhandled event type
        data: {
          object: {
            id: 'dp_123',
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-unhandled' })
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.received).toBe(true)
      expect(consoleSpy).toHaveBeenCalledWith('Unhandled event type: charge.dispute.created')
      expect(prisma.webhookEvent.create).toHaveBeenCalled()
      expect(prisma.webhookEvent.updateMany).toHaveBeenCalled()

      consoleSpy.mockRestore()
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

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Webhook processing failed')
    })

    it('should handle errors during event processing', async () => {
      const mockEvent = {
        id: 'evt_process_error',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_process_error',
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-error' })
      ;(prisma.payment.updateMany as jest.Mock).mockRejectedValue(
        new Error('Payment update failed')
      )

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Webhook processing failed')
    })

    it('should handle malformed request body', async () => {
      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: null as any, // Malformed body
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Webhook processing failed')
    })
  })

  describe('Idempotency', () => {
    it('should handle duplicate webhook events idempotently', async () => {
      const mockEvent = {
        id: 'evt_duplicate',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_duplicate',
            amount: 10000,
          },
        },
      }

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent)
      ;(prisma.webhookEvent.create as jest.Mock).mockResolvedValue({ id: 'webhook-dup' })
      ;(prisma.payment.updateMany as jest.Mock).mockResolvedValue({ count: 1 })
      ;(prisma.webhookEvent.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'stripe-signature': 'valid-signature',
        },
        body: 'raw-body-string',
      })

      const request = new NextRequest(new Request('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: req.body,
      }))

      // First call
      const response1 = await POST(request)
      expect(response1.status).toBe(200)

      // Second call with same event
      const response2 = await POST(request)
      expect(response2.status).toBe(200)

      // Should still only update once due to where clause
      expect(prisma.webhookEvent.updateMany).toHaveBeenCalledTimes(2)
      expect(prisma.webhookEvent.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            source: 'stripe',
            eventType: 'payment_intent.succeeded',
            payload: {
              path: ['id'],
              equals: 'evt_duplicate',
            },
          },
        })
      )
    })
  })
})