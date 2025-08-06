import { NextRequest, NextResponse } from 'next/server'

// Secure server-side endpoint for ElevenLabs speech-to-text
// Uses Scribe v1 model that supports 99 languages

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

export async function POST(request: NextRequest) {
  try {
    // Check for API key on server
    if (!ELEVENLABS_API_KEY) {
      console.error('ElevenLabs API key not configured on server')
      return NextResponse.json(
        { error: 'Transcription service not configured' },
        { status: 500 }
      )
    }

    // Get audio file from request
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File
    const language = formData.get('language') as string || 'auto' // auto-detect by default

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Audio file is required' },
        { status: 400 }
      )
    }

    // Validate file size (max 1GB per ElevenLabs)
    if (audioFile.size > 1024 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Audio file too large (max 1GB)' },
        { status: 400 }
      )
    }

    // Convert File to Buffer
    const buffer = Buffer.from(await audioFile.arrayBuffer())

    // Create FormData for ElevenLabs API
    const elevenLabsFormData = new FormData()
    elevenLabsFormData.append('audio', new Blob([buffer], { type: audioFile.type }), audioFile.name)
    
    // Optional: specify language for better accuracy
    if (language !== 'auto') {
      elevenLabsFormData.append('language', language)
    }

    // Call ElevenLabs Scribe API
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

    // Return transcription with metadata
    return NextResponse.json({
      transcript: transcriptionData.text,
      language: transcriptionData.language || language,
      duration: transcriptionData.duration,
      words: transcriptionData.words, // Word-level timestamps if available
      speakers: transcriptionData.speakers, // Speaker diarization if available
    })

  } catch (error) {
    console.error('Transcription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get transcription capabilities
export async function GET(request: NextRequest) {
  return NextResponse.json({
    capabilities: {
      maxFileSize: '1GB',
      maxDuration: '4.5 hours',
      supportedFormats: [
        'mp3', 'mp4', 'mpeg', 'mpga', 'm4a',
        'wav', 'webm', 'ogg', 'flac'
      ],
      languages: [
        { code: 'en', name: 'English', accuracy: 'Excellent' },
        { code: 'es', name: 'Spanish', accuracy: 'Excellent' },
        { code: 'fr', name: 'French', accuracy: 'Excellent' },
        { code: 'de', name: 'German', accuracy: 'Excellent' },
        { code: 'pt', name: 'Portuguese', accuracy: 'Excellent' },
        // Add more as needed
      ],
      features: [
        'Auto language detection',
        'Speaker diarization (up to 32 speakers)',
        'Word-level timestamps',
        'Non-speech sound transcription (optional)',
      ]
    }
  })
}