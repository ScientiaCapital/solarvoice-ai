/**
 * Tests for CostControlMiddleware
 *
 * Following TDD: Define expected behavior for credit-based cost control
 */

import { ToolContext } from '../../lib/middleware';
import { CostControlMiddleware } from '../../lib/middleware/cost';

describe('CostControlMiddleware', () => {
  const baseContext: ToolContext = {
    toolName: 'test_tool',
    tier: 'pro',
    userId: 'user_123',
    sessionId: 'session_456',
    cumulativeLatencyMs: 0,
    metadata: {},
  };

  describe('beforeExecute - credit checking', () => {
    it('should allow execution when no credit checker configured', async () => {
      const middleware = new CostControlMiddleware();
      const [allowed, result] = await middleware.beforeExecute(
        'test_tool',
        { input: 'test' },
        baseContext
      );

      expect(allowed).toBe(true);
      expect(result).toEqual({ input: 'test' });
    });

    it('should allow execution when user has sufficient credits', async () => {
      const creditChecker = async (userId: string) => 100.0; // Plenty of credits
      const middleware = new CostControlMiddleware({ creditChecker });

      const [allowed, result] = await middleware.beforeExecute(
        'test_tool',
        { input: 'test' },
        baseContext
      );

      expect(allowed).toBe(true);
      expect(result).toEqual({ input: 'test' });
    });

    it('should block execution when user has insufficient credits', async () => {
      const creditChecker = async (userId: string) => 0.5; // Not enough for pro tier (cost: 1.0)
      const middleware = new CostControlMiddleware({ creditChecker });

      const [allowed, result] = await middleware.beforeExecute(
        'test_tool',
        { input: 'test' },
        baseContext
      );

      expect(allowed).toBe(false);
      expect(result).toContain('Insufficient credits');
      expect(result).toContain('0.5'); // Current balance
      expect(result).toContain('1.0'); // Required amount
    });

    it('should use correct cost for each tier', async () => {
      const creditChecker = async (userId: string) => 2.5;

      const middleware = new CostControlMiddleware({ creditChecker });

      // Free tier: cost 5.0 - should fail
      const [allowedFree] = await middleware.beforeExecute(
        'test_tool',
        {},
        { ...baseContext, tier: 'free' }
      );
      expect(allowedFree).toBe(false);

      // Starter tier: cost 2.0 - should succeed
      const [allowedStarter] = await middleware.beforeExecute(
        'test_tool',
        {},
        { ...baseContext, tier: 'starter' }
      );
      expect(allowedStarter).toBe(true);

      // Pro tier: cost 1.0 - should succeed
      const [allowedPro] = await middleware.beforeExecute(
        'test_tool',
        {},
        { ...baseContext, tier: 'pro' }
      );
      expect(allowedPro).toBe(true);

      // Enterprise tier: cost 0.5 - should succeed
      const [allowedEnterprise] = await middleware.beforeExecute(
        'test_tool',
        {},
        { ...baseContext, tier: 'enterprise' }
      );
      expect(allowedEnterprise).toBe(true);
    });

    it('should handle custom tier costs', async () => {
      const creditChecker = async (userId: string) => 3.0;
      const customCosts = {
        free: 10.0,
        starter: 5.0,
        pro: 2.5,
        enterprise: 1.0,
      };

      const middleware = new CostControlMiddleware({
        creditChecker,
        tierCosts: customCosts,
      });

      // Should fail with custom pro cost of 2.5 but balance of 3.0 succeeds
      const [allowed] = await middleware.beforeExecute(
        'test_tool',
        {},
        { ...baseContext, tier: 'pro' }
      );
      expect(allowed).toBe(true);

      // Should fail with custom starter cost of 5.0
      const [allowedStarter] = await middleware.beforeExecute(
        'test_tool',
        {},
        { ...baseContext, tier: 'starter' }
      );
      expect(allowedStarter).toBe(false);
    });

    it('should fail open on credit checker error', async () => {
      const creditChecker = async (userId: string) => {
        throw new Error('Database connection failed');
      };

      const middleware = new CostControlMiddleware({ creditChecker });

      const [allowed, result] = await middleware.beforeExecute(
        'test_tool',
        { input: 'test' },
        baseContext
      );

      // Should allow execution on error (fail open for reliability)
      expect(allowed).toBe(true);
      expect(result).toEqual({ input: 'test' });
    });

    it('should call credit checker with correct user ID', async () => {
      let receivedUserId: string | null = null;
      const creditChecker = async (userId: string) => {
        receivedUserId = userId;
        return 100.0;
      };

      const middleware = new CostControlMiddleware({ creditChecker });

      await middleware.beforeExecute('test_tool', {}, baseContext);

      expect(receivedUserId).toBe('user_123');
    });
  });

  describe('afterExecute - usage logging', () => {
    it('should log usage after successful execution', async () => {
      const loggedUsage: any[] = [];
      const usageLogger = async (data: any) => {
        loggedUsage.push(data);
      };

      const middleware = new CostControlMiddleware({ usageLogger });

      await middleware.afterExecute(
        'test_tool',
        'Success result',
        150.5, // duration_ms
        null, // no error
        baseContext
      );

      expect(loggedUsage).toHaveLength(1);
      expect(loggedUsage[0]).toMatchObject({
        toolName: 'test_tool',
        userId: 'user_123',
        sessionId: 'session_456',
        tier: 'pro',
        cost: 1.0, // Pro tier default cost
        durationMs: 150.5,
        success: true,
      });
    });

    it('should log usage after failed execution', async () => {
      const loggedUsage: any[] = [];
      const usageLogger = async (data: any) => {
        loggedUsage.push(data);
      };

      const middleware = new CostControlMiddleware({ usageLogger });

      await middleware.afterExecute(
        'test_tool',
        '',
        100.0,
        new Error('Tool failed'),
        baseContext
      );

      expect(loggedUsage).toHaveLength(1);
      expect(loggedUsage[0].success).toBe(false);
    });

    it('should not fail execution if usage logger throws', async () => {
      const usageLogger = async (data: any) => {
        throw new Error('Logger failed');
      };

      const middleware = new CostControlMiddleware({ usageLogger });

      const result = await middleware.afterExecute(
        'test_tool',
        'Original result',
        100.0,
        null,
        baseContext
      );

      // Should return original result despite logger error
      expect(result).toBe('Original result');
    });

    it('should pass through result unchanged', async () => {
      const middleware = new CostControlMiddleware();

      const result = await middleware.afterExecute(
        'test_tool',
        'Test result',
        100.0,
        null,
        baseContext
      );

      expect(result).toBe('Test result');
    });
  });

  describe('getCostForTier', () => {
    it('should return correct default costs', () => {
      const middleware = new CostControlMiddleware();

      expect(middleware.getCostForTier('free')).toBe(5.0);
      expect(middleware.getCostForTier('starter')).toBe(2.0);
      expect(middleware.getCostForTier('pro')).toBe(1.0);
      expect(middleware.getCostForTier('enterprise')).toBe(0.5);
    });

    it('should return custom costs when provided', () => {
      const customCosts = {
        free: 10.0,
        starter: 7.5,
        pro: 3.0,
        enterprise: 1.0,
      };

      const middleware = new CostControlMiddleware({ tierCosts: customCosts });

      expect(middleware.getCostForTier('free')).toBe(10.0);
      expect(middleware.getCostForTier('starter')).toBe(7.5);
      expect(middleware.getCostForTier('pro')).toBe(3.0);
      expect(middleware.getCostForTier('enterprise')).toBe(1.0);
    });

    it('should return free tier cost for unknown tiers', () => {
      const middleware = new CostControlMiddleware();

      expect(middleware.getCostForTier('unknown' as any)).toBe(5.0);
    });
  });
});
