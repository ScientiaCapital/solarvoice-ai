/**
 * Cerebras LLM Service - Ultra-low latency inference
 * Port from Vozlux: /src/vozlux/utils/llm_factory.py
 *
 * Target: <200ms TTFT (Time to First Token)
 * Model: LLaMA 3.1 8B via Cerebras Cloud
 * API: OpenAI-compatible endpoint
 */

export interface CerebrasConfig {
  model?: string
  temperature?: number
  maxTokens?: number
}

export class CerebrasLLM {
  private apiKey: string
  private baseUrl = 'https://api.cerebras.ai/v1'
  private model: string
  private temperature: number
  private maxTokens: number

  constructor(config: CerebrasConfig = {}) {
    const apiKey = process.env.CEREBRAS_API_KEY
    if (!apiKey) {
      throw new Error('CEREBRAS_API_KEY not configured')
    }
    this.apiKey = apiKey
    this.model = config.model || 'llama3.1-8b'
    this.temperature = config.temperature ?? 0.7
    this.maxTokens = config.maxTokens ?? 150
  }

  /**
   * Get the current model
   */
  getModel(): string {
    return this.model
  }

  /**
   * Check if the service is configured
   */
  isConfigured(): boolean {
    return Boolean(this.apiKey)
  }

  /**
   * Generate a response from the LLM
   * @param prompt - User prompt
   * @param systemPrompt - Optional system prompt
   * @returns Generated text
   */
  async generate(prompt: string, systemPrompt?: string): Promise<string> {
    const messages: Array<{ role: string; content: string }> = []

    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt })
    }
    messages.push({ role: 'user', content: prompt })

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
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
}

/**
 * Singleton instance - only created if API key is configured
 */
let _cerebrasService: CerebrasLLM | null = null

try {
  if (process.env.CEREBRAS_API_KEY) {
    _cerebrasService = new CerebrasLLM()
  }
} catch {
  // API key not configured - service will be null
}

export const cerebrasService = _cerebrasService
