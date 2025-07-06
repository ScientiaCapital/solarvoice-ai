/**
 * SolarVoice AI Platform - Resilience Patterns System
 * Principal Architect Standards: Mathematical Precision + Algorithmic Elegance + Pragmatic Excellence
 * 
 * Mathematical Foundation:
 * - Knuth: Statistical failure rate calculations with mathematical accuracy
 * - Dijkstra: State machine implementation with O(1) complexity
 * - Torvalds: Production-ready resilience with zero downtime
 * 
 * Target: 99.99% uptime for $10K MRR platform
 */

import { EventEmitter } from 'events';

// ============================================================================
// CORE INTERFACES - Type Safety Foundation
// ============================================================================

/**
 * Circuit Breaker States - Dijkstra State Machine
 */
export enum CircuitBreakerState {
  CLOSED = 'CLOSED',     // Normal operation
  OPEN = 'OPEN',         // Blocking requests
  HALF_OPEN = 'HALF_OPEN' // Testing recovery
}

/**
 * Circuit Breaker Configuration
 */
export interface CircuitBreakerConfig {
  readonly name: string;
  readonly failureThreshold: number;        // Percentage (0-100)
  readonly recoveryTimeoutMs: number;       // Recovery attempt interval
  readonly successThreshold: number;        // Successes needed to close
  readonly timeWindowMs: number;            // Sliding window duration
  readonly minimumThroughput: number;       // Minimum requests before evaluation
  readonly slowCallThreshold: number;       // Slow call timeout (ms)
  readonly slowCallRateThreshold: number;   // Slow call percentage threshold
}

/**
 * Retry Policy Configuration
 */
export interface RetryPolicy {
  readonly maxRetries: number;
  readonly initialDelayMs: number;
  readonly maxDelayMs: number;
  readonly backoffMultiplier: number;
  readonly jitterFactor: number;           // 0-1 for randomization
  readonly retryCondition: (error: Error) => boolean;
}

/**
 * Timeout Configuration
 */
export interface TimeoutConfig {
  readonly timeoutMs: number;
  readonly adaptiveTimeout: boolean;
  readonly adaptiveThreshold: number;      // Percentile for adaptive timeout
}

/**
 * Bulkhead Configuration
 */
export interface BulkheadConfig {
  readonly maxConcurrent: number;
  readonly maxWaitTime: number;
  readonly queueSize: number;
}

/**
 * Fallback Provider Interface
 */
export interface FallbackProvider<T> {
  getFallbackValue(error: Error, context?: any): Promise<T> | T;
  shouldUseFallback(error: Error): boolean;
}

/**
 * Resilience Metrics Interface
 */
export interface ResilienceMetrics {
  readonly circuitBreakerName: string;
  readonly state: CircuitBreakerState;
  readonly failureRate: number;
  readonly successRate: number;
  readonly totalRequests: number;
  readonly failedRequests: number;
  readonly successfulRequests: number;
  readonly slowRequests: number;
  readonly averageResponseTime: number;
  readonly lastFailureTime: number;
  readonly lastSuccessTime: number;
}

/**
 * Operation Result
 */
export interface OperationResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
  executionTime: number;
  wasSlowCall: boolean;
  usedFallback: boolean;
  retryCount: number;
}

// ============================================================================
// MATHEMATICAL PRECISION - Knuth Statistical Calculations
// ============================================================================

/**
 * Sliding Window for O(1) Failure Rate Calculation
 * Mathematical Foundation: Time-based circular buffer with precise statistics
 */
class SlidingWindow {
  private readonly buckets: Map<number, { requests: number; failures: number; slowCalls: number }>;
  private readonly windowSizeMs: number;
  private readonly bucketSizeMs: number;
  
  constructor(windowSizeMs: number, bucketCount: number = 10) {
    this.windowSizeMs = windowSizeMs;
    this.bucketSizeMs = Math.floor(windowSizeMs / bucketCount);
    this.buckets = new Map();
  }

