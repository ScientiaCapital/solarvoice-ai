/**
 * Cost Control Middleware
 *
 * Enforces credit-based billing and usage tracking for tool execution.
 * Checks user credit balance before execution and logs usage after completion.
 */

import type { ToolContext } from './types';
import { ToolMiddleware } from './types';

/**
 * Default cost per tool by tier (in credits)
 */
const DEFAULT_TIER_COSTS: Record<string, number> = {
  free: 5.0, // Free tier pays more per tool
  starter: 2.0, // Starter tier moderate cost
  pro: 1.0, // Pro tier lower cost
  enterprise: 0.5, // Enterprise tier lowest cost
};

/**
 * Configuration options for CostControlMiddleware
 */
export interface CostControlOptions {
  /**
   * Async function to check user's credit balance
   * @param userId - User ID to check
   * @returns Current credit balance
   */
  creditChecker?: (userId: string) => Promise<number>;

  /**
   * Async function to log tool usage for billing
   */
  usageLogger?: (usage: {
    toolName: string;
    userId: string;
    sessionId: string;
    tier: string;
    cost: number;
    durationMs: number;
    success: boolean;
  }) => Promise<void>;

  /**
   * Custom cost per tier (overrides defaults)
   */
  tierCosts?: Record<string, number>;
}

/**
 * Middleware for credit-based cost control.
 *
 * Checks user credit balance before tool execution and logs
 * usage for billing after execution.
 *
 * @example
 * ```typescript
 * const creditChecker = async (userId: string) => {
 *   return await db.getUserCredits(userId);
 * };
 *
 * const usageLogger = async (usage) => {
 *   await db.logToolUsage(usage);
 * };
 *
 * const middleware = new CostControlMiddleware({
 *   creditChecker,
 *   usageLogger,
 *   tierCosts: {
 *     free: 10.0,
 *     starter: 5.0,
 *     pro: 2.0,
 *     enterprise: 1.0,
 *   },
 * });
 * ```
 */
export class CostControlMiddleware extends ToolMiddleware {
  private creditChecker: ((userId: string) => Promise<number>) | undefined;
  private usageLogger: ((usage: any) => Promise<void>) | undefined;
  private tierCosts: Record<string, number>;

  constructor(options: CostControlOptions = {}) {
    super();
    this.creditChecker = options.creditChecker;
    this.usageLogger = options.usageLogger;
    this.tierCosts = options.tierCosts || DEFAULT_TIER_COSTS;
  }

  /**
   * Check if user has sufficient credits before tool execution.
   *
   * @returns [true, args] if sufficient credits
   * @returns [false, errorMessage] if insufficient credits
   */
  async beforeExecute(
    _toolName: string,
    args: any,
    context: ToolContext
  ): Promise<[boolean, any]> {
    // If no credit checker configured, allow all (useful for testing)
    if (!this.creditChecker) {
      return [true, args];
    }

    try {
      // Get user's current credit balance
      const balance = await this.creditChecker(context.userId);

      // Get cost for this tier
      const cost = this.getCostForTier(context.tier);

      if (balance < cost) {
        console.warn(
          `Insufficient credits for user ${context.userId}: balance=${balance}, required=${cost}`
        );

        return [
          false,
          `Insufficient credits. Balance: ${balance.toFixed(1)}, Required: ${cost.toFixed(1)}. Please add credits to continue.`,
        ];
      }

      console.debug(
        `Credit check passed for ${context.userId}: balance=${balance}, cost=${cost}`
      );

      return [true, args];
    } catch (error) {
      console.error('Credit check failed:', error);
      // On error, allow execution (fail open for reliability)
      return [true, args];
    }
  }

  /**
   * Log tool usage for billing after execution.
   *
   * Usage is logged even on error (attempted usage still counts).
   */
  async afterExecute(
    toolName: string,
    result: string,
    durationMs: number,
    error: Error | null,
    context: ToolContext
  ): Promise<string> {
    if (this.usageLogger) {
      try {
        const cost = this.getCostForTier(context.tier);

        await this.usageLogger({
          toolName,
          userId: context.userId,
          sessionId: context.sessionId,
          tier: context.tier,
          cost,
          durationMs,
          success: error === null,
        });
      } catch (e) {
        console.error('Failed to log tool usage:', e);
      }
    }

    return result;
  }

  /**
   * Get the cost per tool for a given tier.
   *
   * @param tier - User's subscription tier
   * @returns Cost in credits
   */
  getCostForTier(tier: string): number {
    return this.tierCosts[tier] ?? (this.tierCosts.free ?? 5.0);
  }
}
