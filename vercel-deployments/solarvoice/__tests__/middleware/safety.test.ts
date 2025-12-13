/**
 * Tests for SafetyMiddleware
 *
 * Following TDD: Define expected behavior for PII detection and tier gating
 */

import { ToolContext } from '../../lib/middleware';
import { SafetyMiddleware } from '../../lib/middleware/safety';

describe('SafetyMiddleware', () => {
  const baseContext: ToolContext = {
    toolName: 'test_tool',
    tier: 'pro',
    userId: 'user_123',
    sessionId: 'session_456',
    cumulativeLatencyMs: 0,
    metadata: {},
  };

  describe('PII detection', () => {
    it('should detect email addresses', () => {
      const middleware = new SafetyMiddleware();

      const texts = [
        'Contact me at john.doe@example.com',
        'Email: jane_smith+tag@company.co.uk',
        'My address is user123@domain.io',
      ];

      texts.forEach(text => {
        const pii = middleware.detectPII(text);
        expect(pii).toContain('email');
      });
    });

    it('should detect phone numbers in various formats', () => {
      const middleware = new SafetyMiddleware();

      const texts = [
        'Call me at 555-123-4567',
        'Phone: (555) 987-6543',
        'Contact: 5551234567',
        '+1-555-123-4567',
        '+1 (555) 123-4567',
      ];

      texts.forEach(text => {
        const pii = middleware.detectPII(text);
        expect(pii).toContain('phone');
      });
    });

    it('should detect SSN', () => {
      const middleware = new SafetyMiddleware();

      const text = 'SSN: 123-45-6789';
      const pii = middleware.detectPII(text);

      expect(pii).toContain('ssn');
    });

    it('should detect credit card numbers', () => {
      const middleware = new SafetyMiddleware();

      const texts = [
        'Card: 4532 1234 5678 9010',
        'CC: 4532-1234-5678-9010',
        'Credit card: 4532123456789010',
      ];

      texts.forEach(text => {
        const pii = middleware.detectPII(text);
        expect(pii).toContain('credit_card');
      });
    });

    it('should detect multiple PII types in same text', () => {
      const middleware = new SafetyMiddleware();

      const text = 'Email me at john@example.com or call 555-123-4567';
      const pii = middleware.detectPII(text);

      expect(pii).toContain('email');
      expect(pii).toContain('phone');
      expect(pii).toHaveLength(2);
    });

    it('should return empty array when no PII detected', () => {
      const middleware = new SafetyMiddleware();

      const text = 'This is a safe message with no sensitive data';
      const pii = middleware.detectPII(text);

      expect(pii).toEqual([]);
    });
  });

  describe('PII redaction in args', () => {
    it('should not redact by default', async () => {
      const middleware = new SafetyMiddleware({ redactPII: false });

      const args = {
        message: 'Contact john@example.com or 555-123-4567',
      };

      const [allowed, result] = await middleware.beforeExecute(
        'test_tool',
        args,
        baseContext
      );

      expect(allowed).toBe(true);
      expect(result.message).toBe(args.message); // Unchanged
    });

    it('should redact PII when enabled', async () => {
      const middleware = new SafetyMiddleware({ redactPII: true });

      const args = {
        message: 'Contact john@example.com or 555-123-4567',
      };

      const [allowed, result] = await middleware.beforeExecute(
        'test_tool',
        args,
        baseContext
      );

      expect(allowed).toBe(true);
      expect(result.message).toContain('[REDACTED_EMAIL]');
      expect(result.message).toContain('[REDACTED_PHONE]');
      expect(result.message).not.toContain('john@example.com');
      expect(result.message).not.toContain('555-123-4567');
    });

    it('should redact PII in nested objects', async () => {
      const middleware = new SafetyMiddleware({ redactPII: true });

      const args = {
        user: {
          email: 'john@example.com',
          profile: {
            phone: '555-123-4567',
          },
        },
      };

      const [allowed, result] = await middleware.beforeExecute(
        'test_tool',
        args,
        baseContext
      );

      expect(result.user.email).toBe('[REDACTED_EMAIL]');
      expect(result.user.profile.phone).toBe('[REDACTED_PHONE]');
    });

    it('should redact PII in arrays', async () => {
      const middleware = new SafetyMiddleware({ redactPII: true });

      const args = {
        contacts: [
          'john@example.com',
          'Call 555-123-4567',
          'No PII here',
        ],
      };

      const [allowed, result] = await middleware.beforeExecute(
        'test_tool',
        args,
        baseContext
      );

      expect(result.contacts[0]).toBe('[REDACTED_EMAIL]');
      expect(result.contacts[1]).toContain('[REDACTED_PHONE]');
      expect(result.contacts[2]).toBe('No PII here');
    });
  });

  describe('PII redaction in results', () => {
    it('should redact PII in results when enabled', async () => {
      const middleware = new SafetyMiddleware({ redactPII: true });

      const result = await middleware.afterExecute(
        'test_tool',
        'Contact john@example.com or 555-123-4567',
        100.0,
        null,
        baseContext
      );

      expect(result).toContain('[REDACTED_EMAIL]');
      expect(result).toContain('[REDACTED_PHONE]');
      expect(result).not.toContain('john@example.com');
    });

    it('should not redact results by default', async () => {
      const middleware = new SafetyMiddleware({ redactPII: false });

      const originalResult = 'Contact john@example.com';
      const result = await middleware.afterExecute(
        'test_tool',
        originalResult,
        100.0,
        null,
        baseContext
      );

      expect(result).toBe(originalResult); // Unchanged
    });

    it('should always detect and log PII even without redaction', async () => {
      const auditLog: any[] = [];
      const middleware = new SafetyMiddleware({
        redactPII: false,
        auditLogger: (data) => auditLog.push(data),
      });

      await middleware.afterExecute(
        'test_tool',
        'Email: john@example.com, Phone: 555-123-4567',
        100.0,
        null,
        baseContext
      );

      const piiEvent = auditLog.find(e => e.event === 'pii_in_result');
      expect(piiEvent).toBeDefined();
      expect(piiEvent.pii_types).toContain('email');
      expect(piiEvent.pii_types).toContain('phone');
      expect(piiEvent.redacted).toBe(false);
    });
  });

  describe('tier-based access control', () => {
    it('should allow access when no tier requirements set', async () => {
      const middleware = new SafetyMiddleware();

      const [allowed] = await middleware.beforeExecute(
        'test_tool',
        {},
        baseContext
      );

      expect(allowed).toBe(true);
    });

    it('should allow access when user meets tier requirement', async () => {
      const middleware = new SafetyMiddleware({
        toolTierRequirements: {
          premium_tool: 'pro',
        },
      });

      const [allowed] = await middleware.beforeExecute(
        'premium_tool',
        {},
        { ...baseContext, tier: 'pro' }
      );

      expect(allowed).toBe(true);
    });

    it('should allow access when user exceeds tier requirement', async () => {
      const middleware = new SafetyMiddleware({
        toolTierRequirements: {
          premium_tool: 'starter',
        },
      });

      const [allowed] = await middleware.beforeExecute(
        'premium_tool',
        {},
        { ...baseContext, tier: 'enterprise' }
      );

      expect(allowed).toBe(true);
    });

    it('should block access when user below tier requirement', async () => {
      const middleware = new SafetyMiddleware({
        toolTierRequirements: {
          premium_tool: 'pro',
        },
      });

      const [allowed, errorMsg] = await middleware.beforeExecute(
        'premium_tool',
        {},
        { ...baseContext, tier: 'free' }
      );

      expect(allowed).toBe(false);
      expect(errorMsg).toContain('Access denied');
      expect(errorMsg).toContain('premium_tool');
      expect(errorMsg).toContain('pro');
      expect(errorMsg).toContain('free');
      expect(errorMsg).toContain('upgrade');
    });

    it('should enforce tier hierarchy correctly', async () => {
      const middleware = new SafetyMiddleware({
        toolTierRequirements: {
          basic_tool: 'free',
          standard_tool: 'starter',
          advanced_tool: 'pro',
          elite_tool: 'enterprise',
        },
      });

      const enterpriseContext = { ...baseContext, tier: 'enterprise' as const };

      // Enterprise should access all tools
      const [basic] = await middleware.beforeExecute('basic_tool', {}, enterpriseContext);
      const [standard] = await middleware.beforeExecute('standard_tool', {}, enterpriseContext);
      const [advanced] = await middleware.beforeExecute('advanced_tool', {}, enterpriseContext);
      const [elite] = await middleware.beforeExecute('elite_tool', {}, enterpriseContext);

      expect(basic).toBe(true);
      expect(standard).toBe(true);
      expect(advanced).toBe(true);
      expect(elite).toBe(true);

      // Free tier should only access basic_tool
      const freeContext = { ...baseContext, tier: 'free' as const };
      const [freeBasic] = await middleware.beforeExecute('basic_tool', {}, freeContext);
      const [freeStandard] = await middleware.beforeExecute('standard_tool', {}, freeContext);

      expect(freeBasic).toBe(true);
      expect(freeStandard).toBe(false);
    });
  });

  describe('audit logging', () => {
    it('should log tool access attempts', async () => {
      const auditLog: any[] = [];
      const middleware = new SafetyMiddleware({
        auditLogger: (data) => auditLog.push(data),
      });

      await middleware.beforeExecute(
        'test_tool',
        { key: 'value' },
        baseContext
      );

      expect(auditLog).toHaveLength(1);
      expect(auditLog[0]).toMatchObject({
        event: 'tool_access',
        tool_name: 'test_tool',
        user_id: 'user_123',
        session_id: 'session_456',
        tier: 'pro',
        args_keys: ['key'],
      });
    });

    it('should log PII detection in results', async () => {
      const auditLog: any[] = [];
      const middleware = new SafetyMiddleware({
        redactPII: true,
        auditLogger: (data) => auditLog.push(data),
      });

      await middleware.afterExecute(
        'test_tool',
        'Contact: john@example.com',
        100.0,
        null,
        baseContext
      );

      const piiEvent = auditLog.find(e => e.event === 'pii_in_result');
      expect(piiEvent).toBeDefined();
      expect(piiEvent).toMatchObject({
        event: 'pii_in_result',
        tool_name: 'test_tool',
        user_id: 'user_123',
        session_id: 'session_456',
        pii_types: ['email'],
        redacted: true,
      });
    });

    it('should not crash if audit logger throws', async () => {
      const middleware = new SafetyMiddleware({
        auditLogger: () => {
          throw new Error('Audit logger failed');
        },
      });

      // Should not throw
      await expect(
        middleware.beforeExecute('test_tool', {}, baseContext)
      ).resolves.toBeTruthy();
    });
  });

  describe('combined functionality', () => {
    it('should apply tier gating and PII redaction together', async () => {
      const middleware = new SafetyMiddleware({
        redactPII: true,
        toolTierRequirements: {
          premium_tool: 'pro',
        },
      });

      // Pro user should get redacted args
      const [allowed, result] = await middleware.beforeExecute(
        'premium_tool',
        { email: 'john@example.com' },
        { ...baseContext, tier: 'pro' }
      );

      expect(allowed).toBe(true);
      expect(result.email).toBe('[REDACTED_EMAIL]');

      // Free user should be blocked before redaction even matters
      const [blockedFree] = await middleware.beforeExecute(
        'premium_tool',
        { email: 'john@example.com' },
        { ...baseContext, tier: 'free' }
      );

      expect(blockedFree).toBe(false);
    });
  });
});
