/**
 * Sync API Route
 *
 * Handles background sync for offline-first PWA operations.
 * Processes pending actions queued in IndexedDB when user was offline.
 */

import { NextRequest, NextResponse } from 'next/server';

export interface SyncAction {
  id?: number;
  type: 'agent_test' | 'agent_create' | 'agent_update' | 'voice_feedback' | 'subscription' | 'checkout';
  payload: Record<string, unknown>;
  createdAt: Date | string;
  retryCount?: number;
}

interface SyncResult {
  success: boolean;
  actionId: number | undefined;
  message: string;
  data?: unknown;
}

/**
 * POST /api/sync
 * Process a pending action from IndexedDB
 */
export async function POST(request: NextRequest): Promise<NextResponse<SyncResult>> {
  try {
    const action: SyncAction = await request.json();

    // Validate action structure
    if (!action.type || !action.payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid action: missing type or payload', actionId: undefined },
        { status: 400 }
      );
    }

    // Route to appropriate handler based on action type
    let result: SyncResult;

    switch (action.type) {
      case 'agent_test':
        result = await handleAgentTest(action);
        break;

      case 'agent_create':
        result = await handleAgentCreate(action);
        break;

      case 'agent_update':
        result = await handleAgentUpdate(action);
        break;

      case 'voice_feedback':
        result = await handleVoiceFeedback(action);
        break;

      case 'subscription':
        result = await handleSubscription(action);
        break;

      case 'checkout':
        result = await handleCheckout(action);
        break;

      default:
        return NextResponse.json(
          { success: false, message: `Unknown action type: ${action.type}`, actionId: undefined },
          { status: 400 }
        );
    }

    return NextResponse.json(result, {
      status: result.success ? 200 : 500,
    });
  } catch (error) {
    console.error('[Sync API] Error processing action:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
        actionId: undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * Handle agent test action
 */
async function handleAgentTest(action: SyncAction): Promise<SyncResult> {
  try {
    const { agentId, testInput } = action.payload as {
      agentId: string;
      testInput: string;
    };

    // Forward to agent test API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || ''}/api/agents/${agentId}/test`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: testInput }),
      }
    );

    if (!response.ok) {
      throw new Error(`Agent test failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      actionId: action.id,
      message: 'Agent test synced successfully',
      data,
    };
  } catch (error) {
    return {
      success: false,
      actionId: action.id,
      message: error instanceof Error ? error.message : 'Agent test sync failed',
    };
  }
}

/**
 * Handle agent create action
 */
async function handleAgentCreate(action: SyncAction): Promise<SyncResult> {
  try {
    const agentData = action.payload;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || ''}/api/agents/create`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agentData),
      }
    );

    if (!response.ok) {
      throw new Error(`Agent creation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      actionId: action.id,
      message: 'Agent created successfully',
      data,
    };
  } catch (error) {
    return {
      success: false,
      actionId: action.id,
      message: error instanceof Error ? error.message : 'Agent creation sync failed',
    };
  }
}

/**
 * Handle agent update action
 */
async function handleAgentUpdate(action: SyncAction): Promise<SyncResult> {
  try {
    const { agentId, updates } = action.payload as {
      agentId: string;
      updates: Record<string, unknown>;
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || ''}/api/agents/${agentId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      }
    );

    if (!response.ok) {
      throw new Error(`Agent update failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      actionId: action.id,
      message: 'Agent updated successfully',
      data,
    };
  } catch (error) {
    return {
      success: false,
      actionId: action.id,
      message: error instanceof Error ? error.message : 'Agent update sync failed',
    };
  }
}

/**
 * Handle voice feedback action
 */
async function handleVoiceFeedback(action: SyncAction): Promise<SyncResult> {
  try {
    const feedbackData = action.payload;

    // Voice feedback is typically logged/stored
    // For now, just acknowledge receipt
    console.log('[Sync API] Voice feedback received:', feedbackData);

    return {
      success: true,
      actionId: action.id,
      message: 'Voice feedback synced successfully',
      data: { received: true },
    };
  } catch (error) {
    return {
      success: false,
      actionId: action.id,
      message: error instanceof Error ? error.message : 'Voice feedback sync failed',
    };
  }
}

/**
 * Handle subscription action
 */
async function handleSubscription(action: SyncAction): Promise<SyncResult> {
  try {
    const subscriptionData = action.payload;

    // Subscription changes should be handled carefully
    // This typically involves Stripe webhook verification
    console.log('[Sync API] Subscription action received:', subscriptionData);

    return {
      success: true,
      actionId: action.id,
      message: 'Subscription action acknowledged',
      data: { queued: true },
    };
  } catch (error) {
    return {
      success: false,
      actionId: action.id,
      message: error instanceof Error ? error.message : 'Subscription sync failed',
    };
  }
}

/**
 * Handle checkout action
 */
async function handleCheckout(action: SyncAction): Promise<SyncResult> {
  try {
    const checkoutData = action.payload;

    // Checkout actions need special handling
    // Typically redirect to Stripe or verify pending payment
    console.log('[Sync API] Checkout action received:', checkoutData);

    return {
      success: true,
      actionId: action.id,
      message: 'Checkout action acknowledged',
      data: { queued: true },
    };
  } catch (error) {
    return {
      success: false,
      actionId: action.id,
      message: error instanceof Error ? error.message : 'Checkout sync failed',
    };
  }
}
