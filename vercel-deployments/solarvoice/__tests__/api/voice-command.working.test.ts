/**
 * Working test for voice command API
 * Uses proper Next.js testing patterns
 */

import { POST } from '@/app/api/voice/command/route'
import { NextRequest } from 'next/server'

// Mock the database
jest.mock('@/lib/db', () => ({
  prisma: {
    voiceInteraction: {
      create: jest.fn().mockResolvedValue({
        id: 'test-interaction-id',
        command: 'test command',
        response: 'test response'
      })
    },
    solarProject: {
      findUnique: jest.fn()
    }
  }
}))

// Mock auth
jest.mock('@/lib/auth', () => ({
  verifyAuth: jest.fn().mockResolvedValue({
    userId: 'test-user-123',
    email: 'test@example.com',
    role: 'FIELD_WORKER'
  })
}))

describe('Voice Command API - Working Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should process weather command successfully', async () => {
    // Create a proper NextRequest
    const request = new NextRequest(
      new URL('http://localhost:3000/api/voice/command'),
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer test-token'
        },
        body: JSON.stringify({
          command: "what's the weather"
        })
      }
    )

    // Call the API route
    const response = await POST(request)
    
    // Check response
    expect(response.status).toBe(200)
    
    const data = await response.json()
    expect(data.success).toBe(true)
    expect(data.type).toBe('weather')
    expect(data.response).toContain('75°F and sunny')
  })

  it('should detect emergency commands', async () => {
    const request = new NextRequest(
      new URL('http://localhost:3000/api/voice/command'),
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer test-token'
        },
        body: JSON.stringify({
          command: 'emergency help needed'
        })
      }
    )

    const response = await POST(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.type).toBe('emergency')
    expect(data.response).toContain('Emergency detected')
    expect(data.data.priority).toBe('CRITICAL')
  })

  it('should return 401 when not authenticated', async () => {
    // Mock auth to return null
    const { verifyAuth } = require('@/lib/auth')
    verifyAuth.mockResolvedValueOnce(null)

    const request = new NextRequest(
      new URL('http://localhost:3000/api/voice/command'),
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          command: 'test command'
        })
      }
    )

    const response = await POST(request)
    
    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.error).toBe('Unauthorized')
  })

  it('should validate input and return 400 for missing command', async () => {
    const request = new NextRequest(
      new URL('http://localhost:3000/api/voice/command'),
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer test-token'
        },
        body: JSON.stringify({
          // Missing command field
          emotion: 'neutral'
        })
      }
    )

    const response = await POST(request)
    
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('Invalid input')
    expect(data.details).toBeDefined()
  })

  it('should handle project status commands', async () => {
    // Mock project data
    const { prisma } = require('@/lib/db')
    prisma.solarProject.findUnique.mockResolvedValueOnce({
      id: 'project-123',
      name: 'Solar Installation A',
      status: 'IN_PROGRESS',
      tasks: [
        { id: 'task-1', name: 'Install panels', status: 'PENDING' },
        { id: 'task-2', name: 'Wire inverter', status: 'PENDING' }
      ]
    })

    const request = new NextRequest(
      new URL('http://localhost:3000/api/voice/command'),
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer test-token'
        },
        body: JSON.stringify({
          command: "check project status",
          context: {
            projectId: 'project-123'
          }
        })
      }
    )

    const response = await POST(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.type).toBe('projectStatus')
    expect(data.response).toContain('Solar Installation A')
    expect(data.response).toContain('IN_PROGRESS')
    expect(data.data.project).toBeDefined()
  })

  it('should log voice interactions to database', async () => {
    const { prisma } = require('@/lib/db')
    
    const request = new NextRequest(
      new URL('http://localhost:3000/api/voice/command'),
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer test-token'
        },
        body: JSON.stringify({
          command: 'clock me in',
          emotion: 'happy',
          context: {
            deviceType: 'mobile'
          }
        })
      }
    )

    await POST(request)
    
    // Check that interaction was logged
    expect(prisma.voiceInteraction.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        command: 'clock me in',
        transcription: 'clock me in',
        emotion: 'happy',
        userId: 'test-user-123',
        deviceType: 'mobile'
      })
    })
  })
})