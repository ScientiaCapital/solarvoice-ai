// =============================================================
// ASSEMBLYAI SERVICE - Speech-to-Text (Backup STT Provider)
// =============================================================
// Status: STUB - Ready for implementation
// API Key: ASSEMBLYAI_API_KEY
// Docs: https://www.assemblyai.com/docs
// Features: High accuracy, speaker diarization, content moderation
// Use Case: Backup for Deepgram, longer recordings, advanced analysis
// =============================================================

// TODO: Install assemblyai when implementing
// npm install assemblyai

export interface AssemblyAITranscriptionResult {
  id: string
  status: 'queued' | 'processing' | 'completed' | 'error'
  text: string
  confidence: number
  words: Array<{
    text: string
    start: number
    end: number
    confidence: number
    speaker?: string
  }>
  utterances?: Array<{
    speaker: string
    text: string
    start: number
    end: number
    confidence: number
  }>
  audio_duration: number
  language_code: string
}

export interface AssemblyAIOptions {
  language_code?: string
  speaker_labels?: boolean
  auto_chapters?: boolean
  entity_detection?: boolean
  sentiment_analysis?: boolean
  auto_highlights?: boolean
  content_safety?: boolean
  iab_categories?: boolean
}

class AssemblyAIService {
  private apiKey: string | undefined
  // Base URL for future direct API calls (kept for reference)
  // private baseUrl = 'https://api.assemblyai.com/v2'

  constructor() {
    this.apiKey = process.env.ASSEMBLYAI_API_KEY
    if (!this.apiKey) {
      console.warn('[ASSEMBLYAI] API key not configured. Set ASSEMBLYAI_API_KEY in .env')
    }
  }

  /**
   * Check if AssemblyAI is configured and ready
   */
  isConfigured(): boolean {
    return Boolean(this.apiKey)
  }

  /**
   * Upload audio file and start transcription
   * TODO: Implement with assemblyai SDK
   */
  async transcribe(
    audioUrl: string,
    options: AssemblyAIOptions = {}
  ): Promise<AssemblyAITranscriptionResult> {
    if (!this.apiKey) {
      throw new Error('AssemblyAI API key not configured')
    }

    // TODO: Implement AssemblyAI transcription
    // import { AssemblyAI } from 'assemblyai'
    // const client = new AssemblyAI({ apiKey: this.apiKey })
    // const transcript = await client.transcripts.transcribe({
    //   audio: audioUrl,
    //   ...options,
    // })

    console.log('[ASSEMBLYAI] transcribe called:', {
      audioUrl,
      options,
    })

    // Placeholder response
    return {
      id: 'placeholder',
      status: 'completed',
      text: '[AssemblyAI integration pending]',
      confidence: 0,
      words: [],
      audio_duration: 0,
      language_code: options.language_code || 'en',
    }
  }

  /**
   * Upload audio buffer and transcribe
   * TODO: Implement file upload
   */
  async transcribeBuffer(
    audioBuffer: Buffer,
    options: AssemblyAIOptions = {}
  ): Promise<AssemblyAITranscriptionResult> {
    if (!this.apiKey) {
      throw new Error('AssemblyAI API key not configured')
    }

    // TODO: Implement buffer upload
    // 1. Upload buffer to AssemblyAI
    // 2. Start transcription with returned URL
    // 3. Poll for completion or use webhook

    console.log('[ASSEMBLYAI] transcribeBuffer called:', {
      bufferSize: audioBuffer.length,
      options,
    })

    // Placeholder response
    return {
      id: 'placeholder',
      status: 'completed',
      text: '[AssemblyAI integration pending]',
      confidence: 0,
      words: [],
      audio_duration: 0,
      language_code: options.language_code || 'en',
    }
  }

  /**
   * Get transcription status/result by ID
   * TODO: Implement polling
   */
  async getTranscription(transcriptId: string): Promise<AssemblyAITranscriptionResult> {
    if (!this.apiKey) {
      throw new Error('AssemblyAI API key not configured')
    }

    // TODO: Implement status check
    // const client = new AssemblyAI({ apiKey: this.apiKey })
    // const transcript = await client.transcripts.get(transcriptId)

    console.log('[ASSEMBLYAI] getTranscription called:', transcriptId)

    // Placeholder response
    return {
      id: transcriptId,
      status: 'completed',
      text: '[AssemblyAI integration pending]',
      confidence: 0,
      words: [],
      audio_duration: 0,
      language_code: 'en',
    }
  }

  /**
   * Get supported languages
   */
  getSupportedLanguages(): string[] {
    return [
      'en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'hi', 'ja', 'zh',
      'fi', 'ko', 'pl', 'ru', 'tr', 'uk', 'vi',
    ]
  }
}

// Export singleton instance
export const assemblyaiService = new AssemblyAIService()

// Export types
export type { AssemblyAIService }
