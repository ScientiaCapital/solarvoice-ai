import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
// TODO: Re-enable when auth is implemented
// import { getServerSession } from 'next-auth'
import { z } from 'zod'

// Validation schema for agent creation
const createAgentSchema = z.object({
  name: z.string().min(1).max(50),
  prompt: z.string().min(1).max(500),
  role: z.string().min(1).max(100),
  languages: z.array(z.string()),
  voiceId: z.string(),
  knowledgeBases: z.array(z.string()).max(3),
  price: z.number().default(99),
})

export async function POST(request: NextRequest) {
  try {
    // TODO: Add proper authentication when auth system is ready
    // const session = await getServerSession()
    // if (!session?.user?.id) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   )
    // }

    // For MVP, use a mock user ID
    const userId = 'demo-user-001'

    const body = await request.json()
    
    // Validate input
    const validatedData = createAgentSchema.parse(body)

    // Create the agent in database
    const agent = await prisma.customAgent.create({
      data: {
        userId,
        name: validatedData.name,
        prompt: validatedData.prompt,
        role: validatedData.role,
        languages: validatedData.languages,
        voiceId: validatedData.voiceId,
        knowledgeBases: validatedData.knowledgeBases,
        capabilities: generateCapabilities(validatedData.knowledgeBases),
        monthlyPrice: validatedData.price,
        description: `${validatedData.role} specializing in ${validatedData.knowledgeBases.join(', ')}`,
      },
    })

    return NextResponse.json(agent)
  } catch (error) {
    console.error('Agent creation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create agent' },
      { status: 500 }
    )
  }
}

// GET endpoint to list user's agents
export async function GET(_request: NextRequest) {
  try {
    // TODO: Add proper authentication
    const userId = 'demo-user-001'

    const agents = await prisma.customAgent.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(agents)
  } catch (error) {
    console.error('Failed to fetch agents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    )
  }
}

// Helper function to generate capabilities based on knowledge bases
function generateCapabilities(knowledgeBases: string[]): string[] {
  const capabilityMap: Record<string, string[]> = {
    'solar-install': [
      'System design consultation',
      'Installation best practices',
      'Equipment recommendations',
    ],
    'safety': [
      'OSHA compliance guidance',
      'Safety protocol training',
      'Hazard identification',
    ],
    'project-mgmt': [
      'Timeline management',
      'Resource allocation',
      'Team coordination',
    ],
    'electrical': [
      'NEC code compliance',
      'Electrical troubleshooting',
      'System integration',
    ],
    'permits': [
      'Permit application assistance',
      'Code compliance verification',
      'Documentation preparation',
    ],
    'customer': [
      'Customer communication',
      'Expectation management',
      'Issue resolution',
    ],
  }

  const capabilities: string[] = []
  
  for (const kb of knowledgeBases) {
    if (capabilityMap[kb]) {
      capabilities.push(...capabilityMap[kb])
    }
  }

  return capabilities.length > 0 
    ? capabilities 
    : ['General solar consultation', 'Project assistance']
}