  /**
   * Record operation with O(1) complexity
   */
  recordOperation(success: boolean, isSlowCall: boolean = false): void {
    const now = Date.now();
    const bucketKey = Math.floor(now / this.bucketSizeMs);
    
    if (!this.buckets.has(bucketKey)) {
      this.buckets.set(bucketKey, { requests: 0, failures: 0, slowCalls: 0 });
    }
    
    const bucket = this.buckets.get(bucketKey)!;
    bucket.requests++;
    if (!success) bucket.failures++;
    if (isSlowCall) bucket.slowCalls++;
    
    // Clean old buckets
    this.cleanOldBuckets(now);
  }

  /**
   * Calculate failure rate with mathematical precision
   */
  getFailureRate(): number {
    const stats = this.getStatistics();
    return stats.totalRequests > 0 ? (stats.totalFailures / stats.totalRequests) * 100 : 0;
  }

  /**
   * Calculate slow call rate
   */
  getSlowCallRate(): number {
    const stats = this.getStatistics();
    return stats.totalRequests > 0 ? (stats.totalSlowCalls / stats.totalRequests) * 100 : 0;
  }

  /**
   * Get comprehensive statistics
   */
  getStatistics(): { totalRequests: number; totalFailures: number; totalSlowCalls: number } {
    let totalRequests = 0;
    let totalFailures = 0;
    let totalSlowCalls = 0;
    
    for (const bucket of Array.from(this.buckets.values())) {
      totalRequests += bucket.requests;
      totalFailures += bucket.failures;
      totalSlowCalls += bucket.slowCalls;
    }
    
    return { totalRequests, totalFailures, totalSlowCalls };
  }

  private cleanOldBuckets(currentTime: number): void {
    const cutoffTime = currentTime - this.windowSizeMs;
    const cutoffBucket = Math.floor(cutoffTime / this.bucketSizeMs);
    
    for (const [bucketKey] of Array.from(this.buckets.entries())) {
      if (bucketKey <= cutoffBucket) {
        this.buckets.delete(bucketKey);
      }
    }
  }
}

/**
 * Exponential Backoff with Jitter - Knuth Precision
 */
class ExponentialBackoff {
  private readonly policy: RetryPolicy;
  
  constructor(policy: RetryPolicy) {
    this.policy = policy;
  }

  /**
   * Calculate delay with mathematical precision and jitter
   */
  calculateDelay(attemptNumber: number): number {
    const baseDelay = this.policy.initialDelayMs * Math.pow(this.policy.backoffMultiplier, attemptNumber);
    const cappedDelay = Math.min(baseDelay, this.policy.maxDelayMs);
    
    // Add jitter to prevent thundering herd
    const jitter = cappedDelay * this.policy.jitterFactor * Math.random();
    return Math.floor(cappedDelay + jitter);
  }
}

// ============================================================================
// CIRCUIT BREAKER - Dijkstra State Machine Excellence
// ============================================================================

/**
 * Circuit Breaker Implementation
 * Algorithmic Foundation: Clean state machine with O(1) operations
 */
export class CircuitBreaker extends EventEmitter {
  private readonly config: CircuitBreakerConfig;
  private readonly slidingWindow: SlidingWindow;
  private readonly responseTimeSamples: number[] = [];
  private readonly maxResponseTimeSamples = 100;
  
  private state: CircuitBreakerState = CircuitBreakerState.CLOSED;
  private lastFailureTime: number = 0;
  private lastSuccessTime: number = 0;
  private halfOpenSuccessCount: number = 0;
  private stateTransitionTime: number = Date.now();

  constructor(config: CircuitBreakerConfig) {
    super();
    this.config = config;
    this.slidingWindow = new SlidingWindow(config.timeWindowMs);
  }

