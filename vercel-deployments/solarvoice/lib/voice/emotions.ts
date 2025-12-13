/**
 * Voice Emotion System - Cartesia Sonic-3 Emotions
 * Port from Vozlux: /src/vozlux/voice/providers/cartesia_tts.py
 *
 * 57 valid emotions for Cartesia Sonic-3
 * Solar-specific agent emotion presets
 * Context-aware emotion detection
 */

/**
 * Complete set of valid Cartesia Sonic-3 emotions (57 total)
 * Verified against Cartesia official documentation
 */
export const VALID_EMOTIONS = new Set([
  // Positive High-Energy (8)
  'happy',
  'excited',
  'enthusiastic',
  'elated',
  'euphoric',
  'triumphant',
  'amazed',
  'surprised',

  // Positive Calm (7)
  'content',
  'peaceful',
  'serene',
  'calm',
  'grateful',
  'affectionate',
  'sympathetic',

  // Curious/Engaged (5)
  'curious',
  'anticipation',
  'mysterious',
  'flirtatious',
  'comedic',

  // Professional/Neutral (6)
  'neutral',
  'confident',
  'proud',
  'determined',
  'contemplative',
  'trust',

  // Negative (11)
  'angry',
  'mad',
  'outraged',
  'frustrated',
  'agitated',
  'threatened',
  'disgusted',
  'contempt',
  'envious',
  'sarcastic',
  'ironic',

  // Sad/Melancholic (12)
  'sad',
  'dejected',
  'melancholic',
  'disappointed',
  'hurt',
  'guilty',
  'bored',
  'tired',
  'rejected',
  'nostalgic',
  'wistful',
  'apologetic',

  // Uncertain/Anxious (5)
  'hesitant',
  'insecure',
  'confused',
  'resigned',
  'anxious',

  // Additional (3)
  'panicked',
  'alarmed',
  'concerned',
])

/**
 * Solar-specific agent emotion presets
 * Each agent has scenario-specific emotions optimized for solar industry
 */
export const SOLAR_AGENT_PRESETS: Record<string, Record<string, string>> = {
  'commercial-manager': {
    default: 'confident',
    greeting: 'enthusiastic',
    quote: 'excited',
    concern: 'calm',
    closing: 'grateful',
    negotiation: 'determined',
    objection: 'calm',
  },
  'customer-success': {
    default: 'content',
    greeting: 'excited',
    support: 'calm',
    resolution: 'grateful',
    followup: 'enthusiastic',
    complaint: 'sympathetic',
  },
  'performance-analyst': {
    default: 'neutral',
    analysis: 'contemplative',
    good_news: 'excited',
    concern: 'calm',
    recommendation: 'confident',
    report: 'neutral',
  },
  'sales-specialist': {
    default: 'enthusiastic',
    greeting: 'excited',
    pitch: 'confident',
    closing: 'grateful',
    objection: 'calm',
    demo: 'excited',
  },
  'utility-coordinator': {
    default: 'calm',
    technical: 'neutral',
    success: 'content',
    issue: 'determined',
    coordination: 'confident',
    update: 'calm',
  },
}

/**
 * Emotion detection patterns for automatic emotion inference from text
 */
const EMOTION_PATTERNS: Record<string, string[]> = {
  apologetic: ['sorry', 'apologize', 'unfortunately', 'regret', 'apologies'],
  excited: ['great', 'wonderful', 'amazing', 'excellent', 'excited', 'fantastic', '!'],
  calm: ["don't worry", 'no problem', 'rest assured', "it's okay", 'no issue'],
  grateful: ['thank you', 'thanks', 'grateful', 'appreciate', 'thankful'],
  confident: ['absolutely', 'certainly', 'definitely', 'guaranteed', 'assured'],
  sympathetic: ['understand', 'sorry to hear', 'difficult', 'challenging'],
  enthusiastic: ['love to', 'happy to', 'thrilled', 'delighted'],
}

/**
 * Get the appropriate emotion for a given agent type and scenario
 * Falls back to commercial-manager presets if agent not found
 * Falls back to default emotion if scenario not found
 *
 * @param agentType - The type of solar agent (e.g., 'commercial-manager')
 * @param scenario - The conversation scenario (e.g., 'greeting', 'quote')
 * @param language - Language code (for future multilingual emotion adjustment)
 * @returns The appropriate emotion string
 */
export function getEmotionForContext(
  agentType: string,
  scenario: string,
  _language: string = 'en'
): string {
  // Get presets for agent type, fall back to commercial-manager
  const presets = SOLAR_AGENT_PRESETS[agentType] ?? SOLAR_AGENT_PRESETS['commercial-manager']

  // Get emotion for scenario, fall back to default
  const emotion = presets?.[scenario] ?? presets?.default ?? 'neutral'

  // Validate the emotion
  return validateEmotion(emotion)
}

/**
 * Detect emotion from text content using keyword patterns
 * Useful for automatic emotion inference when no explicit scenario is provided
 *
 * @param text - The text to analyze
 * @returns The detected emotion or 'neutral' if no patterns match
 */
export function detectEmotionFromText(text: string): string {
  const textLower = text.toLowerCase()

  // Check each emotion pattern
  for (const [emotion, keywords] of Object.entries(EMOTION_PATTERNS)) {
    for (const keyword of keywords) {
      if (textLower.includes(keyword)) {
        return emotion
      }
    }
  }

  return 'neutral'
}

/**
 * Validate that an emotion is in the valid set
 * Returns the emotion if valid, 'neutral' if invalid with warning
 *
 * @param emotion - The emotion to validate
 * @returns The validated emotion or 'neutral'
 */
export function validateEmotion(emotion: string): string {
  if (!emotion || !VALID_EMOTIONS.has(emotion)) {
    console.warn(`Invalid emotion '${emotion}', falling back to 'neutral'`)
    return 'neutral'
  }
  return emotion
}

/**
 * Get all valid emotions as an array (for UI dropdowns, etc.)
 */
export function getValidEmotions(): string[] {
  return Array.from(VALID_EMOTIONS).sort()
}

/**
 * Get all agent types that have presets
 */
export function getAgentTypes(): string[] {
  return Object.keys(SOLAR_AGENT_PRESETS)
}

/**
 * Get all scenarios for a given agent type
 */
export function getAgentScenarios(agentType: string): string[] {
  const presets = SOLAR_AGENT_PRESETS[agentType]
  return presets ? Object.keys(presets) : []
}
