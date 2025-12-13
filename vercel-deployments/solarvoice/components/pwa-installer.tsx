'use client';

import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/register-sw';

/**
 * PWA Installer Component
 * Automatically registers service worker on mount
 */
export function PWAInstaller() {
  useEffect(() => {
    // Register service worker when component mounts
    registerServiceWorker();
  }, []);

  // This component doesn't render anything
  return null;
}