  /**
   * Execute operation with circuit breaker protection
   */
  async execute<T>(
    operation: () => Promise<T>,
    fallbackProvider?: FallbackProvider<T>
  ): Promise<OperationResult<T>> {
    const startTime = Date.now();
    
    // Check if circuit breaker allows execution
    if (!this.canExecute()) {
      return this.handleCircuitOpen(fallbackProvider);
    }

    try {
      const result = await this.executeWithTimeout(operation);
      const executionTime = Date.now() - startTime;
      const isSlowCall = executionTime > this.config.slowCallThreshold;
      
      this.recordSuccess(executionTime, isSlowCall);
      
      return {
        success: true,
        data: result,
        executionTime,
        wasSlowCall: isSlowCall,
        usedFallback: false,
        retryCount: 0
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;
      this.recordFailure(executionTime);
      
      // Try fallback if available
      if (fallbackProvider && fallbackProvider.shouldUseFallback(error as Error)) {
        try {
          const fallbackResult = await fallbackProvider.getFallbackValue(error as Error);
          return {
            success: true,
            data: fallbackResult,
            executionTime,
            wasSlowCall: false,
            usedFallback: true,
            retryCount: 0
          };
        } catch (fallbackError) {
          // Fallback failed, return original error
        }
      }
      
      return {
        success: false,
        error: error as Error,
        executionTime,
        wasSlowCall: false,
        usedFallback: false,
        retryCount: 0
      };
    }
  }

  /**
   * Check if circuit breaker allows execution
   */
  private canExecute(): boolean {
    switch (this.state) {
      case CircuitBreakerState.CLOSED:
        return true;
      case CircuitBreakerState.OPEN:
        return this.shouldAttemptReset();
      case CircuitBreakerState.HALF_OPEN:
        return true;
      default:
        return false;
    }
  }

  /**
   * Execute operation with timeout protection
   */
  private async executeWithTimeout<T>(operation: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Operation timed out after ${this.config.slowCallThreshold}ms`));
      }, this.config.slowCallThreshold);

      operation()
        .then(result => {
          clearTimeout(timeout);
          resolve(result);
        })
        .catch(error => {
          clearTimeout(timeout);
          reject(error);
        });
    });
  }

  /**
   * Record successful operation
   */
  private recordSuccess(executionTime: number, isSlowCall: boolean): void {
    this.lastSuccessTime = Date.now();
    this.slidingWindow.recordOperation(true, isSlowCall);
    this.recordResponseTime(executionTime);

    if (this.state === CircuitBreakerState.HALF_OPEN) {
      this.halfOpenSuccessCount++;
      if (this.halfOpenSuccessCount >= this.config.successThreshold) {
        this.transitionToState(CircuitBreakerState.CLOSED);
      }
    }
  }

  /**
   * Record failed operation
   */
  private recordFailure(executionTime: number): void {
    this.lastFailureTime = Date.now();
    this.slidingWindow.recordOperation(false);
    this.recordResponseTime(executionTime);

    if (this.state === CircuitBreakerState.HALF_OPEN) {
      this.transitionToState(CircuitBreakerState.OPEN);
      return;
    }

    // Check if we should open the circuit
    if (this.shouldOpenCircuit()) {
      this.transitionToState(CircuitBreakerState.OPEN);
    }
  }

  /**
   * Determine if circuit should be opened
   */
  private shouldOpenCircuit(): boolean {
    const stats = this.slidingWindow.getStatistics();
    
    // Need minimum throughput to make decision
    if (stats.totalRequests < this.config.minimumThroughput) {
      return false;
    }

    const failureRate = this.slidingWindow.getFailureRate();
    const slowCallRate = this.slidingWindow.getSlowCallRate();
    
    return failureRate >= this.config.failureThreshold || 
           slowCallRate >= this.config.slowCallRateThreshold;
  }

  /**
   * Check if circuit should attempt reset
   */
  private shouldAttemptReset(): boolean {
    const timeSinceOpen = Date.now() - this.stateTransitionTime;
    if (timeSinceOpen >= this.config.recoveryTimeoutMs) {
      this.transitionToState(CircuitBreakerState.HALF_OPEN);
      return true;
    }
    return false;
  }

  /**
   * Transition to new state
   */
  private transitionToState(newState: CircuitBreakerState): void {
    const oldState = this.state;
    this.state = newState;
    this.stateTransitionTime = Date.now();
    
    if (newState === CircuitBreakerState.HALF_OPEN) {
      this.halfOpenSuccessCount = 0;
    }
    
    this.emit('stateChanged', { from: oldState, to: newState, timestamp: this.stateTransitionTime });
  }

  /**
   * Handle circuit open scenario
   */
  private async handleCircuitOpen<T>(fallbackProvider?: FallbackProvider<T>): Promise<OperationResult<T>> {
    const error = new Error(`Circuit breaker '${this.config.name}' is OPEN`);
    
    if (fallbackProvider && fallbackProvider.shouldUseFallback(error)) {
      try {
        const fallbackResult = await fallbackProvider.getFallbackValue(error);
        return {
          success: true,
          data: fallbackResult,
          executionTime: 0,
          wasSlowCall: false,
          usedFallback: true,
          retryCount: 0
        };
      } catch (fallbackError) {
        // Fallback failed
      }
    }
    
    return {
      success: false,
      error,
      executionTime: 0,
      wasSlowCall: false,
      usedFallback: false,
      retryCount: 0
    };
  }

  /**
   * Record response time for adaptive timeout
   */
  private recordResponseTime(time: number): void {
    this.responseTimeSamples.push(time);
    if (this.responseTimeSamples.length > this.maxResponseTimeSamples) {
      this.responseTimeSamples.shift();
    }
  }

  /**
   * Get current metrics
   */
  getMetrics(): ResilienceMetrics {
    const stats = this.slidingWindow.getStatistics();
    const avgResponseTime = this.responseTimeSamples.length > 0 
      ? this.responseTimeSamples.reduce((a, b) => a + b, 0) / this.responseTimeSamples.length 
      : 0;

    return {
      circuitBreakerName: this.config.name,
      state: this.state,
      failureRate: this.slidingWindow.getFailureRate(),
      successRate: 100 - this.slidingWindow.getFailureRate(),
      totalRequests: stats.totalRequests,
      failedRequests: stats.totalFailures,
      successfulRequests: stats.totalRequests - stats.totalFailures,
      slowRequests: stats.totalSlowCalls,
      averageResponseTime: avgResponseTime,
      lastFailureTime: this.lastFailureTime,
      lastSuccessTime: this.lastSuccessTime
    };
  }

  /**
   * Reset circuit breaker
   */
  reset(): void {
    this.transitionToState(CircuitBreakerState.CLOSED);
    this.halfOpenSuccessCount = 0;
    this.responseTimeSamples.length = 0;
    this.emit('reset', { timestamp: Date.now() });
  }
}

// ============================================================================
// RETRY PATTERN - Exponential Backoff Excellence
// ============================================================================

/**
 * Retry Decorator with Circuit Breaker Integration
 */
export class RetryDecorator {
  private readonly policy: RetryPolicy;
  private readonly backoff: ExponentialBackoff;
  private readonly circuitBreaker?: CircuitBreaker;

  constructor(policy: RetryPolicy, circuitBreaker?: CircuitBreaker) {
    this.policy = policy;
    this.backoff = new ExponentialBackoff(policy);
    this.circuitBreaker = circuitBreaker;
  }

  /**
   * Execute operation with retry logic
   */
  async execute<T>(
    operation: () => Promise<T>,
    fallbackProvider?: FallbackProvider<T>
  ): Promise<OperationResult<T>> {
    let lastError: Error | undefined;
    let retryCount = 0;

    for (let attempt = 0; attempt <= this.policy.maxRetries; attempt++) {
      try {
        let result: OperationResult<T>;
        
        if (this.circuitBreaker) {
          result = await this.circuitBreaker.execute(operation, fallbackProvider);
        } else {
          const startTime = Date.now();
          const data = await operation();
          const executionTime = Date.now() - startTime;
          
          result = {
            success: true,
            data,
            executionTime,
            wasSlowCall: false,
            usedFallback: false,
            retryCount: attempt
          };
        }

        result.retryCount = attempt;
        return result;
      } catch (error) {
        lastError = error as Error;
        retryCount = attempt;
        
        // Check if we should retry
        if (attempt < this.policy.maxRetries && this.policy.retryCondition(lastError)) {
          const delay = this.backoff.calculateDelay(attempt);
          await this.sleep(delay);
          continue;
        }
        
        break;
      }
    }

    // All retries failed, try fallback
    if (fallbackProvider && lastError && fallbackProvider.shouldUseFallback(lastError)) {
      try {
        const fallbackResult = await fallbackProvider.getFallbackValue(lastError);
        return {
          success: true,
          data: fallbackResult,
          executionTime: 0,
          wasSlowCall: false,
          usedFallback: true,
          retryCount
        };
      } catch (fallbackError) {
        // Fallback failed, return original error
      }
    }

    return {
      success: false,
      error: lastError,
      executionTime: 0,
      wasSlowCall: false,
      usedFallback: false,
      retryCount
    };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================================================
// BULKHEAD PATTERN - Resource Isolation
// ============================================================================

/**
 * Bulkhead for Resource Isolation
 */
export class Bulkhead {
  private readonly config: BulkheadConfig;
  private readonly activeOperations: Set<Promise<any>> = new Set();
  private readonly waitingQueue: Array<{
    operation: () => Promise<any>;
    resolve: (value: any) => void;
    reject: (error: any) => void;
    timestamp: number;
  }> = [];

  constructor(config: BulkheadConfig) {
    this.config = config;
  }

  /**
   * Execute operation with bulkhead protection
   */
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    // Check if we can execute immediately
    if (this.activeOperations.size < this.config.maxConcurrent) {
      return this.executeOperation(operation);
    }

    // Queue the operation
    return new Promise<T>((resolve, reject) => {
      const queueItem = {
        operation,
        resolve,
        reject,
        timestamp: Date.now()
      };

      // Check queue size
      if (this.waitingQueue.length >= this.config.queueSize) {
        reject(new Error('Bulkhead queue is full'));
        return;
      }

      this.waitingQueue.push(queueItem);
      
      // Set timeout for queued operation
      setTimeout(() => {
        const index = this.waitingQueue.indexOf(queueItem);
        if (index !== -1) {
          this.waitingQueue.splice(index, 1);
          reject(new Error('Bulkhead operation timed out while waiting'));
        }
      }, this.config.maxWaitTime);
    });
  }

  private async executeOperation<T>(operation: () => Promise<T>): Promise<T> {
    const promise = operation();
    this.activeOperations.add(promise);

    try {
      const result = await promise;
      return result;
    } finally {
      this.activeOperations.delete(promise);
      this.processQueue();
    }
  }

  private processQueue(): void {
    if (this.waitingQueue.length === 0 || this.activeOperations.size >= this.config.maxConcurrent) {
      return;
    }

    const queueItem = this.waitingQueue.shift();
    if (queueItem) {
      this.executeOperation(queueItem.operation)
        .then(queueItem.resolve)
        .catch(queueItem.reject);
    }
  }

  /**
   * Get current bulkhead metrics
   */
  getMetrics(): { active: number; queued: number; capacity: number } {
    return {
      active: this.activeOperations.size,
      queued: this.waitingQueue.length,
      capacity: this.config.maxConcurrent
    };
  }
}

// ============================================================================
// RESILIENCE MANAGER - Orchestration Excellence
// ============================================================================

/**
 * Resilience Manager - Orchestrates all resilience patterns
 */
export class ResilienceManager {
  private readonly circuitBreakers: Map<string, CircuitBreaker> = new Map();
  private readonly bulkheads: Map<string, Bulkhead> = new Map();
  private readonly retryDecorators: Map<string, RetryDecorator> = new Map();
  private readonly metricsCollector: MetricsCollector;

  constructor() {
    this.metricsCollector = new MetricsCollector();
  }

  /**
   * Create circuit breaker with configuration
   */
  createCircuitBreaker(name: string, config: CircuitBreakerConfig): CircuitBreaker {
    const circuitBreaker = new CircuitBreaker(config);
    this.circuitBreakers.set(name, circuitBreaker);
    
    // Wire up metrics collection
    circuitBreaker.on('stateChanged', (event) => {
      this.metricsCollector.recordStateChange(name, event);
    });
    
    return circuitBreaker;
  }

  /**
   * Create bulkhead with configuration
   */
  createBulkhead(name: string, config: BulkheadConfig): Bulkhead {
    const bulkhead = new Bulkhead(config);
    this.bulkheads.set(name, bulkhead);
    return bulkhead;
  }

  /**
   * Create retry decorator with configuration
   */
  createRetryDecorator(name: string, policy: RetryPolicy, circuitBreakerName?: string): RetryDecorator {
    const circuitBreaker = circuitBreakerName ? this.circuitBreakers.get(circuitBreakerName) : undefined;
    const retryDecorator = new RetryDecorator(policy, circuitBreaker);
    this.retryDecorators.set(name, retryDecorator);
    return retryDecorator;
  }

  /**
   * Get circuit breaker by name
   */
  getCircuitBreaker(name: string): CircuitBreaker | undefined {
    return this.circuitBreakers.get(name);
  }

  /**
   * Get bulkhead by name
   */
  getBulkhead(name: string): Bulkhead | undefined {
    return this.bulkheads.get(name);
  }

  /**
   * Get retry decorator by name
   */
  getRetryDecorator(name: string): RetryDecorator | undefined {
    return this.retryDecorators.get(name);
  }

  /**
   * Get all metrics
   */
  getAllMetrics(): { [key: string]: ResilienceMetrics } {
    const metrics: { [key: string]: ResilienceMetrics } = {};
    
    for (const [name, circuitBreaker] of Array.from(this.circuitBreakers.entries())) {
      metrics[name] = circuitBreaker.getMetrics();
    }
    
    return metrics;
  }

  /**
   * Health check for all resilience components
   */
  healthCheck(): { healthy: boolean; details: { [key: string]: any } } {
    const details: { [key: string]: any } = {};
    let healthy = true;

    for (const [name, circuitBreaker] of Array.from(this.circuitBreakers.entries())) {
      const metrics = circuitBreaker.getMetrics();
      details[name] = {
        state: metrics.state,
        failureRate: metrics.failureRate,
        healthy: metrics.state !== CircuitBreakerState.OPEN
      };
      
      if (metrics.state === CircuitBreakerState.OPEN) {
        healthy = false;
      }
    }

    return { healthy, details };
  }
}

/**
 * Metrics Collector for monitoring
 */
class MetricsCollector {
  private readonly stateChanges: Array<{
    circuitBreakerName: string;
    from: CircuitBreakerState;
    to: CircuitBreakerState;
    timestamp: number;
  }> = [];

  recordStateChange(circuitBreakerName: string, event: any): void {
    this.stateChanges.push({
      circuitBreakerName,
      from: event.from,
      to: event.to,
      timestamp: event.timestamp
    });
    
    // Keep only last 1000 state changes
    if (this.stateChanges.length > 1000) {
      this.stateChanges.shift();
    }
  }

  getStateChanges(): Array<any> {
    return [...this.stateChanges];
  }
}

// ============================================================================
// PREDEFINED CONFIGURATIONS - SolarVoice Platform
// ============================================================================

/**
 * SolarVoice Platform Resilience Configurations
 */
export const SolarVoiceConfigs = {
  // Payment Processing Circuit Breaker - 5% failure rate, 30s recovery
  PAYMENT_CIRCUIT_BREAKER: {
    name: 'payment-processor',
    failureThreshold: 5,
    recoveryTimeoutMs: 30000,
    successThreshold: 3,
    timeWindowMs: 60000,
    minimumThroughput: 10,
    slowCallThreshold: 5000,
    slowCallRateThreshold: 50
  } as CircuitBreakerConfig,

  // Voice AI Circuit Breaker - 10% failure rate, 10s recovery
  VOICE_AI_CIRCUIT_BREAKER: {
    name: 'voice-ai-processor',
    failureThreshold: 10,
    recoveryTimeoutMs: 10000,
    successThreshold: 2,
    timeWindowMs: 30000,
    minimumThroughput: 5,
    slowCallThreshold: 3000,
    slowCallRateThreshold: 30
  } as CircuitBreakerConfig,

  // API Circuit Breaker - 15% failure rate, 60s recovery
  API_CIRCUIT_BREAKER: {
    name: 'external-api',
    failureThreshold: 15,
    recoveryTimeoutMs: 60000,
    successThreshold: 5,
    timeWindowMs: 120000,
    minimumThroughput: 20,
    slowCallThreshold: 10000,
    slowCallRateThreshold: 40
  } as CircuitBreakerConfig,

  // Database Circuit Breaker - 20% failure rate, 5s recovery
  DATABASE_CIRCUIT_BREAKER: {
    name: 'database-connection',
    failureThreshold: 20,
    recoveryTimeoutMs: 5000,
    successThreshold: 3,
    timeWindowMs: 30000,
    minimumThroughput: 10,
    slowCallThreshold: 2000,
    slowCallRateThreshold: 60
  } as CircuitBreakerConfig,

  // Standard Retry Policy
  STANDARD_RETRY_POLICY: {
    maxRetries: 3,
    initialDelayMs: 1000,
    maxDelayMs: 10000,
    backoffMultiplier: 2,
    jitterFactor: 0.1,
    retryCondition: (error: Error) => {
      // Retry on network errors, timeouts, and 5xx status codes
      return error.message.includes('timeout') || 
             error.message.includes('ECONNRESET') ||
             error.message.includes('ENOTFOUND') ||
             error.message.includes('5') && error.message.includes('status');
    }
  } as RetryPolicy,

  // Payment Retry Policy - More aggressive for financial operations
  PAYMENT_RETRY_POLICY: {
    maxRetries: 5,
    initialDelayMs: 500,
    maxDelayMs: 5000,
    backoffMultiplier: 1.5,
    jitterFactor: 0.2,
    retryCondition: (error: Error) => {
      // Retry on temporary payment failures
      return !error.message.includes('insufficient_funds') &&
             !error.message.includes('card_declined') &&
             !error.message.includes('invalid_card');
    }
  } as RetryPolicy,

  // Standard Bulkhead Configuration
  STANDARD_BULKHEAD: {
    maxConcurrent: 10,
    maxWaitTime: 5000,
    queueSize: 50
  } as BulkheadConfig,

  // High Throughput Bulkhead
  HIGH_THROUGHPUT_BULKHEAD: {
    maxConcurrent: 50,
    maxWaitTime: 3000,
    queueSize: 200
  } as BulkheadConfig
};

/**
 * Default Fallback Providers
 */
export const DefaultFallbackProviders = {
  /**
   * Cache-based fallback provider
   */
  createCacheFallback: <T>(cache: Map<string, T>, cacheKey: string, defaultValue: T): FallbackProvider<T> => ({
    getFallbackValue: (error: Error, context?: any) => {
      const cached = cache.get(cacheKey);
      return cached !== undefined ? cached : defaultValue;
    },
    shouldUseFallback: (error: Error) => true
  }),

  /**
   * Static value fallback provider
   */
  createStaticFallback: <T>(value: T): FallbackProvider<T> => ({
    getFallbackValue: (error: Error, context?: any) => value,
    shouldUseFallback: (error: Error) => true
  }),

  /**
   * Function-based fallback provider
   */
  createFunctionFallback: <T>(fallbackFn: (error: Error, context?: any) => T | Promise<T>): FallbackProvider<T> => ({
    getFallbackValue: fallbackFn,
    shouldUseFallback: (error: Error) => true
  })
};

// ============================================================================
// FACTORY FUNCTIONS - Easy Setup
// ============================================================================

/**
 * Create a complete resilience setup for SolarVoice components
 */
export function createSolarVoiceResilience(): ResilienceManager {
  const manager = new ResilienceManager();
  
  // Create circuit breakers
  manager.createCircuitBreaker('payment', SolarVoiceConfigs.PAYMENT_CIRCUIT_BREAKER);
  manager.createCircuitBreaker('voice-ai', SolarVoiceConfigs.VOICE_AI_CIRCUIT_BREAKER);
  manager.createCircuitBreaker('api', SolarVoiceConfigs.API_CIRCUIT_BREAKER);
  manager.createCircuitBreaker('database', SolarVoiceConfigs.DATABASE_CIRCUIT_BREAKER);
  
  // Create bulkheads
  manager.createBulkhead('standard', SolarVoiceConfigs.STANDARD_BULKHEAD);
  manager.createBulkhead('high-throughput', SolarVoiceConfigs.HIGH_THROUGHPUT_BULKHEAD);
  
  // Create retry decorators
  manager.createRetryDecorator('standard', SolarVoiceConfigs.STANDARD_RETRY_POLICY);
  manager.createRetryDecorator('payment', SolarVoiceConfigs.PAYMENT_RETRY_POLICY, 'payment');
  manager.createRetryDecorator('voice-ai', SolarVoiceConfigs.STANDARD_RETRY_POLICY, 'voice-ai');
  manager.createRetryDecorator('api', SolarVoiceConfigs.STANDARD_RETRY_POLICY, 'api');
  manager.createRetryDecorator('database', SolarVoiceConfigs.STANDARD_RETRY_POLICY, 'database');
  
  return manager;
}

/**
 * Export singleton instance for easy access
 */
export const solarVoiceResilience = createSolarVoiceResilience();

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * Example: Payment Processing with Full Resilience
 */
export async function examplePaymentProcessing() {
  const paymentRetry = solarVoiceResilience.getRetryDecorator('payment')!;
  
  const fallbackProvider = DefaultFallbackProviders.createStaticFallback({
    success: false,
    message: 'Payment temporarily unavailable, please try again later'
  });
  
  const result = await paymentRetry.execute(
    async () => {
      // Simulated payment processing
      const response = await fetch('/api/stripe/charge', {
        method: 'POST',
        body: JSON.stringify({ amount: 10000, currency: 'usd' })
      });
      
      if (!response.ok) {
        throw new Error(`Payment failed: ${response.status}`);
      }
      
      return response.json();
    },
    fallbackProvider
  );
  
  console.log('Payment Result:', result);
}

/**
 * Example: Voice AI Processing with Resilience
 */
export async function exampleVoiceProcessing() {
  const voiceRetry = solarVoiceResilience.getRetryDecorator('voice-ai')!;
  
  const fallbackProvider = DefaultFallbackProviders.createStaticFallback({
    transcript: 'Sorry, I could not process your voice request. Please try again.',
    confidence: 0
  });
  
  const result = await voiceRetry.execute(
    async () => {
      // Simulated voice processing
      const response = await fetch('/api/retell/transcribe', {
        method: 'POST',
        body: JSON.stringify({ audio: 'base64-audio-data' })
      });
      
      if (!response.ok) {
        throw new Error(`Voice processing failed: ${response.status}`);
      }
      
      return response.json();
    },
    fallbackProvider
  );
  
  console.log('Voice Processing Result:', result);
}

/**
 * Example: Database Operations with Resilience
 */
export async function exampleDatabaseOperation() {
  const databaseRetry = solarVoiceResilience.getRetryDecorator('database')!;
  const bulkhead = solarVoiceResilience.getBulkhead('standard')!;
  
  const result = await bulkhead.execute(async () => {
    return await databaseRetry.execute(async () => {
      // Simulated database operation
      const result = await performDatabaseQuery('SELECT * FROM users WHERE active = true');
      return result;
    });
  });
  
  console.log('Database Result:', result);
}

// Mock function for example
async function performDatabaseQuery(query: string): Promise<any> {
  // Simulated database query
  return new Promise((resolve) => {
    setTimeout(() => resolve({ rows: [], count: 0 }), 100);
  });
}