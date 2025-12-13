/**
 * Tests for core middleware types and ToolExecutor
 *
 * Following TDD: These tests define the expected behavior before implementation
 */

import { ToolContext, ToolMiddleware, ToolExecutor } from '../../lib/middleware';

describe('ToolContext', () => {
  it('should create a valid context with all required fields', () => {
    const context: ToolContext = {
      toolName: 'test_tool',
      tier: 'pro',
      userId: 'user_123',
      sessionId: 'session_456',
      cumulativeLatencyMs: 0,
      metadata: { callSid: 'call_789' },
    };

    expect(context.toolName).toBe('test_tool');
    expect(context.tier).toBe('pro');
    expect(context.userId).toBe('user_123');
    expect(context.sessionId).toBe('session_456');
    expect(context.cumulativeLatencyMs).toBe(0);
    expect(context.metadata.callSid).toBe('call_789');
  });

  it('should support all tier types', () => {
    const tiers: Array<ToolContext['tier']> = ['free', 'starter', 'pro', 'enterprise'];

    tiers.forEach(tier => {
      const context: ToolContext = {
        toolName: 'test',
        tier,
        userId: 'user',
        sessionId: 'session',
        cumulativeLatencyMs: 0,
        metadata: {},
      };
      expect(context.tier).toBe(tier);
    });
  });
});

