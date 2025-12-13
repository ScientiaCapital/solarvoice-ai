/**
 * Middleware system for tool calling in SolarVoice AI
 *
 * Provides composable middleware for:
 * - Cost control and budget enforcement (CostControlMiddleware)
 * - Rate limiting (RateLimitMiddleware)
 * - Safety: PII detection, tier gating (SafetyMiddleware)
 * - Observability: logging, metrics (ObservabilityMiddleware)
 *
 * Architecture:
 *   Request → CostControl → RateLimit → Safety → [Tool] → Observability → Response
 *
 * Middleware chain executes beforeExecute() in order,
 * then afterExecute() in reverse order (like onion layers).
 *
 * @example
 * ```typescript
 * import { ToolExecutor, CostControlMiddleware, ObservabilityMiddleware } from './middleware';
 *
 * const executor = new ToolExecutor([
 *   new CostControlMiddleware({ creditChecker }),
 *   new RateLimitMiddleware({ requestsPerMinute: 100 }),
 *   new SafetyMiddleware({ redactPII: true }),
 *   new ObservabilityMiddleware(),
 * ]);
 *
 * const result = await executor.execute(
 *   'solar_calculator',
 *   { zipCode: '90210' },
 *   toolRegistry,
 *   context
 * );
 * ```
 */

// Import and re-export core types
import type { ToolContext } from './types';
import { ToolMiddleware } from './types';

export type { ToolContext };
export { ToolMiddleware };

/**
 * Executes tools through a middleware chain.
 *
 * Provides both single and parallel tool execution with full
 * middleware support for each invocation.
 *
 * @example
 * ```typescript
 * const executor = new ToolExecutor([
 *   new CostControlMiddleware(),
 *   new ObservabilityMiddleware(),
 * ]);
 *
 * // Single execution
 * const result = await executor.execute(
 *   'solar_calculator',
 *   { zipCode: '90210' },
 *   toolRegistry,
 *   context
 * );
 *
 * // Parallel execution
 * const results = await executor.executeParallel(
 *   [
 *     { name: 'weather_api', args: { location: 'LA' } },
 *     { name: 'utility_rates', args: { zipCode: '90210' } },
 *   ],
 *   toolRegistry,
 *   context
 * );
 * ```
 */
export class ToolExecutor {
  private middlewareChain: ToolMiddleware[];

  /**
   * Initialize executor with middleware chain.
   *
   * @param middlewareChain - Ordered list of middleware to apply
   */
  constructor(middlewareChain: ToolMiddleware[]) {
    this.middlewareChain = middlewareChain;
  }

  /**
   * Execute a single tool through the middleware chain.
   *
   * @param toolName - Name of the tool to execute
   * @param args - Arguments to pass to the tool
   * @param registry - Dictionary mapping tool names to callables
   * @param context - Execution context
   *
   * @returns Tool result (potentially modified by middleware)
   */
  async execute(
    toolName: string,
    args: Record<string, any>,
    registry: Record<string, Function>,
    context: ToolContext
  ): Promise<string> {
    let currentArgs = { ...args };

    // Run beforeExecute in chain order
    for (const middleware of this.middlewareChain) {
      const [shouldProceed, resultOrArgs] = await middleware.beforeExecute(
        toolName,
        currentArgs,
        context
      );

      if (!shouldProceed) {
        // Middleware blocked execution - return error message
        return resultOrArgs;
      }

      currentArgs = resultOrArgs;
    }

    // Execute the tool
    const startTime = performance.now();
    let error: Error | null = null;
    let result = '';

    try {
      const tool = registry[toolName];

      if (!tool) {
        throw new Error(`Tool '${toolName}' not found in registry`);
      }

      // Call tool with args (handle both sync and async)
      const toolResult = tool(currentArgs);
      if (toolResult instanceof Promise) {
        result = await toolResult;
      } else {
        result = toolResult;
      }
    } catch (e) {
      error = e instanceof Error ? e : new Error(String(e));
      result = '';
      console.error(`Tool '${toolName}' failed:`, error);
    }

    // Calculate duration
    const durationMs = performance.now() - startTime;

    // Update cumulative latency in context
    context.cumulativeLatencyMs += durationMs;

    // Run afterExecute in reverse order
    for (const middleware of [...this.middlewareChain].reverse()) {
      result = await middleware.afterExecute(
        toolName,
        result,
        durationMs,
        error,
        context
      );
    }

    return result;
  }

  /**
   * Execute multiple tools in parallel.
   *
   * Each tool runs through the full middleware chain independently.
   * Results are returned in the same order as toolCalls.
   *
   * @param toolCalls - List of {name: string, args: object} objects
   * @param registry - Dictionary mapping tool names to callables
   * @param context - Execution context (shared, but latency tracked per-tool)
   *
   * @returns List of results in same order as toolCalls
   */
  async executeParallel(
    toolCalls: Array<{ name: string; args?: Record<string, any> }>,
    registry: Record<string, Function>,
    context: ToolContext
  ): Promise<string[]> {
    /**
     * Execute a single tool call with error handling.
     */
    const executeSingle = async (
      call: { name: string; args?: Record<string, any> }
    ): Promise<string> => {
      try {
        // Create a copy of context for this tool
        const toolContext: ToolContext = {
          toolName: call.name,
          tier: context.tier,
          userId: context.userId,
          sessionId: context.sessionId,
          cumulativeLatencyMs: context.cumulativeLatencyMs,
          metadata: { ...context.metadata },
        };

        return await this.execute(
          call.name,
          call.args || {},
          registry,
          toolContext
        );
      } catch (e) {
        console.error(`Parallel tool '${call.name}' failed:`, e);
        return `Error: ${e instanceof Error ? e.message : String(e)}`;
      }
    };

    // Execute all tools concurrently
    const tasks = toolCalls.map(executeSingle);
    const results = await Promise.all(tasks);

    return results;
  }
}

// Re-export middleware classes and their options
export { CostControlMiddleware } from './cost';
export { RateLimitMiddleware } from './rate-limit';
export { SafetyMiddleware } from './safety';
export { ObservabilityMiddleware } from './observability';

export type { CostControlOptions } from './cost';
export type { RateLimitOptions } from './rate-limit';
export type { SafetyOptions } from './safety';
export type { ObservabilityOptions } from './observability';
