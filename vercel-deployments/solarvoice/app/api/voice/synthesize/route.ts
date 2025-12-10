import { NextRequest, NextResponse } from 'next/server'
import { cartesiaTTS } from '@/lib/services/cartesia'
import { getEmotionForContext, detectEmotionFromText } from '@/lib/voice/emotions'

/**
 * TEXT-TO-SPEECH ENDPOINT
 *
 * Synthesizes text to speech using Cartesia Sonic-3
 * with emotion-aware voice generation.
 *
 * Request body:
 * - text: string (required) - Text to synthesize
 * - agentType: string - Agent type for voice/emotion selection
 * - scenario: string - Conversation scenario for emotion context
 * - language: 'en' | 'es' - Language for voice selection
 * - emotion: string - Override emotion (optional)
 * - speed: number - Speech speed 0.6-1.5 (optional)
 *
 * Response:
 * - Audio stream (audio/pcm)
 * - Headers: X-Emotion, X-TTS-Latency-Ms, X-Voice-Id
 */
export async function POST(request: NextRequest) {
  const startTime = performance.now()

  try {
    const body = await request.json()
    const { text, agentType, scenario, language, emotion: overrideEmotion, speed } = body

    // Validate required fields
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    // Check if Cartesia is configured
    if (!cartesiaTTS) {
      console.log('[VOICE_SYNTHESIZE] Cartesia not configured, returning fallback')
      return NextResponse.json(
        {
          error: 'Voice synthesis service not configured',
          message: 'Please use browser TTS fallback (speechSynthesis API).',
          fallback: 'browser',
        },
        { status: 503 }
      )
    }

    // Determine emotion: override > context-based > text-detection > neutral
    let emotion = overrideEmotion
    if (!emotion && agentType && scenario) {
      emotion = getEmotionForContext(agentType, scenario, language || 'en')
    }
    if (!emotion) {
      emotion = detectEmotionFromText(text)
    }

    // Get voice ID for agent type and language
    const voiceId = cartesiaTTS.getVoiceForAgent(
      agentType || 'commercial-manager',
      language || 'en'
    )

    console.log('[VOICE_SYNTHESIZE] Synthesizing:', {
      textLength: text.length,
      agentType: agentType || 'default',
      emotion,
      voiceId: voiceId.substring(0, 8) + '...',
      language: language || 'en',
    })

    // Synthesize with Cartesia
    const audioStream = await cartesiaTTS.synthesize(text, {
      voiceId,
      emotion,
      language: language || 'en',
      speed: speed || 1.0,
    })

    const latencyMs = Math.round(performance.now() - startTime)

    // Return streaming response with metadata headers
    return new Response(audioStream, {
      status: 200,
      headers: {
        'Content-Type': 'audio/pcm',
        'X-Emotion': emotion,
        'X-TTS-Latency-Ms': latencyMs.toString(),
        'X-Voice-Id': voiceId,
        'X-Provider': 'cartesia',
        'X-Model': cartesiaTTS.getModel(),
      },
    })
  } catch (error) {
    console.error('Voice synthesis error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: (error as Error).message },
      { status: 500 }
    )
  }
}

/**
 * GET /api/voice/synthesize
 *
 * Returns status information about the TTS service
 */
export async function GET(_request: NextRequest) {
  const isConfigured = cartesiaTTS?.isConfigured() ?? false

  return NextResponse.json({
    status: isConfigured ? 'configured' : 'not_configured',
    provider: 'cartesia',
    model: cartesiaTTS?.getModel() || 'sonic-3',
    fallback: isConfigured ? null : 'Use browser speechSynthesis API',
    capabilities: {
      emotions: true,
      streaming: true,
      languages: ['en', 'es'],
    },
  })
}
