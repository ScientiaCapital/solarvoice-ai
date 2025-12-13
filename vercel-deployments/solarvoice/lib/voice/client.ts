/**
 * VoiceClient - HTTP client for voice-ai-core services
 * Connects Next.js apps to TTS (port 8001) and STT (port 8002) microservices
 */

import type {
  TTSConfig,
  TTSResponse,
  STTConfig,
  STTResponse,
  VoiceCloneConfig,
  VoiceCloneResponse,
  Voice,
  VoiceConnectionStatus,
  VoiceClientConfig,
} from './types'

// ============================================================================
// VoiceError
// ============================================================================

export class VoiceError extends Error {
  code: string
  details: Record<string, unknown> | undefined

  constructor(code: string, message: string, details?: Record<string, unknown>) {
    super(message)
    this.name = 'VoiceError'
    this.code = code
    this.details = details
  }
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_TTS_URL = 'http://localhost:8001'
const DEFAULT_STT_URL = 'http://localhost:8002'
const DEFAULT_SAMPLE_RATE = 22050
const MIN_CLONE_AUDIO_BYTES = 5 * 22050 * 2 // ~5 seconds at 22050Hz, 16-bit

// ============================================================================
// VoiceClient
// ============================================================================

export class VoiceClient {
  private baseUrl: string
  private sttBaseUrl: string
  private apiKey: string | undefined

  constructor(config: VoiceClientConfig = {}) {
    this.baseUrl =
      config.baseUrl ||
      (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_VOICE_API_URL : undefined) ||
      DEFAULT_TTS_URL

    this.sttBaseUrl =
      config.sttBaseUrl ||
      (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_STT_API_URL : undefined) ||
      DEFAULT_STT_URL

    this.apiKey = config.apiKey
  }

  getBaseUrl(): string {
    return this.baseUrl
  }

  // ==========================================================================
  // TTS - Text-to-Speech
  // ==========================================================================

