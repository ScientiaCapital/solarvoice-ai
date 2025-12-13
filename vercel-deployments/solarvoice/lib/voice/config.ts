/**
 * Voice Configuration
 * Environment-based configuration for voice-ai-core services
 */

export interface VoiceEnvConfig {
  ttsUrl: string
  sttUrl: string
  apiKey: string | undefined
  defaultVoiceId: string
  defaultLanguage: string
  defaultSampleRate: number
}

/**
 * Get voice configuration from environment variables
 */
export function getVoiceConfig(): VoiceEnvConfig {
  const env = typeof process !== 'undefined' ? process.env : ({} as NodeJS.ProcessEnv)

  return {
    ttsUrl: env.NEXT_PUBLIC_VOICE_API_URL ?? 'http://localhost:8001',
    sttUrl: env.NEXT_PUBLIC_STT_API_URL ?? 'http://localhost:8002',
    apiKey: env.VOICE_API_KEY,
    defaultVoiceId: env.NEXT_PUBLIC_DEFAULT_VOICE_ID ?? 'a0e99841-438c-4a64-b679-ae501e7d6091',
    defaultLanguage: env.NEXT_PUBLIC_DEFAULT_LANGUAGE ?? 'en',
    defaultSampleRate: parseInt(env.NEXT_PUBLIC_SAMPLE_RATE ?? '22050', 10),
  }
}
