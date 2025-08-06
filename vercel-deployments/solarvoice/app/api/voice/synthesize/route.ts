import { NextRequest, NextResponse } from 'next/server'

// This is a secure server-side endpoint for ElevenLabs text-to-speech
// API key is never exposed to the client

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

export async function POST(request: NextRequest) {
  try {
    // Check for API key on server
    if (!ELEVENLABS_API_KEY) {
      console.error('ElevenLabs API key not configured on server')
      return NextResponse.json(
        { error: 'Voice service not configured' },
        { status: 500 }
      )
    }

    const { text, voiceId, modelId, language } = await request.json()

    // Validate required fields
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    // Default voice settings
    const defaultVoiceId = 'pNInz6obpgDQGcFmaJgB' // Adam - Professional male
    // Use highest quality model based on language
    const isSpanish = language === 'es'
    const defaultModelId = isSpanish ? 'eleven_multilingual_v2' : 'eleven_monolingual_v1'

    // Log for debugging
    console.log('ElevenLabs TTS Request:', {
      voiceId: voiceId || defaultVoiceId,
      modelId: modelId || defaultModelId,
      textLength: text.length,
      language: language || 'en',
    })

    // Call ElevenLabs API from server
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
            stability: 0.71,           // More natural variation (was 0.5)
            similarity_boost: 0.75,     // Better voice matching (was 0.5)
            style: 0.0,                // Remove style exaggeration for naturalness
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

    // Get audio data
    const audioData = await response.arrayBuffer()

    // Return audio to client with CORS headers
    return new NextResponse(audioData, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioData.byteLength.toString(),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-cache',
      },
    })

  } catch (error) {
    console.error('Voice synthesis error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get available voices (server-side)
export async function GET(request: NextRequest) {
  try {
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
    
    // Return only necessary voice data to client
    const voices = data.voices.map((voice: any) => ({
      voice_id: voice.voice_id,
      name: voice.name,
      category: voice.category,
      labels: voice.labels,
    }))

    return NextResponse.json({ voices }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })

  } catch (error) {
    console.error('Error fetching voices:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}