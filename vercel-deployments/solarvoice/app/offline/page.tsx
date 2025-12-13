'use client';

import { useEffect, useState } from 'react';
import { WifiOff, RefreshCw, Home, Zap } from 'lucide-react';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      // Auto-reload when back online
      setTimeout(() => {
        window.location.reload();
      }, 500);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    setRetrying(true);

    // Check if we're back online
    if (navigator.onLine) {
      window.location.reload();
    } else {
      // Show visual feedback
      setTimeout(() => {
        setRetrying(false);
      }, 1000);
    }
  };

  const goHome = () => {
    // Try to navigate to cached home page
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Animated Icon Container */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-blue-100 rounded-full animate-pulse opacity-60" />
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <WifiOff className="w-12 h-12 text-white" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            You're Offline
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {isOnline
              ? 'Connection restored! Reloading...'
              : 'No internet connection detected. Please check your network and try again.'
            }
          </p>

          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8 p-3 bg-gray-50 rounded-lg">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className={`text-sm font-medium ${isOnline ? 'text-green-700' : 'text-red-700'}`}>
              {isOnline ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              disabled={retrying || isOnline}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-5 h-5 ${retrying ? 'animate-spin' : ''}`} />
              {retrying ? 'Retrying...' : 'Try Again'}
            </button>

            <button
              onClick={goHome}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border-2 border-gray-200 transition-all duration-200 flex items-center justify-center gap-2 hover:border-gray-300"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </button>
          </div>
        </div>

        {/* Cached Content Info */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">Offline Mode Active</p>
              <p className="text-blue-700 leading-relaxed">
                Some pages may be available from cache. Try navigating to recently visited pages.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>SolarVoice AI - Voice-First Solar Platform</p>
        </div>
      </div>
    </div>
  );
}
