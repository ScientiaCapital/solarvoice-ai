/**
 * Test utilities and helpers for testing
 * Provides consistent test setup and utilities
 */

import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { act } from '@testing-library/react'

// Create a custom render function that wraps components with providers
export function render(ui: React.ReactElement, options = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <>{children}</>
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

// Helper to reset store state for testing
export function resetStoreState(store: any) {
  const initialState = {
    // Voice state
    isListening: false,
    transcript: '',
    confidence: 0,
    isSupported: false,
    error: null,
    
    // UI state
    theme: 'auto' as const,
    sidebarOpen: false,
    notifications: [],
    loading: false,
    currentView: 'marketplace' as const,
    
    // Agent state
    selectedAgent: null,
    favoriteAgents: []
  }
  
  act(() => {
    store.setState(initialState)
  })
}

// Helper to setup mock APIs
export function setupMockAPIs() {
  const mockMediaDevices = {
    getUserMedia: jest.fn().mockResolvedValue({
      getTracks: () => [{ stop: jest.fn() }],
      getAudioTracks: () => [],
      getVideoTracks: () => [],
      stop: jest.fn()
    })
  }
  
  const mockSpeechRecognition = jest.fn().mockImplementation(() => ({
    continuous: false,
    interimResults: false,
    lang: 'en-US',
    onstart: null,
    onresult: null,
    onerror: null,
    onend: null,
    start: jest.fn(),
    stop: jest.fn(),
    abort: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  }))
  
  const mockSpeechSynthesis = {
    cancel: jest.fn(),
    speak: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    getVoices: jest.fn().mockReturnValue([
      { name: 'Google US English', lang: 'en-US', default: true, localService: true, voiceURI: 'Google US English' },
      { name: 'Enhanced US English', lang: 'en-US', default: false, localService: true, voiceURI: 'Enhanced US English' }
    ]),
    pending: false,
    speaking: false,
    paused: false
  }
  
  // Setup global mocks
  if (typeof window !== 'undefined') {
    Object.defineProperty(window.navigator, 'mediaDevices', {
      value: mockMediaDevices,
      writable: true,
      configurable: true
    })
    
    Object.defineProperty(window, 'SpeechRecognition', {
      value: mockSpeechRecognition,
      writable: true,
      configurable: true
    })
    
    Object.defineProperty(window, 'webkitSpeechRecognition', {
      value: mockSpeechRecognition,
      writable: true,
      configurable: true
    })
    
    Object.defineProperty(window, 'speechSynthesis', {
      value: mockSpeechSynthesis,
      writable: true,
      configurable: true
    })
    
    // Also set on global for Node environment
    ;(global as any).SpeechRecognition = mockSpeechRecognition
    ;(global as any).webkitSpeechRecognition = mockSpeechRecognition
  }
  
  return {
    mockMediaDevices,
    mockSpeechRecognition,
    mockSpeechSynthesis
  }
}

// Helper to wait for async updates
export async function waitForNextUpdate(ms = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      act(() => {
        resolve(undefined)
      })
    }, ms)
  })
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'