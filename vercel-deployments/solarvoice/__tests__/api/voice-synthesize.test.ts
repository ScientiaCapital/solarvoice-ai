/**
 * Voice Synthesize API Route Tests
 * TDD: Test the Cartesia TTS integration
 */

// Helper to create mock request
function createRequest(body: any) {
  return {
    json: async () => body,
  } as any
}

// Mock the cartesia service
jest.mock('@/lib/services/cartesia', () => ({
  CartesiaTTS: jest.fn().mockImplementation(() => ({
    synthesize: jest.fn(),
    getVoiceForAgent: jest.fn().mockReturnValue('mock-voice-id'),
    isConfigured: jest.fn().mockReturnValue(true),
    getModel: jest.fn().mockReturnValue('sonic-3'),
  })),
  cartesiaTTS: {
    synthesize: jest.fn(),
    getVoiceForAgent: jest.fn().mockReturnValue('mock-voice-id'),
    isConfigured: jest.fn().mockReturnValue(true),
    getModel: jest.fn().mockReturnValue('sonic-3'),
  },
}))

// Mock emotions
jest.mock('@/lib/voice/emotions', () => ({
  getEmotionForContext: jest.fn().mockReturnValue('excited'),
  detectEmotionFromText: jest.fn().mockReturnValue('neutral'),
  validateEmotion: jest.fn().mockImplementation((e) => e || 'neutral'),
}))

describe('POST /api/voice/synthesize', () => {
  let POST: (req: NextRequest) => Promise<Response>
  let mockCartesiaTTS: { synthesize: jest.Mock; getVoiceForAgent: jest.Mock }

  beforeEach(async () => {
    jest.resetModules()

    // Re-import to get fresh mocks
    const cartesiaModule = await import('@/lib/services/cartesia')
    mockCartesiaTTS = cartesiaModule.cartesiaTTS as any

    const routeModule = await import('@/app/api/voice/synthesize/route')
    POST = routeModule.POST
  })

  it('returns 400 when text is missing', async () => {
    const req = createRequest({})

    const response = await POST(req)
    expect(response.status).toBe(400)

    const data = await response.json()
    expect(data.error).toContain('required')
  })

  it('calls Cartesia TTS with correct parameters', async () => {
    // Create a mock stream
    const mockStream = {
      getReader: () => ({
        read: jest.fn()
          .mockResolvedValueOnce({ done: false, value: new Uint8Array([1, 2, 3]) })
          .mockResolvedValueOnce({ done: true }),
      }),
    }
    mockCartesiaTTS.synthesize.mockResolvedValue(mockStream)

    const req = createRequest({
      text: 'Hello solar customer!',
      agentType: 'commercial-manager',
      scenario: 'greeting',
      language: 'en',
    })

    const response = await POST(req)

    expect(mockCartesiaTTS.synthesize).toHaveBeenCalledWith(
      'Hello solar customer!',
      expect.objectContaining({
        voiceId: expect.any(String),
        emotion: expect.any(String),
        language: 'en',
      })
    )
  })

  it('returns audio stream on success', async () => {
    const mockStream = {
      getReader: () => ({
        read: jest.fn()
          .mockResolvedValueOnce({ done: false, value: new Uint8Array([1, 2, 3]) })
          .mockResolvedValueOnce({ done: true }),
      }),
    }
    mockCartesiaTTS.synthesize.mockResolvedValue(mockStream)

    const req = createRequest({
      text: 'Test synthesis',
      agentType: 'commercial-manager',
    })

    const response = await POST(req)

    // Should return success status
    expect(response.status).toBe(200)
    // Should have audio content type
    expect(response.headers.get('Content-Type')).toBe('audio/pcm')
  })

  it('includes latency header in response', async () => {
    const mockStream = {
      getReader: () => ({
        read: jest.fn()
          .mockResolvedValueOnce({ done: false, value: new Uint8Array([1, 2, 3]) })
          .mockResolvedValueOnce({ done: true }),
      }),
    }
    mockCartesiaTTS.synthesize.mockResolvedValue(mockStream)

    const req = createRequest({
      text: 'Test',
      agentType: 'commercial-manager',
    })

    const response = await POST(req)

    expect(response.headers.get('X-TTS-Latency-Ms')).toBeDefined()
  })

  it('includes emotion used in response header', async () => {
    const mockStream = {
      getReader: () => ({
        read: jest.fn()
          .mockResolvedValueOnce({ done: false, value: new Uint8Array([1, 2, 3]) })
          .mockResolvedValueOnce({ done: true }),
      }),
    }
    mockCartesiaTTS.synthesize.mockResolvedValue(mockStream)

    const req = createRequest({
      text: 'Great news!',
      agentType: 'sales-specialist',
      scenario: 'pitch',
    })

    const response = await POST(req)

    expect(response.headers.get('X-Emotion')).toBeDefined()
  })

  it('returns 503 when Cartesia is not configured', async () => {
    // Reset and import with unconfigured service
    jest.resetModules()
    jest.doMock('@/lib/services/cartesia', () => ({
      cartesiaTTS: null,
    }))

    const routeModule = await import('@/app/api/voice/synthesize/route')

    const req = createRequest({ text: 'Test' })

    const response = await routeModule.POST(req)
    expect(response.status).toBe(503)

    const data = await response.json()
    expect(data.fallback).toBe('browser')
  })
})

describe('GET /api/voice/synthesize', () => {
  it('returns status information', async () => {
    const routeModule = await import('@/app/api/voice/synthesize/route')
    const GET = routeModule.GET

    const req = {} as any

    const response = await GET(req)
    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data).toHaveProperty('status')
    expect(data).toHaveProperty('provider')
  })
})
