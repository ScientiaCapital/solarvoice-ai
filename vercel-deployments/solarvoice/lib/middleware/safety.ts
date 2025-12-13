/**
 * Safety Middleware
 *
 * Provides PII detection/redaction and tier-based access control.
 * Ensures compliance with privacy regulations and enforces feature gating.
 */

import type { ToolContext } from './types';
import { ToolMiddleware } from './types';

/**
 * Tier hierarchy for access control
 */
const TIER_HIERARCHY: Record<string, number> = {
  free: 0,
  starter: 1,
  pro: 2,
  enterprise: 3,
};

/**
 * PII detection patterns
 */
const PII_PATTERNS: Record<string, [RegExp, string]> = {
  email: [
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    '[REDACTED_EMAIL]',
  ],
  phone: [
    /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g,
    '[REDACTED_PHONE]',
  ],
  ssn: [/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED_SSN]'],
  credit_card: [/\b(?:\d{4}[-\s]?){3}\d{4}\b/g, '[REDACTED_CC]'],
};

/**
 * Configuration options for SafetyMiddleware
 */
export interface SafetyOptions {
  /**
   * Whether to redact detected PII (default: false)
   * When false, PII is only detected and logged
   */
  redactPII?: boolean;

  /**
   * Map of tool name to minimum required tier
   * Example: { 'premium_tool': 'pro' }
   */
  toolTierRequirements?: Record<string, string>;

  /**
   * Function for audit trail logging
   */
  auditLogger?: (event: Record<string, any>) => void;
}

/**
 * Middleware for safety and compliance.
 *
 * Provides:
 * - PII detection and redaction (email, phone, SSN, credit cards)
 * - Tier-based tool access control
 * - Audit trail logging
 *
 * @example
 * ```typescript
 * const middleware = new SafetyMiddleware({
 *   redactPII: true,
 *   toolTierRequirements: {
 *     'advanced_calculator': 'pro',
 *     'white_label_api': 'enterprise',
 *   },
 *   auditLogger: (event) => {
 *     console.log('Audit:', event);
 *   },
 * });
 * ```
 */
export class SafetyMiddleware extends ToolMiddleware {
  private redactPII: boolean;
  private toolTierRequirements: Record<string, string>;
  private auditLogger: ((event: Record<string, any>) => void) | undefined;

  constructor(options: SafetyOptions = {}) {
    super();
    this.redactPII = options.redactPII ?? false;
    this.toolTierRequirements = options.toolTierRequirements || {};
    this.auditLogger = options.auditLogger;
  }

  /**
   * Check access control and optionally redact PII.
   *
   * @returns [true, possiblyModifiedArgs] if allowed
   * @returns [false, errorMessage] if access denied
   */
  async beforeExecute(
    toolName: string,
    args: any,
    context: ToolContext
  ): Promise<[boolean, any]> {
    // Log audit trail
    if (this.auditLogger) {
      try {
        this.auditLogger({
          event: 'tool_access',
          tool_name: toolName,
          user_id: context.userId,
          session_id: context.sessionId,
          tier: context.tier,
          args_keys: Object.keys(args),
        });
      } catch (error) {
        // Audit logging should never block execution
        console.error('Audit logger failed:', error);
      }
    }

    // Check tier-based access
    if (!this.checkTierAccess(toolName, context.tier)) {
      const requiredTier = this.toolTierRequirements[toolName] || 'unknown';

      console.warn(
        `Access denied for ${toolName}: user tier=${context.tier}, required=${requiredTier}`
      );

      return [
        false,
        `Access denied. Tool '${toolName}' requires ${requiredTier} tier or higher. Your current tier: ${context.tier}. Please upgrade to access this feature.`,
      ];
    }

    // Redact PII if enabled
    if (this.redactPII) {
      args = this.redactPIIInArgs(args);
    }

    return [true, args];
  }

  /**
   * Redact PII in results and log warnings for PII exposure.
   *
   * Always checks for PII in results. If found:
   * - Logs a warning (for audit/compliance)
   * - Redacts if redactPII=true
   */
  async afterExecute(
    toolName: string,
    result: string,
    _durationMs: number,
    _error: Error | null,
    context: ToolContext
  ): Promise<string> {
    if (!result) {
      return result;
    }

    // Always detect PII in results for audit purposes
    const piiFound = this.detectPII(result);

    if (piiFound.length > 0) {
      console.warn(
        `PII detected in tool result: tool=${toolName}, pii_types=${piiFound.join(',')}, user=${context.userId}, session=${context.sessionId}`
      );

      // Log to audit trail if configured
      if (this.auditLogger) {
        try {
          this.auditLogger({
            event: 'pii_in_result',
            tool_name: toolName,
            pii_types: piiFound,
            user_id: context.userId,
            session_id: context.sessionId,
            redacted: this.redactPII,
          });
        } catch (error) {
          console.error('Audit logger failed:', error);
        }
      }
    }

    // Redact if enabled
    if (this.redactPII) {
      result = this.redactPIIInString(result);
    }

    return result;
  }

  /**
   * Check if user's tier can access the tool
   */
  private checkTierAccess(toolName: string, userTier: string): boolean {
    const requiredTier = this.toolTierRequirements[toolName];

    if (!requiredTier) {
      // No restriction on this tool
      return true;
    }

    const userLevel = TIER_HIERARCHY[userTier] ?? 0;
    const requiredLevel = TIER_HIERARCHY[requiredTier] ?? 0;

    return userLevel >= requiredLevel;
  }

  /**
   * Recursively redact PII in argument values
   */
  private redactPIIInArgs(args: any): any {
    if (typeof args === 'string') {
      return this.redactPIIInString(args);
    }

    if (Array.isArray(args)) {
      return args.map((item) =>
        typeof item === 'string' ? this.redactPIIInString(item) : item
      );
    }

    if (typeof args === 'object' && args !== null) {
      const redacted: Record<string, any> = {};
      for (const [key, value] of Object.entries(args)) {
        if (typeof value === 'string') {
          redacted[key] = this.redactPIIInString(value);
        } else if (typeof value === 'object') {
          redacted[key] = this.redactPIIInArgs(value);
        } else {
          redacted[key] = value;
        }
      }
      return redacted;
    }

    return args;
  }

  /**
   * Redact all PII patterns in a string
   */
  private redactPIIInString(text: string): string {
    let redacted = text;

    for (const [, [pattern, replacement]] of Object.entries(PII_PATTERNS)) {
      redacted = redacted.replace(pattern, replacement);
    }

    return redacted;
  }

  /**
   * Detect PII types in text (without redacting).
   *
   * @returns List of PII type names found
   */
  detectPII(text: string): string[] {
    const found: string[] = [];

    for (const [name, [pattern]] of Object.entries(PII_PATTERNS)) {
      if (pattern.test(text)) {
        found.push(name);
        // Reset regex lastIndex after test (global flag issue)
        pattern.lastIndex = 0;
      }
    }

    return found;
  }
}
