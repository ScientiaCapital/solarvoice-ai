import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/agents/custom - Get user's custom agents
export async function GET(request: NextRequest) {
  try {
    // In a real implementation, you'd get the user ID from authentication
    // For now, we'll return an empty array to prevent errors
    
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ agents: [] })
    }

    // Get custom agents for the user
    const customAgents = await prisma.customAgent.findMany({
      where: {
        userId,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        role: true,
        languages: true,
        voiceId: true,
        capabilities: true,
        isActive: true,
        testMode: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ agents: customAgents })

  } catch (error) {
    console.error('Error fetching custom agents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch custom agents', agents: [] },
      { status: 500 }
    )
  }
}

// POST /api/agents/custom - Create a new custom agent (placeholder)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, role, voiceId, capabilities, userId } = body

    if (!userId || !name || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const customAgent = await prisma.customAgent.create({
      data: {
        userId,
        name,
        description: description || '',
        role,
        prompt: `You are ${name}, a ${role} in the solar industry.`,
        voiceId: voiceId || 'pNInz6obpgDQGcFmaJgB', // Default voice
        languages: ['en'], // Default to English
        capabilities: capabilities || [],
        knowledgeBases: [],
        isActive: true,
        testMode: true,
      },
    })

    return NextResponse.json({ agent: customAgent })

  } catch (error) {
    console.error('Error creating custom agent:', error)
    return NextResponse.json(
      { error: 'Failed to create custom agent' },
      { status: 500 }
    )
  }
}