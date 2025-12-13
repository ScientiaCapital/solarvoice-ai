/**
 * Voice Types Tests - TDD RED Phase
 * Test TypeScript interfaces and type guards for voice integration
 */

import {
  isTTSConfig,
  isTTSResponse,
  isSTTConfig,
  isSTTResponse,
  isVoiceCloneConfig,
  isVoiceCloneResponse,
  isVoice,
  isVoiceConnectionStatus,
  isWord,
  isValidEmotion,
  VoiceStatus,
  EMOTIONS,
} from '@/lib/voice/types'

describe('Voice Types', () => {
  describe('TTSConfig', () => {
    it('exports TTSConfig type with required fields', () => {
      const validConfig = {
        text: 'Hello world',
        voiceId: 'voice-123',
      }

      expect(isTTSConfig(validConfig)).toBe(true)
    })

    it('validates text is required', () => {
      const invalidConfig = {
        voiceId: 'voice-123',
      }

      expect(isTTSConfig(invalidConfig)).toBe(false)
    })

    it('validates voiceId is required', () => {
      const invalidConfig = {
        text: 'Hello',
      }

      expect(isTTSConfig(invalidConfig)).toBe(false)
    })

    it('accepts optional emotion field', () => {
      const config = {
        text: 'Hello',
        voiceId: 'voice-123',
        emotion: 'excited',
      }

      expect(isTTSConfig(config)).toBe(true)
    })

    it('accepts optional sampleRate field', () => {
      const config = {
        text: 'Hello',
        voiceId: 'voice-123',
        sampleRate: 44100,
      }

      expect(isTTSConfig(config)).toBe(true)
    })

    it('accepts optional speed field', () => {
      const config = {
        text: 'Hello',
        voiceId: 'voice-123',
        speed: 1.2,
      }

      expect(isTTSConfig(config)).toBe(true)
    })

    it('accepts optional language field', () => {
      const config = {
        text: 'Hola',
        voiceId: 'voice-123',
        language: 'es',
      }

      expect(isTTSConfig(config)).toBe(true)
    })
  })

  describe('TTSResponse', () => {
    it('exports TTSResponse type with audio data', () => {
      const validResponse = {
        audio: new ArrayBuffer(1024),
        format: 'pcm_s16le',
        sampleRate: 22050,
      }

      expect(isTTSResponse(validResponse)).toBe(true)
    })

    it('validates audio is required', () => {
      const invalidResponse = {
        format: 'pcm_s16le',
        sampleRate: 22050,
      }

      expect(isTTSResponse(invalidResponse)).toBe(false)
    })

    it('accepts optional duration and latency', () => {
      const response = {
        audio: new ArrayBuffer(2048),
        format: 'pcm_s16le',
        sampleRate: 22050,
        durationMs: 3000,
        latencyMs: 150,
      }

      expect(isTTSResponse(response)).toBe(true)
    })
  })

  describe('STTConfig', () => {
    it('exports STTConfig type with audio data', () => {
      const validConfig = {
        audio: new ArrayBuffer(4096),
      }

      expect(isSTTConfig(validConfig)).toBe(true)
    })

    it('accepts optional language', () => {
      const config = {
        audio: new ArrayBuffer(4096),
        language: 'en',
      }

      expect(isSTTConfig(config)).toBe(true)
    })

    it('accepts optional punctuate flag', () => {
      const config = {
        audio: new ArrayBuffer(4096),
        punctuate: true,
      }

      expect(isSTTConfig(config)).toBe(true)
    })
  })

  describe('STTResponse', () => {
    it('exports STTResponse type with transcription', () => {
      const validResponse = {
        text: 'Hello world',
        confidence: 0.95,
      }

      expect(isSTTResponse(validResponse)).toBe(true)
    })

    it('accepts optional words array', () => {
      const response = {
        text: 'Hello world',
        confidence: 0.95,
        words: [
          { word: 'Hello', start: 0, end: 0.5, confidence: 0.98 },
          { word: 'world', start: 0.6, end: 1.0, confidence: 0.92 },
        ],
      }

      expect(isSTTResponse(response)).toBe(true)
    })
  })

  describe('VoiceCloneConfig', () => {
    it('exports VoiceCloneConfig type', () => {
      const validConfig = {
        name: 'My Custom Voice',
        audioSample: new ArrayBuffer(8192),
      }

      expect(isVoiceCloneConfig(validConfig)).toBe(true)
    })

    it('validates name is required', () => {
      const invalidConfig = {
        audioSample: new ArrayBuffer(8192),
      }

      expect(isVoiceCloneConfig(invalidConfig)).toBe(false)
    })

    it('validates audioSample is required', () => {
      const invalidConfig = {
        name: 'My Voice',
      }

      expect(isVoiceCloneConfig(invalidConfig)).toBe(false)
    })

    it('accepts optional description', () => {
      const config = {
        name: 'My Voice',
        audioSample: new ArrayBuffer(8192),
        description: 'Professional voice for presentations',
      }

      expect(isVoiceCloneConfig(config)).toBe(true)
    })
  })

  describe('VoiceCloneResponse', () => {
    it('exports VoiceCloneResponse type', () => {
      const validResponse = {
        voiceId: 'cloned-voice-123',
        name: 'My Cloned Voice',
        createdAt: '2025-12-12T00:00:00Z',
      }

      expect(isVoiceCloneResponse(validResponse)).toBe(true)
    })
  })

  describe('Voice', () => {
    it('exports Voice type for available voices', () => {
      const validVoice = {
        id: 'voice-123',
        name: 'British Lady',
        language: 'en',
      }

      expect(isVoice(validVoice)).toBe(true)
    })

    it('accepts optional description', () => {
      const voice = {
        id: 'voice-123',
        name: 'British Lady',
        language: 'en',
        description: 'Professional female British accent',
      }

      expect(isVoice(voice)).toBe(true)
    })

    it('accepts optional isCloned flag', () => {
      const voice = {
        id: 'cloned-456',
        name: 'My Custom Voice',
        language: 'en',
        isCloned: true,
      }

      expect(isVoice(voice)).toBe(true)
    })
  })

  describe('VoiceStatus', () => {
    it('exports VoiceStatus enum values', () => {
      expect(VoiceStatus.IDLE).toBe('idle')
      expect(VoiceStatus.CONNECTING).toBe('connecting')
      expect(VoiceStatus.RECORDING).toBe('recording')
      expect(VoiceStatus.PROCESSING).toBe('processing')
      expect(VoiceStatus.PLAYING).toBe('playing')
      expect(VoiceStatus.ERROR).toBe('error')
    })
  })

  describe('VoiceConnectionStatus', () => {
    it('exports VoiceConnectionStatus type', () => {
      const validStatus = {
        tts: 'healthy' as const,
        stt: 'healthy' as const,
        latencyMs: 50,
      }

      expect(isVoiceConnectionStatus(validStatus)).toBe(true)
    })

    it('accepts unhealthy status', () => {
      const status = {
        tts: 'unhealthy' as const,
        stt: 'healthy' as const,
        error: 'TTS service unavailable',
      }

      expect(isVoiceConnectionStatus(status)).toBe(true)
    })
  })

  describe('Word', () => {
    it('exports Word type for word-level transcription', () => {
      const validWord = {
        word: 'Hello',
        start: 0.0,
        end: 0.5,
        confidence: 0.98,
      }

      expect(isWord(validWord)).toBe(true)
    })
  })

  describe('Emotion', () => {
    it('exports valid Cartesia emotions', () => {
      expect(EMOTIONS).toContain('neutral')
      expect(EMOTIONS).toContain('happy')
      expect(EMOTIONS).toContain('sad')
      expect(EMOTIONS).toContain('angry')
      expect(EMOTIONS).toContain('excited')
      expect(EMOTIONS).toContain('friendly')
      expect(EMOTIONS).toContain('professional')

      expect(isValidEmotion('happy')).toBe(true)
      expect(isValidEmotion('invalid-emotion')).toBe(false)
    })
  })
})
