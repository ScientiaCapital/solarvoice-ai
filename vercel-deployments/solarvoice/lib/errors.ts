import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { ERROR_MESSAGES } from './constants'

// Custom error classes
export class AppError extends Error {
  constructor(
    message: string,
    public code: string = 'APP_ERROR',
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = ERROR_MESSAGES.NOT_FOUND) {
    super(message, 'NOT_FOUND', 404)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = ERROR_MESSAGES.UNAUTHORIZED) {
    super(message, 'UNAUTHORIZED', 401)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 'FORBIDDEN', 403)
    this.name = 'ForbiddenError'
  }
}

// Error response builder
export function errorResponse(error: unknown) {
  console.error('Error:', error)

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      },
      { status: error.statusCode }
    )
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: ERROR_MESSAGES.VALIDATION,
          details: error.errors,
        },
      },
      { status: 400 }
    )
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error.message || ERROR_MESSAGES.GENERIC,
        },
      },
      { status: 500 }
    )
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: ERROR_MESSAGES.GENERIC,
      },
    },
    { status: 500 }
  )
}

// Success response builder
export function successResponse<T>(
  data: T,
  message?: string,
  status: number = 200
) {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status }
  )
}

// Try-catch wrapper for API routes
export async function withErrorHandler<T>(
  handler: () => Promise<T>
): Promise<NextResponse> {
  try {
    const result = await handler()
    if (result instanceof NextResponse) {
      return result
    }
    return successResponse(result)
  } catch (error) {
    return errorResponse(error)
  }
}

// Client-side error handler
export function handleClientError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  
  if (typeof error === 'string') {
    return error
  }
  
  return ERROR_MESSAGES.GENERIC
}

// Format Zod errors for display
export function formatZodErrors(error: ZodError): Record<string, string> {
  const formatted: Record<string, string> = {}
  
  error.errors.forEach((err) => {
    const path = err.path.join('.')
    formatted[path] = err.message
  })
  
  return formatted
}
