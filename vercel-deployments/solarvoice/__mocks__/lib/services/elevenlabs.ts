// Mock ElevenLabs service for testing

export const AGENT_VOICES = {
  'commercial-manager': 'pNInz6obpgDQGcFmaJgB',
  'customer-success': 'EXAVITQu4vr4xnSDxMaL',
  'performance-analyst': 'VR6AewLTigWG4xSOukaG',
  'sales-specialist': 'ErXwobaYiN019PkySvjV',
  'utility-coordinator': 'MF3mGyEYCl7XYWbV9V6O'
} as const

export type AgentId = keyof typeof AGENT_VOICES

class MockElevenLabsService {
  async textToSpeech(text: string, agentId?: AgentId): Promise<void> {
    // Mock implementation - just log for testing
    console.log(`Mock TTS: "${text}" with agent ${agentId || 'commercial-manager'}`)
    return Promise.resolve()
  }

  async getAvailableVoices() {
    return [
      { voice_id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam' },
      { voice_id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella' },
      { voice_id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold' },
      { voice_id: 'ErXwobaYiN019PkySvjV', name: 'Antoni' },
      { voice_id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli' }
    ]
  }

  async testConnection(): Promise<boolean> {
    return Promise.resolve(true)
  }
}

export const elevenlabsService = new MockElevenLabsService()