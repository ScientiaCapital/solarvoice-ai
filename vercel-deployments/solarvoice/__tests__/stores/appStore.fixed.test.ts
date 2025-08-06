/**
 * AppStore Fixed Tests - Properly Initialized
 * Comprehensive tests with proper store initialization
 */

import { renderHook, act, waitFor } from '@testing-library/react'
import { defaultAppState, mockElevenlabsService } from '../test-utils/store-setup'

// Mock the services
jest.mock('@/lib/services/elevenlabs', () => ({
  elevenlabsService: mockElevenlabsService,
  AgentId: {}
}))

// Mock Zustand
const actualZustand = jest.requireActual('zustand')
const { create: actualCreate } = actualZustand

// Store state for testing
let storeState = { ...defaultAppState }
let storeListeners = new Set<() => void>()

// Mock create function
const createMockStore = (initializer: any) => {
  const api = {
    getState: () => storeState,
    setState: (partial: any) => {
      const nextState = typeof partial === 'function' 
        ? partial(storeState)
        : partial
      storeState = { ...storeState, ...nextState }
      storeListeners.forEach(listener => listener())
    },
    subscribe: (listener: () => void) => {
      storeListeners.add(listener)
      return () => storeListeners.delete(listener)
    },
    destroy: () => {
      storeListeners.clear()
    }
  }

  // Initialize with store actions
  const store = initializer(api.setState, api.getState, api)
  storeState = { ...storeState, ...store }
  
  return api
}

// Replace Zustand's create with our mock
jest.mock('zustand', () => ({
  ...actualZustand,
  create: (initializer: any) => {
    if (typeof initializer === 'function') {
      return () => {
        const api = createMockStore(initializer)
        return api.getState()
      }
    }
    return actualCreate(initializer)
  }
}))

// Import after mocks are set up
import { useAppStore } from '@/lib/stores/appStore'

