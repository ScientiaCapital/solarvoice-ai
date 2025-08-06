/**
 * Test suite for /api/voice/command route
 * Tests voice command processing, validation, and error handling
 */

import { NextRequest } from 'next/server'
import { POST } from '@/app/api/voice/command/route'
import { prisma } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'
import { createMocks } from 'node-mocks-http'

// Mock dependencies
jest.mock('@/lib/db', () => ({
  prisma: {
    voiceInteraction: {
      create: jest.fn(),
    },
    solarProject: {
      findUnique: jest.fn(),
    },
    user: {
      update: jest.fn(),
    },
  },
}))

jest.mock('@/lib/auth', () => ({
  verifyAuth: jest.fn(),
}))

describe('/api/voice/command', () => {
  const mockAuth = {
    userId: 'test-user-123',
    email: 'test@example.com',
    role: 'FIELD_WORKER',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(verifyAuth as jest.Mock).mockResolvedValue(mockAuth)
  })

  describe('Authentication', () => {
    it('should return 401 when not authenticated', async () => {
      ;(verifyAuth as jest.Mock).mockResolvedValue(null)

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          command: 'check project status',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/voice/command', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should process command when authenticated', async () => {
      const mockProject = {
        id: 'project-123',
        name: 'Solar Installation Project',
        status: 'IN_PROGRESS',
        tasks: [
          { id: 'task-1', name: 'Panel Installation', status: 'PENDING', priority: 'HIGH' },
          { id: 'task-2', name: 'Wiring', status: 'PENDING', priority: 'MEDIUM' },
        ],
      }

      ;(prisma.solarProject.findUnique as jest.Mock).mockResolvedValue(mockProject)
      ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue({
        id: 'interaction-123',
        command: 'check project status',
        response: 'Project status retrieved',
      })

      const { req } = createMocks({
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

      const request = new NextRequest(new Request('http://localhost/api/voice/command', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.type).toBe('projectStatus')
      expect(data.response).toContain('Solar Installation Project')
      expect(data.response).toContain('IN_PROGRESS')
      expect(data.response).toContain('2 pending tasks')
    })
  })

  describe('Input Validation', () => {
    it('should return 400 for invalid input schema', async () => {
      const { req } = createMocks({
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

      const request = new NextRequest(new Request('http://localhost/api/voice/command', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid input')
      expect(data.details).toBeDefined()
    })

    it('should accept optional fields in context', async () => {
      ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue({
        id: 'interaction-123',
      })

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          command: 'what is the weather',
          emotion: 'curious',
          context: {
            location: {
              latitude: 37.7749,
              longitude: -122.4194,
            },
            deviceType: 'mobile',
          },
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/voice/command', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.type).toBe('weather')
      expect(prisma.voiceInteraction.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            emotion: 'curious',
            deviceType: 'mobile',
            location: {
              latitude: 37.7749,
              longitude: -122.4194,
            },
          }),
        })
      )
    })
  })

  describe('Command Type Detection', () => {
    const testCases = [
      {
        command: "what's the status of project",
        expectedType: 'projectStatus',
        description: 'project status query',
      },
      {
        command: 'schedule work for tomorrow',
        expectedType: 'scheduleWork',
        description: 'scheduling command',
      },
      {
        command: 'check permit status',
        expectedType: 'checkPermit',
        description: 'permit check',
      },
      {
        command: 'emergency help needed',
        expectedType: 'emergency',
        description: 'emergency command',
      },
      {
        command: 'clock me in',
        expectedType: 'clockIn',
        description: 'clock in command',
      },
      {
        command: 'clock out',
        expectedType: 'clockOut',
        description: 'clock out command',
      },
      {
        command: "what's the weather",
        expectedType: 'weather',
        description: 'weather query',
      },
      {
        command: 'safety hazard detected',
        expectedType: 'safety',
        description: 'safety concern',
      },
      {
        command: 'how do I install panels',
        expectedType: 'general',
        description: 'general query',
      },
    ]

    testCases.forEach(({ command, expectedType, description }) => {
      it(`should detect ${description} as ${expectedType}`, async () => {
        ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue({
          id: 'interaction-123',
        })

        const { req } = createMocks({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer valid-token',
          },
          body: { command },
        })

        const request = new NextRequest(new Request('http://localhost/api/voice/command', {
          method: 'POST',
          headers: req.headers as HeadersInit,
          body: JSON.stringify(req.body),
        }))

        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data.type).toBe(expectedType)
      })
    })
  })

  describe('Command Processing', () => {
    it('should handle project status without projectId', async () => {
      ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue({
        id: 'interaction-123',
      })

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          command: 'check project status',
          // No projectId in context
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/voice/command', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.response).toBe('Which project would you like to check the status for?')
      expect(data.actions).toContain('list_projects')
    })

    it('should handle non-existent project', async () => {
      ;(prisma.solarProject.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue({
        id: 'interaction-123',
      })

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          command: 'check project status',
          context: {
            projectId: 'non-existent-project',
          },
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/voice/command', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.response).toBe("I couldn't find that project. Please check the project ID.")
    })

    it('should handle emergency commands with high priority', async () => {
      ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue({
        id: 'interaction-123',
      })

      const { req } = createMocks({
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

      const request = new NextRequest(new Request('http://localhost/api/voice/command', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.response).toContain('Emergency detected')
      expect(data.response).toContain('Notifying safety supervisor')
      expect(data.data.priority).toBe('CRITICAL')
      expect(data.actions).toContain('notify_supervisor')
      expect(data.actions).toContain('call_911')
      expect(data.actions).toContain('send_location')
    })

    it('should handle clock in/out commands', async () => {
      ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue({
        id: 'interaction-123',
      })

      // Test clock in
      const { req: reqIn } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          command: 'clock me in',
        },
      })

      const requestIn = new NextRequest(new Request('http://localhost/api/voice/command', {
        method: 'POST',
        headers: reqIn.headers as HeadersInit,
        body: JSON.stringify(reqIn.body),
      }))

      const responseIn = await POST(requestIn)
      const dataIn = await responseIn.json()

      expect(responseIn.status).toBe(200)
      expect(dataIn.response).toContain("You've been clocked in successfully")
      expect(dataIn.actions).toContain('record_time_entry')

      // Test clock out
      const { req: reqOut } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          command: 'clock out',
        },
      })

      const requestOut = new NextRequest(new Request('http://localhost/api/voice/command', {
        method: 'POST',
        headers: reqOut.headers as HeadersInit,
        body: JSON.stringify(reqOut.body),
      }))

      const responseOut = await POST(requestOut)
      const dataOut = await responseOut.json()

      expect(responseOut.status).toBe(200)
      expect(dataOut.response).toContain("You've been clocked out")
      expect(dataOut.data.hoursWorked).toBe(8.25)
      expect(dataOut.actions).toContain('calculate_hours')
    })
  })

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      ;(prisma.voiceInteraction.create as jest.Mock).mockRejectedValue(
        new Error('Database connection failed')
      )

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          command: 'check weather',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/voice/command', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to process voice command')
    })

    it('should handle malformed JSON in request body', async () => {
      const request = new NextRequest(new Request('http://localhost/api/voice/command', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: 'invalid json {',
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to process voice command')
    })
  })

  describe('Voice Interaction Logging', () => {
    it('should log all voice interactions to database', async () => {
      const mockInteraction = {
        id: 'interaction-123',
        command: 'check weather',
        response: 'Current weather is 75°F and sunny',
        confidence: 0.9,
        duration: 1000,
      }

      ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue(mockInteraction)

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          command: 'check weather',
          emotion: 'neutral',
          context: {
            deviceType: 'desktop',
          },
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/voice/command', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      await POST(request)

      expect(prisma.voiceInteraction.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          command: 'check weather',
          transcription: 'check weather',
          emotion: 'neutral',
          userId: mockAuth.userId,
          deviceType: 'desktop',
          confidence: expect.any(Number),
          duration: expect.any(Number),
        }),
      })
    })

    it('should include project context in interaction log', async () => {
      const mockProject = {
        id: 'project-456',
        name: 'Test Project',
        status: 'ACTIVE',
        tasks: [],
      }

      ;(prisma.solarProject.findUnique as jest.Mock).mockResolvedValue(mockProject)
      ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue({
        id: 'interaction-123',
      })

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          command: 'check project status',
          context: {
            projectId: 'project-456',
            location: {
              latitude: 40.7128,
              longitude: -74.0060,
            },
          },
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/voice/command', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      await POST(request)

      expect(prisma.voiceInteraction.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          projectId: 'project-456',
          location: {
            latitude: 40.7128,
            longitude: -74.0060,
          },
        }),
      })
    })
  })

  describe('Response Format', () => {
    it('should return consistent response format', async () => {
      ;(prisma.voiceInteraction.create as jest.Mock).mockResolvedValue({
        id: 'interaction-123',
      })

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer valid-token',
        },
        body: {
          command: 'check safety protocols',
        },
      })

      const request = new NextRequest(new Request('http://localhost/api/voice/command', {
        method: 'POST',
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body),
      }))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('success')
      expect(data).toHaveProperty('type')
      expect(data).toHaveProperty('response')
      expect(data).toHaveProperty('data')
      expect(data).toHaveProperty('actions')
      expect(typeof data.success).toBe('boolean')
      expect(typeof data.type).toBe('string')
      expect(typeof data.response).toBe('string')
      expect(Array.isArray(data.actions)).toBe(true)
    })
  })
})