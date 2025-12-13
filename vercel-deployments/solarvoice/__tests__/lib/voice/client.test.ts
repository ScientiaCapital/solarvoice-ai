/**
 * VoiceClient Tests - TDD RED Phase
 * Test voice integration template that connects to voice-ai-core services
 */

describe('VoiceClient', () => {
  const mockBaseUrl = 'http://localhost:8001'

  beforeEach(() => {
    jest.resetModules()
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('constructor', () => {
    it('creates client with default config', async () => {
      const { VoiceClient } = await import('@/lib/voice/client')
      const client = new VoiceClient()

      expect(client).toBeDefined()
      expect(client.getBaseUrl()).toBe('http://localhost:8001')
    })

    it('creates client with custom base URL', async () => {
      const { VoiceClient } = await import('@/lib/voice/client')
      const client = new VoiceClient({ baseUrl: 'https://voice.example.com' })

      expect(client.getBaseUrl()).toBe('https://voice.example.com')
    })

    it('uses environment variable for base URL when available', async () => {
      process.env.NEXT_PUBLIC_VOICE_API_URL = 'https://voice-api.solarvoice.ai'
      jest.resetModules()

      const { VoiceClient } = await import('@/lib/voice/client')
      const client = new VoiceClient()

      expect(client.getBaseUrl()).toBe('https://voice-api.solarvoice.ai')

      delete process.env.NEXT_PUBLIC_VOICE_API_URL
    })
  })

  describe('synthesize', () => {
    it('sends TTS request to voice-ai-core', async () => {
      const mockResponse = new ArrayBuffer(1024)
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'content-type': 'audio/pcm' }),
      })

      const { VoiceClient } = await import('@/lib/voice/client')
      const client = new VoiceClient({ baseUrl: mockBaseUrl })

      const result = await client.synthesize({
        text: 'Hello world',
        voiceId: 'voice-123',
        emotion: 'friendly',
      })

      expect(global.fetch).toHaveBeenCalledWith(
        `${mockBaseUrl}/tts/bytes`,
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: expect.any(String),
        })
      )

      const requestBody = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body)
      expect(requestBody.text).toBe('Hello world')
      expect(requestBody.voice_id).toBe('voice-123')
      expect(requestBody.emotion).toBe('friendly')
    })

    it('returns TTSResponse with audio data', async () => {
      const mockAudio = new ArrayBuffer(2048)
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(mockAudio),
        headers: new Headers({
          'content-type': 'audio/pcm',
          'x-latency-ms': '150',
          'x-duration-ms': '3000',
        }),
      })

      const { VoiceClient } = await import('@/lib/voice/client')
      const client = new VoiceClient({ baseUrl: mockBaseUrl })

      const result = await client.synthesize({
        text: 'Test audio',
        voiceId: 'voice-456',
      })

      expect(result.audio).toBe(mockAudio)
      expect(result.format).toBe('pcm_s16le')
      expect(result.sampleRate).toBe(22050)
    })

    it('throws VoiceError on API failure', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: () => Promise.resolve('Service unavailable'),
      })

      const { VoiceClient, VoiceError } = await import('@/lib/voice/client')
      const client = new VoiceClient({ baseUrl: mockBaseUrl })

      await expect(
        client.synthesize({ text: 'Test', voiceId: 'voice-123' })
      ).rejects.toThrow(VoiceError)
    })

    it('includes sample_rate in request when specified', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(1024)),
        headers: new Headers({ 'content-type': 'audio/pcm' }),
      })

      const { VoiceClient } = await import('@/lib/voice/client')
      const client = new VoiceClient({ baseUrl: mockBaseUrl })

      await client.synthesize({
        text: 'Test',
        voiceId: 'voice-123',
        sampleRate: 44100,
      })

      const requestBody = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body)
      expect(requestBody.sample_rate).toBe(44100)
    })
  })

  describe('synthesizeStream', () => {
    it('returns async generator for streaming audio', async () => {
      const chunks = [
        new Uint8Array([1, 2, 3]),
        new Uint8Array([4, 5, 6]),
        new Uint8Array([7, 8, 9]),
      ]

      let chunkIndex = 0
      const mockReader = {
        read: jest.fn().mockImplementation(async () => {
          if (chunkIndex < chunks.length) {
            return { done: false, value: chunks[chunkIndex++] }
          }
          return { done: true }
        }),
        releaseLock: jest.fn(),
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        body: {
          getReader: () => mockReader,
        },
      })

      const { VoiceClient } = await import('@/lib/voice/client')
      const client = new VoiceClient({ baseUrl: mockBaseUrl })

      const stream = client.synthesizeStream({
        text: 'Streaming test',
        voiceId: 'voice-789',
      })

      const receivedChunks: Uint8Array[] = []
      for await (const chunk of stream) {
        receivedChunks.push(chunk)
      }

      expect(receivedChunks).toHaveLength(3)
      expect(receivedChunks[0]).toEqual(chunks[0])
    })

    it('calls stream endpoint', async () => {
      const mockReader = {
        read: jest.fn().mockResolvedValue({ done: true }),
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        body: {
          getReader: () => ({
            ...mockReader,
            releaseLock: jest.fn(),
          }),
        },
      })

      const { VoiceClient } = await import('@/lib/voice/client')
      const client = new VoiceClient({ baseUrl: mockBaseUrl })

      const stream = client.synthesizeStream({
        text: 'Test',
        voiceId: 'voice-123',
      })

      // Consume stream
      for await (const _ of stream) { /* consume */ }

      expect(global.fetch).toHaveBeenCalledWith(
        `${mockBaseUrl}/tts/stream`,
        expect.any(Object)
      )
    })
  })

  describe('transcribe', () => {
    it('sends STT request to voice-ai-core', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          text: 'Hello world',
          confidence: 0.95,
          words: [
            { word: 'Hello', start: 0, end: 0.5, confidence: 0.98 },
            { word: 'world', start: 0.6, end: 1.0, confidence: 0.92 },
          ],
        }),
      })

      const { VoiceClient } = await import('@/lib/voice/client')
      const client = new VoiceClient({ baseUrl: 'http://localhost:8002' })

      const audioData = new ArrayBuffer(4096)
      const result = await client.transcribe({ audio: audioData })

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8002/stt/transcribe',
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData),
        })
      )

      expect(result.text).toBe('Hello world')
      expect(result.confidence).toBe(0.95)
      expect(result.words).toHaveLength(2)
    })

    it('supports language option', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ text: 'Hola mundo', confidence: 0.9 }),
      })

      const { VoiceClient } = await import('@/lib/voice/client')
      const client = new VoiceClient({ baseUrl: 'http://localhost:8002' })

      await client.transcribe({
        audio: new ArrayBuffer(1024),
        language: 'es',
      })

      const formData = (global.fetch as jest.Mock).mock.calls[0][1].body as FormData
      expect(formData.get('language')).toBe('es')
    })
  })

  describe('cloneVoice', () => {
    it('sends voice cloning request to Cartesia', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          voice_id: 'cloned-voice-123',
          name: 'My Cloned Voice',
          created_at: '2025-12-12T00:00:00Z',
        }),
      })

      const { VoiceClient } = await import('@/lib/voice/client')
      const client = new VoiceClient({ baseUrl: mockBaseUrl })

      const audioSample = new ArrayBuffer(5 * 22050 * 2 + 1000) // 5+ seconds at 22050Hz, 16-bit
      const result = await client.cloneVoice({
        name: 'My Cloned Voice',
        audioSample,
        description: 'Custom voice for solar presentations',
      })

      expect(global.fetch).toHaveBeenCalledWith(
        `${mockBaseUrl}/voice/clone`,
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData),
        })
      )

      expect(result.voiceId).toBe('cloned-voice-123')
      expect(result.name).toBe('My Cloned Voice')
    })

    it('throws error if audio sample is too short', async () => {
      const { VoiceClient, VoiceError } = await import('@/lib/voice/client')
      const client = new VoiceClient({ baseUrl: mockBaseUrl })

      const shortAudio = new ArrayBuffer(1000) // Less than 5 seconds

      await expect(
        client.cloneVoice({ name: 'Test', audioSample: shortAudio })
      ).rejects.toThrow('Audio sample must be at least 5 seconds')
    })
  })

  describe('getVoices', () => {
    it('fetches available voices for a language', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          voices: [
            { id: 'voice-1', name: 'British Lady', language: 'en' },
            { id: 'voice-2', name: 'American Man', language: 'en' },
          ],
        }),
      })

      const { VoiceClient } = await import('@/lib/voice/client')
      const client = new VoiceClient({ baseUrl: mockBaseUrl })

      const voices = await client.getVoices('en')

      expect(voices).toHaveLength(2)
      expect(voices[0].id).toBe('voice-1')
      expect(voices[0].name).toBe('British Lady')
    })
  })

  describe('health check', () => {
    it('checks TTS service health', async () => {
      // Mock both TTS and STT health endpoints
      ;(global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ status: 'healthy' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ status: 'healthy' }),
        })

      const { VoiceClient } = await import('@/lib/voice/client')
      const client = new VoiceClient({ baseUrl: mockBaseUrl })

      const health = await client.healthCheck()

      expect(health.tts).toBe('healthy')
    })

    it('reports unhealthy when service is down', async () => {
      ;(global.fetch as jest.Mock)
        .mockRejectedValueOnce(new Error('Connection refused'))
        .mockRejectedValueOnce(new Error('Connection refused'))

      const { VoiceClient } = await import('@/lib/voice/client')
      const client = new VoiceClient({ baseUrl: mockBaseUrl })

      const health = await client.healthCheck()

      expect(health.tts).toBe('unhealthy')
    })
  })
})

describe('VoiceError', () => {
  it('includes error code and message', async () => {
    const { VoiceError } = await import('@/lib/voice/client')

    const error = new VoiceError('TTS_FAILED', 'Text-to-speech synthesis failed')

    expect(error.code).toBe('TTS_FAILED')
    expect(error.message).toBe('Text-to-speech synthesis failed')
    expect(error).toBeInstanceOf(Error)
  })

  it('includes optional details', async () => {
    const { VoiceError } = await import('@/lib/voice/client')

    const error = new VoiceError('API_ERROR', 'API request failed', {
      status: 429,
      retryAfter: 60,
    })

    expect(error.details).toEqual({ status: 429, retryAfter: 60 })
  })
})
