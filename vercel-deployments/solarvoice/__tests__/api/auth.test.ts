/**
 * Test suite for /api/auth/login and /api/auth/register routes
 * Tests authentication, validation, JWT token generation, and error handling
 */

import { NextRequest } from 'next/server'
import { POST as loginPOST } from '@/app/api/auth/login/route'
import { POST as registerPOST } from '@/app/api/auth/register/route'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createMocks } from 'node-mocks-http'

// Mock dependencies
jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}))

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}))

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}))

// Mock crypto for UUID generation
global.crypto = {
  randomUUID: jest.fn(() => 'test-uuid-123'),
} as any

describe('/api/auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.JWT_SECRET = 'test-jwt-secret'
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret'
    process.env.JWT_EXPIRES_IN = '7d'
    process.env.JWT_REFRESH_EXPIRES_IN = '30d'
    process.env.NODE_ENV = 'test'
  })

  describe('Successful Login', () => {
    it('should login user with valid credentials', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        hashedPassword: 'hashed-password',
        firstName: 'John',
        lastName: 'Doe',
        role: 'CUSTOMER',
        company: 'Solar Corp',
        isVerified: true,
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(prisma.user.update as jest.Mock).mockResolvedValue(mockUser)
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)
      ;(jwt.sign as jest.Mock)
        .mockReturnValueOnce('access-token-123')
        .mockReturnValueOnce('refresh-token-123')

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'ValidPassword123!',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await loginPOST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.user).toEqual({
        id: 'user-123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'CUSTOMER',
        company: 'Solar Corp',
      })
      expect(data.accessToken).toBe('access-token-123')

      // Verify JWT token generation
      expect(jwt.sign).toHaveBeenCalledTimes(2)
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          userId: 'user-123',
          email: 'test@example.com',
          role: 'CUSTOMER',
        },
        'test-jwt-secret',
        { expiresIn: '7d' }
      )

      // Verify refresh token cookie is set
      const cookies = response.headers.getSetCookie()
      expect(cookies).toBeDefined()
      expect(cookies[0]).toContain('refreshToken=refresh-token-123')
      expect(cookies[0]).toContain('HttpOnly')
      expect(cookies[0]).toContain('SameSite=Lax')
    })

    it('should normalize email to lowercase', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        hashedPassword: 'hashed-password',
        isVerified: true,
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)
      ;(jwt.sign as jest.Mock).mockReturnValue('token-123')

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'TEST@EXAMPLE.COM', // Uppercase email
          password: 'password',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      await loginPOST(request)

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' }, // Should be lowercase
      })
    })

    it('should update login statistics', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        hashedPassword: 'hashed-password',
        isVerified: true,
        loginCount: 5,
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(prisma.user.update as jest.Mock).mockResolvedValue(mockUser)
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)
      ;(jwt.sign as jest.Mock).mockReturnValue('token-123')

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'password',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      await loginPOST(request)

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        data: {
          lastLogin: expect.any(Date),
          loginCount: { increment: 1 },
        },
      })
    })
  })

  describe('Authentication Failures', () => {
    it('should return 401 for non-existent user', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'nonexistent@example.com',
          password: 'password',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await loginPOST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Invalid credentials')
      expect(prisma.user.update).not.toHaveBeenCalled()
    })

    it('should return 401 for incorrect password', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        hashedPassword: 'hashed-password',
        isVerified: true,
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'wrong-password',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await loginPOST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Invalid credentials')
      expect(jwt.sign).not.toHaveBeenCalled()
    })

    it('should return 403 for unverified email', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        hashedPassword: 'hashed-password',
        isVerified: false,
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'password',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await loginPOST(request)
      const data = await response.json()

      expect(response.status).toBe(403)
      expect(data.error).toBe('Please verify your email before logging in')
    })
  })

  describe('Input Validation', () => {
    it('should return 400 for invalid email format', async () => {
      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'invalid-email',
          password: 'password',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await loginPOST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid input')
      expect(data.details).toBeDefined()
    })

    it('should return 400 for missing password', async () => {
      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          // Missing password
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await loginPOST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid input')
    })
  })

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockRejectedValue(
        new Error('Database connection failed')
      )

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'password',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await loginPOST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })

    it('should handle JWT signing errors', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        hashedPassword: 'hashed-password',
        isVerified: true,
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(prisma.user.update as jest.Mock).mockResolvedValue(mockUser)
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)
      ;(jwt.sign as jest.Mock).mockImplementation(() => {
        throw new Error('JWT signing failed')
      })

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'password',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await loginPOST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })
  })

  describe('Cookie Settings', () => {
    it('should set secure cookie in production', async () => {
      process.env.NODE_ENV = 'production'

      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        hashedPassword: 'hashed-password',
        isVerified: true,
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(prisma.user.update as jest.Mock).mockResolvedValue(mockUser)
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)
      ;(jwt.sign as jest.Mock).mockReturnValue('token-123')

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'password',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await loginPOST(request)
      const cookies = response.headers.getSetCookie()

      expect(cookies[0]).toContain('Secure')
    })
  })
})

