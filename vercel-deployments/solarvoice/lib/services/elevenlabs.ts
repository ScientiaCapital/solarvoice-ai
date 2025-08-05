import { ElevenLabsApi, ElevenLabs } from '@elevenlabs/elevenlabs-js'

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
  private client: ElevenLabsApi
  private audioContext: AudioContext | null = null

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY
    
    if (!apiKey) {
      console.warn('⚠️ ElevenLabs API key not configured. Voice synthesis will fall back to browser TTS.')
      // Create a dummy client that won't be used but prevents constructor errors
      this.client = {} as ElevenLabsApi
      return
    }
    
    this.client = new ElevenLabs({
      apiKey: apiKey
    })
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
      // Check if client is properly initialized
      if (!this.client || !this.client.generate) {
        console.log('ElevenLabs not configured, using browser TTS')
        this.fallbackTTS(text)
        return
      }
      
      const voiceId = agentId ? AGENT_VOICES[agentId] : AGENT_VOICES['commercial-manager']
      
      console.log(`🎤 ElevenLabs TTS: "${text}" with voice ${voiceId}`)
      
      const audio = await this.client.generate({
        voice: voiceId,
        text: text,
        model_id: 'eleven_monolingual_v1'
      })

      await this.playAudio(audio)
    } catch (error) {
      console.error('ElevenLabs TTS Error:', error)
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
        arrayBuffer = audioData.buffer
      } else {
        throw new Error('Unsupported audio format')
      }

      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
      const source = audioContext.createBufferSource()
      
      source.buffer = audioBuffer
      source.connect(audioContext.destination)
      
      return new Promise((resolve, reject) => {
        source.onended = () => resolve()
        source.onerror = reject
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
      if (!this.client || !this.client.voices) {
        console.warn('ElevenLabs client not initialized')
        return []
      }
      const voices = await this.client.voices.getAll()
      return voices.voices
    } catch (error) {
      console.error('Error fetching voices:', error)
      return []
    }
  }

  // Test function to verify ElevenLabs connection
  async testConnection(): Promise<boolean> {
    try {
      if (!this.client || !this.client.voices) {
        console.warn('ElevenLabs client not initialized - API key missing')
        return false
      }
      await this.client.voices.getAll()
      console.log('✅ ElevenLabs connection successful')
      return true
    } catch (error) {
      console.error('❌ ElevenLabs connection failed:', error)
      return false
    }
  }
}

export const elevenlabsService = new ElevenLabsService()