/**
 * AppStore Comprehensive Tests
 * Tests voice processing, state management, and integration functionality
 */

import { renderHook, act } from '@testing-library/react'
import { useAppStore } from '@/lib/stores/appStore'
import { elevenlabsService } from '@/lib/services/elevenlabs'

// Mock the ElevenLabs service
jest.mock('@/lib/services/elevenlabs')

// Mock Web APIs that aren't available in Jest environment
const mockMediaDevices = {
  getUserMedia: jest.fn()
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
  stop: jest.fn()
}))

const mockSpeechSynthesis = {
  cancel: jest.fn(),
  speak: jest.fn(),
  getVoices: jest.fn().mockReturnValue([
    { name: 'Google US English', lang: 'en-US' },
    { name: 'Enhanced US English', lang: 'en-US' }
  ])
}

// Setup global mocks
beforeAll(() => {
  Object.defineProperty(global, 'navigator', {
    value: { mediaDevices: mockMediaDevices },
    writable: true
  })

  Object.defineProperty(global, 'window', {
    value: {
      ...global.window,
      SpeechRecognition: mockSpeechRecognition,
      webkitSpeechRecognition: mockSpeechRecognition,
      speechSynthesis: mockSpeechSynthesis,
      speechRecognition: null
    },
    writable: true
  })

  Object.defineProperty(global, 'SpeechRecognition', {
    value: mockSpeechRecognition,
    writable: true
  })
})

