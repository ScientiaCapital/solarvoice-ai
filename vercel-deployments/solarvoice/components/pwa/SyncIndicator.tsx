'use client';

import { useEffect, useState, useCallback } from 'react';
import { Cloud, CloudOff, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SyncStatus = 'synced' | 'syncing' | 'pending' | 'offline' | 'error';

interface SyncIndicatorProps {
  /** Current sync status */
  status?: SyncStatus;
  /** Number of pending items to sync */
  pendingCount?: number;
  /** Last sync timestamp */
  lastSyncedAt?: Date | null;
  /** Callback when user clicks to retry sync */
  onRetrySync?: () => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show detailed text */
  showDetails?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * SyncIndicator Component
 * Displays current sync status for offline-first PWA functionality
 */
export function SyncIndicator({
  status = 'synced',
  pendingCount = 0,
  lastSyncedAt,
  onRetrySync,
  size = 'md',
  showDetails = true,
  className,
}: SyncIndicatorProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Override status to offline if browser is offline
  const effectiveStatus = !isOnline ? 'offline' : status;

  const sizeClasses = {
    sm: 'text-xs gap-1',
    md: 'text-sm gap-1.5',
    lg: 'text-base gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const statusConfig: Record<SyncStatus, {
    icon: React.ElementType;
    label: string;
    color: string;
    bgColor: string;
    animate?: boolean;
  }> = {
    synced: {
      icon: Check,
      label: 'Synced',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    syncing: {
      icon: RefreshCw,
      label: 'Syncing...',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      animate: true,
    },
    pending: {
      icon: Cloud,
      label: `${pendingCount} pending`,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    offline: {
      icon: CloudOff,
      label: 'Offline',
      color: 'text-gray-500',
      bgColor: 'bg-gray-100',
    },
    error: {
      icon: AlertCircle,
      label: 'Sync failed',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  };

  const config = statusConfig[effectiveStatus];
  const Icon = config.icon;

  const formatLastSynced = (date: Date | null | undefined): string => {
    if (!date) return '';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1',
        sizeClasses[size],
        config.bgColor,
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={`Sync status: ${config.label}`}
    >
      <Icon
        className={cn(
          iconSizes[size],
          config.color,
          config.animate && 'animate-spin'
        )}
        aria-hidden="true"
      />

      {showDetails && (
        <span className={cn('font-medium', config.color)}>
          {config.label}
        </span>
      )}

      {showDetails && lastSyncedAt && effectiveStatus === 'synced' && (
        <span className="text-gray-400 ml-1">
          · {formatLastSynced(lastSyncedAt)}
        </span>
      )}

      {effectiveStatus === 'error' && onRetrySync && (
        <button
          onClick={onRetrySync}
          className="ml-1 text-red-600 hover:text-red-700 underline"
        >
          Retry
        </button>
      )}
    </div>
  );
}

/**
 * Hook to manage sync status with IndexedDB
 */
export function useSyncStatus() {
  const [status, setStatus] = useState<SyncStatus>('synced');
  const [pendingCount, setPendingCount] = useState(0);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  // Check for pending actions in IndexedDB
  const checkPendingActions = useCallback(async () => {
    try {
      // Dynamic import to avoid SSR issues
      const { db } = await import('@/lib/db/indexeddb');
      const pending = await db.pendingActions
        .where('status')
        .equals('pending')
        .count();

      setPendingCount(pending);

      if (pending > 0) {
        setStatus('pending');
      } else {
        setStatus('synced');
        setLastSyncedAt(new Date());
      }
    } catch (error) {
      console.error('[SyncIndicator] Failed to check pending actions:', error);
    }
  }, []);

  // Sync pending actions to server
  const syncPendingActions = useCallback(async () => {
    if (!navigator.onLine) {
      setStatus('offline');
      return;
    }

    setStatus('syncing');

    try {
      const { db, removePendingAction, markActionFailed } = await import('@/lib/db/indexeddb');
      const pendingActions = await db.pendingActions
        .where('status')
        .equals('pending')
        .toArray();

      for (const action of pendingActions) {
        try {
          // Process each action based on type
          const response = await fetch('/api/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(action),
          });

          if (response.ok) {
            // Remove completed action from IndexedDB
            await removePendingAction(action.id!);
          } else {
            // Mark as failed with error message
            await markActionFailed(action.id!, `Sync failed: ${response.statusText}`);
          }
        } catch (err) {
          console.error('[SyncIndicator] Failed to sync action:', action.id, err);
          await markActionFailed(
            action.id!,
            err instanceof Error ? err.message : 'Unknown error'
          );
        }
      }

      await checkPendingActions();
    } catch (error) {
      console.error('[SyncIndicator] Sync failed:', error);
      setStatus('error');
    }
  }, [checkPendingActions]);

  useEffect(() => {
    // Initial check
    checkPendingActions();

    // Listen for online events to trigger sync
    const handleOnline = () => {
      syncPendingActions();
    };

    window.addEventListener('online', handleOnline);

    // Periodic check every 30 seconds
    const interval = setInterval(checkPendingActions, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      clearInterval(interval);
    };
  }, [checkPendingActions, syncPendingActions]);

  return {
    status,
    pendingCount,
    lastSyncedAt,
    syncPendingActions,
    checkPendingActions,
  };
}

export default SyncIndicator;
