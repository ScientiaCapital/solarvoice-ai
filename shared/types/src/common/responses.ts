/**
 * Common Response Types - SolarVoice AI Platform
 * Standardized API response formats
 */

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
  meta?: ResponseMeta;
  timestamp: Date;
}

export interface APIError {
  code: string;
  message: string;
  details?: any;
  field?: string;
}

export interface ResponseMeta {
  requestId: string;
  processingTime: number;
  version: string;
  pagination?: PaginationMeta;
  rateLimit?: RateLimitMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface RateLimitMeta {
  limit: number;
  remaining: number;
  reset: Date;
  retryAfter?: number;
}

export interface SuccessResponse<T> extends APIResponse<T> {
  success: true;
  data: T;
  error?: never;
}

export interface ErrorResponse extends APIResponse<never> {
  success: false;
  data?: never;
  error: APIError;
}

export interface PaginatedResponse<T> extends SuccessResponse<T[]> {
  meta: ResponseMeta & {
    pagination: PaginationMeta;
  };
}

export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  uptime: number;
  timestamp: Date;
  services: ServiceHealthStatus[];
}

export interface ServiceHealthStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  latency?: number;
  error?: string;
  lastChecked: Date;
}

export interface AsyncOperationResponse {
  operationId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  estimatedCompletion?: Date;
  result?: any;
  error?: APIError;
}

// Response builders
export function createSuccessResponse<T>(
  data: T,
  meta?: Partial<ResponseMeta>
): SuccessResponse<T> {
  return {
    success: true,
    data,
    meta: {
      requestId: generateRequestId(),
      processingTime: 0,
      version: '1.0.0',
      ...meta
    },
    timestamp: new Date()
  };
}

export function createErrorResponse(
  code: string,
  message: string,
  details?: any,
  field?: string
): ErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details,
      field
    },
    meta: {
      requestId: generateRequestId(),
      processingTime: 0,
      version: '1.0.0'
    },
    timestamp: new Date()
  };
}

export function createPaginatedResponse<T>(
  data: T[],
  pagination: PaginationMeta,
  meta?: Partial<ResponseMeta>
): PaginatedResponse<T> {
  return {
    success: true,
    data,
    meta: {
      requestId: generateRequestId(),
      processingTime: 0,
      version: '1.0.0',
      pagination,
      ...meta
    },
    timestamp: new Date()
  };
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}