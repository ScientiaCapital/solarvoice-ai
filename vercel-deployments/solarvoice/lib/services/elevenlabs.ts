// SECURE: No direct ElevenLabs imports or API keys
// All voice operations go through our secure API endpoints

// Professional voice IDs for each specialist
export const AGENT_VOICES = {
  'commercial-manager': 'pNInz6obpgDQGcFmaJgB', // Adam - Professional authoritative male
  'customer-success': 'EXAVITQu4vr4xnSDxMaL', // Bella - Friendly female
  'performance-analyst': 'VR6AewLTigWG4xSOukaG', // Arnold - Technical neutral
  'sales-specialist': 'ErXwobaYiN019PkySvjV', // Antoni - Persuasive confident
  'utility-coordinator': 'MF3mGyEYCl7XYWbV9V6O' // Elli - Commanding experienced
} as const

export type AgentId = keyof typeof AGENT_VOICES

class ElevenLabsService {
  private audioContext: AudioContext | null = null
  private apiEndpoint: string = '/api/voice'

  constructor() {
    // No API key needed - all calls go through our secure endpoints
    console.log('🔒 ElevenLabs service initialized with secure API endpoints')
  }

  private async initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      // Resume audio context if suspended (required for Chrome)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume()
      }
    }
    return this.audioContext
  }

  async textToSpeech(text: string, agentId?: AgentId): Promise<void> {
    try {
      const voiceId = agentId ? AGENT_VOICES[agentId] : AGENT_VOICES['commercial-manager']
      
      console.log(`🎤 Secure TTS: "${text}" with voice ${voiceId}`)
      
      // Call our secure API endpoint
      const response = await fetch(`${this.apiEndpoint}/synthesize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voiceId,
          modelId: 'eleven_multilingual_v2', // Highest quality bilingual model
        }),
      })

      if (!response.ok) {
        throw new Error(`TTS API error: ${response.status}`)
      }

      // Get audio data from response
      const audioData = await response.arrayBuffer()
      
      // Play the audio
      await this.playAudio(audioData)
    } catch (error) {
      console.error('TTS Error:', error)
      // Fallback to browser TTS
      this.fallbackTTS(text)
    }
  }

  private async playAudio(audioData: any): Promise<void> {
    try {
      const audioContext = await this.initAudioContext()
      
      // Convert audio data to ArrayBuffer if needed
      let arrayBuffer: ArrayBuffer
      if (audioData instanceof ArrayBuffer) {
        arrayBuffer = audioData
      } else if (audioData instanceof Uint8Array) {
        // Handle SharedArrayBuffer case by copying to regular ArrayBuffer
        const buffer = audioData.buffer
        if (buffer instanceof SharedArrayBuffer) {
          arrayBuffer = new ArrayBuffer(audioData.byteLength)
          new Uint8Array(arrayBuffer).set(audioData)
        } else {
          arrayBuffer = buffer.slice(audioData.byteOffset, audioData.byteOffset + audioData.byteLength)
        }
      } else {
        throw new Error('Unsupported audio format')
      }

      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
      const source = audioContext.createBufferSource()
      
      source.buffer = audioBuffer
      source.connect(audioContext.destination)
      
      return new Promise<void>((resolve, reject) => {
        source.onended = () => resolve()
        source.addEventListener('error', reject)
        source.start()
      })
    } catch (error) {
      console.error('Audio playback error:', error)
      throw error
    }
  }

  private fallbackTTS(text: string): void {
    console.log('🔄 Falling back to browser TTS')
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.volume = 0.8
      
      // Try to use a better browser voice
      const voices = window.speechSynthesis.getVoices()
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Enhanced') ||
        voice.name.includes('Neural')
      )
      
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }
      
      window.speechSynthesis.speak(utterance)
    }
  }

  async getAvailableVoices() {
    try {
      // Call our secure API endpoint
      const response = await fetch(`${this.apiEndpoint}/synthesize`, {
        method: 'GET',
      })
      
      if (!response.ok) {
        console.error('Failed to fetch voices')
        return []
      }
      
      const data = await response.json()
      return data.voices || []
    } catch (error) {
      console.error('Error fetching voices:', error)
      return []
    }
  }

  // Test function to verify voice service is available
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiEndpoint}/synthesize`, {
        method: 'GET',
      })
      
      if (response.ok) {
        console.log('✅ Voice service connection successful')
        return true
      } else {
        console.error('❌ Voice service unavailable:', response.status)
        return false
      }
    } catch (error) {
      console.error('❌ Voice service connection failed:', error)
      return false
    }
  }

  // New method for transcription
  async transcribeAudio(audioFile: File, language: string = 'auto'): Promise<any> {
    try {
      const formData = new FormData()
      formData.append('audio', audioFile)
      formData.append('language', language)
      
      const response = await fetch(`${this.apiEndpoint}/transcribe`, {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error(`Transcription API error: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Transcription error:', error)
      throw error
    }
  }
}

export const elevenlabsService = new ElevenLabsService()