describe('AppStore Fixed Tests', () => {
  beforeEach(() => {
    // Reset store state
    storeState = { ...defaultAppState }
    storeListeners.clear()
    jest.clearAllMocks()
    
    // Reset mock implementations
    mockElevenlabsService.textToSpeech.mockResolvedValue(undefined)
    mockElevenlabsService.initialize.mockResolvedValue(undefined)
  })

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useAppStore())
      
      expect(result.current.isListening).toBe(false)
      expect(result.current.transcript).toBe('')
      expect(result.current.confidence).toBe(0)
      expect(result.current.isSupported).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.theme).toBe('auto')
      expect(result.current.currentView).toBe('marketplace')
      expect(result.current.agents).toHaveLength(5)
    })

    it('should have all 5 solar agents', () => {
      const { result } = renderHook(() => useAppStore())
      
      const agentIds = result.current.agents.map(a => a.id)
      expect(agentIds).toContain('commercial-manager')
      expect(agentIds).toContain('customer-success')
      expect(agentIds).toContain('performance-analyst')
      expect(agentIds).toContain('sales-specialist')
      expect(agentIds).toContain('utility-coordinator')
    })
  })

  describe('Voice Commands', () => {
    it('should process deploy commands', async () => {
      const { result } = renderHook(() => useAppStore())
      
      await act(async () => {
        await result.current.processVoiceCommand('deploy commercial')
      })
      
      expect(mockElevenlabsService.textToSpeech).toHaveBeenCalled()
    })

    it('should handle navigation commands', async () => {
      const { result } = renderHook(() => useAppStore())
      
      await act(async () => {
        result.current.setCurrentView('marketplace')
      })
      
      expect(result.current.currentView).toBe('marketplace')
      
      await act(async () => {
        result.current.setCurrentView('dashboard')
      })
      
      expect(result.current.currentView).toBe('dashboard')
    })

    it('should handle theme changes', () => {
      const { result } = renderHook(() => useAppStore())
      
      act(() => {
        result.current.setTheme('dark')
      })
      
      expect(result.current.theme).toBe('dark')
      
      act(() => {
        result.current.setTheme('light')
      })
      
      expect(result.current.theme).toBe('light')
    })
  })

  describe('Agent Management', () => {
    it('should select agents', () => {
      const { result } = renderHook(() => useAppStore())
      const agent = result.current.agents[0]
      
      act(() => {
        result.current.selectAgent(agent)
      })
      
      expect(result.current.selectedAgent).toBe(agent)
    })

    it('should manage favorites', () => {
      const { result } = renderHook(() => useAppStore())
      
      act(() => {
        result.current.toggleFavorite('commercial-manager')
      })
      
      expect(result.current.favoriteAgents).toContain('commercial-manager')
      
      act(() => {
        result.current.toggleFavorite('commercial-manager')
      })
      
      expect(result.current.favoriteAgents).not.toContain('commercial-manager')
    })

    it('should deploy agents', async () => {
      const { result } = renderHook(() => useAppStore())
      
      await act(async () => {
        await result.current.deployAgent('commercial-manager')
      })
      
      expect(mockElevenlabsService.textToSpeech).toHaveBeenCalledWith(
        expect.stringContaining('deployed'),
        'commercial-manager'
      )
    })
  })

  describe('Notifications', () => {
    it('should add notifications', () => {
      const { result } = renderHook(() => useAppStore())
      
      act(() => {
        result.current.addNotification({
          type: 'success',
          title: 'Test',
          message: 'Test message'
        })
      })
      
      expect(result.current.notifications).toHaveLength(1)
      expect(result.current.notifications[0].type).toBe('success')
    })

    it('should remove notifications', () => {
      const { result } = renderHook(() => useAppStore())
      
      act(() => {
        result.current.addNotification({
          type: 'info',
          title: 'Test',
          message: 'Test'
        })
      })
      
      const notificationId = result.current.notifications[0].id
      
      act(() => {
        result.current.removeNotification(notificationId)
      })
      
      expect(result.current.notifications).toHaveLength(0)
    })
  })

  describe('Loading State', () => {
    it('should manage loading state', () => {
      const { result } = renderHook(() => useAppStore())
      
      expect(result.current.loading).toBe(false)
      
      act(() => {
        result.current.setLoading(true)
      })
      
      expect(result.current.loading).toBe(true)
      
      act(() => {
        result.current.setLoading(false)
      })
      
      expect(result.current.loading).toBe(false)
    })
  })

  describe('Error Handling', () => {
    it('should handle voice errors', () => {
      const { result } = renderHook(() => useAppStore())
      
      act(() => {
        result.current.setVoiceError('Test error')
      })
      
      expect(result.current.error).toBe('Test error')
      
      act(() => {
        result.current.setVoiceError(null)
      })
      
      expect(result.current.error).toBeNull()
    })

    it('should handle TTS failures gracefully', async () => {
      const { result } = renderHook(() => useAppStore())
      
      mockElevenlabsService.textToSpeech.mockRejectedValueOnce(new Error('TTS failed'))
      
      await act(async () => {
        await result.current.speakResponse('Test message')
      })
      
      // Should not throw, error should be handled
      expect(result.current.error).toBeNull()
    })
  })

  describe('UI State', () => {
    it('should toggle sidebar', () => {
      const { result } = renderHook(() => useAppStore())
      
      expect(result.current.sidebarOpen).toBe(false)
      
      act(() => {
        result.current.toggleSidebar()
      })
      
      expect(result.current.sidebarOpen).toBe(true)
      
      act(() => {
        result.current.toggleSidebar()
      })
      
      expect(result.current.sidebarOpen).toBe(false)
    })

    it('should change views', () => {
      const { result } = renderHook(() => useAppStore())
      
      const views = ['marketplace', 'dashboard', 'agents', 'settings'] as const
      
      views.forEach(view => {
        act(() => {
          result.current.setCurrentView(view)
        })
        
        expect(result.current.currentView).toBe(view)
      })
    })
  })
})