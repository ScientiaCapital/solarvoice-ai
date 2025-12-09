import { NextRequest, NextResponse } from 'next/server'

// =============================================================
// SPEECH-TO-TEXT ENDPOINT
// =============================================================
// Status: Voice provider integration pending
// Fallback: Browser webkitSpeechRecognition API
// =============================================================

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File
    const language = formData.get('language') as string || 'auto'

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Audio file is required' },
        { status: 400 }
      )
    }

    if (audioFile.size > 100 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Audio file too large (max 100MB)' },
        { status: 400 }
      )
    }

    console.log('[VOICE_TRANSCRIBE] Request received:', {
      fileName: audioFile.name,
      fileSize: audioFile.size,
      fileType: audioFile.type,
      language,
    })

    // Return placeholder - use browser speech recognition fallback
    return NextResponse.json(
      {
        error: 'Transcription service not configured',
        message: 'Please use browser speech recognition fallback (webkitSpeechRecognition API).',
        fallback: 'browser',
      },
      { status: 503 }
    )
  } catch (error) {
    console.error('Transcription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(_request: NextRequest) {
  return NextResponse.json({
    status: 'not_configured',
    capabilities: {
      maxFileSize: '100MB',
      supportedFormats: ['mp3', 'mp4', 'wav', 'webm', 'ogg', 'flac'],
      languages: [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
      ],
    },
    fallback: 'Use browser webkitSpeechRecognition API',
  })
}