  /**
   * Synthesize text to audio (batch mode)
   */
  async synthesize(config: TTSConfig): Promise<TTSResponse> {
    const payload = {
      text: config.text,
      voice_id: config.voiceId,
      sample_rate: config.sampleRate || DEFAULT_SAMPLE_RATE,
      ...(config.emotion && { emotion: config.emotion }),
      ...(config.speed && { speed: config.speed }),
      ...(config.language && { language: config.language }),
    }

    const response = await fetch(`${this.baseUrl}/tts/bytes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new VoiceError('TTS_FAILED', `TTS synthesis failed: ${response.status} ${errorText}`, {
        status: response.status,
      })
    }

    const audio = await response.arrayBuffer()
    const latencyMs = parseInt(response.headers.get('x-latency-ms') || '0', 10)
    const durationMs = parseInt(response.headers.get('x-duration-ms') || '0', 10)

    return {
      audio,
      format: 'pcm_s16le',
      sampleRate: config.sampleRate || DEFAULT_SAMPLE_RATE,
      ...(latencyMs && { latencyMs }),
      ...(durationMs && { durationMs }),
      voiceId: config.voiceId,
      emotion: config.emotion,
    }
  }

  /**
   * Stream audio chunks for real-time playback
   */
  async *synthesizeStream(config: TTSConfig): AsyncGenerator<Uint8Array, void, unknown> {
    const payload = {
      text: config.text,
      voice_id: config.voiceId,
      sample_rate: config.sampleRate || DEFAULT_SAMPLE_RATE,
      ...(config.emotion && { emotion: config.emotion }),
      ...(config.speed && { speed: config.speed }),
      ...(config.language && { language: config.language }),
    }

    const response = await fetch(`${this.baseUrl}/tts/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new VoiceError(
        'TTS_STREAM_FAILED',
        `TTS streaming failed: ${response.status} ${errorText}`,
        { status: response.status }
      )
    }

    if (!response.body) {
      throw new VoiceError('TTS_STREAM_FAILED', 'No response body for streaming')
    }

    const reader = response.body.getReader()

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        if (value) yield value
      }
    } finally {
      reader.releaseLock()
    }
  }

  // ==========================================================================
  // STT - Speech-to-Text
  // ==========================================================================

  /**
   * Transcribe audio to text
   */
  async transcribe(config: STTConfig): Promise<STTResponse> {
    const formData = new FormData()
    formData.append('audio', new Blob([config.audio]), 'audio.raw')

    if (config.language) {
      formData.append('language', config.language)
    }
    if (config.punctuate !== undefined) {
      formData.append('punctuate', String(config.punctuate))
    }
    if (config.model) {
      formData.append('model', config.model)
    }

    const response = await fetch(`${this.sttBaseUrl}/stt/transcribe`, {
      method: 'POST',
      headers: {
        ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
      },
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new VoiceError('STT_FAILED', `STT transcription failed: ${response.status} ${errorText}`, {
        status: response.status,
      })
    }

    const data = await response.json()

    return {
      text: data.text,
      confidence: data.confidence,
      words: data.words,
      language: data.language,
      durationMs: data.duration_ms,
    }
  }

  // ==========================================================================
  // Voice Cloning
  // ==========================================================================

  /**
   * Clone a voice from audio sample (Cartesia instant cloning)
   */
  async cloneVoice(config: VoiceCloneConfig): Promise<VoiceCloneResponse> {
    // Validate minimum audio length (~5 seconds)
    if (config.audioSample.byteLength < MIN_CLONE_AUDIO_BYTES) {
      throw new VoiceError(
        'INVALID_AUDIO',
        'Audio sample must be at least 5 seconds',
        { byteLength: config.audioSample.byteLength, required: MIN_CLONE_AUDIO_BYTES }
      )
    }

    const formData = new FormData()
    formData.append('audio', new Blob([config.audioSample]), 'sample.raw')
    formData.append('name', config.name)
    if (config.description) {
      formData.append('description', config.description)
    }

    const response = await fetch(`${this.baseUrl}/voice/clone`, {
      method: 'POST',
      headers: {
        ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
      },
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new VoiceError('CLONE_FAILED', `Voice cloning failed: ${response.status} ${errorText}`, {
        status: response.status,
      })
    }

    const data = await response.json()

    return {
      voiceId: data.voice_id,
      name: data.name,
      createdAt: data.created_at,
      description: data.description,
    }
  }

  // ==========================================================================
  // Voice Library
  // ==========================================================================

  /**
   * Get available voices for a language
   */
  async getVoices(language: string = 'en'): Promise<Voice[]> {
    const response = await fetch(`${this.baseUrl}/voices?language=${encodeURIComponent(language)}`, {
      method: 'GET',
      headers: {
        ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
      },
    })

    if (!response.ok) {
      throw new VoiceError('VOICES_FAILED', `Failed to fetch voices: ${response.status}`)
    }

    const data = await response.json()
    return data.voices || []
  }

  // ==========================================================================
  // Health Check
  // ==========================================================================

  /**
   * Check health of voice services
   */
  async healthCheck(): Promise<VoiceConnectionStatus> {
    let ttsStatus: 'healthy' | 'unhealthy' = 'unhealthy'
    let sttStatus: 'healthy' | 'unhealthy' = 'unhealthy'
    let latencyMs: number | undefined
    let error: string | undefined

    // Create abort controller with timeout fallback for older environments
    const createSignal = (timeoutMs: number) => {
      if (typeof AbortSignal !== 'undefined' && 'timeout' in AbortSignal) {
        return AbortSignal.timeout(timeoutMs)
      }
      const controller = new AbortController()
      setTimeout(() => controller.abort(), timeoutMs)
      return controller.signal
    }

    try {
      const start = Date.now()
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        signal: createSignal(5000),
      })
      latencyMs = Date.now() - start

      if (response.ok) {
        const data = await response.json()
        ttsStatus = data.status === 'healthy' ? 'healthy' : 'unhealthy'
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'Unknown error'
      ttsStatus = 'unhealthy'
    }

    try {
      const response = await fetch(`${this.sttBaseUrl}/health`, {
        method: 'GET',
        signal: createSignal(5000),
      })
      if (response.ok) {
        const data = await response.json()
        sttStatus = data.status === 'healthy' ? 'healthy' : 'unhealthy'
      }
    } catch {
      sttStatus = 'unhealthy'
    }

    return {
      tts: ttsStatus,
      stt: sttStatus,
      ...(latencyMs && { latencyMs }),
      ...(error && { error }),
    }
  }
}

// ============================================================================
// Default Export
// ============================================================================

export const voiceClient = new VoiceClient()
