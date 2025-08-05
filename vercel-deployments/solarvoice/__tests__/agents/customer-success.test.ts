/**
 * Customer Success Specialist Agent Tests
 * Tests deployment flow and customer relationship management functionality
 */

import { renderHook, act } from '@testing-library/react'
import { useAppStore } from '@/lib/stores/appStore'
import { elevenlabsService, AGENT_VOICES } from '@/lib/services/elevenlabs'

// Mock the ElevenLabs service
jest.mock('@/lib/services/elevenlabs')

describe('Customer Success Specialist Agent', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAppStore.setState({
      agents: useAppStore.getState().agents,
      selectedAgent: null,
      favoriteAgents: [],
      loading: false,
      notifications: [],
      isListening: false,
      transcript: '',
      error: null
    })
    
    // Clear all mocks
    jest.clearAllMocks()
  })

  describe('Agent Configuration', () => {
    it('should have correct customer success configuration', () => {
      const { result } = renderHook(() => useAppStore())
      const customerSuccess = result.current.agents.find(a => a.id === 'customer-success')
      
      expect(customerSuccess).toBeDefined()
      expect(customerSuccess).toMatchObject({
        id: 'customer-success',
        name: 'Customer Success Specialist',
        category: 'Solar Customer Success Expert',
        price: 89.99,
        icon: 'users',
        gradient: ['blue-500', 'purple-600'],
        isPopular: false
      })
      
      // Verify customer-focused features
      expect(customerSuccess?.features).toContain('Solar system performance monitoring')
      expect(customerSuccess?.features).toContain('Customer education & training')
      expect(customerSuccess?.features).toContain('Warranty & service management')
    })

    it('should have appropriate metrics for customer success role', () => {
      const { result } = renderHook(() => useAppStore())
      const customerSuccess = result.current.agents.find(a => a.id === 'customer-success')
      
      expect(customerSuccess?.metrics).toMatchObject({
        rating: 4.8,
        deployments: 1923,
        successRate: 94,
        avgResponseTime: '1.8s' // Fast response for customer service
      })
    })

    it('should have correct Bella voice mapping', () => {
      expect(AGENT_VOICES['customer-success']).toBe('EXAVITQu4vr4xnSDxMaL')
    })
  })

  describe('Voice Command Recognition', () => {
    it('should recognize "deploy customer" command', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('deploy customer')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Customer Success Specialist specialist now',
        'customer-success'
      )
      expect(mockDeployAgent).toHaveBeenCalledWith('customer-success')
    })

    it('should recognize "deploy customer success" command', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('deploy customer success')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Customer Success Specialist specialist now',
        'customer-success'
      )
      expect(mockDeployAgent).toHaveBeenCalledWith('customer-success')
    })

    it('should handle variations in command format', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('launch customer success specialist')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Customer Success Specialist specialist now',
        'customer-success'
      )
      expect(mockDeployAgent).toHaveBeenCalledWith('customer-success')
    })
  })

  describe('Deployment Flow Testing', () => {
    it('should complete full deployment flow successfully', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockTTS = jest.spyOn(elevenlabsService, 'textToSpeech')
      
      // Start with loading false
      expect(result.current.loading).toBe(false)
      
      const deploymentPromise = act(async () => {
        await result.current.deployAgent('customer-success')
      })
      
      // Check loading state is active
      expect(result.current.loading).toBe(true)
      
      await deploymentPromise
      
      // Verify deployment completed
      expect(result.current.loading).toBe(false)
      
      // Check success notification
      const notifications = result.current.notifications
      const successNotification = notifications.find(n => n.type === 'success')
      expect(successNotification).toBeDefined()
      expect(successNotification?.message).toBe('Customer Success Specialist has been successfully deployed')
      
      // Verify TTS was called with Bella's voice
      expect(mockTTS).toHaveBeenCalledWith(
        'Customer Success Specialist has been successfully deployed',
        'customer-success'
      )
    })

    it('should handle deployment state transitions correctly', async () => {
      const { result } = renderHook(() => useAppStore())
      const stateChanges: boolean[] = []
      
      // Track loading state changes
      const unsubscribe = useAppStore.subscribe((state) => {
        stateChanges.push(state.loading)
      })
      
      await act(async () => {
        await result.current.deployAgent('customer-success')
      })
      
      // Should see: false -> true -> false
      expect(stateChanges).toContain(true) // Loading started
      expect(result.current.loading).toBe(false) // Loading ended
      
      unsubscribe()
    })

    it('should create notifications in correct order', async () => {
      const { result } = renderHook(() => useAppStore())
      
      await act(async () => {
        await result.current.deployAgent('customer-success')
      })
      
      const notifications = result.current.notifications
      
      // Should have success notification
      const successNotification = notifications.find(n => n.type === 'success')
      expect(successNotification).toBeDefined()
      expect(successNotification?.timestamp).toBeInstanceOf(Date)
      
      // Should have TTS info notification
      const ttsNotification = notifications.find(n => n.type === 'info' && n.title === 'AI Speaking')
      expect(ttsNotification).toBeDefined()
      expect(ttsNotification?.message).toBe('Customer Success Specialist has been successfully deployed')
    })
  })

  describe('Customer-Specific Features', () => {
    it('should have customer-centric features', () => {
      const { result } = renderHook(() => useAppStore())
      const customerSuccess = result.current.agents.find(a => a.id === 'customer-success')
      
      const expectedFeatures = [
        'Solar system performance monitoring',
        'Customer education & training',
        'Maintenance scheduling automation',
        'Energy savings reporting',
        'Warranty & service management'
      ]
      
      expectedFeatures.forEach(feature => {
        expect(customerSuccess?.features).toContain(feature)
      })
    })

    it('should have appropriate pricing for customer service role', () => {
      const { result } = renderHook(() => useAppStore())
      const customerSuccess = result.current.agents.find(a => a.id === 'customer-success')
      
      // Should be the most affordable specialist
      expect(customerSuccess?.price).toBe(89.99)
      
      const allPrices = result.current.agents.map(a => a.price)
      expect(customerSuccess?.price).toBe(Math.min(...allPrices))
    })

    it('should have fast response time for customer service', () => {
      const { result } = renderHook(() => useAppStore())
      const customerSuccess = result.current.agents.find(a => a.id === 'customer-success')
      
      // Should have fastest response time (1.8s)
      expect(customerSuccess?.metrics.avgResponseTime).toBe('1.8s')
      
      const avgResponseTimes = result.current.agents.map(a => parseFloat(a.metrics.avgResponseTime))
      const minResponseTime = Math.min(...avgResponseTimes)
      expect(parseFloat(customerSuccess?.metrics.avgResponseTime || '999')).toBe(minResponseTime)
    })
  })

  describe('Agent Selection and State Management', () => {
    it('should be selectable as active agent', () => {
      const { result } = renderHook(() => useAppStore())
      const customerSuccess = result.current.agents.find(a => a.id === 'customer-success')
      
      act(() => {
        result.current.selectAgent(customerSuccess!)
      })
      
      expect(result.current.selectedAgent).toBe(customerSuccess)
      expect(result.current.selectedAgent?.id).toBe('customer-success')
    })

    it('should handle favorites toggle correctly', () => {
      const { result } = renderHook(() => useAppStore())
      
      expect(result.current.favoriteAgents).not.toContain('customer-success')
      
      act(() => {
        result.current.toggleFavorite('customer-success')
      })
      
      expect(result.current.favoriteAgents).toContain('customer-success')
      
      act(() => {
        result.current.toggleFavorite('customer-success')
      })
      
      expect(result.current.favoriteAgents).not.toContain('customer-success')
    })
  })

  describe('Error Handling in Deployment', () => {
    it('should handle TTS failure gracefully', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockTTS = jest.spyOn(elevenlabsService, 'textToSpeech')
        .mockRejectedValue(new Error('TTS service unavailable'))
      
      await act(async () => {
        await result.current.deployAgent('customer-success')
      })
      
      // Deployment should still succeed
      const notifications = result.current.notifications
      const successNotification = notifications.find(n => n.type === 'success')
      expect(successNotification).toBeDefined()
      
      mockTTS.mockRestore()
    })

    it('should provide helpful error messages', async () => {
      const { result } = renderHook(() => useAppStore())
      
      // Mock console.error to verify error logging
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      const mockTTS = jest.spyOn(elevenlabsService, 'textToSpeech')
        .mockRejectedValue(new Error('Network error'))
      
      await act(async () => {
        await result.current.deployAgent('customer-success')
      })
      
      // Should still complete deployment
      expect(result.current.loading).toBe(false)
      
      mockTTS.mockRestore()
      consoleSpy.mockRestore()
    })
  })

  describe('Voice Information Commands', () => {
    it('should provide agent information via voice', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')

      await act(async () => {
        result.current.processVoiceCommand('tell me about customer success specialist')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        expect.stringContaining('Customer Success Specialist is a Solar Customer Success Expert')
      )
      expect(mockSpeakResponse).toHaveBeenCalledWith(
        expect.stringContaining('$89.99')
      )
    })

    it('should create informational notifications', async () => {
      const { result } = renderHook(() => useAppStore())

      await act(async () => {
        result.current.processVoiceCommand('what is customer success specialist')
      })

      const notifications = result.current.notifications
      const infoNotification = notifications.find(n => n.type === 'info')
      
      expect(infoNotification).toBeDefined()
      expect(infoNotification?.title).toBe('About Customer Success Specialist')
    })
  })

  describe('Business Logic Validation', () => {
    it('should not be marked as popular (focused specialist)', () => {
      const { result } = renderHook(() => useAppStore())
      const customerSuccess = result.current.agents.find(a => a.id === 'customer-success')
      
      expect(customerSuccess?.isPopular).toBe(false)
    })

    it('should have appropriate deployment count for specialized role', () => {
      const { result } = renderHook(() => useAppStore())
      const customerSuccess = result.current.agents.find(a => a.id === 'customer-success')
      
      expect(customerSuccess?.metrics.deployments).toBe(1923)
      expect(customerSuccess?.metrics.deployments).toBeGreaterThan(1000) // Solid adoption
    })

    it('should have good but not perfect success rate (customer service challenges)', () => {
      const { result } = renderHook(() => useAppStore())
      const customerSuccess = result.current.agents.find(a => a.id === 'customer-success')
      
      expect(customerSuccess?.metrics.successRate).toBe(94)
      expect(customerSuccess?.metrics.successRate).toBeGreaterThanOrEqual(90)
      expect(customerSuccess?.metrics.successRate).toBeLessThan(96) // Realistic for customer service
    })
  })
})