/**
 * Common Error Types - SolarVoice AI Platform
 * Standardized error handling across all modules
 */

export interface BaseError {
  code: string;
  message: string;
  statusCode: number;
  context?: any;
  timestamp: Date;
}

export interface ValidationError extends BaseError {
  code: 'VALIDATION_ERROR';
  statusCode: 400;
  fields?: ValidationFieldError[];
}

export interface ValidationFieldError {
  field: string;
  message: string;
  value: any;
}

export interface AuthenticationError extends BaseError {
  code: 'AUTHENTICATION_ERROR';
  statusCode: 401;
  reason: 'invalid_credentials' | 'token_expired' | 'token_invalid' | 'user_not_found';
}

export interface AuthorizationError extends BaseError {
  code: 'AUTHORIZATION_ERROR';
  statusCode: 403;
  requiredPermissions?: string[];
  userPermissions?: string[];
}

export interface NotFoundError extends BaseError {
  code: 'NOT_FOUND_ERROR';
  statusCode: 404;
  resource: string;
  id?: string;
}

export interface ConflictError extends BaseError {
  code: 'CONFLICT_ERROR';
  statusCode: 409;
  conflictingResource?: string;
}

export interface RateLimitError extends BaseError {
  code: 'RATE_LIMIT_ERROR';
  statusCode: 429;
  retryAfter?: number;
  limit: number;
  remaining: number;
}

export interface InternalServerError extends BaseError {
  code: 'INTERNAL_SERVER_ERROR';
  statusCode: 500;
  errorId?: string;
}

export interface ServiceUnavailableError extends BaseError {
  code: 'SERVICE_UNAVAILABLE_ERROR';
  statusCode: 503;
  service: string;
  retryAfter?: number;
}

export interface VoiceProcessingError extends BaseError {
  code: 'VOICE_PROCESSING_ERROR';
  statusCode: 500;
  audioFormat?: string;
  processingStage?: 'transcription' | 'intent_recognition' | 'response_generation' | 'synthesis';
}

export interface DatabaseError extends BaseError {
  code: 'DATABASE_ERROR';
  statusCode: 500;
  operation: string;
  table?: string;
}

export interface ExternalAPIError extends BaseError {
  code: 'EXTERNAL_API_ERROR';
  statusCode: 502;
  service: string;
  originalError?: any;
}

export type PlatformError = 
  | ValidationError
  | AuthenticationError
  | AuthorizationError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | InternalServerError
  | ServiceUnavailableError
  | VoiceProcessingError
  | DatabaseError
  | ExternalAPIError;