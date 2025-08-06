import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

// Schema for updating an agent
const updateAgentSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  role: z.string().min(1).max(100).optional(),
  languages: z.array(z.string()).optional(),
  knowledgeBases: z.array(z.string()).max(3).optional(),
  isActive: z.boolean().optional(),
  testMode: z.boolean().optional(),
})

// GET - Fetch a single agent
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add proper authentication
    const userId = 'demo-user-001'

    const agent = await prisma.customAgent.findFirst({
      where: {
        id: params.id,
        userId,
      },
      include: {
        interactions: {
          take: 10,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(agent)
  } catch (error) {
    console.error('Failed to fetch agent:', error)
    return NextResponse.json(
      { error: 'Failed to fetch agent' },
      { status: 500 }
    )
  }
}

// PATCH - Update an agent
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add proper authentication
    const userId = 'demo-user-001'

    const body = await request.json()
    const validatedData = updateAgentSchema.parse(body)

    // Check if agent exists and belongs to user
    const existingAgent = await prisma.customAgent.findFirst({
      where: {
        id: params.id,
        userId,
      },
    })

    if (!existingAgent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    // Update the agent
    const updatedAgent = await prisma.customAgent.update({
      where: {
        id: params.id,
      },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(updatedAgent)
  } catch (error) {
    console.error('Failed to update agent:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update agent' },
      { status: 500 }
    )
  }
}

// DELETE - Remove an agent
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add proper authentication
    const userId = 'demo-user-001'

    // Check if agent exists and belongs to user
    const existingAgent = await prisma.customAgent.findFirst({
      where: {
        id: params.id,
        userId,
      },
    })

    if (!existingAgent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    // Delete the agent and its interactions (cascade)
    await prisma.customAgent.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Agent deleted successfully',
    })
  } catch (error) {
    console.error('Failed to delete agent:', error)
    return NextResponse.json(
      { error: 'Failed to delete agent' },
      { status: 500 }
    )
  }
}