/**
 * Voice Integration Types
 * TypeScript interfaces for voice-ai-core integration
 */

// ============================================================================
// Emotions (Cartesia Sonic-3 supports 57 emotions)
// ============================================================================

export const EMOTIONS = [
  'neutral',
  'happy',
  'sad',
  'angry',
  'excited',
  'friendly',
  'professional',
  'calm',
  'confident',
  'curious',
  'disappointed',
  'disgusted',
  'fearful',
  'frustrated',
  'hopeful',
  'impressed',
  'interested',
  'joyful',
  'loving',
  'nervous',
  'playful',
  'proud',
  'relieved',
  'romantic',
  'serious',
  'shy',
  'surprised',
  'sympathetic',
  'tender',
  'terrified',
  'thoughtful',
  'tired',
  'warm',
  'worried',
] as const

export type Emotion = (typeof EMOTIONS)[number]

export function isValidEmotion(value: unknown): value is Emotion {
  return typeof value === 'string' && EMOTIONS.includes(value as Emotion)
}

// ============================================================================
// Voice Status
// ============================================================================

export const VoiceStatus = {
  IDLE: 'idle',
  CONNECTING: 'connecting',
  RECORDING: 'recording',
  PROCESSING: 'processing',
  PLAYING: 'playing',
  ERROR: 'error',
} as const

export type VoiceStatusType = (typeof VoiceStatus)[keyof typeof VoiceStatus]

// ============================================================================
// TTS Types
// ============================================================================

export interface TTSConfig {
  text: string
  voiceId: string
  emotion?: Emotion | string | undefined
  sampleRate?: number | undefined
  speed?: number | undefined
  language?: string | undefined
}

export function isTTSConfig(value: unknown): value is TTSConfig {
  if (!value || typeof value !== 'object') return false
  const obj = value as Record<string, unknown>
  return typeof obj.text === 'string' && typeof obj.voiceId === 'string'
}

export interface TTSResponse {
  audio: ArrayBuffer
  format: string
  sampleRate: number
  durationMs?: number | undefined
  latencyMs?: number | undefined
  voiceId?: string | undefined
  emotion?: string | undefined
}

export function isTTSResponse(value: unknown): value is TTSResponse {
  if (!value || typeof value !== 'object') return false
  const obj = value as Record<string, unknown>
  return (
    obj.audio instanceof ArrayBuffer &&
    typeof obj.format === 'string' &&
    typeof obj.sampleRate === 'number'
  )
}

// ============================================================================
// STT Types
// ============================================================================

export interface Word {
  word: string
  start: number
  end: number
  confidence: number
}

export function isWord(value: unknown): value is Word {
  if (!value || typeof value !== 'object') return false
  const obj = value as Record<string, unknown>
  return (
    typeof obj.word === 'string' &&
    typeof obj.start === 'number' &&
    typeof obj.end === 'number' &&
    typeof obj.confidence === 'number'
  )
}

export interface STTConfig {
  audio: ArrayBuffer
  language?: string
  punctuate?: boolean
  model?: string
}

export function isSTTConfig(value: unknown): value is STTConfig {
  if (!value || typeof value !== 'object') return false
  const obj = value as Record<string, unknown>
  return obj.audio instanceof ArrayBuffer
}

export interface STTResponse {
  text: string
  confidence: number
  words?: Word[]
  language?: string
  durationMs?: number
}

export function isSTTResponse(value: unknown): value is STTResponse {
  if (!value || typeof value !== 'object') return false
  const obj = value as Record<string, unknown>
  return typeof obj.text === 'string' && typeof obj.confidence === 'number'
}

// ============================================================================
// Voice Cloning Types
// ============================================================================

export interface VoiceCloneConfig {
  name: string
  audioSample: ArrayBuffer
  description?: string
}

export function isVoiceCloneConfig(value: unknown): value is VoiceCloneConfig {
  if (!value || typeof value !== 'object') return false
  const obj = value as Record<string, unknown>
  return typeof obj.name === 'string' && obj.audioSample instanceof ArrayBuffer
}

export interface VoiceCloneResponse {
  voiceId: string
  name: string
  createdAt: string
  description?: string
}

export function isVoiceCloneResponse(value: unknown): value is VoiceCloneResponse {
  if (!value || typeof value !== 'object') return false
  const obj = value as Record<string, unknown>
  return (
    typeof obj.voiceId === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.createdAt === 'string'
  )
}

// ============================================================================
// Voice Types
// ============================================================================

export interface Voice {
  id: string
  name: string
  language: string
  description?: string
  isCloned?: boolean
}

export function isVoice(value: unknown): value is Voice {
  if (!value || typeof value !== 'object') return false
  const obj = value as Record<string, unknown>
  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.language === 'string'
  )
}

// ============================================================================
// Connection Status
// ============================================================================

export interface VoiceConnectionStatus {
  tts: 'healthy' | 'unhealthy'
  stt?: 'healthy' | 'unhealthy' | undefined
  latencyMs?: number | undefined
  error?: string | undefined
}

export function isVoiceConnectionStatus(value: unknown): value is VoiceConnectionStatus {
  if (!value || typeof value !== 'object') return false
  const obj = value as Record<string, unknown>
  return obj.tts === 'healthy' || obj.tts === 'unhealthy'
}

// ============================================================================
// Client Config
// ============================================================================

export interface VoiceClientConfig {
  baseUrl?: string | undefined
  sttBaseUrl?: string | undefined
  timeout?: number | undefined
  apiKey?: string | undefined
}

// ============================================================================
// Voice Conversation Types
// ============================================================================

export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  audioUrl?: string
  timestamp: number
}

export interface ConversationState {
  messages: ConversationMessage[]
  status: VoiceStatusType
  currentTranscript: string
  isListening: boolean
  isSpeaking: boolean
}
