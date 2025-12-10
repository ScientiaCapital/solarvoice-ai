/**
 * LLM Factory Tests
 * TDD: Test provider selection and fallback behavior
 */

// Mock fetch globally before importing
const mockFetch = jest.fn()
global.fetch = mockFetch

// Store original env
const originalEnv = process.env

describe('LLMFactory', () => {
  beforeEach(() => {
    jest.resetModules()
    mockFetch.mockReset()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('Provider Selection', () => {
    it('uses Cerebras when CEREBRAS_API_KEY is set', async () => {
      process.env.CEREBRAS_API_KEY = 'test-cerebras-key'
      delete process.env.ANTHROPIC_API_KEY

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            choices: [{ message: { content: 'Cerebras response' } }],
          }),
      })

      const { LLMFactory } = await import('@/lib/llm-factory')
      const factory = new LLMFactory()

      const result = await factory.generate('Hello')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.cerebras.ai/v1/chat/completions',
        expect.any(Object)
      )
      expect(result).toBe('Cerebras response')
    })

    it('uses Anthropic when only ANTHROPIC_API_KEY is set', async () => {
      delete process.env.CEREBRAS_API_KEY
      process.env.ANTHROPIC_API_KEY = 'test-anthropic-key'

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            content: [{ type: 'text', text: 'Anthropic response' }],
          }),
      })

      const { LLMFactory } = await import('@/lib/llm-factory')
      const factory = new LLMFactory()

      const result = await factory.generate('Hello')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.anthropic.com/v1/messages',
        expect.any(Object)
      )
      expect(result).toBe('Anthropic response')
    })

    it('throws error when no API keys are configured', async () => {
      delete process.env.CEREBRAS_API_KEY
      delete process.env.ANTHROPIC_API_KEY

      const { LLMFactory } = await import('@/lib/llm-factory')
      expect(() => new LLMFactory()).toThrow('No LLM provider configured')
    })
  })

  describe('Fallback Behavior', () => {
    it('falls back to Anthropic when Cerebras fails', async () => {
      process.env.CEREBRAS_API_KEY = 'test-cerebras-key'
      process.env.ANTHROPIC_API_KEY = 'test-anthropic-key'

      // Cerebras fails
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
      })

      // Anthropic succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            content: [{ type: 'text', text: 'Anthropic fallback response' }],
          }),
      })

      const { LLMFactory } = await import('@/lib/llm-factory')
      const factory = new LLMFactory()

      const result = await factory.generate('Hello')

      expect(mockFetch).toHaveBeenCalledTimes(2)
      expect(result).toBe('Anthropic fallback response')
    })

    it('throws when primary fails and no fallback is configured', async () => {
      process.env.CEREBRAS_API_KEY = 'test-cerebras-key'
      delete process.env.ANTHROPIC_API_KEY

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })

      const { LLMFactory } = await import('@/lib/llm-factory')
      const factory = new LLMFactory()

      await expect(factory.generate('Hello')).rejects.toThrow('Cerebras API error')
    })
  })

  describe('getProvider', () => {
    it('returns current provider name', async () => {
      process.env.CEREBRAS_API_KEY = 'test-key'
      delete process.env.ANTHROPIC_API_KEY

      const { LLMFactory } = await import('@/lib/llm-factory')
      const factory = new LLMFactory()

      expect(factory.getProvider()).toBe('cerebras')
    })

    it('returns anthropic when only Anthropic is configured', async () => {
      delete process.env.CEREBRAS_API_KEY
      process.env.ANTHROPIC_API_KEY = 'test-key'

      const { LLMFactory } = await import('@/lib/llm-factory')
      const factory = new LLMFactory()

      expect(factory.getProvider()).toBe('anthropic')
    })
  })

  describe('Configuration', () => {
    it('accepts custom model configuration', async () => {
      process.env.CEREBRAS_API_KEY = 'test-key'

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            choices: [{ message: { content: 'Response' } }],
          }),
      })

      const { LLMFactory } = await import('@/lib/llm-factory')
      const factory = new LLMFactory({
        cerebrasModel: 'llama3.1-70b',
        temperature: 0.5,
        maxTokens: 200,
      })

      await factory.generate('Hello')

      const [, options] = mockFetch.mock.calls[0]
      const body = JSON.parse(options.body)

      expect(body.model).toBe('llama3.1-70b')
      expect(body.temperature).toBe(0.5)
      expect(body.max_tokens).toBe(200)
    })
  })

  describe('Latency Tracking', () => {
    it('reports latency metrics', async () => {
      process.env.CEREBRAS_API_KEY = 'test-key'

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            choices: [{ message: { content: 'Response' } }],
          }),
      })

      const { LLMFactory } = await import('@/lib/llm-factory')
      const factory = new LLMFactory()

      const result = await factory.generateWithMetrics('Hello')

      expect(result).toHaveProperty('content')
      expect(result).toHaveProperty('latencyMs')
      expect(result).toHaveProperty('provider')
      expect(typeof result.latencyMs).toBe('number')
      expect(result.provider).toBe('cerebras')
    })
  })
})
