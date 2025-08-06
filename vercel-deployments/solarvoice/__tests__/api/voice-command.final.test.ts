/**
 * Final working test for voice command API
 * Uses direct function testing instead of NextRequest mocking
 */

import { NextRequest, NextResponse } from 'next/server'

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

// Import the POST function after mocks are setup
import { POST } from '@/app/api/voice/command/route'

describe('Voice Command API - Final Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Helper to create test request
  const createTestRequest = (body: any, headers: Record<string, string> = {}) => {
    // Create a mock that matches what POST expects
    return {
      json: jest.fn().mockResolvedValue(body),
      headers: new Map(Object.entries({
        'content-type': 'application/json',
        ...headers
      }))
    } as any
  }

  it('should process weather command successfully', async () => {
    const mockRequest = createTestRequest(
      { command: "what's the weather" },
      { authorization: 'Bearer test-token' }
    )

    const response = await POST(mockRequest)
    
    expect(response).toBeInstanceOf(NextResponse)
    expect(response.status).toBe(200)
    
    // Parse response body
    const responseText = await response.text()
    const data = JSON.parse(responseText)
    
    expect(data.success).toBe(true)
    expect(data.type).toBe('weather')
    expect(data.response).toContain('75°F and sunny')
  })

  it('should detect emergency commands', async () => {
    const mockRequest = createTestRequest(
      { command: 'emergency help needed' },
      { authorization: 'Bearer test-token' }
    )

    const response = await POST(mockRequest)
    const responseText = await response.text()
    const data = JSON.parse(responseText)
    
    expect(response.status).toBe(200)
    expect(data.type).toBe('emergency')
    expect(data.response).toContain('Emergency detected')
    expect(data.data.priority).toBe('CRITICAL')
  })

  it('should return 401 when not authenticated', async () => {
    // Mock auth to return null
    const { verifyAuth } = require('@/lib/auth')
    verifyAuth.mockResolvedValueOnce(null)

    const mockRequest = createTestRequest(
      { command: 'test command' }
    )

    const response = await POST(mockRequest)
    
    expect(response.status).toBe(401)
    const responseText = await response.text()
    const data = JSON.parse(responseText)
    expect(data.error).toBe('Unauthorized')
  })

  it('should validate input and return 400 for missing command', async () => {
    const mockRequest = createTestRequest(
      { emotion: 'neutral' }, // Missing command field
      { authorization: 'Bearer test-token' }
    )

    const response = await POST(mockRequest)
    
    expect(response.status).toBe(400)
    const responseText = await response.text()
    const data = JSON.parse(responseText)
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

    const mockRequest = createTestRequest(
      {
        command: "check project status",
        context: { projectId: 'project-123' }
      },
      { authorization: 'Bearer test-token' }
    )

    const response = await POST(mockRequest)
    const responseText = await response.text()
    const data = JSON.parse(responseText)
    
    expect(response.status).toBe(200)
    expect(data.type).toBe('projectStatus')
    expect(data.response).toContain('Solar Installation A')
    expect(data.response).toContain('IN_PROGRESS')
    expect(data.data.project).toBeDefined()
  })

  it('should detect various command types correctly', async () => {
    const commandTests = [
      { command: 'check project status', expectedType: 'projectStatus' },
      { command: 'schedule work tomorrow', expectedType: 'scheduleWork' },
      { command: 'check permit status', expectedType: 'checkPermit' },
      { command: 'clock me in', expectedType: 'clockIn' },
      { command: 'clock out', expectedType: 'clockOut' },
      { command: 'safety hazard on site', expectedType: 'safety' },
      { command: 'how to install solar panels', expectedType: 'general' }
    ]

    for (const { command, expectedType } of commandTests) {
      const mockRequest = createTestRequest(
        { command },
        { authorization: 'Bearer test-token' }
      )

      const response = await POST(mockRequest)
      const responseText = await response.text()
      const data = JSON.parse(responseText)
      
      expect(data.type).toBe(expectedType)
    }
  })

  it('should log voice interactions to database', async () => {
    const { prisma } = require('@/lib/db')
    
    const mockRequest = createTestRequest(
      {
        command: 'clock me in',
        emotion: 'happy',
        context: { deviceType: 'mobile' }
      },
      { authorization: 'Bearer test-token' }
    )

    await POST(mockRequest)
    
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

  it('should handle database errors gracefully', async () => {
    const { prisma } = require('@/lib/db')
    prisma.voiceInteraction.create.mockRejectedValueOnce(new Error('Database error'))

    const mockRequest = createTestRequest(
      { command: 'test command' },
      { authorization: 'Bearer test-token' }
    )

    const response = await POST(mockRequest)
    
    expect(response.status).toBe(500)
    const responseText = await response.text()
    const data = JSON.parse(responseText)
    expect(data.error).toBe('Failed to process voice command')
  })
})