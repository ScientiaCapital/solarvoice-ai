/**
 * Voice Integration Template
 * Drop-in voice capabilities for any Next.js project
 *
 * Connects to voice-ai-core microservices:
 * - TTS Service (port 8001): Text-to-speech with Cartesia Sonic-3
 * - STT Service (port 8002): Speech-to-text with Deepgram Nova-3
 *
 * @example
 * ```typescript
 * import { VoiceClient, useVoice, VoiceButton } from '@/lib/voice'
 *
 * // Direct API usage
 * const client = new VoiceClient()
 * const audio = await client.synthesize({ text: 'Hello', voiceId: 'voice-123' })
 *
 * // React hook usage
 * const { speak, isPlaying } = useVoice()
 * await speak('Hello world', { emotion: 'friendly' })
 *
 * // Component usage
 * <VoiceButton onTranscript={(text) => console.log(text)} />
 * ```
 */

// Client
export { VoiceClient, VoiceError, voiceClient } from './client'

// Types
export {
  // Emotion types
  EMOTIONS,
  isValidEmotion,
  type Emotion,
  // Status
  VoiceStatus,
  type VoiceStatusType,
  // TTS types
  type TTSConfig,
  type TTSResponse,
  isTTSConfig,
  isTTSResponse,
  // STT types
  type STTConfig,
  type STTResponse,
  type Word,
  isSTTConfig,
  isSTTResponse,
  isWord,
  // Voice cloning
  type VoiceCloneConfig,
  type VoiceCloneResponse,
  isVoiceCloneConfig,
  isVoiceCloneResponse,
  // Voice library
  type Voice,
  isVoice,
  // Connection
  type VoiceConnectionStatus,
  isVoiceConnectionStatus,
  // Config
  type VoiceClientConfig,
  // Conversation
  type ConversationMessage,
  type ConversationState,
} from './types'

// Config
export { getVoiceConfig, type VoiceEnvConfig } from './config'

// Hooks
export {
  useVoice,
  type UseVoiceOptions,
  type UseVoiceReturn,
  type SpeakOptions,
  useSpeechRecognition,
  type UseSpeechRecognitionOptions,
  type UseSpeechRecognitionReturn,
} from './hooks'

// Components
export { VoiceButton, type VoiceButtonProps } from './components'
