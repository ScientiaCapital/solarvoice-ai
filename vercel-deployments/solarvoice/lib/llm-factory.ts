/**
 * LLM Factory - Provider selection with fallback
 * Port from Vozlux: /src/vozlux/utils/llm_factory.py
 *
 * Priority: Cerebras (fast) → Anthropic (quality fallback)
 * Target: <200ms TTFT with Cerebras
 */

export interface LLMFactoryConfig {
  cerebrasModel?: string
  anthropicModel?: string
  temperature?: number
  maxTokens?: number
}

export interface LLMResponse {
  content: string
  latencyMs: number
  provider: 'cerebras' | 'anthropic'
}

type ProviderType = 'cerebras' | 'anthropic'

export class LLMFactory {
  private provider: ProviderType
  private cerebrasApiKey: string | null
  private anthropicApiKey: string | null
  private cerebrasModel: string
  private anthropicModel: string
  private temperature: number
  private maxTokens: number

  constructor(config: LLMFactoryConfig = {}) {
    this.cerebrasApiKey = process.env.CEREBRAS_API_KEY || null
    this.anthropicApiKey = process.env.ANTHROPIC_API_KEY || null

    // Determine primary provider
    if (this.cerebrasApiKey) {
      this.provider = 'cerebras'
    } else if (this.anthropicApiKey) {
      this.provider = 'anthropic'
    } else {
      throw new Error('No LLM provider configured. Set CEREBRAS_API_KEY or ANTHROPIC_API_KEY.')
    }

    // Configuration
    this.cerebrasModel = config.cerebrasModel || 'llama3.1-8b'
    this.anthropicModel = config.anthropicModel || 'claude-3-haiku-20240307'
    this.temperature = config.temperature ?? 0.7
    this.maxTokens = config.maxTokens ?? 150
  }

  /**
   * Get the current provider name
   */
  getProvider(): ProviderType {
    return this.provider
  }

  /**
   * Check if fallback is available
   */
  hasFallback(): boolean {
    return this.provider === 'cerebras' && Boolean(this.anthropicApiKey)
  }

  /**
   * Generate text using the configured provider
   * Falls back to Anthropic if Cerebras fails
   *
   * @param prompt - User prompt
   * @param systemPrompt - Optional system prompt
   * @returns Generated text
   */
  async generate(prompt: string, systemPrompt?: string): Promise<string> {
    const result = await this.generateWithMetrics(prompt, systemPrompt)
    return result.content
  }

  /**
   * Generate text and return with latency metrics
   *
   * @param prompt - User prompt
   * @param systemPrompt - Optional system prompt
   * @returns Response with content, latency, and provider info
   */
  async generateWithMetrics(prompt: string, systemPrompt?: string): Promise<LLMResponse> {
    const startTime = performance.now()

    try {
      if (this.provider === 'cerebras') {
        const content = await this.callCerebras(prompt, systemPrompt)
        return {
          content,
          latencyMs: Math.round(performance.now() - startTime),
          provider: 'cerebras',
        }
      } else {
        const content = await this.callAnthropic(prompt, systemPrompt)
        return {
          content,
          latencyMs: Math.round(performance.now() - startTime),
          provider: 'anthropic',
        }
      }
    } catch (error) {
      // Attempt fallback if Cerebras fails and Anthropic is available
      if (this.provider === 'cerebras' && this.anthropicApiKey) {
        console.warn('[LLM_FACTORY] Cerebras failed, falling back to Anthropic:', error)
        const fallbackStart = performance.now()
        const content = await this.callAnthropic(prompt, systemPrompt)
        return {
          content,
          latencyMs: Math.round(performance.now() - fallbackStart),
          provider: 'anthropic',
        }
      }
      throw error
    }
  }

  /**
   * Call Cerebras API
   */
  private async callCerebras(prompt: string, systemPrompt?: string): Promise<string> {
    const messages: Array<{ role: string; content: string }> = []

    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt })
    }
    messages.push({ role: 'user', content: prompt })

    const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.cerebrasApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.cerebrasModel,
        messages,
        temperature: this.temperature,
        max_tokens: this.maxTokens,
      }),
    })

    if (!response.ok) {
      throw new Error(`Cerebras API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  }

  /**
   * Call Anthropic API
   */
  private async callAnthropic(prompt: string, systemPrompt?: string): Promise<string> {
    const requestBody: Record<string, unknown> = {
      model: this.anthropicModel,
      max_tokens: this.maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }

    if (systemPrompt) {
      requestBody.system = systemPrompt
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': this.anthropicApiKey!,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    // Anthropic returns content as an array of blocks
    const textBlock = data.content.find((block: { type: string }) => block.type === 'text')
    return textBlock?.text || ''
  }
}

/**
 * Singleton instance - created on first use
 */
let _llmFactory: LLMFactory | null = null

export function getLLMFactory(config?: LLMFactoryConfig): LLMFactory {
  if (!_llmFactory) {
    try {
      _llmFactory = new LLMFactory(config)
    } catch {
      // No providers configured
      throw new Error('No LLM provider configured. Set CEREBRAS_API_KEY or ANTHROPIC_API_KEY.')
    }
  }
  return _llmFactory
}

/**
 * Create a new factory instance (for testing or custom config)
 */
export function createLLMFactory(config?: LLMFactoryConfig): LLMFactory {
  return new LLMFactory(config)
}
