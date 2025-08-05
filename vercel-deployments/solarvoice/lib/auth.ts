import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

interface AuthPayload {
  userId: string
  email: string
  role: string
}

export async function verifyAuth(request: NextRequest): Promise<AuthPayload | null> {
  try {
    // Check for Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }
    
    const token = authHeader.substring(7)
    
    // Verify JWT token
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload
    
    return payload
  } catch (error) {
    console.error('Auth verification error:', error)
    return null
  }
}

export function generateToken(payload: AuthPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  } as jwt.SignOptions)
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  } as jwt.SignOptions)
}