'use client';

import { useEffect, useState } from 'react';
import { Bell, BellOff, BellRing, Settings, Check, X, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NotificationSettings {
  /** Push notifications enabled */
  pushEnabled: boolean;
  /** Agent updates notifications */
  agentUpdates: boolean;
  /** Sync notifications */
  syncAlerts: boolean;
  /** Price change alerts */
  priceAlerts: boolean;
  /** Marketing notifications */
  marketingEmails: boolean;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  pushEnabled: false,
  agentUpdates: true,
  syncAlerts: true,
  priceAlerts: false,
  marketingEmails: false,
};

interface NotificationPreferencesProps {
  /** Callback when settings change */
  onSettingsChange?: (settings: NotificationSettings) => void;
  /** Custom className */
  className?: string;
}

type PermissionState = 'granted' | 'denied' | 'default' | 'unsupported';

/**
 * NotificationPreferences Component
 * Manages push notification settings for PWA
 */
export function NotificationPreferences({
  onSettingsChange,
  className,
}: NotificationPreferencesProps) {
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_SETTINGS);
  const [permissionState, setPermissionState] = useState<PermissionState>('default');
  const [isRequesting, setIsRequesting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Check browser support and permission state
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('Notification' in window)) {
      setPermissionState('unsupported');
      return;
    }

    setPermissionState(Notification.permission as PermissionState);

    // Load saved settings from localStorage
    try {
      const saved = localStorage.getItem('solarvoice-notification-settings');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (error) {
      console.error('[NotificationPreferences] Failed to load settings:', error);
    }
  }, []);

  // Save settings when they change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('solarvoice-notification-settings', JSON.stringify(settings));
      onSettingsChange?.(settings);
    } catch (error) {
      console.error('[NotificationPreferences] Failed to save settings:', error);
    }
  }, [settings, onSettingsChange]);

  const requestPermission = async () => {
    if (!('Notification' in window)) return;

    setIsRequesting(true);

    try {
      const permission = await Notification.requestPermission();
      setPermissionState(permission as PermissionState);

      if (permission === 'granted') {
        setSettings((prev) => ({ ...prev, pushEnabled: true }));

        // Show test notification
        new Notification('SolarVoice Notifications Enabled', {
          body: 'You will now receive updates about your AI agents.',
          icon: '/icon-192x192.png',
          badge: '/icon-192x192.png',
        });
      }
    } catch (error) {
      console.error('[NotificationPreferences] Permission request failed:', error);
    } finally {
      setIsRequesting(false);
    }
  };

  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const toggleItem = {
    wrapper: 'flex items-center justify-between py-3 border-b border-gray-100 last:border-0',
    label: 'flex items-center gap-3',
    labelText: 'text-sm font-medium text-gray-700',
    description: 'text-xs text-gray-500',
    toggle: 'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    toggleEnabled: 'bg-blue-600',
    toggleDisabled: 'bg-gray-200',
    toggleKnob: 'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
    toggleKnobEnabled: 'translate-x-6',
    toggleKnobDisabled: 'translate-x-1',
  };

  const renderToggle = (
    key: keyof NotificationSettings,
    label: string,
    description: string,
    icon: React.ElementType,
    disabled = false
  ) => {
    const Icon = icon;
    const enabled = settings[key];

    return (
      <div className={toggleItem.wrapper}>
        <div className={toggleItem.label}>
          <Icon className="w-5 h-5 text-gray-400" />
          <div>
            <p className={toggleItem.labelText}>{label}</p>
            <p className={toggleItem.description}>{description}</p>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          disabled={disabled}
          onClick={() => updateSetting(key, !enabled)}
          className={cn(
            toggleItem.toggle,
            enabled ? toggleItem.toggleEnabled : toggleItem.toggleDisabled,
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <span
            className={cn(
              toggleItem.toggleKnob,
              enabled ? toggleItem.toggleKnobEnabled : toggleItem.toggleKnobDisabled
            )}
          />
        </button>
      </div>
    );
  };

  // Permission status banner
  const renderPermissionBanner = () => {
    if (permissionState === 'unsupported') {
      return (
        <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg mb-4">
          <AlertTriangle className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-700">Notifications Not Supported</p>
            <p className="text-xs text-gray-500">Your browser doesn&apos;t support push notifications.</p>
          </div>
        </div>
      );
    }

    if (permissionState === 'denied') {
      return (
        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg mb-4">
          <BellOff className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-sm font-medium text-red-700">Notifications Blocked</p>
            <p className="text-xs text-red-600">
              Enable notifications in your browser settings to receive updates.
            </p>
          </div>
        </div>
      );
    }

    if (permissionState === 'default') {
      return (
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg mb-4">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-blue-700">Enable Notifications</p>
              <p className="text-xs text-blue-600">Stay updated on your AI agents.</p>
            </div>
          </div>
          <button
            onClick={requestPermission}
            disabled={isRequesting}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRequesting ? 'Enabling...' : 'Enable'}
          </button>
        </div>
      );
    }

    if (permissionState === 'granted') {
      return (
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg mb-4">
          <Check className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm font-medium text-green-700">Notifications Enabled</p>
            <p className="text-xs text-green-600">Customize your preferences below.</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={cn('bg-white rounded-xl shadow-sm border border-gray-100', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <BellRing className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Notifications</h3>
            <p className="text-xs text-gray-500">Manage your notification preferences</p>
          </div>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          {showSettings ? <X className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {renderPermissionBanner()}

        {showSettings && (
          <div className="space-y-1">
            {renderToggle(
              'agentUpdates',
              'Agent Updates',
              'New features and improvements to your agents',
              BellRing,
              permissionState !== 'granted'
            )}
            {renderToggle(
              'syncAlerts',
              'Sync Alerts',
              'Notifications when offline data syncs',
              Bell,
              permissionState !== 'granted'
            )}
            {renderToggle(
              'priceAlerts',
              'Price Alerts',
              'Notifications about pricing changes',
              Bell,
              permissionState !== 'granted'
            )}
            {renderToggle(
              'marketingEmails',
              'Marketing Updates',
              'Product news and special offers',
              Bell,
              permissionState !== 'granted'
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Compact notification toggle button
 */
export function NotificationToggle({
  className,
}: {
  className?: string;
}) {
  const [enabled, setEnabled] = useState(false);
  const [permission, setPermission] = useState<PermissionState>('default');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('Notification' in window)) {
      setPermission('unsupported');
      return;
    }

    setPermission(Notification.permission as PermissionState);
    setEnabled(Notification.permission === 'granted');
  }, []);

  const handleClick = async () => {
    if (permission === 'granted') {
      setEnabled(!enabled);
      return;
    }

    if (permission === 'default') {
      const result = await Notification.requestPermission();
      setPermission(result as PermissionState);
      setEnabled(result === 'granted');
    }
  };

  const Icon = permission === 'denied' ? BellOff : enabled ? BellRing : Bell;

  return (
    <button
      onClick={handleClick}
      disabled={permission === 'unsupported' || permission === 'denied'}
      className={cn(
        'p-2 rounded-lg transition-colors',
        enabled ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400',
        (permission === 'unsupported' || permission === 'denied') && 'opacity-50 cursor-not-allowed',
        className
      )}
      title={
        permission === 'denied'
          ? 'Notifications blocked'
          : permission === 'unsupported'
            ? 'Not supported'
            : enabled
              ? 'Notifications on'
              : 'Notifications off'
      }
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

export default NotificationPreferences;
