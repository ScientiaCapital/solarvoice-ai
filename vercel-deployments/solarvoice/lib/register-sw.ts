/**
 * Service Worker Registration for SolarVoice AI
 * Handles PWA installation and caching strategies
 */

// Store reference to pending update for deferred action
let pendingUpdate: ServiceWorker | null = null;

/**
 * Check if there's a pending update and apply it
 */
export function applyPendingUpdate(): void {
  if (pendingUpdate) {
    pendingUpdate.postMessage({ type: 'SKIP_WAITING' });
    pendingUpdate = null;
  }
}

/**
 * Check if update is available
 */
export function hasUpdateAvailable(): boolean {
  return pendingUpdate !== null;
}

/**
 * Callback for when update is available
 */
type UpdateCallback = (applyUpdate: () => void) => void;
let onUpdateAvailableCallback: UpdateCallback | null = null;

/**
 * Set callback for when update is available
 * This allows the app to show a non-blocking toast/banner
 */
export function setUpdateAvailableCallback(callback: UpdateCallback): void {
  onUpdateAvailableCallback = callback;
}

export async function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('[SolarVoice] Service workers not supported');
    return null;
  }

  try {
    // Wait for page to load before registering
    if (document.readyState === 'loading') {
      await new Promise((resolve) => {
        window.addEventListener('load', resolve, { once: true });
      });
    }

    // Register service worker
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('[SolarVoice] Service worker registered:', registration.scope);

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;

      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('[SolarVoice] New service worker available - reload to update');

            // Store the pending update
            pendingUpdate = newWorker;

            // Non-blocking notification via callback
            if (onUpdateAvailableCallback) {
              onUpdateAvailableCallback(() => {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
              });
            } else {
              // Fallback: dispatch custom event for app to handle
              window.dispatchEvent(
                new CustomEvent('solarvoice:update-available', {
                  detail: {
                    applyUpdate: () => {
                      newWorker.postMessage({ type: 'SKIP_WAITING' });
                      window.location.reload();
                    },
                  },
                })
              );
            }
          }
        });
      }
    });

    // Auto-reload when new service worker takes control
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SolarVoice] Service worker updated - reloading');
      window.location.reload();
    });

    return registration;
  } catch (error) {
    console.error('[SolarVoice] Service worker registration failed:', error);
    return null;
  }
}

/**
 * Unregister service worker (for debugging)
 */
export async function unregisterServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const success = await registration.unregister();
      console.log('[SolarVoice] Service worker unregistered:', success);
      return success;
    }
    return false;
  } catch (error) {
    console.error('[SolarVoice] Service worker unregistration failed:', error);
    return false;
  }
}

/**
 * Clear all caches (for debugging)
 */
export async function clearAllCaches() {
  if (!('caches' in window)) {
    return false;
  }

  try {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));
    console.log('[SolarVoice] All caches cleared:', cacheNames);
    return true;
  } catch (error) {
    console.error('[SolarVoice] Cache clearing failed:', error);
    return false;
  }
}