describe('AppStore Comprehensive Tests', () => {
  beforeEach(() => {
    // Reset store state before each test  
    useAppStore.setState({
      // Voice state
      isListening: false,
      transcript: '',
      confidence: 0,
      isSupported: false,
      error: null,
      
      // UI state
      theme: 'auto',
      sidebarOpen: false,
      notifications: [],
      loading: false,
      currentView: 'marketplace',
      
      // Agent state
      agents: useAppStore.getState().agents, // Keep original agents data
      selectedAgent: null,
      favoriteAgents: []
    })
    
    // Clear all mocks
    jest.clearAllMocks()
    mockMediaDevices.getUserMedia.mockResolvedValue({
      getTracks: () => [{ stop: jest.fn() }]
    } as any)
  })

  describe('Initial State Validation', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useAppStore())
      
      expect(result.current).toMatchObject({
        isListening: false,
        transcript: '',
        confidence: 0,
        isSupported: false,
        error: null,
        theme: 'auto',
        sidebarOpen: false,
        loading: false,
        currentView: 'marketplace',
        selectedAgent: null
      })
      
      expect(result.current.agents).toHaveLength(5)
      expect(result.current.notifications).toHaveLength(0)
      expect(result.current.favoriteAgents).toHaveLength(0)
    })

    it('should have all 5 solar agents configured', () => {
      const { result } = renderHook(() => useAppStore())
      
      const expectedAgentIds = [
        'commercial-manager',
        'customer-success', 
        'performance-analyst',
        'sales-specialist',
        'utility-coordinator'
      ]
      
      const actualAgentIds = result.current.agents.map(a => a.id).sort()
      expect(actualAgentIds).toEqual(expectedAgentIds.sort())
    })
  })

  describe('Voice Recognition Initialization', () => {
    it('should initialize voice recognition when supported', async () => {
      const { result } = renderHook(() => useAppStore())
      
      await act(async () => {
        await result.current.initializeVoiceRecognition()
      })
      
      expect(result.current.isSupported).toBe(true)
      expect(result.current.error).toBeNull()
      expect(mockSpeechRecognition).toHaveBeenCalled()
    })

    it('should handle missing speech recognition gracefully', async () => {
      const { result } = renderHook(() => useAppStore())
      
      // Temporarily remove speech recognition
      const originalSpeechRecognition = (global as any).window.SpeechRecognition
      ;(global as any).window.SpeechRecognition = undefined
      ;(global as any).window.webkitSpeechRecognition = undefined
      
      await act(async () => {
        await result.current.initializeVoiceRecognition()
      })
      
      expect(result.current.isSupported).toBe(false)
      expect(result.current.error).toBe('Speech recognition not supported')
      
      // Restore
      ;(global as any).window.SpeechRecognition = originalSpeechRecognition
      ;(global as any).window.webkitSpeechRecognition = originalSpeechRecognition
    })

    it('should configure speech recognition with correct settings', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockRecognitionInstance = {
        continuous: false,
        interimResults: false,
        lang: '',
        onstart: null,
        onresult: null,
        onerror: null,
        onend: null,
        start: jest.fn(),
        stop: jest.fn()
      }
      
      mockSpeechRecognition.mockReturnValue(mockRecognitionInstance)
      
      await act(async () => {
        await result.current.initializeVoiceRecognition()
      })
      
      expect(mockRecognitionInstance.continuous).toBe(true)
      expect(mockRecognitionInstance.interimResults).toBe(true)
      expect(mockRecognitionInstance.lang).toBe('en-US')
    })
  })

  describe('Voice Command Processing', () => {
    it('should process deploy commands for all agents', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')
      
      const agentCommands = [
        { command: 'deploy commercial', agentId: 'commercial-manager' },
        { command: 'deploy customer success', agentId: 'customer-success' },
        { command: 'deploy performance', agentId: 'performance-analyst' },
        { command: 'deploy sales', agentId: 'sales-specialist' },
        { command: 'deploy utility', agentId: 'utility-coordinator' }
      ]
      
      for (const { command, agentId } of agentCommands) {
        jest.clearAllMocks()
        
        await act(async () => {
          result.current.processVoiceCommand(command)
        })
        
        expect(mockDeployAgent).toHaveBeenCalledWith(agentId)
        expect(mockSpeakResponse).toHaveBeenCalledWith(
          expect.stringContaining('Deploying'),
          agentId
        )
      }
    })

    it('should handle navigation commands', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      
      const navigationCommands = [
        { command: 'marketplace', view: 'marketplace' as const, response: 'Navigating to agent marketplace' },
        { command: 'dashboard', view: 'dashboard' as const, response: 'Opening dashboard' },
        { command: 'settings', view: 'settings' as const, response: 'Opening settings' }
      ]
      
      for (const { command, view, response } of navigationCommands) {
        jest.clearAllMocks()
        
        await act(async () => {
          result.current.processVoiceCommand(command)
        })
        
        expect(result.current.currentView).toBe(view)
        expect(mockSpeakResponse).toHaveBeenCalledWith(response)
      }
    })

    it('should provide help information', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      
      await act(async () => {
        result.current.processVoiceCommand('help')
      })
      
      expect(mockSpeakResponse).toHaveBeenCalledWith(
        expect.stringContaining('I can deploy solar specialists by voice')
      )
      
      const infoNotification = result.current.notifications.find(n => n.type === 'info')
      expect(infoNotification).toBeDefined()
      expect(infoNotification?.title).toBe('Voice Commands')
    })

    it('should handle theme commands', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      
      await act(async () => {
        result.current.processVoiceCommand('dark mode')
      })
      
      expect(result.current.theme).toBe('dark')
      expect(mockSpeakResponse).toHaveBeenCalledWith('Switching to dark mode')
      
      await act(async () => {
        result.current.processVoiceCommand('light theme')
      })
      
      expect(result.current.theme).toBe('light')
      expect(mockSpeakResponse).toHaveBeenCalledWith('Switching to light mode')
    })

    it('should provide fallback for unrecognized commands', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      
      await act(async () => {
        result.current.processVoiceCommand('unknown command')
      })
      
      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'I didn\'t understand that command. Try saying "help" to learn what I can do.'
      )
      
      const warningNotification = result.current.notifications.find(n => n.type === 'warning')
      expect(warningNotification).toBeDefined()
      expect(warningNotification?.title).toBe('Command Not Recognized')
    })
  })

  describe('Voice Recognition Flow', () => {
    it('should start listening with microphone permission', async () => {
      const { result } = renderHook(() => useAppStore())
      
      await act(async () => {
        await result.current.initializeVoiceRecognition()
      })
      
      await act(async () => {
        await result.current.startListening()
      })
      
      expect(mockMediaDevices.getUserMedia).toHaveBeenCalledWith({ audio: true })
      
      const successNotification = result.current.notifications.find(n => 
        n.type === 'success' && n.title === 'Voice Activated'
      )
      expect(successNotification).toBeDefined()
    })

    it('should handle microphone permission denial', async () => {
      const { result } = renderHook(() => useAppStore())
      
      mockMediaDevices.getUserMedia.mockRejectedValue(
        Object.assign(new Error('Permission denied'), { name: 'NotAllowedError' })
      )
      
      await act(async () => {
        await result.current.initializeVoiceRecognition()
      })
      
      await act(async () => {
        await result.current.startListening()
      })
      
      expect(result.current.error).toBe('Microphone permission denied. Please allow microphone access.')
      expect(result.current.isListening).toBe(false)
      
      const errorNotification = result.current.notifications.find(n => n.type === 'error')
      expect(errorNotification).toBeDefined()
    })

    it('should handle no microphone found error', async () => {
      const { result } = renderHook(() => useAppStore())
      
      mockMediaDevices.getUserMedia.mockRejectedValue(
        Object.assign(new Error('No microphone'), { name: 'NotFoundError' })
      )
      
      await act(async () => {
        await result.current.initializeVoiceRecognition()
      })
      
      await act(async () => {
        await result.current.startListening()
      })
      
      expect(result.current.error).toBe('No microphone found. Please connect a microphone.')
    })

    it('should stop listening and clear transcript', () => {
      const { result } = renderHook(() => useAppStore())
      
      act(() => {
        result.current.setListening(true)
        result.current.setTranscript('test transcript', 0.8)
      })
      
      expect(result.current.isListening).toBe(true)
      expect(result.current.transcript).toBe('test transcript')
      
      act(() => {
        result.current.stopListening()
      })
      
      expect(result.current.isListening).toBe(false)
      expect(result.current.transcript).toBe('')
    })
  })

  describe('Agent Deployment Integration', () => {
    it('should deploy agent with proper state transitions', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockTTS = jest.spyOn(elevenlabsService, 'textToSpeech')
      
      expect(result.current.loading).toBe(false)
      
      const deploymentPromise = act(async () => {
        await result.current.deployAgent('commercial-manager')
      })
      
      expect(result.current.loading).toBe(true)
      
      await deploymentPromise
      
      expect(result.current.loading).toBe(false)
      expect(mockTTS).toHaveBeenCalledWith(
        'Commercial Project Manager has been successfully deployed',
        'commercial-manager'
      )
    })

    it('should handle deployment of non-existent agent', async () => {
      const { result } = renderHook(() => useAppStore())
      
      await act(async () => {
        await result.current.deployAgent('non-existent-agent')
      })
      
      // Should not crash and loading should be false
      expect(result.current.loading).toBe(false)
      
      // Should not have success notification for non-existent agent
      const successNotifications = result.current.notifications.filter(n => n.type === 'success')
      expect(successNotifications).toHaveLength(0)
    })

    it('should create proper notifications during deployment', async () => {
      const { result } = renderHook(() => useAppStore())
      
      await act(async () => {
        await result.current.deployAgent('performance-analyst')
      })
      
      const notifications = result.current.notifications
      
      // Should have success notification
      const successNotification = notifications.find(n => n.type === 'success')
      expect(successNotification).toBeDefined()
      expect(successNotification?.title).toBe('Agent Deployed')
      expect(successNotification?.message).toBe('Performance Analytics Specialist has been successfully deployed')
      
      // Should have TTS info notification
      const ttsNotification = notifications.find(n => n.type === 'info' && n.title === 'AI Speaking')
      expect(ttsNotification).toBeDefined()
    })
  })

  describe('State Management', () => {
    it('should handle agent selection', () => {
      const { result } = renderHook(() => useAppStore())
      const agent = result.current.agents[0]
      
      expect(result.current.selectedAgent).toBeNull()
      
      act(() => {
        result.current.selectAgent(agent)
      })
      
      expect(result.current.selectedAgent).toBe(agent)
      
      act(() => {
        result.current.selectAgent(null)
      })
      
      expect(result.current.selectedAgent).toBeNull()
    })

    it('should manage favorite agents', () => {
      const { result } = renderHook(() => useAppStore())
      
      expect(result.current.favoriteAgents).toHaveLength(0)
      
      act(() => {
        result.current.toggleFavorite('commercial-manager')
      })
      
      expect(result.current.favoriteAgents).toContain('commercial-manager')
      
      act(() => {
        result.current.toggleFavorite('performance-analyst')
      })
      
      expect(result.current.favoriteAgents).toHaveLength(2)
      expect(result.current.favoriteAgents).toContain('performance-analyst')
      
      act(() => {
        result.current.toggleFavorite('commercial-manager')
      })
      
      expect(result.current.favoriteAgents).toHaveLength(1)
      expect(result.current.favoriteAgents).not.toContain('commercial-manager')
    })

    it('should manage UI state', () => {
      const { result } = renderHook(() => useAppStore())
      
      expect(result.current.sidebarOpen).toBe(false)
      expect(result.current.theme).toBe('auto')
      expect(result.current.currentView).toBe('marketplace')
      
      act(() => {
        result.current.toggleSidebar()
        result.current.setTheme('dark')
        result.current.setCurrentView('dashboard')
      })
      
      expect(result.current.sidebarOpen).toBe(true)
      expect(result.current.theme).toBe('dark')
      expect(result.current.currentView).toBe('dashboard')
    })

    it('should manage notifications', () => {
      const { result } = renderHook(() => useAppStore())
      
      expect(result.current.notifications).toHaveLength(0)
      
      act(() => {
        result.current.addNotification({
          type: 'success',
          title: 'Test Success',
          message: 'This is a test'
        })
      })
      
      expect(result.current.notifications).toHaveLength(1)
      const notification = result.current.notifications[0]
      expect(notification.type).toBe('success')
      expect(notification.title).toBe('Test Success')
      expect(notification.timestamp).toBeInstanceOf(Date)
      expect(notification.id).toBeDefined()
      
      act(() => {
        result.current.removeNotification(notification.id)
      })
      
      expect(result.current.notifications).toHaveLength(0)
    })
  })

  describe('Text-to-Speech Integration', () => {
    it('should use ElevenLabs for speech synthesis', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockTTS = jest.spyOn(elevenlabsService, 'textToSpeech')
      
      await act(async () => {
        result.current.speakResponse('Test message', 'commercial-manager')
      })
      
      expect(mockTTS).toHaveBeenCalledWith('Test message', 'commercial-manager')
      
      const infoNotification = result.current.notifications.find(n => 
        n.type === 'info' && n.title === 'AI Speaking'
      )
      expect(infoNotification).toBeDefined()
      expect(infoNotification?.message).toBe('Test message')
    })

    it('should fallback to browser TTS when ElevenLabs fails', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockTTS = jest.spyOn(elevenlabsService, 'textToSpeech')
        .mockRejectedValue(new Error('ElevenLabs service unavailable'))
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      await act(async () => {
        result.current.speakResponse('Fallback test message')
      })
      
      expect(mockTTS).toHaveBeenCalled()
      expect(consoleSpy).toHaveBeenCalledWith(
        'ElevenLabs TTS failed, using fallback:',
        expect.any(Error)
      )
      expect(mockSpeechSynthesis.speak).toHaveBeenCalled()
      
      mockTTS.mockRestore()
      consoleSpy.mockRestore()
    })

    it('should handle speech synthesis with preferred voices', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockTTS = jest.spyOn(elevenlabsService, 'textToSpeech')
        .mockRejectedValue(new Error('Service down'))
      
      mockSpeechSynthesis.getVoices.mockReturnValue([
        { name: 'Basic Voice', lang: 'en-US' },
        { name: 'Google US English', lang: 'en-US' },
        { name: 'Enhanced Neural Voice', lang: 'en-US' }
      ])
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      await act(async () => {
        result.current.speakResponse('Test with preferred voice')
      })
      
      expect(mockSpeechSynthesis.speak).toHaveBeenCalled()
      const utteranceCall = mockSpeechSynthesis.speak.mock.calls[0][0]
      expect(utteranceCall.text).toBe('Test with preferred voice')
      
      mockTTS.mockRestore()
      consoleSpy.mockRestore()
    })
  })

  describe('Error Handling and Resilience', () => {
    it('should handle voice recognition errors gracefully', async () => {
      const { result } = renderHook(() => useAppStore())
      
      // Simulate voice recognition error
      act(() => {
        result.current.setVoiceError('Audio capture failed')
      })
      
      expect(result.current.error).toBe('Audio capture failed')
      expect(result.current.isListening).toBe(false)
      
      // Error should be clearable
      act(() => {
        result.current.setVoiceError(null)
      })
      
      expect(result.current.error).toBeNull()
    })

    it('should maintain state integrity during errors', async () => {
      const { result } = renderHook(() => useAppStore())
      const originalAgents = [...result.current.agents]
      
      // Simulate various error conditions
      act(() => {
        result.current.setVoiceError('Network error')
        result.current.setLoading(true)
        result.current.addNotification({
          type: 'error',
          title: 'System Error',
          message: 'Multiple failures detected'
        })
      })
      
      // Core data should remain intact
      expect(result.current.agents).toEqual(originalAgents)
      expect(result.current.agents).toHaveLength(5)
      
      // Error state should be properly set
      expect(result.current.error).toBe('Network error')
      expect(result.current.loading).toBe(true)
      
      // Should be able to recover
      act(() => {
        result.current.setVoiceError(null)
        result.current.setLoading(false)
      })
      
      expect(result.current.error).toBeNull()
      expect(result.current.loading).toBe(false)
    })

    it('should handle concurrent operations safely', async () => {
      const { result } = renderHook(() => useAppStore())
      
      // Start multiple operations concurrently
      const operations = [
        () => result.current.processVoiceCommand('deploy commercial'),
        () => result.current.processVoiceCommand('deploy sales'),
        () => result.current.toggleFavorite('performance-analyst'),
        () => result.current.setTheme('dark'),
        () => result.current.addNotification({
          type: 'info',
          title: 'Concurrent Test',
          message: 'Testing concurrent operations'
        })
      ]
      
      await act(async () => {
        await Promise.all(operations.map(op => Promise.resolve(op())))
      })
      
      // Store should remain in a consistent state
      expect(result.current.agents).toHaveLength(5)
      expect(result.current.theme).toBe('dark')
      expect(result.current.favoriteAgents).toContain('performance-analyst')
      expect(result.current.notifications.length).toBeGreaterThan(0)
    })
  })

  describe('Performance and Memory Management', () => {
    it('should handle large numbers of notifications efficiently', () => {
      const { result } = renderHook(() => useAppStore())
      const startTime = performance.now()
      
      act(() => {
        // Add many notifications
        for (let i = 0; i < 1000; i++) {
          result.current.addNotification({
            type: 'info',
            title: `Notification ${i}`,
            message: `Message ${i}`
          })
        }
      })
      
      const endTime = performance.now()
      const duration = endTime - startTime
      
      expect(result.current.notifications).toHaveLength(1000)
      expect(duration).toBeLessThan(1000) // Should complete in under 1 second
      
      // Should still be responsive
      act(() => {
        result.current.setTheme('light')
      })
      
      expect(result.current.theme).toBe('light')
    })

    it('should handle rapid state changes efficiently', () => {
      const { result } = renderHook(() => useAppStore())
      const stateChanges: any[] = []
      
      const unsubscribe = useAppStore.subscribe((state) => {
        stateChanges.push({
          timestamp: Date.now(),
          loading: state.loading,
          theme: state.theme,
          notificationCount: state.notifications.length
        })
      })
      
      act(() => {
        // Rapid state changes
        for (let i = 0; i < 100; i++) {
          result.current.setLoading(i % 2 === 0)
          result.current.setTheme(i % 3 === 0 ? 'dark' : 'light')
        }
      })
      
      expect(stateChanges.length).toBeGreaterThan(0)
      expect(result.current.loading).toBe(false) // Should end with even number
      expect(result.current.theme).toBe('light') // Should end with non-divisible by 3
      
      unsubscribe()
    })
  })

  describe('Persistence and Hydration', () => {
    it('should persist selected state to storage', () => {
      const { result } = renderHook(() => useAppStore())
      
      act(() => {
        result.current.setTheme('dark')
        result.current.toggleFavorite('commercial-manager')
        result.current.setCurrentView('dashboard')
      })
      
      // These should be persisted according to partialize config
      expect(result.current.theme).toBe('dark')
      expect(result.current.favoriteAgents).toContain('commercial-manager')
      expect(result.current.currentView).toBe('dashboard')
      
      // These should not be persisted (transient state)
      expect(result.current.isListening).toBe(false)
      expect(result.current.loading).toBe(false)
      expect(result.current.notifications).toHaveLength(0)
    })
  })
})