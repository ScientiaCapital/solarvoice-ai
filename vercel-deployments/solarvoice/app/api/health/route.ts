import { NextResponse } from 'next/server'

export async function GET() {
  // Check critical environment variables
  const elevenLabsConfigured = !!process.env.ELEVENLABS_API_KEY
  const databaseConfigured = !!process.env.DATABASE_URL
  
  // Test ElevenLabs connection if API key exists
  let elevenLabsStatus = 'not configured'
  if (elevenLabsConfigured) {
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY!,
        },
      })
      elevenLabsStatus = response.ok ? 'connected' : `error: ${response.status}`
    } catch (error) {
      elevenLabsStatus = 'connection failed'
    }
  }
  
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
    services: {
      database: databaseConfigured ? 'configured' : 'missing',
      elevenlabs: elevenLabsStatus,
    }
  })
}
