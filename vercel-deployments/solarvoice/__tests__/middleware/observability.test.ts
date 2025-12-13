/**
 * Tests for ObservabilityMiddleware
 *
 * Following TDD: Define expected behavior for logging and metrics
 */

import { ToolContext } from '../../lib/middleware';
import { ObservabilityMiddleware } from '../../lib/middleware/observability';

describe('ObservabilityMiddleware', () => {
  const baseContext: ToolContext = {
    toolName: 'test_tool',
    tier: 'pro',
    userId: 'user_123',
    sessionId: 'session_456',
    cumulativeLatencyMs: 0,
    metadata: {},
  };

  describe('execution logging', () => {
    it('should log tool execution start', async () => {
      const logs: string[] = [];
      const logger = (msg: string) => logs.push(msg);

      const middleware = new ObservabilityMiddleware({ logger });

      await middleware.beforeExecute('test_tool', { input: 'test' }, baseContext);

      expect(logs).toHaveLength(1);
      expect(logs[0]).toContain('[START]');
      expect(logs[0]).toContain('test_tool');
      expect(logs[0]).toContain('user=user_123');
      expect(logs[0]).toContain('session=session_456');
      expect(logs[0]).toContain('tier=pro');
    });

    it('should log successful tool completion', async () => {
      const logs: string[] = [];
      const logger = (msg: string) => logs.push(msg);

      const middleware = new ObservabilityMiddleware({ logger });

      await middleware.afterExecute(
        'test_tool',
        'Success result',
        150.5,
        null,
        baseContext
      );

      expect(logs).toHaveLength(1);
      expect(logs[0]).toContain('[OK]');
      expect(logs[0]).toContain('test_tool');
      expect(logs[0]).toContain('150.5ms');
      expect(logs[0]).toContain('user=user_123');
    });

    it('should log failed tool execution', async () => {
      const logs: string[] = [];
      const logger = (msg: string) => logs.push(msg);

      const middleware = new ObservabilityMiddleware({ logger });

      const error = new Error('Tool failed');
      await middleware.afterExecute(
        'test_tool',
        '',
        100.0,
        error,
        baseContext
      );

      expect(logs).toHaveLength(1);
      expect(logs[0]).toContain('[ERROR]');
      expect(logs[0]).toContain('test_tool');
      expect(logs[0]).toContain('100.0ms');
      expect(logs[0]).toContain('error=Tool failed'); // Just the message, not "Error: " prefix
    });

    it('should always allow execution in beforeExecute', async () => {
      const middleware = new ObservabilityMiddleware();

      const [allowed, result] = await middleware.beforeExecute(
        'test_tool',
        { input: 'test' },
        baseContext
      );

      expect(allowed).toBe(true);
      expect(result).toEqual({ input: 'test' });
    });

    it('should pass through results unchanged', async () => {
      const middleware = new ObservabilityMiddleware();

      const result = await middleware.afterExecute(
        'test_tool',
        'Original result',
        100.0,
        null,
        baseContext
      );

      expect(result).toBe('Original result');
    });
  });

  describe('metrics tracking', () => {
    it('should track total execution count', async () => {
      const middleware = new ObservabilityMiddleware();

      await middleware.afterExecute('tool1', 'ok', 100, null, baseContext);
      await middleware.afterExecute('tool2', 'ok', 150, null, baseContext);
      await middleware.afterExecute('tool3', '', 200, new Error('fail'), baseContext);

      const stats = middleware.getStats();
      expect(stats.total).toBe(3);
    });

    it('should track success and failure counts', async () => {
      const middleware = new ObservabilityMiddleware();

      await middleware.afterExecute('tool1', 'ok', 100, null, baseContext);
      await middleware.afterExecute('tool2', 'ok', 150, null, baseContext);
      await middleware.afterExecute('tool3', '', 200, new Error('fail'), baseContext);
      await middleware.afterExecute('tool4', '', 250, new Error('fail'), baseContext);

      const stats = middleware.getStats();
      expect(stats.success).toBe(2);
      expect(stats.failure).toBe(2);
    });

    it('should calculate success rate correctly', async () => {
      const middleware = new ObservabilityMiddleware();

      // 3 successes, 1 failure = 75% success rate
      await middleware.afterExecute('tool1', 'ok', 100, null, baseContext);
      await middleware.afterExecute('tool2', 'ok', 150, null, baseContext);
      await middleware.afterExecute('tool3', 'ok', 200, null, baseContext);
      await middleware.afterExecute('tool4', '', 250, new Error('fail'), baseContext);

      const stats = middleware.getStats();
      expect(stats.success_rate).toBe(75);
    });

    it('should handle zero executions gracefully', () => {
      const middleware = new ObservabilityMiddleware();

      const stats = middleware.getStats();
      expect(stats.total).toBe(0);
      expect(stats.success).toBe(0);
      expect(stats.failure).toBe(0);
      expect(stats.success_rate).toBe(0);
    });
  });

  describe('latency tracking', () => {
    it('should track latency percentiles', async () => {
      const middleware = new ObservabilityMiddleware();

      // Add latencies in known order
      const latencies = [100, 150, 200, 250, 300, 350, 400, 450, 500, 1000];

      for (const latency of latencies) {
        await middleware.afterExecute('tool', 'ok', latency, null, baseContext);
      }

      const percentiles = middleware.getLatencyPercentiles();

      expect(percentiles.p50).toBeGreaterThanOrEqual(250);
      expect(percentiles.p50).toBeLessThanOrEqual(350);

      expect(percentiles.p95).toBeGreaterThanOrEqual(500);
      expect(percentiles.p99).toBeGreaterThanOrEqual(500);
    });

    it('should handle single latency value', async () => {
      const middleware = new ObservabilityMiddleware();

      await middleware.afterExecute('tool', 'ok', 100, null, baseContext);

      const percentiles = middleware.getLatencyPercentiles();
      expect(percentiles.p50).toBe(100);
      expect(percentiles.p95).toBe(100);
      expect(percentiles.p99).toBe(100);
    });

    it('should handle no latencies gracefully', () => {
      const middleware = new ObservabilityMiddleware();

      const percentiles = middleware.getLatencyPercentiles();
      expect(percentiles.p50).toBe(0);
      expect(percentiles.p95).toBe(0);
      expect(percentiles.p99).toBe(0);
    });
  });

  describe('stats reset', () => {
    it('should reset all statistics', async () => {
      const middleware = new ObservabilityMiddleware();

      // Add some stats
      await middleware.afterExecute('tool1', 'ok', 100, null, baseContext);
      await middleware.afterExecute('tool2', 'ok', 200, null, baseContext);
      await middleware.afterExecute('tool3', '', 300, new Error('fail'), baseContext);

      let stats = middleware.getStats();
      expect(stats.total).toBe(3);

      // Reset
      middleware.resetStats();

      stats = middleware.getStats();
      expect(stats.total).toBe(0);
      expect(stats.success).toBe(0);
      expect(stats.failure).toBe(0);
      expect(stats.success_rate).toBe(0);

      const percentiles = middleware.getLatencyPercentiles();
      expect(percentiles.p50).toBe(0);
    });
  });

  describe('default logger behavior', () => {
    it('should use default logger when none provided', async () => {
      // Should not throw
      const middleware = new ObservabilityMiddleware();

      await expect(
        middleware.beforeExecute('test_tool', {}, baseContext)
      ).resolves.toBeTruthy();

      await expect(
        middleware.afterExecute('test_tool', 'ok', 100, null, baseContext)
      ).resolves.toBe('ok');
    });
  });

  describe('comprehensive tracking', () => {
    it('should track multiple tools independently in stats', async () => {
      const middleware = new ObservabilityMiddleware();

      // Tool 1: 2 successes
      await middleware.afterExecute('tool1', 'ok', 100, null, baseContext);
      await middleware.afterExecute('tool1', 'ok', 150, null, baseContext);

      // Tool 2: 1 success, 1 failure
      await middleware.afterExecute('tool2', 'ok', 200, null, baseContext);
      await middleware.afterExecute('tool2', '', 250, new Error('fail'), baseContext);

      const stats = middleware.getStats();
      expect(stats.total).toBe(4);
      expect(stats.success).toBe(3);
      expect(stats.failure).toBe(1);
    });

    it('should accumulate latencies across all tools', async () => {
      const middleware = new ObservabilityMiddleware();

      await middleware.afterExecute('tool1', 'ok', 100, null, baseContext);
      await middleware.afterExecute('tool2', 'ok', 200, null, baseContext);
      await middleware.afterExecute('tool3', 'ok', 300, null, baseContext);

      const percentiles = middleware.getLatencyPercentiles();

      // Should have 3 latency values: 100, 200, 300
      expect(percentiles.p50).toBe(200); // Median
    });
  });

  describe('edge cases', () => {
    it('should handle empty result string', async () => {
      const middleware = new ObservabilityMiddleware();

      const result = await middleware.afterExecute(
        'test_tool',
        '',
        100.0,
        null,
        baseContext
      );

      expect(result).toBe('');
      const stats = middleware.getStats();
      expect(stats.success).toBe(1); // Empty result is still success if no error
    });

    it('should handle very long execution times', async () => {
      const middleware = new ObservabilityMiddleware();

      await middleware.afterExecute('slow_tool', 'ok', 99999.9, null, baseContext);

      const percentiles = middleware.getLatencyPercentiles();
      expect(percentiles.p50).toBe(99999.9);
    });

    it('should handle zero duration', async () => {
      const middleware = new ObservabilityMiddleware();

      await middleware.afterExecute('instant_tool', 'ok', 0, null, baseContext);

      const percentiles = middleware.getLatencyPercentiles();
      expect(percentiles.p50).toBe(0);
    });
  });
});