describe('/api/auth/register', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Successful Registration', () => {
    it('should register new user with valid data', async () => {
      const mockUser = {
        id: 'new-user-123',
        email: 'newuser@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'CUSTOMER',
        company: 'Solar Inc',
        createdAt: new Date(),
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue(mockUser)
      ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password-123')

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'newuser@example.com',
          password: 'SecurePass123!',
          firstName: 'Jane',
          lastName: 'Smith',
          company: 'Solar Inc',
          phone: '+1234567890',
          role: 'CUSTOMER',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await registerPOST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toBe('Registration successful. Please check your email to verify your account.')
      expect(data.user).toEqual({
        id: 'new-user-123',
        email: 'newuser@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'CUSTOMER',
        company: 'Solar Inc',
        createdAt: mockUser.createdAt,
      })

      // Verify password hashing
      expect(bcrypt.hash).toHaveBeenCalledWith('SecurePass123!', 12)

      // Verify user creation
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'newuser@example.com',
          hashedPassword: 'hashed-password-123',
          firstName: 'Jane',
          lastName: 'Smith',
          company: 'Solar Inc',
          phone: '+1234567890',
          role: 'CUSTOMER',
          verificationToken: 'test-uuid-123',
          preferences: {
            notifications: true,
            newsletter: true,
            theme: 'light',
            language: 'en',
          },
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          company: true,
          createdAt: true,
        },
      })
    })

    it('should use default role when not specified', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue({
        id: 'user-123',
        email: 'user@example.com',
        role: 'CUSTOMER',
      })
      ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password')

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'user@example.com',
          password: 'Password123',
          firstName: 'John',
          lastName: 'Doe',
          // No role specified
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      await registerPOST(request)

      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            role: 'CUSTOMER', // Default role
          }),
        })
      )
    })
  })

  describe('Registration Failures', () => {
    it('should return 400 if user already exists', async () => {
      const existingUser = {
        id: 'existing-user',
        email: 'existing@example.com',
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser)

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'existing@example.com',
          password: 'Password123',
          firstName: 'John',
          lastName: 'Doe',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await registerPOST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('User with this email already exists')
      expect(prisma.user.create).not.toHaveBeenCalled()
    })
  })

  describe('Input Validation', () => {
    it('should return 400 for weak password', async () => {
      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'weak', // Less than 8 characters
          firstName: 'John',
          lastName: 'Doe',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await registerPOST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid input')
      expect(data.details).toBeDefined()
    })

    it('should return 400 for invalid email format', async () => {
      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'not-an-email',
          password: 'ValidPassword123',
          firstName: 'John',
          lastName: 'Doe',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await registerPOST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid input')
    })

    it('should return 400 for missing required fields', async () => {
      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'ValidPassword123',
          // Missing firstName and lastName
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await registerPOST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid input')
    })

    it('should validate role enum values', async () => {
      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'ValidPassword123',
          firstName: 'John',
          lastName: 'Doe',
          role: 'INVALID_ROLE', // Invalid role
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await registerPOST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid input')
    })
  })

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockRejectedValue(
        new Error('Database connection failed')
      )
      ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password')

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'ValidPassword123',
          firstName: 'John',
          lastName: 'Doe',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await registerPOST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })

    it('should handle bcrypt hashing errors', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Hashing failed'))

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'ValidPassword123',
          firstName: 'John',
          lastName: 'Doe',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await registerPOST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })
  })

  describe('Data Normalization', () => {
    it('should normalize email to lowercase', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
      })
      ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password')

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'TEST@EXAMPLE.COM', // Uppercase
          password: 'ValidPassword123',
          firstName: 'John',
          lastName: 'Doe',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      await registerPOST(request)

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' }, // Should be lowercase
      })

      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: 'test@example.com', // Should be lowercase
          }),
        })
      )
    })
  })
})