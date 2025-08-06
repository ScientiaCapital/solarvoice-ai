/**
 * Test utilities for store testing
 * Provides proper mock setup for Zustand stores
 */

import { act } from '@testing-library/react'
import type { StoreApi } from 'zustand'

// Create a mock store initializer
export const createMockStore = <T extends object>(initialState: T) => {
  let state = initialState
  const listeners = new Set<() => void>()

  const api: StoreApi<T> = {
    getState: () => state,
    setState: (partial: T | Partial<T> | ((state: T) => T | Partial<T>)) => {
      const nextState = typeof partial === 'function' 
        ? partial(state)
        : partial
      
      state = Object.assign({}, state, nextState)
      listeners.forEach(listener => listener())
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    destroy: () => {
      listeners.clear()
    }
  }

  return api
}

// Helper to reset store state between tests
export const resetStoreState = (store: any, initialState: any) => {
  act(() => {
    store.setState(initialState)
  })
}

// Mock elevenlabs service
export const mockElevenlabsService = {
  textToSpeech: jest.fn().mockResolvedValue(undefined),
  initialize: jest.fn().mockResolvedValue(undefined),
  isInitialized: jest.fn().mockReturnValue(true),
  playAudioBuffer: jest.fn().mockResolvedValue(undefined)
}

// Default initial state for appStore
export const defaultAppState = {
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
  agents: [
    {
      id: 'commercial-manager',
      name: 'Commercial Project Manager',
      category: 'Project Management',
      description: 'Oversees large-scale commercial solar installations from planning to completion.',
      price: 299,
      icon: '🏢',
      gradient: ['#FF6B6B', '#4ECDC4'] as [string, string],
      metrics: {
        rating: 4.9,
        deployments: 3420,
        successRate: 98.5,
        avgResponseTime: '1.2s'
      },
      features: [
        'Project timeline optimization',
        'Resource allocation management', 
        'Regulatory compliance tracking',
        'Multi-site coordination'
      ],
      isPopular: true
    },
    {
      id: 'customer-success',
      name: 'Customer Success Specialist',
      category: 'Customer Service',
      description: 'Ensures customer satisfaction throughout the solar installation journey.',
      price: 199,
      icon: '🤝',
      gradient: ['#667EEA', '#764BA2'] as [string, string],
      metrics: {
        rating: 4.8,
        deployments: 2850,
        successRate: 97.2,
        avgResponseTime: '0.8s'
      },
      features: [
        'Customer onboarding automation',
        'Satisfaction tracking',
        'Issue resolution workflows',
        'Personalized communication'
      ]
    },
    {
      id: 'performance-analyst',
      name: 'Performance Analytics Specialist',
      category: 'Analytics',
      description: 'Monitors and optimizes solar system performance with real-time analytics.',
      price: 249,
      icon: '📊',
      gradient: ['#F093FB', '#F5576C'] as [string, string],
      metrics: {
        rating: 4.7,
        deployments: 1920,
        successRate: 96.8,
        avgResponseTime: '1.5s'
      },
      features: [
        'Real-time performance monitoring',
        'Predictive maintenance alerts',
        'ROI calculations',
        'Energy production forecasting'
      ]
    },
    {
      id: 'sales-specialist',
      name: 'Sales & Lead Generation',
      category: 'Sales',
      description: 'Automates lead qualification and nurtures prospects through the sales funnel.',
      price: 349,
      icon: '💼',
      gradient: ['#FA709A', '#FEE140'] as [string, string],
      metrics: {
        rating: 4.9,
        deployments: 4100,
        successRate: 94.5,
        avgResponseTime: '1.0s'
      },
      features: [
        'Lead scoring & qualification',
        'Automated follow-ups',
        'Proposal generation',
        'CRM integration'
      ],
      isPopular: true
    },
    {
      id: 'utility-coordinator',
      name: 'Utility Integration Coordinator',
      category: 'Technical',
      description: 'Manages utility interconnection processes and grid compliance requirements.',
      price: 279,
      icon: '⚡',
      gradient: ['#4FACFE', '#00F2FE'] as [string, string],
      metrics: {
        rating: 4.6,
        deployments: 1580,
        successRate: 99.1,
        avgResponseTime: '1.3s'
      },
      features: [
        'Interconnection application management',
        'Net metering setup',
        'Grid compliance monitoring',
        'Utility rate optimization'
      ]
    }
  ],
  selectedAgent: null,
  favoriteAgents: [],
  
  // Actions (these will be added by the actual store)
  initializeVoiceRecognition: jest.fn(),
  startListening: jest.fn(),
  stopListening: jest.fn(),
  setTranscript: jest.fn(),
  setVoiceError: jest.fn(),
  setListening: jest.fn(),
  processVoiceCommand: jest.fn(),
  speakResponse: jest.fn(),
  deployAgent: jest.fn(),
  selectAgent: jest.fn(),
  toggleFavorite: jest.fn(),
  setTheme: jest.fn(),
  toggleSidebar: jest.fn(),
  setCurrentView: jest.fn(),
  addNotification: jest.fn(),
  removeNotification: jest.fn(),
  setLoading: jest.fn()
}