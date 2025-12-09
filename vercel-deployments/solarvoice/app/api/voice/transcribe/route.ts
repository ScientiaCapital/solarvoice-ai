import { NextRequest, NextResponse } from 'next/server'

// =============================================================
// SPEECH-TO-TEXT ENDPOINT
// =============================================================
// Status: ElevenLabs DEPRECATED - Migrating to Deepgram/AssemblyAI
// Primary: Deepgram (real-time streaming)
// Backup: AssemblyAI (batch processing)
// TODO: Implement Deepgram STT in Phase 5
// =============================================================

// DEPRECATED: ElevenLabs API key
// const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

// NEW: Voice service API keys (to be implemented in Phase 5)
// const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY
// const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY

export async function POST(request: NextRequest) {
  try {
    // Get audio file from request
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File
    const language = formData.get('language') as string || 'auto'

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Audio file is required' },
        { status: 400 }
      )
    }

    // Validate file size (max 100MB for MVP)
    if (audioFile.size > 100 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Audio file too large (max 100MB)' },
        { status: 400 }
      )
    }

    // TODO: Implement Deepgram STT in Phase 5
    console.log('[VOICE_TRANSCRIBE] Request received:', {
      fileName: audioFile.name,
      fileSize: audioFile.size,
      fileType: audioFile.type,
      language,
      status: 'PENDING_DEEPGRAM_INTEGRATION',
    })

    return NextResponse.json(
      {
        error: 'Transcription service temporarily unavailable',
        message: 'Migrating from ElevenLabs to Deepgram/AssemblyAI. Please use browser speech recognition fallback.',
        migration: {
          from: 'ElevenLabs',
          to: ['Deepgram (primary)', 'AssemblyAI (backup)'],
          status: 'in_progress',
        },
      },
      { status: 503 }
    )

    /* DEPRECATED: ElevenLabs implementation
    if (!ELEVENLABS_API_KEY) {
      console.error('ElevenLabs API key not configured on server')
      return NextResponse.json(
        { error: 'Transcription service not configured' },
        { status: 500 }
      )
    }

    const buffer = Buffer.from(await audioFile.arrayBuffer())
    const elevenLabsFormData = new FormData()
    elevenLabsFormData.append('audio', new Blob([buffer], { type: audioFile.type }), audioFile.name)

    if (language !== 'auto') {
      elevenLabsFormData.append('language', language)
    }

    const response = await fetch(
      'https://api.elevenlabs.io/v1/audio/transcribe',
      {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: elevenLabsFormData,
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('ElevenLabs transcription error:', error)
      return NextResponse.json(
        { error: 'Transcription failed' },
        { status: response.status }
      )
    }

    const transcriptionData = await response.json()
    return NextResponse.json({
      transcript: transcriptionData.text,
      language: transcriptionData.language || language,
      duration: transcriptionData.duration,
      words: transcriptionData.words,
      speakers: transcriptionData.speakers,
    })
    */

  } catch (error) {
    console.error('Transcription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get transcription capabilities
export async function GET(_request: NextRequest) {
  return NextResponse.json({
    status: 'migration_in_progress',
    capabilities: {
      maxFileSize: '100MB',
      supportedFormats: [
        'mp3', 'mp4', 'mpeg', 'mpga', 'm4a',
        'wav', 'webm', 'ogg', 'flac'
      ],
      languages: [
        { code: 'en', name: 'English', accuracy: 'Excellent' },
        { code: 'es', name: 'Spanish', accuracy: 'Excellent' },
      ],
      features: [
        'Auto language detection',
        'Real-time streaming (Deepgram)',
        'Batch processing (AssemblyAI)',
      ],
    },
    migration: {
      from: 'ElevenLabs',
      to: ['Deepgram (primary)', 'AssemblyAI (backup)'],
      envKeys: ['DEEPGRAM_API_KEY', 'ASSEMBLYAI_API_KEY'],
    },
    fallback: 'Use browser webkitSpeechRecognition API',
  })
}
