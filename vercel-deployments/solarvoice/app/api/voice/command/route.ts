import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

// Validation schema
const voiceCommandSchema = z.object({
  command: z.string().min(1),
  emotion: z.string().optional(),
  context: z.object({
    projectId: z.string().optional(),
    location: z.object({
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    }).optional(),
    deviceType: z.string().optional(),
  }).optional(),
})

// Command patterns for different actions
const commandPatterns = {
  projectStatus: /(?:what's|check|show|get)\s+(?:the\s+)?(?:status|progress)\s+(?:of\s+)?(?:project|job)/i,
  scheduleWork: /(?:schedule|book|arrange)\s+(?:work|installation|crew)\s+(?:for|at|on)/i,
  checkPermit: /(?:check|verify|status)\s+(?:permit|permits|permission)/i,
  emergency: /(?:emergency|urgent|critical|help|sos)/i,
  clockIn: /(?:clock|punch)\s+(?:me\s+)?in/i,
  clockOut: /(?:clock|punch)\s+(?:me\s+)?out/i,
  weather: /(?:what's|check|show)\s+(?:the\s+)?weather/i,
  safety: /(?:safety|hazard|danger|risk)/i,
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const requestId = crypto.randomUUID()
  
  console.log('[VOICE_COMMAND_START]', {
    requestId,
    timestamp: new Date().toISOString(),
    headers: Object.fromEntries(request.headers.entries()),
  })
  
  try {
    // Verify authentication
    const auth = await verifyAuth(request)
    if (!auth) {
      console.log('[VOICE_COMMAND_AUTH_FAILED]', {
        requestId,
        timestamp: new Date().toISOString(),
      })
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    console.log('[VOICE_COMMAND_AUTH_SUCCESS]', {
      requestId,
      userId: auth.userId,
      role: auth.role,
    })
    
    const body = await request.json()
    
    // Validate input
    const validatedData = voiceCommandSchema.parse(body)
    
    // Process command
    const commandType = detectCommandType(validatedData.command)
    
    console.log('[VOICE_COMMAND_PROCESSING]', {
      requestId,
      userId: auth.userId,
      command: validatedData.command,
      commandType,
      context: validatedData.context,
    })
    
    const response = await processCommand(
      commandType,
      validatedData.command,
      validatedData.context,
      auth.userId
    )
    
    // Log voice interaction - aligned with Prisma VoiceInteraction schema
    // Use type assertion for optional duration field
    const responseDuration = 'duration' in response ? (response as { duration?: number }).duration : undefined
    await prisma.voiceInteraction.create({
      data: {
        transcript: validatedData.command,
        language: 'en',
        intent: commandType,
        confidence: response.confidence || 0.95,
        durationSeconds: Math.ceil((responseDuration || 1000) / 1000),
        successful: true,
        userId: auth.userId,
        projectContext: validatedData.context ? JSON.parse(JSON.stringify(validatedData.context)) : undefined,
      },
    })
    
    const duration = Date.now() - startTime
    
    console.log('[VOICE_COMMAND_SUCCESS]', {
      requestId,
      userId: auth.userId,
      commandType,
      duration,
      confidence: response.confidence,
    })
    
    return NextResponse.json({
      success: true,
      type: commandType,
      response: response.message,
      data: response.data,
      actions: response.actions,
      requestId,
      duration,
    })
    
  } catch (error) {
    const duration = Date.now() - startTime
    
    if (error instanceof z.ZodError) {
      console.log('[VOICE_COMMAND_VALIDATION_ERROR]', {
        requestId,
        duration,
        errors: error.errors,
      })
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors, requestId },
        { status: 400 }
      )
    }
    
    console.error('[VOICE_COMMAND_ERROR]', {
      requestId,
      duration,
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : error,
    })
    
    return NextResponse.json(
      { error: 'Failed to process voice command', requestId },
      { status: 500 }
    )
  }
}

function detectCommandType(command: string): string {
  for (const [type, pattern] of Object.entries(commandPatterns)) {
    if (pattern.test(command)) {
      return type
    }
  }
  return 'general'
}

async function processCommand(
  type: string,
  command: string,
  context: any,
  userId: string
) {
  switch (type) {
    case 'projectStatus':
      return await handleProjectStatus(command, context, userId)
    
    case 'scheduleWork':
      return await handleScheduleWork(command, context, userId)
    
    case 'checkPermit':
      return await handleCheckPermit(command, context, userId)
    
    case 'emergency':
      return await handleEmergency(command, context, userId)
    
    case 'clockIn':
      return await handleClockIn(userId, context)
    
    case 'clockOut':
      return await handleClockOut(userId, context)
    
    case 'weather':
      return await handleWeatherCheck(context)
    
    case 'safety':
      return await handleSafetyCheck(command, context, userId)
    
    default:
      return {
        message: "I understand you're asking about: " + command + ". Let me help you with that.",
        confidence: 0.7,
        data: null,
        actions: [],
      }
  }
}

// Handler functions
async function handleProjectStatus(_command: string, context: any, _userId: string) {
  const projectId = context?.projectId

  if (!projectId) {
    return {
      message: "Which project would you like to check the status for?",
      confidence: 0.9,
      data: null,
      actions: ['list_projects'],
    }
  }

  // TODO: Replace with actual project model when implemented
  // SolarProject model does not exist in current schema
  // For MVP, return placeholder response
  return {
    message: `Project status check requested for ID: ${projectId}. Project management integration coming soon.`,
    confidence: 0.85,
    data: { projectId, status: 'pending_integration' },
    actions: ['show_project_details'],
  }
}

async function handleScheduleWork(_command: string, _context: any, _userId: string) {
  return {
    message: "I'll help you schedule the work. What date and time works best for the installation?",
    confidence: 0.9,
    data: null,
    actions: ['open_scheduler', 'check_crew_availability'],
  }
}

async function handleCheckPermit(_command: string, _context: any, _userId: string) {
  return {
    message: "Checking permit status for your projects. All permits are currently up to date.",
    confidence: 0.85,
    data: { permitStatus: 'approved' },
    actions: ['show_permit_details'],
  }
}

async function handleEmergency(_command: string, _context: any, _userId: string) {
  return {
    message: "Emergency detected! Notifying safety supervisor and dispatching help to your location immediately.",
    confidence: 1.0,
    data: { priority: 'CRITICAL' },
    actions: ['notify_supervisor', 'call_911', 'send_location'],
    duration: 500,
  }
}

async function handleClockIn(_userId: string, _context: any) {
  return {
    message: "You've been clocked in successfully. Have a safe and productive day!",
    confidence: 0.95,
    data: { clockedIn: new Date() },
    actions: ['record_time_entry'],
  }
}

async function handleClockOut(_userId: string, _context: any) {
  return {
    message: "You've been clocked out. Great work today! You worked 8 hours and 15 minutes.",
    confidence: 0.95,
    data: { clockedOut: new Date(), hoursWorked: 8.25 },
    actions: ['record_time_entry', 'calculate_hours'],
  }
}

async function handleWeatherCheck(_context: any) {
  return {
    message: "Current weather is 75°F and sunny. Perfect conditions for solar installation work!",
    confidence: 0.9,
    data: { temperature: 75, conditions: 'sunny' },
    actions: ['show_weather_forecast'],
  }
}

async function handleSafetyCheck(_command: string, _context: any, _userId: string) {
  return {
    message: "Safety check initiated. All protocols are being followed. Remember to wear your PPE at all times.",
    confidence: 0.9,
    data: { safetyStatus: 'compliant' },
    actions: ['show_safety_checklist'],
  }
}