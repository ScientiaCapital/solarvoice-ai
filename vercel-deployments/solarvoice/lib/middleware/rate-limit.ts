/**
 * Rate Limit Middleware
 *
 * Enforces per-minute rate limits for tool calls using in-memory sliding window.
 * For distributed systems, consider Redis-backed implementation.
 */

import type { ToolContext } from './types';
import { ToolMiddleware } from './types';

/**
 * Default rate limits by tier (requests per minute)
 */
const DEFAULT_TIER_LIMITS: Record<string, number> = {
  free: 10, // 10 calls/min for free tier
  starter: 30, // 30 calls/min for starter
  pro: 100, // 100 calls/min for pro
  enterprise: 500, // 500 calls/min for enterprise
};

/**
 * Configuration options for RateLimitMiddleware
 */
export interface RateLimitOptions {
  /**
   * Global limit (overrides tier-based limits)
   */
  requestsPerMinute?: number;

  /**
   * Optional hourly limit
   */
  requestsPerHour?: number;

  /**
   * Custom tier-based limits
   */
  tierLimits?: Record<string, number>;

  /**
   * Window size in seconds (default: 60 for per-minute)
   * Exposed for testing purposes
   */
  windowSeconds?: number;
}

/**
 * In-memory rate limit backend using sliding window
 */
class InMemoryBackend {
  private requestTimes: Map<string, number[]> = new Map();

  /**
   * Check if under limit and increment counter
   *
   * @returns [allowed, currentCount]
   */
  async checkAndIncrement(
    key: string,
    limit: number,
    windowSeconds: number
  ): Promise<[boolean, number]> {
    const now = Date.now() / 1000; // Convert to seconds
    const cutoff = now - windowSeconds;

    // Get existing timestamps, filter out old ones
    const times = this.requestTimes.get(key) || [];
    const validTimes = times.filter((t) => t > cutoff);

    const currentCount = validTimes.length;

    if (currentCount >= limit) {
      return [false, currentCount];
    }

    // Record this request
    validTimes.push(now);
    this.requestTimes.set(key, validTimes);

    return [true, currentCount + 1];
  }

  /**
   * Get current count for a key
   */
  async getCount(key: string, windowSeconds: number): Promise<number> {
    const now = Date.now() / 1000;
    const cutoff = now - windowSeconds;

    const times = this.requestTimes.get(key) || [];
    return times.filter((t) => t > cutoff).length;
  }

  /**
   * Reset counter for a key
   */
  async reset(key: string): Promise<void> {
    this.requestTimes.delete(key);
  }

  /**
   * Clean up old entries (optional, for memory management)
   */
  cleanup(windowSeconds: number): void {
    const now = Date.now() / 1000;
    const cutoff = now - windowSeconds;

    const keys = Array.from(this.requestTimes.keys());
    for (const key of keys) {
      const times = this.requestTimes.get(key);
      if (!times) continue;

      const validTimes = times.filter((t: number) => t > cutoff);
      if (validTimes.length === 0) {
        this.requestTimes.delete(key);
      } else {
        this.requestTimes.set(key, validTimes);
      }
    }
  }
}

/**
 * Middleware for rate limiting tool calls.
 *
 * Uses in-memory sliding window for rate limiting.
 * For distributed deployments (multiple instances), use Redis backend instead.
 *
 * @example
 * ```typescript
 * // Global limit
 * const middleware = new RateLimitMiddleware({
 *   requestsPerMinute: 50,
 * });
 *
 * // Tier-based limits
 * const middleware = new RateLimitMiddleware({
 *   tierLimits: {
 *     free: 10,
 *     starter: 50,
 *     pro: 200,
 *     enterprise: 1000,
 *   },
 * });
 *
 * // With hourly limit
 * const middleware = new RateLimitMiddleware({
 *   requestsPerMinute: 100,
 *   requestsPerHour: 1000,
 * });
 * ```
 */
export class RateLimitMiddleware extends ToolMiddleware {
  private requestsPerMinute: number | undefined;
  private requestsPerHour: number | undefined;
  private tierLimits: Record<string, number>;
  private backend: InMemoryBackend;
  private windowSeconds: number;

  constructor(options: RateLimitOptions = {}) {
    super();
    this.requestsPerMinute = options.requestsPerMinute;
    this.requestsPerHour = options.requestsPerHour;
    this.tierLimits = options.tierLimits || DEFAULT_TIER_LIMITS;
    this.backend = new InMemoryBackend();
    this.windowSeconds = options.windowSeconds ?? 60; // Default: 60 seconds
  }

  /**
   * Check if user is within rate limits.
   *
   * @returns [true, args] if under limit
   * @returns [false, errorMessage] if rate limited
   */
  async beforeExecute(
    _toolName: string,
    args: any,
    context: ToolContext
  ): Promise<[boolean, any]> {
    const userId = context.userId;

    // Get the limit for this user's tier
    const limit =
      this.requestsPerMinute !== undefined
        ? this.requestsPerMinute
        : this.getLimitForTier(context.tier);

    // Check minute limit
    const minuteKey = `${userId}:minute`;
    const [allowed, count] = await this.backend.checkAndIncrement(
      minuteKey,
      limit,
      this.windowSeconds
    );

    if (!allowed) {
      console.warn(
        `Rate limit exceeded for user ${userId}: ${count} requests in last minute, limit=${limit}`
      );

      return [
        false,
        `Rate limit exceeded. You've made ${count} requests in the last minute. Limit: ${limit}/min. Please wait and try again.`,
      ];
    }

    // Check hour limit if configured
    if (this.requestsPerHour !== undefined) {
      const hourKey = `${userId}:hour`;
      const [hourAllowed, hourCount] = await this.backend.checkAndIncrement(
        hourKey,
        this.requestsPerHour,
        3600 // 1 hour in seconds
      );

      if (!hourAllowed) {
        console.warn(
          `Hourly rate limit exceeded for user ${userId}: ${hourCount} requests in last hour, limit=${this.requestsPerHour}`
        );

        return [
          false,
          `Hourly rate limit exceeded. You've made ${hourCount} requests in the last hour. Limit: ${this.requestsPerHour}/hour.`,
        ];
      }
    }

    return [true, args];
  }

  /**
   * Pass through result unchanged
   */
  async afterExecute(
    _toolName: string,
    result: string,
    _durationMs: number,
    _error: Error | null,
    _context: ToolContext
  ): Promise<string> {
    return result;
  }

  /**
   * Get the rate limit for a given tier
   */
  getLimitForTier(tier: string): number {
    return this.tierLimits[tier] ?? (this.tierLimits.free ?? 10);
  }

  /**
   * Reset rate limit counters for a user
   */
  async resetUser(userId: string): Promise<void> {
    await this.backend.reset(`${userId}:minute`);
    await this.backend.reset(`${userId}:hour`);
  }

  /**
   * Get remaining requests for a user in the current minute
   */
  async getRemaining(userId: string, tier: string): Promise<number> {
    const count = await this.backend.getCount(`${userId}:minute`, this.windowSeconds);
    // Use global limit if set, otherwise tier-based limit
    const limit =
      this.requestsPerMinute !== undefined
        ? this.requestsPerMinute
        : this.getLimitForTier(tier);
    return Math.max(0, limit - count);
  }

  /**
   * Clean up old entries (call periodically for memory management)
   */
  cleanup(): void {
    this.backend.cleanup(Math.max(this.windowSeconds, 3600));
  }
}
