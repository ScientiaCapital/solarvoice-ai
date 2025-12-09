import { NextRequest, NextResponse } from 'next/server'

// =============================================================
// TEXT-TO-SPEECH ENDPOINT
// =============================================================
// Status: Voice provider integration pending
// Fallback: Browser speechSynthesis API
// =============================================================

export async function POST(request: NextRequest) {
  try {
    const { text, voiceId, language } = await request.json()

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    console.log('[VOICE_SYNTHESIZE] Request received:', {
      textLength: text.length,
      voiceId: voiceId || 'default',
      language: language || 'en',
    })

    // Return placeholder - use browser TTS fallback
    return NextResponse.json(
      {
        error: 'Voice synthesis service not configured',
        message: 'Please use browser TTS fallback (speechSynthesis API).',
        fallback: 'browser',
      },
      { status: 503 }
    )
  } catch (error) {
    console.error('Voice synthesis error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(_request: NextRequest) {
  return NextResponse.json({
    status: 'not_configured',
    message: 'Voice synthesis service pending provider integration',
    fallback: 'Use browser speechSynthesis API',
  })
}