describe('ToolExecutor', () => {
  // Mock middleware for testing
  class PassThroughMiddleware extends ToolMiddleware {
    async beforeExecute(
      toolName: string,
      args: any,
      ctx: ToolContext
    ): Promise<[boolean, any]> {
      return [true, args];
    }

    async afterExecute(
      toolName: string,
      result: string,
      durationMs: number,
      error: Error | null,
      ctx: ToolContext
    ): Promise<string> {
      return result;
    }
  }

  class BlockingMiddleware extends ToolMiddleware {
    async beforeExecute(): Promise<[boolean, any]> {
      return [false, 'Blocked by middleware'];
    }

    async afterExecute(
      toolName: string,
      result: string
    ): Promise<string> {
      return result;
    }
  }

  class ModifyArgsMiddleware extends ToolMiddleware {
    async beforeExecute(
      toolName: string,
      args: any
    ): Promise<[boolean, any]> {
      return [true, { ...args, modified: true }];
    }

    async afterExecute(
      toolName: string,
      result: string
    ): Promise<string> {
      return result;
    }
  }

  const mockRegistry = {
    test_tool: async ({ input }: { input: string }) => `Result: ${input}`,
    sync_tool: ({ input }: { input: string }) => `Sync: ${input}`,
    error_tool: async () => { throw new Error('Tool error'); },
  };

  const baseContext: ToolContext = {
    toolName: 'test_tool',
    tier: 'pro',
    userId: 'user_123',
    sessionId: 'session_456',
    cumulativeLatencyMs: 0,
    metadata: {},
  };

  describe('execute', () => {
    it('should execute tool with no middleware', async () => {
      const executor = new ToolExecutor([]);
      const result = await executor.execute(
        'test_tool',
        { input: 'hello' },
        mockRegistry,
        baseContext
      );

      expect(result).toBe('Result: hello');
    });

    it('should execute tool through pass-through middleware', async () => {
      const executor = new ToolExecutor([new PassThroughMiddleware()]);
      const result = await executor.execute(
        'test_tool',
        { input: 'world' },
        mockRegistry,
        baseContext
      );

      expect(result).toBe('Result: world');
    });

    it('should block execution when middleware returns false', async () => {
      const executor = new ToolExecutor([new BlockingMiddleware()]);
      const result = await executor.execute(
        'test_tool',
        { input: 'blocked' },
        mockRegistry,
        baseContext
      );

      expect(result).toBe('Blocked by middleware');
    });

    it('should modify args in middleware chain', async () => {
      const executor = new ToolExecutor([new ModifyArgsMiddleware()]);

      // Create a tool that checks for modified flag
      const registry = {
        check_tool: async ({ modified }: { modified?: boolean }) =>
          modified ? 'Modified!' : 'Original',
      };

      const result = await executor.execute(
        'check_tool',
        {},
        registry,
        baseContext
      );

      expect(result).toBe('Modified!');
    });

    it('should execute middleware chain in correct order', async () => {
      const executionOrder: string[] = [];

      class FirstMiddleware extends ToolMiddleware {
        async beforeExecute(toolName: string, args: any): Promise<[boolean, any]> {
          executionOrder.push('first-before');
          return [true, args];
        }
        async afterExecute(toolName: string, result: string): Promise<string> {
          executionOrder.push('first-after');
          return result;
        }
      }

      class SecondMiddleware extends ToolMiddleware {
        async beforeExecute(toolName: string, args: any): Promise<[boolean, any]> {
          executionOrder.push('second-before');
          return [true, args];
        }
        async afterExecute(toolName: string, result: string): Promise<string> {
          executionOrder.push('second-after');
          return result;
        }
      }

      const executor = new ToolExecutor([
        new FirstMiddleware(),
        new SecondMiddleware(),
      ]);

      await executor.execute('test_tool', { input: 'test' }, mockRegistry, baseContext);

      expect(executionOrder).toEqual([
        'first-before',
        'second-before',
        'second-after',  // Reverse order for after
        'first-after',
      ]);
    });

    it('should handle tool errors gracefully', async () => {
      const executor = new ToolExecutor([new PassThroughMiddleware()]);
      const result = await executor.execute(
        'error_tool',
        {},
        mockRegistry,
        baseContext
      );

      // Should return empty string on error
      expect(result).toBe('');
    });

    it('should update cumulative latency in context', async () => {
      const executor = new ToolExecutor([]);
      const context = { ...baseContext };

      await executor.execute('test_tool', { input: 'test' }, mockRegistry, context);

      expect(context.cumulativeLatencyMs).toBeGreaterThan(0);
    });

    it('should handle missing tool in registry', async () => {
      const executor = new ToolExecutor([]);
      const result = await executor.execute(
        'nonexistent_tool',
        {},
        mockRegistry,
        baseContext
      );

      expect(result).toBe('');
    });

    it('should work with synchronous tools', async () => {
      const executor = new ToolExecutor([]);
      const result = await executor.execute(
        'sync_tool',
        { input: 'sync' },
        mockRegistry,
        baseContext
      );

      expect(result).toBe('Sync: sync');
    });
  });

  describe('executeParallel', () => {
    it('should execute multiple tools in parallel', async () => {
      const executor = new ToolExecutor([]);
      const results = await executor.executeParallel(
        [
          { name: 'test_tool', args: { input: 'first' } },
          { name: 'test_tool', args: { input: 'second' } },
          { name: 'sync_tool', args: { input: 'third' } },
        ],
        mockRegistry,
        baseContext
      );

      expect(results).toHaveLength(3);
      expect(results[0]).toBe('Result: first');
      expect(results[1]).toBe('Result: second');
      expect(results[2]).toBe('Sync: third');
    });

    it('should handle errors in parallel execution', async () => {
      const executor = new ToolExecutor([]);
      const results = await executor.executeParallel(
        [
          { name: 'test_tool', args: { input: 'ok' } },
          { name: 'error_tool', args: {} },
          { name: 'test_tool', args: { input: 'also_ok' } },
        ],
        mockRegistry,
        baseContext
      );

      expect(results).toHaveLength(3);
      expect(results[0]).toBe('Result: ok');
      expect(results[1]).toBe(''); // Error returns empty
      expect(results[2]).toBe('Result: also_ok');
    });

    it('should apply middleware to each parallel tool', async () => {
      let beforeCount = 0;
      let afterCount = 0;

      class CountingMiddleware extends ToolMiddleware {
        async beforeExecute(toolName: string, args: any): Promise<[boolean, any]> {
          beforeCount++;
          return [true, args];
        }
        async afterExecute(toolName: string, result: string): Promise<string> {
          afterCount++;
          return result;
        }
      }

      const executor = new ToolExecutor([new CountingMiddleware()]);
      await executor.executeParallel(
        [
          { name: 'test_tool', args: { input: '1' } },
          { name: 'test_tool', args: { input: '2' } },
          { name: 'test_tool', args: { input: '3' } },
        ],
        mockRegistry,
        baseContext
      );

      expect(beforeCount).toBe(3);
      expect(afterCount).toBe(3);
    });

    it('should preserve order of results', async () => {
      // Create tools with different execution times
      const registry = {
        fast: async () => 'fast',
        slow: async () => {
          await new Promise(resolve => setTimeout(resolve, 50));
          return 'slow';
        },
        medium: async () => {
          await new Promise(resolve => setTimeout(resolve, 25));
          return 'medium';
        },
      };

      const executor = new ToolExecutor([]);
      const results = await executor.executeParallel(
        [
          { name: 'slow', args: {} },
          { name: 'fast', args: {} },
          { name: 'medium', args: {} },
        ],
        registry,
        baseContext
      );

      // Results should be in same order as requests, not completion order
      expect(results).toEqual(['slow', 'fast', 'medium']);
    });
  });
});
