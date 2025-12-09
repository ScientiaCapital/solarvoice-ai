import { NextRequest, NextResponse } from 'next/server'

// =============================================================
// TEXT-TO-SPEECH ENDPOINT
// =============================================================
// Status: ElevenLabs DEPRECATED - Migrating to Cartesia
// TODO: Implement Cartesia TTS in Phase 5
// =============================================================

// DEPRECATED: ElevenLabs API key - keeping for reference
// const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

// NEW: Cartesia API key (to be implemented in Phase 5)
// const CARTESIA_API_KEY = process.env.CARTESIA_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { text, voiceId, language } = await request.json()

    // Validate required fields
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    // TODO: Implement Cartesia TTS in Phase 5
    // For now, return a placeholder response indicating migration status
    console.log('[VOICE_SYNTHESIZE] Request received:', {
      textLength: text.length,
      voiceId: voiceId || 'default',
      language: language || 'en',
      status: 'PENDING_CARTESIA_INTEGRATION',
    })

    return NextResponse.json(
      {
        error: 'Voice synthesis temporarily unavailable',
        message: 'Migrating from ElevenLabs to Cartesia. Please use browser TTS fallback.',
        migration: {
          from: 'ElevenLabs',
          to: 'Cartesia',
          status: 'in_progress',
        },
      },
      { status: 503 }
    )

    /* DEPRECATED: ElevenLabs implementation
    if (!ELEVENLABS_API_KEY) {
      console.error('ElevenLabs API key not configured on server')
      return NextResponse.json(
        { error: 'Voice service not configured' },
        { status: 500 }
      )
    }

    const defaultVoiceId = 'pNInz6obpgDQGcFmaJgB'
    const isSpanish = language === 'es'
    const defaultModelId = isSpanish ? 'eleven_multilingual_v2' : 'eleven_monolingual_v1'

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId || defaultVoiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: modelId || defaultModelId,
          voice_settings: {
            stability: 0.71,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true,
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('ElevenLabs API error:', error)
      return NextResponse.json(
        { error: 'Voice synthesis failed' },
        { status: response.status }
      )
    }

    const audioData = await response.arrayBuffer()
    return new NextResponse(audioData, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioData.byteLength.toString(),
        'Access-Control-Allow-Origin': '*',
      },
    })
    */

  } catch (error) {
    console.error('Voice synthesis error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get available voices
export async function GET(_request: NextRequest) {
  // TODO: Implement Cartesia voice listing in Phase 5
  return NextResponse.json({
    status: 'migration_in_progress',
    message: 'Voice listing temporarily unavailable during Cartesia migration',
    migration: {
      from: 'ElevenLabs',
      to: 'Cartesia',
      envKey: 'CARTESIA_API_KEY',
    },
    fallback: 'Use browser speechSynthesis API',
  })

  /* DEPRECATED: ElevenLabs implementation
  if (!ELEVENLABS_API_KEY) {
    return NextResponse.json(
      { error: 'Voice service not configured' },
      { status: 500 }
    )
  }

  const response = await fetch('https://api.elevenlabs.io/v1/voices', {
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY,
    },
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch voices' },
      { status: response.status }
    )
  }

  const data = await response.json()
  const voices = data.voices.map((voice: any) => ({
    voice_id: voice.voice_id,
    name: voice.name,
    category: voice.category,
    labels: voice.labels,
  }))

  return NextResponse.json({ voices })
  */
}
