/**
 * Cerebras LLM Service Tests
 * TDD: Write tests first, then implement
 */

// Mock fetch globally before importing the module
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('CerebrasLLM', () => {
  // Import after mocking
  let CerebrasLLM: typeof import('@/lib/services/cerebras').CerebrasLLM

  beforeEach(() => {
    jest.resetModules()
    mockFetch.mockReset()
    // Set env var for tests
    process.env.CEREBRAS_API_KEY = 'test-cerebras-key'
  })

  afterEach(() => {
    delete process.env.CEREBRAS_API_KEY
  })

  beforeAll(async () => {
    // Dynamic import to get the module after mocks are set up
    const module = await import('@/lib/services/cerebras')
    CerebrasLLM = module.CerebrasLLM
  })

  describe('constructor', () => {
    it('initializes with default model llama3.1-8b', async () => {
      const module = await import('@/lib/services/cerebras')
      const llm = new module.CerebrasLLM()
      expect(llm.getModel()).toBe('llama3.1-8b')
    })

    it('accepts custom model parameter', async () => {
      const module = await import('@/lib/services/cerebras')
      const llm = new module.CerebrasLLM({ model: 'llama3.3-70b' })
      expect(llm.getModel()).toBe('llama3.3-70b')
    })

    it('throws error when API key is not configured', async () => {
      delete process.env.CEREBRAS_API_KEY
      jest.resetModules()
      const module = await import('@/lib/services/cerebras')
      expect(() => new module.CerebrasLLM()).toThrow('CEREBRAS_API_KEY not configured')
    })
  })

  describe('generate', () => {
    it('sends correct request to Cerebras API', async () => {
      const module = await import('@/lib/services/cerebras')
      const llm = new module.CerebrasLLM()

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'Hello from Cerebras!' } }],
        }),
      })

      await llm.generate('Say hello')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.cerebras.ai/v1/chat/completions',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-cerebras-key',
            'Content-Type': 'application/json',
          }),
        })
      )
    })

    it('returns generated text from API response', async () => {
      const module = await import('@/lib/services/cerebras')
      const llm = new module.CerebrasLLM()

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'Generated response' } }],
        }),
      })

      const result = await llm.generate('Test prompt')
      expect(result).toBe('Generated response')
    })

    it('includes system prompt when provided', async () => {
      const module = await import('@/lib/services/cerebras')
      const llm = new module.CerebrasLLM()

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'Response' } }],
        }),
      })

      await llm.generate('User message', 'You are a solar expert')

      const [, options] = mockFetch.mock.calls[0]
      const body = JSON.parse(options.body)

      expect(body.messages).toEqual([
        { role: 'system', content: 'You are a solar expert' },
        { role: 'user', content: 'User message' },
      ])
    })

    it('uses configured temperature and max_tokens', async () => {
      const module = await import('@/lib/services/cerebras')
      const llm = new module.CerebrasLLM({
        temperature: 0.5,
        maxTokens: 200,
      })

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'Response' } }],
        }),
      })

      await llm.generate('Test')

      const [, options] = mockFetch.mock.calls[0]
      const body = JSON.parse(options.body)

      expect(body.temperature).toBe(0.5)
      expect(body.max_tokens).toBe(200)
    })

    it('throws error on API failure', async () => {
      const module = await import('@/lib/services/cerebras')
      const llm = new module.CerebrasLLM()

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      })

      await expect(llm.generate('Test')).rejects.toThrow('Cerebras API error: 401 Unauthorized')
    })

    it('throws error on network failure', async () => {
      const module = await import('@/lib/services/cerebras')
      const llm = new module.CerebrasLLM()

      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(llm.generate('Test')).rejects.toThrow('Network error')
    })
  })

  describe('isConfigured', () => {
    it('returns true when API key is set', async () => {
      const module = await import('@/lib/services/cerebras')
      const llm = new module.CerebrasLLM()
      expect(llm.isConfigured()).toBe(true)
    })
  })
})

describe('cerebrasService singleton', () => {
  beforeEach(() => {
    jest.resetModules()
    process.env.CEREBRAS_API_KEY = 'test-key'
  })

  afterEach(() => {
    delete process.env.CEREBRAS_API_KEY
  })

  it('exports a singleton instance when API key is configured', async () => {
    const module = await import('@/lib/services/cerebras')
    expect(module.cerebrasService).toBeDefined()
  })
})
