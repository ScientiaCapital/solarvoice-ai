/**
 * Tests for RateLimitMiddleware
 *
 * Following TDD: Define expected behavior for rate limiting
 */

import { ToolContext } from '../../lib/middleware';
import { RateLimitMiddleware } from '../../lib/middleware/rate-limit';

describe('RateLimitMiddleware', () => {
  const baseContext: ToolContext = {
    toolName: 'test_tool',
    tier: 'pro',
    userId: 'user_123',
    sessionId: 'session_456',
    cumulativeLatencyMs: 0,
    metadata: {},
  };

  beforeEach(() => {
    // Clear any state between tests
    jest.clearAllMocks();
  });

  describe('beforeExecute - rate limiting', () => {
    it('should allow first request under limit', async () => {
      const middleware = new RateLimitMiddleware({
        requestsPerMinute: 10,
      });

      const [allowed, result] = await middleware.beforeExecute(
        'test_tool',
        { input: 'test' },
        baseContext
      );

      expect(allowed).toBe(true);
      expect(result).toEqual({ input: 'test' });
    });

    it('should block requests exceeding per-minute limit', async () => {
      const middleware = new RateLimitMiddleware({
        requestsPerMinute: 3,
      });

      // Make 3 requests (should all succeed)
      for (let i = 0; i < 3; i++) {
        const [allowed] = await middleware.beforeExecute(
          'test_tool',
          {},
          baseContext
        );
        expect(allowed).toBe(true);
      }

      // 4th request should be blocked
      const [allowed, result] = await middleware.beforeExecute(
        'test_tool',
        {},
        baseContext
      );

      expect(allowed).toBe(false);
      expect(result).toContain('Rate limit exceeded');
      expect(result).toContain('3/min');
    });

    it('should use tier-based limits when no global limit set', async () => {
      const middleware = new RateLimitMiddleware();

      // Free tier: 10 calls/min
      const freeContext = { ...baseContext, tier: 'free' as const };
      for (let i = 0; i < 10; i++) {
        const [allowed] = await middleware.beforeExecute('tool', {}, freeContext);
        expect(allowed).toBe(true);
      }
      const [blockedFree] = await middleware.beforeExecute('tool', {}, freeContext);
      expect(blockedFree).toBe(false);

      // Pro tier: 100 calls/min (different user)
      const proContext = { ...baseContext, tier: 'pro' as const, userId: 'user_pro' };
      for (let i = 0; i < 50; i++) {
        const [allowed] = await middleware.beforeExecute('tool', {}, proContext);
        expect(allowed).toBe(true);
      }
      // Should still be allowed (under 100)
      const [allowedPro] = await middleware.beforeExecute('tool', {}, proContext);
      expect(allowedPro).toBe(true);
    });

    it('should track limits per user independently', async () => {
      const middleware = new RateLimitMiddleware({
        requestsPerMinute: 2,
      });

      const user1Context = { ...baseContext, userId: 'user_1' };
      const user2Context = { ...baseContext, userId: 'user_2' };

      // User 1: exhaust limit
      await middleware.beforeExecute('tool', {}, user1Context);
      await middleware.beforeExecute('tool', {}, user1Context);
      const [blocked1] = await middleware.beforeExecute('tool', {}, user1Context);
      expect(blocked1).toBe(false);

      // User 2: should still be allowed
      const [allowed2] = await middleware.beforeExecute('tool', {}, user2Context);
      expect(allowed2).toBe(true);
    });

    it('should implement sliding window correctly', async () => {
      const middleware = new RateLimitMiddleware({
        requestsPerMinute: 2,
        windowSeconds: 1, // 1 second window for testing
      });

      // Make 2 requests
      await middleware.beforeExecute('tool', {}, baseContext);
      await middleware.beforeExecute('tool', {}, baseContext);

      // 3rd should be blocked
      const [blocked] = await middleware.beforeExecute('tool', {}, baseContext);
      expect(blocked).toBe(false);

      // Wait for window to expire
      await new Promise(resolve => setTimeout(resolve, 1100));

      // Should be allowed again
      const [allowed] = await middleware.beforeExecute('tool', {}, baseContext);
      expect(allowed).toBe(true);
    });

    it('should handle hourly limits when configured', async () => {
      const middleware = new RateLimitMiddleware({
        requestsPerMinute: 100, // High minute limit
        requestsPerHour: 3, // Low hour limit for testing
      });

      // Make 3 requests (should succeed)
      for (let i = 0; i < 3; i++) {
        const [allowed] = await middleware.beforeExecute('tool', {}, baseContext);
        expect(allowed).toBe(true);
      }

      // 4th should be blocked by hourly limit
      const [allowed, result] = await middleware.beforeExecute('tool', {}, baseContext);
      expect(allowed).toBe(false);
      expect(result).toContain('Hourly rate limit exceeded');
      expect(result).toContain('3/hour');
    });

    it('should provide custom tier limits', async () => {
      const customLimits = {
        free: 5,
        starter: 15,
        pro: 50,
        enterprise: 200,
      };

      const middleware = new RateLimitMiddleware({
        tierLimits: customLimits,
      });

      expect(middleware.getLimitForTier('free')).toBe(5);
      expect(middleware.getLimitForTier('starter')).toBe(15);
      expect(middleware.getLimitForTier('pro')).toBe(50);
      expect(middleware.getLimitForTier('enterprise')).toBe(200);
    });
  });

  describe('afterExecute', () => {
    it('should pass through result unchanged', async () => {
      const middleware = new RateLimitMiddleware();

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

  describe('helper methods', () => {
    it('should get correct limit for tier', () => {
      const middleware = new RateLimitMiddleware();

      expect(middleware.getLimitForTier('free')).toBe(10);
      expect(middleware.getLimitForTier('starter')).toBe(30);
      expect(middleware.getLimitForTier('pro')).toBe(100);
      expect(middleware.getLimitForTier('enterprise')).toBe(500);
    });

    it('should reset user limits', async () => {
      const middleware = new RateLimitMiddleware({
        requestsPerMinute: 2,
      });

      // Exhaust limit
      await middleware.beforeExecute('tool', {}, baseContext);
      await middleware.beforeExecute('tool', {}, baseContext);
      const [blocked] = await middleware.beforeExecute('tool', {}, baseContext);
      expect(blocked).toBe(false);

      // Reset
      await middleware.resetUser('user_123');

      // Should be allowed again
      const [allowed] = await middleware.beforeExecute('tool', {}, baseContext);
      expect(allowed).toBe(true);
    });

    it('should get remaining requests correctly', async () => {
      const middleware = new RateLimitMiddleware({
        requestsPerMinute: 5,
      });

      // Initially should have full limit (using global limit, not tier-based)
      let remaining = await middleware.getRemaining('user_123', 'pro');
      expect(remaining).toBe(5); // Should use the global requestsPerMinute setting

      // After 2 requests
      await middleware.beforeExecute('tool', {}, baseContext);
      await middleware.beforeExecute('tool', {}, baseContext);

      remaining = await middleware.getRemaining('user_123', 'pro');
      expect(remaining).toBe(3);

      // After exhausting limit
      await middleware.beforeExecute('tool', {}, baseContext);
      await middleware.beforeExecute('tool', {}, baseContext);
      await middleware.beforeExecute('tool', {}, baseContext);

      remaining = await middleware.getRemaining('user_123', 'pro');
      expect(remaining).toBe(0);
    });
  });

  describe('error messages', () => {
    it('should provide helpful error message on rate limit', async () => {
      const middleware = new RateLimitMiddleware({
        requestsPerMinute: 3,
      });

      // Exhaust limit
      for (let i = 0; i < 3; i++) {
        await middleware.beforeExecute('tool', {}, baseContext);
      }

      const [allowed, errorMessage] = await middleware.beforeExecute(
        'tool',
        {},
        baseContext
      );

      expect(allowed).toBe(false);
      expect(errorMessage).toContain('Rate limit exceeded');
      expect(errorMessage).toContain('3 requests');
      expect(errorMessage).toContain('Limit: 3/min');
      expect(errorMessage).toContain('Please wait and try again');
    });

    it('should provide helpful error message on hourly limit', async () => {
      const middleware = new RateLimitMiddleware({
        requestsPerMinute: 100,
        requestsPerHour: 5,
      });

      // Exhaust hourly limit
      for (let i = 0; i < 5; i++) {
        await middleware.beforeExecute('tool', {}, baseContext);
      }

      const [allowed, errorMessage] = await middleware.beforeExecute(
        'tool',
        {},
        baseContext
      );

      expect(allowed).toBe(false);
      expect(errorMessage).toContain('Hourly rate limit exceeded');
      expect(errorMessage).toContain('5 requests');
      expect(errorMessage).toContain('Limit: 5/hour');
    });
  });
});
