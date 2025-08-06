/**
 * Test helpers for API route testing
 * Provides utilities for creating mock requests and responses
 */

import { NextRequest } from 'next/server'

/**
 * Creates a mock NextRequest for testing API routes
 */
export function createMockNextRequest(
  url: string,
  options: {
    method?: string
    headers?: Record<string, string>
    body?: any
  } = {}
): NextRequest {
  const { method = 'GET', headers = {}, body } = options
  
  // Create headers with proper content-type
  const requestHeaders = new Headers(headers)
  if (body && !requestHeaders.has('content-type')) {
    requestHeaders.set('content-type', 'application/json')
  }
  
  // Create init options
  const init: RequestInit = {
    method,
    headers: requestHeaders,
  }
  
  // Add body if present
  if (body) {
    init.body = JSON.stringify(body)
  }
  
  // Create NextRequest with URL and init
  return new NextRequest(url, init)
}

/**
 * Helper to extract response data from NextResponse
 */
export async function getResponseData(response: Response) {
  const contentType = response.headers.get('content-type')
  
  if (contentType?.includes('application/json')) {
    return await response.json()
  }
  
  return await response.text()
}

/**
 * Helper to extract cookies from response
 */
export function getResponseCookies(response: Response): Record<string, string> {
  const cookies: Record<string, string> = {}
  const setCookieHeader = response.headers.get('set-cookie')
  
  if (setCookieHeader) {
    // Parse basic cookie values (simplified for testing)
    const match = setCookieHeader.match(/([^=]+)=([^;]+)/)
    if (match) {
      cookies[match[1]] = match[2]
    }
  }
  
  return cookies
}

/**
 * Mock Prisma client for testing
 */
export function createMockPrismaClient() {
  return {
    user: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      count: jest.fn(),
    },
    payment: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      count: jest.fn(),
    },
    subscription: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      upsert: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      count: jest.fn(),
    },
    solarProject: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      count: jest.fn(),
    },
    voiceInteraction: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      count: jest.fn(),
    },
    webhookEvent: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      count: jest.fn(),
    },
    $transaction: jest.fn(),
    $queryRaw: jest.fn(),
    $executeRaw: jest.fn(),
    $disconnect: jest.fn(),
  }
}

/**
 * Mock authentication helper
 */
export function createMockAuth(overrides = {}) {
  return {
    userId: 'test-user-123',
    email: 'test@example.com',
    role: 'FIELD_WORKER',
    ...overrides,
  }
}