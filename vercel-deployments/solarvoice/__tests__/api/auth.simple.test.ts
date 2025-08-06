/**
 * Simplified test suite for /api/auth/login and /api/auth/register routes
 * Tests core authentication functionality
 */

import { POST as loginPOST } from '@/app/api/auth/login/route'
import { POST as registerPOST } from '@/app/api/auth/register/route'
import { createMockNextRequest, getResponseData } from './test-helpers'

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

// Import mocked modules
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Mock crypto for UUID
global.crypto = {
  randomUUID: jest.fn(() => 'test-uuid-123'),
} as any

describe('/api/auth/login - Simplified Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.JWT_SECRET = 'test-jwt-secret'
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret'
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

      const request = createMockNextRequest('http://localhost/api/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'ValidPassword123!',
        },
      })

      const response = await loginPOST(request)
      const data = await getResponseData(response)

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
    })

    it('should update login statistics on successful login', async () => {
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

      const request = createMockNextRequest('http://localhost/api/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'password',
        },
      })

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

      const request = createMockNextRequest('http://localhost/api/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'nonexistent@example.com',
          password: 'password',
        },
      })

      const response = await loginPOST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(401)
      expect(data.error).toBe('Invalid credentials')
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

      const request = createMockNextRequest('http://localhost/api/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'wrong-password',
        },
      })

      const response = await loginPOST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(401)
      expect(data.error).toBe('Invalid credentials')
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

      const request = createMockNextRequest('http://localhost/api/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'password',
        },
      })

      const response = await loginPOST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(403)
      expect(data.error).toBe('Please verify your email before logging in')
    })
  })

  describe('Input Validation', () => {
    it('should return 400 for invalid email format', async () => {
      const request = createMockNextRequest('http://localhost/api/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'invalid-email',
          password: 'password',
        },
      })

      const response = await loginPOST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid input')
    })

    it('should return 400 for missing password', async () => {
      const request = createMockNextRequest('http://localhost/api/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          // Missing password
        },
      })

      const response = await loginPOST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid input')
    })
  })
})

describe('/api/auth/register - Simplified Tests', () => {
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

      const request = createMockNextRequest('http://localhost/api/auth/register', {
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
          role: 'CUSTOMER',
        },
      })

      const response = await registerPOST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toContain('Registration successful')
      expect(data.user.email).toBe('newuser@example.com')
    })

    it('should use default role when not specified', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue({
        id: 'user-123',
        email: 'user@example.com',
        role: 'CUSTOMER',
      })
      ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password')

      const request = createMockNextRequest('http://localhost/api/auth/register', {
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

      await registerPOST(request)

      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            role: 'CUSTOMER',
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

      const request = createMockNextRequest('http://localhost/api/auth/register', {
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

      const response = await registerPOST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe('User with this email already exists')
    })
  })

  describe('Input Validation', () => {
    it('should return 400 for weak password', async () => {
      const request = createMockNextRequest('http://localhost/api/auth/register', {
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

      const response = await registerPOST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid input')
    })

    it('should return 400 for invalid email format', async () => {
      const request = createMockNextRequest('http://localhost/api/auth/register', {
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

      const response = await registerPOST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid input')
    })

    it('should validate role enum values', async () => {
      const request = createMockNextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          email: 'test@example.com',
          password: 'ValidPassword123',
          firstName: 'John',
          lastName: 'Doe',
          role: 'INVALID_ROLE',
        },
      })

      const response = await registerPOST(request)
      const data = await getResponseData(response)

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

      const request = createMockNextRequest('http://localhost/api/auth/register', {
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

      const response = await registerPOST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })
  })
})