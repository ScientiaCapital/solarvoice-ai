import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

// Schema for voice test request
const testRequestSchema = z.object({
  input: z.string().min(1).max(500),
  language: z.enum(['en', 'es']).default('en'),
  sessionId: z.string().optional(),
})

// POST - Test voice interaction with an agent
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add proper authentication
    const userId = 'demo-user-001'

    const body = await request.json()
    const { input, language, sessionId } = testRequestSchema.parse(body)

    // Fetch the agent
    const agent = await prisma.customAgent.findFirst({
      where: {
        id: params.id,
        userId,
      },
    })

    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    // Generate a response based on the agent's knowledge bases
    const response = generateAgentResponse(input, agent.knowledgeBases, language)

    // Create a session ID if not provided
    const finalSessionId = sessionId || `session-${Date.now()}`

    // Record the interaction
    const interaction = await prisma.agentInteraction.create({
      data: {
        agentId: agent.id,
        sessionId: finalSessionId,
        inputText: input,
        outputText: response,
        language,
        confidence: 0.95, // Mock confidence for demo
        inputDuration: 3, // Mock duration
        outputDuration: 5, // Mock duration
        context: {
          timestamp: new Date().toISOString(),
          agentRole: agent.role,
        },
      },
    })

    // Update agent usage
    await prisma.customAgent.update({
      where: { id: agent.id },
      data: {
        usageMinutes: {
          increment: 1, // Increment by 1 minute for each test
        },
        lastUsed: new Date(),
      },
    })

    // Call ElevenLabs to synthesize the response
    const voiceResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/voice/synthesize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: response,
        voiceId: agent.voiceId,
        language,
      }),
    })

    if (!voiceResponse.ok) {
      console.error('Voice synthesis failed')
    }

    return NextResponse.json({
      response,
      sessionId: finalSessionId,
      interactionId: interaction.id,
      voiceId: agent.voiceId,
      agent: {
        name: agent.name,
        role: agent.role,
      },
    })
  } catch (error) {
    console.error('Voice test error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to test agent' },
      { status: 500 }
    )
  }
}

// Helper function to generate contextual responses
function generateAgentResponse(
  input: string,
  knowledgeBases: string[],
  language: string
): string {
  const lowerInput = input.toLowerCase()
  
  // Spanish responses
  if (language === 'es') {
    if (lowerInput.includes('hola') || lowerInput.includes('buenos')) {
      return '¡Hola! Soy tu asistente especializado en energía solar. ¿En qué puedo ayudarte hoy?'
    }
    if (lowerInput.includes('panel') || lowerInput.includes('solar')) {
      return 'Los paneles solares modernos tienen una eficiencia del 20-22% y pueden durar más de 25 años con el mantenimiento adecuado.'
    }
    if (lowerInput.includes('costo') || lowerInput.includes('precio')) {
      return 'El costo de instalación solar varía según el tamaño del sistema. Un sistema residencial típico de 6kW puede costar entre $15,000 y $20,000 antes de incentivos.'
    }
    return 'Entiendo tu consulta sobre energía solar. ¿Podrías proporcionar más detalles para poder ayudarte mejor?'
  }
  
  // English responses based on knowledge bases
  const responses: Record<string, Record<string, string>> = {
    'solar-install': {
      default: "I specialize in solar installation best practices. How can I help with your solar project?",
      panel: "For optimal performance, solar panels should be installed at a 30-45 degree angle facing south in the Northern Hemisphere.",
      mounting: "Roof mounting requires proper flashing and waterproofing. Rail systems provide the most secure attachment.",
      wiring: "DC wiring must be properly sized for the system amperage. Use MC4 connectors for waterproof connections.",
    },
    'safety': {
      default: "Safety is paramount in solar installations. What safety concern can I address?",
      fall: "Always use proper fall protection when working on roofs. OSHA requires protection at 6 feet or higher.",
      electrical: "Lock out/tag out procedures must be followed when working on electrical systems. Never work on live circuits.",
      ppe: "Required PPE includes hard hats, safety glasses, arc-rated clothing, and insulated gloves for electrical work.",
    },
    'project-mgmt': {
      default: "I can help manage your solar project timeline and resources. What aspect needs attention?",
      timeline: "A typical residential installation takes 1-3 days. Commercial projects may take 2-8 weeks depending on size.",
      permits: "Permit approval typically takes 2-6 weeks. Start the process early to avoid delays.",
      crew: "A standard residential crew includes 2-4 installers, an electrician, and a project lead.",
    },
  }
  
  // Check input for keywords and respond accordingly
  if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
    return "Hello! I'm your specialized solar AI assistant. How can I help you today?"
  }
  
  // Find relevant response based on knowledge bases
  for (const kb of knowledgeBases) {
    if (responses[kb]) {
      for (const [keyword, response] of Object.entries(responses[kb])) {
        if (keyword !== 'default' && lowerInput.includes(keyword)) {
          return response
        }
      }
      // Return default response for this knowledge base
      if (responses[kb].default) {
        return responses[kb].default
      }
    }
  }
  
  // Generic response
  return "I understand your question about solar energy systems. Based on my training in " + 
         knowledgeBases.join(', ').replace(/-/g, ' ') + 
         ", I can provide detailed guidance. Could you be more specific about what you need help with?"
}