/**
 * Voice Emotion System Tests
 * TDD: Port from Vozlux cartesia_tts.py emotion patterns
 */

import {
  VALID_EMOTIONS,
  SOLAR_AGENT_PRESETS,
  getEmotionForContext,
  detectEmotionFromText,
  validateEmotion,
} from '@/lib/voice/emotions'

describe('VALID_EMOTIONS', () => {
  it('contains 57 valid Cartesia Sonic-3 emotions', () => {
    expect(VALID_EMOTIONS.size).toBe(57)
  })

  it('includes positive high-energy emotions', () => {
    expect(VALID_EMOTIONS.has('happy')).toBe(true)
    expect(VALID_EMOTIONS.has('excited')).toBe(true)
    expect(VALID_EMOTIONS.has('enthusiastic')).toBe(true)
    expect(VALID_EMOTIONS.has('triumphant')).toBe(true)
  })

  it('includes positive calm emotions', () => {
    expect(VALID_EMOTIONS.has('content')).toBe(true)
    expect(VALID_EMOTIONS.has('peaceful')).toBe(true)
    expect(VALID_EMOTIONS.has('calm')).toBe(true)
    expect(VALID_EMOTIONS.has('grateful')).toBe(true)
    expect(VALID_EMOTIONS.has('sympathetic')).toBe(true)
  })

  it('includes professional/neutral emotions', () => {
    expect(VALID_EMOTIONS.has('neutral')).toBe(true)
    expect(VALID_EMOTIONS.has('confident')).toBe(true)
    expect(VALID_EMOTIONS.has('determined')).toBe(true)
    expect(VALID_EMOTIONS.has('trust')).toBe(true)
  })

  it('includes negative emotions (used sparingly)', () => {
    expect(VALID_EMOTIONS.has('apologetic')).toBe(true)
    expect(VALID_EMOTIONS.has('sad')).toBe(true)
    expect(VALID_EMOTIONS.has('concerned')).toBe(true)
  })
})

describe('SOLAR_AGENT_PRESETS', () => {
  it('defines presets for all 5 solar agent types', () => {
    expect(SOLAR_AGENT_PRESETS).toHaveProperty('commercial-manager')
    expect(SOLAR_AGENT_PRESETS).toHaveProperty('customer-success')
    expect(SOLAR_AGENT_PRESETS).toHaveProperty('performance-analyst')
    expect(SOLAR_AGENT_PRESETS).toHaveProperty('sales-specialist')
    expect(SOLAR_AGENT_PRESETS).toHaveProperty('utility-coordinator')
  })

  it('commercial-manager has confident default', () => {
    expect(SOLAR_AGENT_PRESETS['commercial-manager'].default).toBe('confident')
    expect(SOLAR_AGENT_PRESETS['commercial-manager'].greeting).toBe('enthusiastic')
    expect(SOLAR_AGENT_PRESETS['commercial-manager'].quote).toBe('excited')
  })

  it('customer-success has content default', () => {
    expect(SOLAR_AGENT_PRESETS['customer-success'].default).toBe('content')
    expect(SOLAR_AGENT_PRESETS['customer-success'].support).toBe('calm')
  })

  it('all preset emotions are in VALID_EMOTIONS', () => {
    for (const [agentType, presets] of Object.entries(SOLAR_AGENT_PRESETS)) {
      for (const [scenario, emotion] of Object.entries(presets)) {
        expect(VALID_EMOTIONS.has(emotion)).toBe(true)
      }
    }
  })
})

describe('getEmotionForContext', () => {
  it('returns agent-specific emotion for known scenario', () => {
    expect(getEmotionForContext('commercial-manager', 'greeting')).toBe('enthusiastic')
    expect(getEmotionForContext('sales-specialist', 'pitch')).toBe('confident')
    expect(getEmotionForContext('customer-success', 'support')).toBe('calm')
  })

  it('returns default emotion for unknown scenario', () => {
    expect(getEmotionForContext('commercial-manager', 'unknown-scenario')).toBe('confident')
    expect(getEmotionForContext('performance-analyst', 'random')).toBe('neutral')
  })

  it('falls back to commercial-manager for unknown agent', () => {
    expect(getEmotionForContext('unknown-agent', 'greeting')).toBe('enthusiastic')
    expect(getEmotionForContext('nonexistent', 'default')).toBe('confident')
  })

  it('returns neutral for completely unknown context', () => {
    expect(getEmotionForContext('unknown', 'unknown')).toBe('confident') // falls back to commercial-manager.default
  })
})

describe('detectEmotionFromText', () => {
  it('detects apology keywords → apologetic', () => {
    expect(detectEmotionFromText("I'm sorry for the delay")).toBe('apologetic')
    expect(detectEmotionFromText('We apologize for any inconvenience')).toBe('apologetic')
    expect(detectEmotionFromText('Unfortunately, there was an issue')).toBe('apologetic')
  })

  it('detects excitement keywords → excited', () => {
    expect(detectEmotionFromText('Great news about your solar project!')).toBe('excited')
    expect(detectEmotionFromText('This is wonderful!')).toBe('excited')
    expect(detectEmotionFromText("I'm excited to share...")).toBe('excited')
  })

  it('detects reassurance keywords → calm', () => {
    expect(detectEmotionFromText("Don't worry, we'll handle it")).toBe('calm')
    expect(detectEmotionFromText('No problem at all')).toBe('calm')
    expect(detectEmotionFromText('Rest assured, everything is on track')).toBe('calm')
  })

  it('detects gratitude keywords → grateful', () => {
    expect(detectEmotionFromText('Thank you for your patience')).toBe('grateful')
    expect(detectEmotionFromText("We're grateful for your business")).toBe('grateful')
    expect(detectEmotionFromText('Thanks for choosing us')).toBe('grateful')
  })

  it('returns neutral for no keywords detected', () => {
    expect(detectEmotionFromText('The system is operational.')).toBe('neutral')
    expect(detectEmotionFromText('Here is the report.')).toBe('neutral')
  })
})

describe('validateEmotion', () => {
  it('returns the emotion if valid', () => {
    expect(validateEmotion('excited')).toBe('excited')
    expect(validateEmotion('calm')).toBe('calm')
    expect(validateEmotion('neutral')).toBe('neutral')
  })

  it('returns neutral for invalid emotion', () => {
    expect(validateEmotion('invalid')).toBe('neutral')
    expect(validateEmotion('not-an-emotion')).toBe('neutral')
    expect(validateEmotion('')).toBe('neutral')
  })

  it('logs warning for invalid emotion', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation()
    validateEmotion('invalid-emotion')
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("Invalid emotion 'invalid-emotion'")
    )
    warnSpy.mockRestore()
  })
})
