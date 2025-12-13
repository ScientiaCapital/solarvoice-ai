/**
 * Core types and base classes for middleware system
 */

/**
 * Context passed through the middleware chain for each tool invocation.
 *
 * Contains information about the current tool call, user/session context,
 * and cumulative metrics for the session.
 */
export interface ToolContext {
  /** Name of the tool being invoked */
  toolName: string;

  /** User's subscription tier */
  tier: 'free' | 'starter' | 'pro' | 'enterprise';

  /** Unique identifier for the user */
  userId: string;

  /** Unique identifier for the session */
  sessionId: string;

  /** Total latency accumulated in this session (ms) */
  cumulativeLatencyMs: number;

  /** Optional additional context (callSid, agentType, etc.) */
  metadata: Record<string, any>;
}

/**
 * Abstract base class for tool execution middleware.
 *
 * Middleware can:
 * - Block tool execution (return false from beforeExecute)
 * - Modify arguments before tool runs
 * - Log/track execution metrics
 * - Modify results after tool completes
 * - Handle errors
 *
 * Execution order:
 * - beforeExecute() runs in chain order (first → last)
 * - afterExecute() runs in reverse order (last → first)
 *
 * @example
 * ```typescript
 * class LoggingMiddleware extends ToolMiddleware {
 *   async beforeExecute(toolName, args, context) {
 *     console.log(`Starting ${toolName}`);
 *     return [true, args]; // Proceed with original args
 *   }
 *
 *   async afterExecute(toolName, result, durationMs, error, context) {
 *     console.log(`Finished ${toolName} in ${durationMs}ms`);
 *     return result; // Return unmodified result
 *   }
 * }
 * ```
 */
export abstract class ToolMiddleware {
  /**
   * Called before tool execution.
   *
   * @param toolName - Name of the tool being invoked
   * @param args - Arguments to be passed to the tool
   * @param context - Execution context with user/session info
   *
   * @returns Tuple of [shouldProceed, modifiedArgsOrError]:
   *   - [true, args]: Proceed with execution using returned args
   *   - [false, "error message"]: Block execution, return error message
   */
  abstract beforeExecute(
    toolName: string,
    args: any,
    context: ToolContext
  ): Promise<[boolean, any]>;

  /**
   * Called after tool execution (or after error).
   *
   * @param toolName - Name of the tool that was invoked
   * @param result - Result from the tool (or empty string on error)
   * @param durationMs - Execution time in milliseconds
   * @param error - Exception if tool failed, null otherwise
   * @param context - Execution context with user/session info
   *
   * @returns Potentially modified result string
   */
  abstract afterExecute(
    toolName: string,
    result: string,
    durationMs: number,
    error: Error | null,
    context: ToolContext
  ): Promise<string>;
}
