/**
 * Cartesia TTS Service Tests
 * TDD: Port from Vozlux cartesia_tts.py patterns
 */

// Mock ReadableStream for Node.js test environment
class MockReadableStream {
  private reader: { read: () => Promise<{ done: boolean; value?: Uint8Array }> }

  constructor() {
    let called = false
    this.reader = {
      read: async () => {
        if (!called) {
          called = true
          return { done: false, value: new Uint8Array([1, 2, 3]) }
        }
        return { done: true }
      },
    }
  }

  getReader() {
    return this.reader
  }
}

// @ts-expect-error - Mock for test environment
global.ReadableStream = MockReadableStream

// Mock fetch globally before importing
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('CartesiaTTS', () => {
  beforeEach(() => {
    jest.resetModules()
    mockFetch.mockReset()
    process.env.CARTESIA_API_KEY = 'test-cartesia-key'
  })

  afterEach(() => {
    delete process.env.CARTESIA_API_KEY
  })

  describe('constructor', () => {
    it('throws error when API key is not configured', async () => {
      delete process.env.CARTESIA_API_KEY
      jest.resetModules()
      const module = await import('@/lib/services/cartesia')
      expect(() => new module.CartesiaTTS()).toThrow('CARTESIA_API_KEY not configured')
    })

    it('uses sonic-3 model by default', async () => {
      const module = await import('@/lib/services/cartesia')
      const tts = new module.CartesiaTTS()
      expect(tts.getModel()).toBe('sonic-3')
    })
  })

  describe('synthesize', () => {
    it('sends correct request to Cartesia API', async () => {
      const module = await import('@/lib/services/cartesia')
      const tts = new module.CartesiaTTS()

      mockFetch.mockResolvedValueOnce({
        ok: true,
        body: new ReadableStream(),
      })

      await tts.synthesize('Hello world', {
        voiceId: 'test-voice',
        emotion: 'excited',
        language: 'en',
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.cartesia.ai/tts/sse',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'X-API-Key': 'test-cartesia-key',
            'Content-Type': 'application/json',
          }),
        })
      )
    })

    it('uses Sonic-3 generation_config format', async () => {
      const module = await import('@/lib/services/cartesia')
      const tts = new module.CartesiaTTS()

      mockFetch.mockResolvedValueOnce({
        ok: true,
        body: new ReadableStream(),
      })

      await tts.synthesize('Test', {
        voiceId: 'voice-123',
        emotion: 'excited',
        speed: 1.2,
      })

      const [, options] = mockFetch.mock.calls[0]
      const body = JSON.parse(options.body)

      expect(body.model_id).toBe('sonic-3')
      expect(body.generation_config).toEqual({
        speed: 1.2,
        emotion: 'excited',
      })
    })

    it('returns ReadableStream on success', async () => {
      const module = await import('@/lib/services/cartesia')
      const tts = new module.CartesiaTTS()

      const mockStream = new ReadableStream()
      mockFetch.mockResolvedValueOnce({
        ok: true,
        body: mockStream,
      })

      const result = await tts.synthesize('Hello', { voiceId: 'test' })
      expect(result).toBe(mockStream)
    })

    it('throws error on API failure', async () => {
      const module = await import('@/lib/services/cartesia')
      const tts = new module.CartesiaTTS()

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      })

      await expect(
        tts.synthesize('Test', { voiceId: 'test' })
      ).rejects.toThrow('Cartesia API error: 401 Unauthorized')
    })

    it('uses pcm_s16le output format for telephony', async () => {
      const module = await import('@/lib/services/cartesia')
      const tts = new module.CartesiaTTS()

      mockFetch.mockResolvedValueOnce({
        ok: true,
        body: new ReadableStream(),
      })

      await tts.synthesize('Test', { voiceId: 'test' })

      const [, options] = mockFetch.mock.calls[0]
      const body = JSON.parse(options.body)

      expect(body.output_format).toEqual({
        container: 'raw',
        encoding: 'pcm_s16le',
        sample_rate: 22050,
      })
    })
  })

  describe('getVoiceForAgent', () => {
    it('returns voice ID for known agent type', async () => {
      const module = await import('@/lib/services/cartesia')
      const tts = new module.CartesiaTTS()

      expect(tts.getVoiceForAgent('commercial-manager')).toBeDefined()
      expect(tts.getVoiceForAgent('customer-success')).toBeDefined()
      expect(tts.getVoiceForAgent('sales-specialist')).toBeDefined()
    })

    it('returns default voice for unknown agent type', async () => {
      const module = await import('@/lib/services/cartesia')
      const tts = new module.CartesiaTTS()

      const defaultVoice = tts.getVoiceForAgent('unknown-agent')
      const commercialVoice = tts.getVoiceForAgent('commercial-manager')

      expect(defaultVoice).toBe(commercialVoice)
    })

    it('returns language-appropriate voice', async () => {
      const module = await import('@/lib/services/cartesia')
      const tts = new module.CartesiaTTS()

      const enVoice = tts.getVoiceForAgent('commercial-manager', 'en')
      const esVoice = tts.getVoiceForAgent('commercial-manager', 'es')

      expect(enVoice).toBeDefined()
      expect(esVoice).toBeDefined()
    })
  })

  describe('isConfigured', () => {
    it('returns true when API key is set', async () => {
      const module = await import('@/lib/services/cartesia')
      const tts = new module.CartesiaTTS()
      expect(tts.isConfigured()).toBe(true)
    })
  })
})

describe('cartesiaTTS singleton', () => {
  beforeEach(() => {
    jest.resetModules()
    process.env.CARTESIA_API_KEY = 'test-key'
  })

  afterEach(() => {
    delete process.env.CARTESIA_API_KEY
  })

  it('exports a singleton instance when API key is configured', async () => {
    const module = await import('@/lib/services/cartesia')
    expect(module.cartesiaTTS).toBeDefined()
  })
})
