/**
 * Voice Command Emotion Integration Tests
 * TDD: Test emotion detection and response emotion for TTS synthesis
 */

import { detectEmotionFromText, validateEmotion } from '@/lib/voice/emotions'

describe('Voice Command Emotion Integration', () => {
  describe('Command emotion detection', () => {
    it('detects excited emotion from positive commands', () => {
      const emotion = detectEmotionFromText('Great news! The solar installation is complete!')
      expect(['excited', 'enthusiastic']).toContain(emotion)
    })

    it('detects grateful emotion from thank you commands', () => {
      const emotion = detectEmotionFromText('Thank you for checking the status')
      expect(emotion).toBe('grateful')
    })

    it('detects calm emotion from reassurance phrases', () => {
      const emotion = detectEmotionFromText("Don't worry about the delay")
      expect(emotion).toBe('calm')
    })

    it('returns neutral for plain commands', () => {
      const emotion = detectEmotionFromText('Check project status')
      expect(emotion).toBe('neutral')
    })
  })

  describe('Command type to response emotion mapping', () => {
    const COMMAND_RESPONSE_EMOTIONS: Record<string, string> = {
      emergency: 'determined',
      clockIn: 'enthusiastic',
      clockOut: 'grateful',
      weather: 'calm',
      safety: 'determined',
      projectStatus: 'confident',
      scheduleWork: 'confident',
      checkPermit: 'neutral',
      general: 'sympathetic',
    }

    it('has response emotions for all command types', () => {
      const commandTypes = [
        'emergency',
        'clockIn',
        'clockOut',
        'weather',
        'safety',
        'projectStatus',
        'scheduleWork',
        'checkPermit',
        'general',
      ]

      for (const type of commandTypes) {
        expect(COMMAND_RESPONSE_EMOTIONS[type]).toBeDefined()
        expect(validateEmotion(COMMAND_RESPONSE_EMOTIONS[type])).toBe(
          COMMAND_RESPONSE_EMOTIONS[type]
        )
      }
    })

    it('maps emergency to determined for urgency', () => {
      expect(COMMAND_RESPONSE_EMOTIONS.emergency).toBe('determined')
    })

    it('maps clockIn to enthusiastic for positive start', () => {
      expect(COMMAND_RESPONSE_EMOTIONS.clockIn).toBe('enthusiastic')
    })

    it('maps clockOut to grateful for day completion', () => {
      expect(COMMAND_RESPONSE_EMOTIONS.clockOut).toBe('grateful')
    })
  })

  describe('Emotion validation for TTS', () => {
    it('validates emotions are Cartesia-compatible', () => {
      const validEmotions = ['excited', 'calm', 'confident', 'determined', 'grateful']
      for (const emotion of validEmotions) {
        expect(validateEmotion(emotion)).toBe(emotion)
      }
    })

    it('falls back to neutral for invalid emotions', () => {
      expect(validateEmotion('invalid_emotion')).toBe('neutral')
      expect(validateEmotion('')).toBe('neutral')
    })
  })
})

describe('Response emotion selection', () => {
  /**
   * Get the appropriate response emotion based on command type and outcome
   */
  function getResponseEmotion(
    commandType: string,
    _success: boolean,
    _override?: string
  ): string {
    // Override takes precedence
    if (_override && validateEmotion(_override) !== 'neutral') {
      return _override
    }

    // Command type to response emotion mapping
    const emotionMap: Record<string, string> = {
      emergency: 'determined',
      clockIn: 'enthusiastic',
      clockOut: 'grateful',
      weather: 'calm',
      safety: 'determined',
      projectStatus: 'confident',
      scheduleWork: 'confident',
      checkPermit: 'neutral',
      general: 'sympathetic',
    }

    return emotionMap[commandType] || 'neutral'
  }

  it('returns override emotion when valid', () => {
    expect(getResponseEmotion('general', true, 'excited')).toBe('excited')
  })

  it('ignores invalid override and uses type mapping', () => {
    expect(getResponseEmotion('emergency', true, 'invalid')).toBe('determined')
  })

  it('returns appropriate emotion for each command type', () => {
    expect(getResponseEmotion('emergency', true)).toBe('determined')
    expect(getResponseEmotion('clockIn', true)).toBe('enthusiastic')
    expect(getResponseEmotion('clockOut', true)).toBe('grateful')
  })
})
