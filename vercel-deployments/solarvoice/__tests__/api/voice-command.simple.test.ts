/**
 * Simplified test suite for /api/voice/command route
 * Tests core functionality with mock implementations
 */

import { POST } from '@/app/api/voice/command/route'
import { createMockNextRequest, getResponseData } from './test-helpers'

// Mock dependencies
jest.mock('@/lib/db', () => ({
  prisma: {
    voiceInteraction: {
      create: jest.fn(),
    },
    solarProject: {
      findUnique: jest.fn(),
    },
  },
}))

jest.mock('@/lib/auth', () => ({
  verifyAuth: jest.fn(),
}))

// Import mocked modules
import { prisma } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

describe('/api/voice/command - Simplified Tests', () => {
  const mockAuth = {
    userId: 'test-user-123',
    email: 'test@example.com',
    role: 'FIELD_WORKER',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(verifyAuth as jest.Mock).mockResolvedValue(mockAuth)
  })

  describe('Core Functionality', () => {
    it('should handle voice commands when authenticated', async () => {
      // Setup mocks
      ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue({
        id: 'interaction-123',
        command: 'check weather',
        response: 'Weather checked',
      })

      // Create request
      const request = createMockNextRequest('http://localhost/api/voice/command', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          command: 'check weather',
        },
      })

      // Call API route
      const response = await POST(request)
      const data = await getResponseData(response)

      // Assertions
      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.type).toBe('weather')
      expect(data.response).toContain('75°F and sunny')
    })

    it('should return 401 when not authenticated', async () => {
      // Setup mock to return null (not authenticated)
      ;(verifyAuth as jest.Mock).mockResolvedValue(null)

      // Create request
      const request = createMockNextRequest('http://localhost/api/voice/command', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          command: 'check weather',
        },
      })

      // Call API route
      const response = await POST(request)
      const data = await getResponseData(response)

      // Assertions
      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should validate input and return 400 for invalid data', async () => {
      // Create request with invalid data (missing command)
      const request = createMockNextRequest('http://localhost/api/voice/command', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          // Missing required 'command' field
          emotion: 'confident',
        },
      })

      // Call API route
      const response = await POST(request)
      const data = await getResponseData(response)

      // Assertions
      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid input')
      expect(data.details).toBeDefined()
    })
  })

  describe('Command Type Detection', () => {
    const commandTests = [
      { command: 'check project status', expectedType: 'projectStatus' },
      { command: 'schedule work tomorrow', expectedType: 'scheduleWork' },
      { command: 'check permit', expectedType: 'checkPermit' },
      { command: 'emergency help', expectedType: 'emergency' },
      { command: 'clock me in', expectedType: 'clockIn' },
      { command: 'clock out', expectedType: 'clockOut' },
      { command: "what's the weather", expectedType: 'weather' },
      { command: 'safety hazard', expectedType: 'safety' },
      { command: 'how to install', expectedType: 'general' },
    ]

    commandTests.forEach(({ command, expectedType }) => {
      it(`should detect "${command}" as ${expectedType}`, async () => {
        ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue({
          id: 'interaction-123',
        })

        const request = createMockNextRequest('http://localhost/api/voice/command', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer valid-token',
          },
          body: { command },
        })

        const response = await POST(request)
        const data = await getResponseData(response)

        expect(response.status).toBe(200)
        expect(data.type).toBe(expectedType)
      })
    })
  })

  describe('Project Status Handling', () => {
    it('should handle project status with valid project ID', async () => {
      const mockProject = {
        id: 'project-123',
        name: 'Solar Installation',
        status: 'IN_PROGRESS',
        tasks: [
          { id: 'task-1', name: 'Panel Installation', status: 'PENDING' },
          { id: 'task-2', name: 'Wiring', status: 'PENDING' },
        ],
      }

      ;(prisma.solarProject.findUnique as jest.Mock).mockResolvedValue(mockProject)
      ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue({
        id: 'interaction-123',
      })

      const request = createMockNextRequest('http://localhost/api/voice/command', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          command: 'check project status',
          context: {
            projectId: 'project-123',
          },
        },
      })

      const response = await POST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(200)
      expect(data.response).toContain('Solar Installation')
      expect(data.response).toContain('IN_PROGRESS')
      expect(data.response).toContain('2 pending tasks')
    })

    it('should prompt for project ID when not provided', async () => {
      ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue({
        id: 'interaction-123',
      })

      const request = createMockNextRequest('http://localhost/api/voice/command', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          command: 'check project status',
          // No context/projectId provided
        },
      })

      const response = await POST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(200)
      expect(data.response).toBe('Which project would you like to check the status for?')
      expect(data.actions).toContain('list_projects')
    })
  })

  describe('Emergency Command Handling', () => {
    it('should handle emergency commands with high priority', async () => {
      ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue({
        id: 'interaction-123',
      })

      const request = createMockNextRequest('http://localhost/api/voice/command', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          command: 'emergency help needed',
          context: {
            location: {
              latitude: 37.7749,
              longitude: -122.4194,
            },
          },
        },
      })

      const response = await POST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(200)
      expect(data.response).toContain('Emergency detected')
      expect(data.data.priority).toBe('CRITICAL')
      expect(data.actions).toContain('notify_supervisor')
      expect(data.actions).toContain('call_911')
    })
  })

  describe('Voice Interaction Logging', () => {
    it('should log all voice interactions to database', async () => {
      ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue({
        id: 'interaction-123',
      })

      const request = createMockNextRequest('http://localhost/api/voice/command', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          command: 'check weather',
          emotion: 'neutral',
          context: {
            deviceType: 'mobile',
          },
        },
      })

      await POST(request)

      expect(prisma.voiceInteraction.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          command: 'check weather',
          transcription: 'check weather',
          emotion: 'neutral',
          userId: mockAuth.userId,
          deviceType: 'mobile',
        }),
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      ;(prisma.voiceInteraction.create as jest.Mock).mockRejectedValue(
        new Error('Database connection failed')
      )

      const request = createMockNextRequest('http://localhost/api/voice/command', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          command: 'check weather',
        },
      })

      const response = await POST(request)
      const data = await getResponseData(response)

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to process voice command')
    })
  })
})