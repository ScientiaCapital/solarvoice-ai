/**
 * Cartesia TTS Service - Ultra-low latency text-to-speech
 * Port from Vozlux: /src/vozlux/voice/providers/cartesia_tts.py
 *
 * Target: <90ms TTFA (Time to First Audio)
 * Model: Sonic-3 with emotional controls
 * API: REST with SSE streaming
 */

export interface CartesiaSynthesisOptions {
  voiceId: string
  emotion?: string
  language?: string
  speed?: number
}

export interface CartesiaConfig {
  model?: string
  sampleRate?: number
}

/**
 * Voice presets by agent type and language
 * Using Cartesia's default voices - replace with custom cloned voices as needed
 */
const VOICE_PRESETS: Record<string, Record<string, string>> = {
  // English voices
  en: {
    'commercial-manager': 'a0e99841-438c-4a64-b679-ae501e7d6091', // Professional male
    'customer-success': '694f9389-aac1-45b6-b726-9d9369183238', // Friendly female
    'performance-analyst': 'bf991597-6c13-47e4-8411-91ec2de5c466', // Technical neutral
    'sales-specialist': '2ee87190-8f84-4925-97da-e52547f9462c', // Confident male
    'utility-coordinator': 'c45bc5ec-dc68-4feb-8829-6e6b2748095d', // Authoritative female
    default: 'a0e99841-438c-4a64-b679-ae501e7d6091', // Fallback to commercial-manager
  },
  // Spanish voices
  es: {
    'commercial-manager': 'db832eef-4e72-4208-a1e0-3c3e7e4c5e4e', // Spanish professional male
    'customer-success': '5c5ad5e7-1020-476b-8b91-fdcbe9cc313c', // Spanish friendly female
    'performance-analyst': 'bf991597-6c13-47e4-8411-91ec2de5c466', // Technical neutral
    'sales-specialist': '2ee87190-8f84-4925-97da-e52547f9462c', // Confident male
    'utility-coordinator': 'c45bc5ec-dc68-4feb-8829-6e6b2748095d', // Authoritative female
    default: 'db832eef-4e72-4208-a1e0-3c3e7e4c5e4e', // Fallback
  },
}

export class CartesiaTTS {
  private apiKey: string
  private baseUrl = 'https://api.cartesia.ai'
  private model: string
  private sampleRate: number

  constructor(config: CartesiaConfig = {}) {
    const apiKey = process.env.CARTESIA_API_KEY
    if (!apiKey) {
      throw new Error('CARTESIA_API_KEY not configured')
    }
    this.apiKey = apiKey
    this.model = config.model || 'sonic-3'
    this.sampleRate = config.sampleRate || 22050
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
   * Get voice ID for agent type and language
   */
  getVoiceForAgent(agentType: string, language: string = 'en'): string {
    // Default fallback voice ID
    const defaultVoice = 'a0e99841-438c-4a64-b679-ae501e7d6091'
    const enVoices = VOICE_PRESETS.en ?? { default: defaultVoice }
    const languageVoices = VOICE_PRESETS[language] ?? enVoices
    return languageVoices[agentType] ?? languageVoices.default ?? defaultVoice
  }

  /**
   * Synthesize text to speech
   * Returns a ReadableStream of audio data
   *
   * Uses Sonic-3 API format:
   * - generation_config for speed/emotion (NOT _experimental_voice_controls)
   * - Single string emotions (NOT arrays with levels)
   * - Numeric speed multipliers (0.6-1.5)
   *
   * @param text - Text to synthesize
   * @param options - Synthesis options
   * @returns ReadableStream of audio data
   */
  async synthesize(
    text: string,
    options: CartesiaSynthesisOptions
  ): Promise<ReadableStream<Uint8Array>> {
    const response = await fetch(`${this.baseUrl}/tts/sse`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model_id: this.model,
        transcript: text,
        voice_id: options.voiceId,
        output_format: {
          container: 'raw',
          encoding: 'pcm_s16le',
          sample_rate: this.sampleRate,
        },
        language: options.language || 'en',
        // Sonic-3 uses generation_config, NOT _experimental_voice_controls
        generation_config: {
          speed: options.speed || 1.0,
          emotion: options.emotion || 'neutral',
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Cartesia API error: ${response.status} ${response.statusText}`)
    }

    if (!response.body) {
      throw new Error('Cartesia API returned no body')
    }

    return response.body
  }

  /**
   * Synthesize and collect all audio data as ArrayBuffer
   * Useful for non-streaming use cases
   */
  async synthesizeBuffer(
    text: string,
    options: CartesiaSynthesisOptions
  ): Promise<ArrayBuffer> {
    const stream = await this.synthesize(text, options)
    const reader = stream.getReader()
    const chunks: Uint8Array[] = []

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (value) chunks.push(value)
    }

    // Concatenate all chunks
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0)
    const result = new Uint8Array(totalLength)
    let offset = 0
    for (const chunk of chunks) {
      result.set(chunk, offset)
      offset += chunk.length
    }

    return result.buffer
  }
}

/**
 * Singleton instance - only created if API key is configured
 */
let _cartesiaTTS: CartesiaTTS | null = null

try {
  if (process.env.CARTESIA_API_KEY) {
    _cartesiaTTS = new CartesiaTTS()
  }
} catch {
  // API key not configured - service will be null
}

export const cartesiaTTS = _cartesiaTTS

// Re-export old interface for backward compatibility
export const cartesiaService = _cartesiaTTS
