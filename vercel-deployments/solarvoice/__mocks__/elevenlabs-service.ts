/**
 * Mock implementation of ElevenLabs service for testing
 */

export type AgentId = 
  | 'commercial-manager'
  | 'customer-success'
  | 'performance-analyst'
  | 'sales-specialist'
  | 'utility-coordinator'

export const elevenlabsService = {
  textToSpeech: jest.fn().mockResolvedValue(undefined),
  initialize: jest.fn().mockResolvedValue(undefined),
  isInitialized: jest.fn().mockReturnValue(true),
  playAudioBuffer: jest.fn().mockResolvedValue(undefined)
}

export default elevenlabsService
EOF < /dev/null