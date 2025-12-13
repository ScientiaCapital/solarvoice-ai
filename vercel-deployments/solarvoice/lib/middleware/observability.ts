/**
 * Observability Middleware
 *
 * Provides logging, metrics tracking, and performance monitoring for tool execution.
 * Tracks execution statistics, latency percentiles, and success rates.
 */

import type { ToolContext } from './types';
import { ToolMiddleware } from './types';

/**
 * Statistics for tool executions
 */
interface ExecutionStats {
  total: number;
  success: number;
  failure: number;
  latencies: number[];
}

/**
 * Configuration options for ObservabilityMiddleware
 */
export interface ObservabilityOptions {
  /**
   * Custom logger function (defaults to console.log)
   */
  logger?: (message: string) => void;
}

/**
 * Middleware for observability and analytics.
 *
 * Provides:
 * - Execution logging (start/end)
 * - Latency tracking
 * - Success/failure metrics
 * - Percentile calculations (p50, p95, p99)
 *
 * @example
 * ```typescript
 * const middleware = new ObservabilityMiddleware({
 *   logger: (msg) => console.log(`[OBSERVABILITY] ${msg}`),
 * });
 *
 * // After some executions
 * const stats = middleware.getStats();
 * console.log(`Success rate: ${stats.success_rate}%`);
 *
 * const percentiles = middleware.getLatencyPercentiles();
 * console.log(`p50: ${percentiles.p50}ms, p95: ${percentiles.p95}ms`);
 * ```
 */
export class ObservabilityMiddleware extends ToolMiddleware {
  private logger: (message: string) => void;
  private stats: ExecutionStats;

  constructor(options: ObservabilityOptions = {}) {
    super();
    this.logger = options.logger || ((msg) => console.log(msg));
    this.stats = {
      total: 0,
      success: 0,
      failure: 0,
      latencies: [],
    };
  }

  /**
   * Log tool execution start.
   *
   * Records start time for latency calculation.
   */
  async beforeExecute(
    toolName: string,
    args: any,
    context: ToolContext
  ): Promise<[boolean, any]> {
    this.logger(
      `[START] ${toolName} | user=${context.userId} | session=${context.sessionId} | tier=${context.tier}`
    );

    return [true, args];
  }

  /**
   * Log tool execution completion and record metrics.
   */
  async afterExecute(
    toolName: string,
    result: string,
    durationMs: number,
    error: Error | null,
    context: ToolContext
  ): Promise<string> {
    // Update stats
    this.stats.total += 1;

    if (error === null) {
      this.stats.success += 1;
    } else {
      this.stats.failure += 1;
    }

    this.stats.latencies.push(durationMs);

    // Log completion
    const status = error ? 'ERROR' : 'OK';
    const errorMsg = error ? ` | error=${error.message}` : '';

    this.logger(
      `[${status}] ${toolName} | ${durationMs.toFixed(1)}ms | user=${context.userId} | session=${context.sessionId}${errorMsg}`
    );

    return result;
  }

  /**
   * Get execution statistics
   */
  getStats(): {
    total: number;
    success: number;
    failure: number;
    success_rate: number;
  } {
    return {
      total: this.stats.total,
      success: this.stats.success,
      failure: this.stats.failure,
      success_rate:
        this.stats.total > 0
          ? (this.stats.success / this.stats.total) * 100
          : 0,
    };
  }

  /**
   * Get latency percentiles (p50, p95, p99)
   */
  getLatencyPercentiles(): {
    p50: number;
    p95: number;
    p99: number;
  } {
    if (this.stats.latencies.length === 0) {
      return { p50: 0, p95: 0, p99: 0 };
    }

    const sorted = [...this.stats.latencies].sort((a, b) => a - b);
    const n = sorted.length;

    return {
      p50: sorted[Math.floor(n * 0.5)] ?? 0,
      p95: sorted[Math.min(Math.floor(n * 0.95), n - 1)] ?? 0,
      p99: sorted[Math.min(Math.floor(n * 0.99), n - 1)] ?? 0,
    };
  }

  /**
   * Reset all statistics (useful for testing)
   */
  resetStats(): void {
    this.stats = {
      total: 0,
      success: 0,
      failure: 0,
      latencies: [],
    };
  }
}
