import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/db'

// Validation schema - aligned with Prisma User model
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  companyName: z.string().optional(),
  phoneNumber: z.string().optional(),
  preferredLanguage: z.enum(['en', 'es']).optional(),
  role: z.enum(['CONTRACTOR', 'ENTERPRISE', 'ADMIN', 'DEVELOPER']).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password (schema uses passwordHash)
    const passwordHash = await bcrypt.hash(validatedData.password, 12)

    // Build data object - only include optional fields if provided
    // This satisfies exactOptionalPropertyTypes
    const userData: {
      email: string
      passwordHash: string
      preferredLanguage: string
      role: 'CONTRACTOR' | 'ENTERPRISE' | 'ADMIN' | 'DEVELOPER'
      companyName?: string
      phoneNumber?: string
    } = {
      email: validatedData.email.toLowerCase(),
      passwordHash,
      preferredLanguage: validatedData.preferredLanguage ?? 'en',
      role: validatedData.role ?? 'CONTRACTOR',
    }

    if (validatedData.companyName) {
      userData.companyName = validatedData.companyName
    }
    if (validatedData.phoneNumber) {
      userData.phoneNumber = validatedData.phoneNumber
    }

    // Create user - aligned with Prisma schema
    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        companyName: true,
        phoneNumber: true,
        role: true,
        preferredLanguage: true,
        createdAt: true,
      },
    })

    // TODO: Email verification will be handled by Supabase Auth in Phase 6

    return NextResponse.json({
      success: true,
      message: 'Registration successful.',
      user,
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}