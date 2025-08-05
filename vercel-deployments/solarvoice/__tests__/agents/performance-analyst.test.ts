/**
 * Performance Analytics Specialist Agent Tests
 * Tests state management and advanced analytics functionality
 */

import { renderHook, act } from '@testing-library/react'
import { useAppStore } from '@/lib/stores/appStore'
import { elevenlabsService, AGENT_VOICES } from '@/lib/services/elevenlabs'

// Mock the ElevenLabs service
jest.mock('@/lib/services/elevenlabs')

describe('Performance Analytics Specialist Agent', () => {
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
    it('should have correct performance analyst configuration', () => {
      const { result } = renderHook(() => useAppStore())
      const performanceAnalyst = result.current.agents.find(a => a.id === 'performance-analyst')
      
      expect(performanceAnalyst).toBeDefined()
      expect(performanceAnalyst).toMatchObject({
        id: 'performance-analyst',
        name: 'Performance Analytics Specialist',
        category: 'Solar Performance Analytics AI',
        price: 199.99,
        icon: 'trending',
        gradient: ['green-500', 'teal-600'],
        isPopular: true
      })
      
      // Verify analytics-focused features
      expect(performanceAnalyst?.features).toContain('Real-time energy production analysis')
      expect(performanceAnalyst?.features).toContain('Weather impact forecasting')
      expect(performanceAnalyst?.features).toContain('Panel degradation detection')
      expect(performanceAnalyst?.features).toContain('Financial return tracking')
    })

    it('should have premium metrics for advanced analytics', () => {
      const { result } = renderHook(() => useAppStore())
      const performanceAnalyst = result.current.agents.find(a => a.id === 'performance-analyst')
      
      expect(performanceAnalyst?.metrics).toMatchObject({
        rating: 5.0, // Perfect rating for advanced specialist
        deployments: 756,
        successRate: 98, // Highest success rate
        avgResponseTime: '3.1s' // Longer due to complex analytics
      })
    })

    it('should have correct Arnold voice mapping', () => {
      expect(AGENT_VOICES['performance-analyst']).toBe('VR6AewLTigWG4xSOukaG')
    })

    it('should be the highest priced specialist', () => {
      const { result } = renderHook(() => useAppStore())
      const performanceAnalyst = result.current.agents.find(a => a.id === 'performance-analyst')
      
      const allPrices = result.current.agents.map(a => a.price)
      expect(performanceAnalyst?.price).toBe(Math.max(...allPrices))
      expect(performanceAnalyst?.price).toBe(199.99)
    })
  })

  describe('Voice Command Recognition', () => {
    it('should recognize "deploy performance" command', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('deploy performance')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Performance Analytics Specialist specialist now',
        'performance-analyst'
      )
      expect(mockDeployAgent).toHaveBeenCalledWith('performance-analyst')
    })

    it('should recognize "deploy analytics" command', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('launch analytics')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Performance Analytics Specialist specialist now',
        'performance-analyst'
      )
      expect(mockDeployAgent).toHaveBeenCalledWith('performance-analyst')
    })

    it('should handle complex performance-related commands', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('start performance analytics specialist')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Performance Analytics Specialist specialist now',
        'performance-analyst'
      )
      expect(mockDeployAgent).toHaveBeenCalledWith('performance-analyst')
    })
  })

  describe('State Management Integration', () => {
    it('should properly integrate with global state', () => {
      const { result } = renderHook(() => useAppStore())
      const performanceAnalyst = result.current.agents.find(a => a.id === 'performance-analyst')
      
      // Should be part of agents array
      expect(result.current.agents).toContain(performanceAnalyst)
      expect(result.current.agents.length).toBe(5)
    })

    it('should handle selection state correctly', () => {
      const { result } = renderHook(() => useAppStore())
      const performanceAnalyst = result.current.agents.find(a => a.id === 'performance-analyst')
      
      expect(result.current.selectedAgent).toBeNull()
      
      act(() => {
        result.current.selectAgent(performanceAnalyst!)
      })
      
      expect(result.current.selectedAgent).toBe(performanceAnalyst)
      expect(result.current.selectedAgent?.id).toBe('performance-analyst')
    })

    it('should maintain state consistency during deployment', async () => {
      const { result } = renderHook(() => useAppStore())
      const performanceAnalyst = result.current.agents.find(a => a.id === 'performance-analyst')
      
      // Select agent before deployment
      act(() => {
        result.current.selectAgent(performanceAnalyst!)
      })
      
      expect(result.current.selectedAgent?.id).toBe('performance-analyst')
      
      await act(async () => {
        await result.current.deployAgent('performance-analyst')
      })
      
      // Selection should persist after deployment
      expect(result.current.selectedAgent?.id).toBe('performance-analyst')
    })

    it('should handle multiple state subscriptions', () => {
      const { result } = renderHook(() => useAppStore())
      const stateUpdates: any[] = []
      
      const unsubscribe = useAppStore.subscribe((state) => {
        stateUpdates.push({
          loading: state.loading,
          selectedAgent: state.selectedAgent?.id,
          notificationCount: state.notifications.length
        })
      })
      
      const performanceAnalyst = result.current.agents.find(a => a.id === 'performance-analyst')
      
      act(() => {
        result.current.selectAgent(performanceAnalyst!)
        result.current.addNotification({
          type: 'info',
          title: 'Test',
          message: 'Testing state updates'
        })
      })
      
      expect(stateUpdates.length).toBeGreaterThan(0)
      expect(stateUpdates[stateUpdates.length - 1]).toMatchObject({
        selectedAgent: 'performance-analyst',
        notificationCount: 1
      })
      
      unsubscribe()
    })
  })

  describe('Advanced Analytics Features', () => {
    it('should have comprehensive analytics features', () => {
      const { result } = renderHook(() => useAppStore())
      const performanceAnalyst = result.current.agents.find(a => a.id === 'performance-analyst')
      
      const expectedFeatures = [
        'Real-time energy production analysis',
        'Weather impact forecasting',
        'Panel degradation detection',
        'Inverter performance optimization',
        'Financial return tracking'
      ]
      
      expectedFeatures.forEach(feature => {
        expect(performanceAnalyst?.features).toContain(feature)
      })
      
      expect(performanceAnalyst?.features).toHaveLength(5)
    })

    it('should have perfect rating reflecting advanced capabilities', () => {
      const { result } = renderHook(() => useAppStore())
      const performanceAnalyst = result.current.agents.find(a => a.id === 'performance-analyst')
      
      expect(performanceAnalyst?.metrics.rating).toBe(5.0)
      
      // Should be the only perfect rating
      const perfectRatings = result.current.agents.filter(a => a.metrics.rating === 5.0)
      expect(perfectRatings).toHaveLength(1)
      expect(perfectRatings[0].id).toBe('performance-analyst')
    })

    it('should have highest success rate for reliability', () => {
      const { result } = renderHook(() => useAppStore())
      const performanceAnalyst = result.current.agents.find(a => a.id === 'performance-analyst')
      
      expect(performanceAnalyst?.metrics.successRate).toBe(98)
      
      const allSuccessRates = result.current.agents.map(a => a.metrics.successRate)
      expect(performanceAnalyst?.metrics.successRate).toBe(Math.max(...allSuccessRates))
    })
  })

  describe('Deployment with Complex State', () => {
    it('should handle deployment with multiple state changes', async () => {
      const { result } = renderHook(() => useAppStore())
      const stateChanges: any[] = []
      
      const unsubscribe = useAppStore.subscribe((state) => {
        stateChanges.push({
          loading: state.loading,
          notificationCount: state.notifications.length,
          timestamp: Date.now()
        })
      })
      
      await act(async () => {
        await result.current.deployAgent('performance-analyst')
      })
      
      // Should see loading states and notification additions
      const loadingStates = stateChanges.map(s => s.loading)
      expect(loadingStates).toContain(true) // Loading started
      expect(result.current.loading).toBe(false) // Loading ended
      
      // Should have multiple notifications (success + TTS info)
      expect(result.current.notifications.length).toBeGreaterThanOrEqual(2)
      
      unsubscribe()
    })

    it('should maintain performance analyst state integrity', async () => {
      const { result } = renderHook(() => useAppStore())
      const performanceAnalyst = result.current.agents.find(a => a.id === 'performance-analyst')
      const originalAgentData = { ...performanceAnalyst }
      
      await act(async () => {
        await result.current.deployAgent('performance-analyst')
      })
      
      // Agent data should remain unchanged after deployment
      const updatedAgent = result.current.agents.find(a => a.id === 'performance-analyst')
      expect(updatedAgent).toEqual(originalAgentData)
    })

    it('should handle concurrent deployments gracefully', async () => {
      const { result } = renderHook(() => useAppStore())
      
      // Try to deploy while another deployment is in progress
      const deployment1 = act(async () => {
        await result.current.deployAgent('performance-analyst')
      })
      
      const deployment2 = act(async () => {
        await result.current.deployAgent('performance-analyst')
      })
      
      await Promise.all([deployment1, deployment2])
      
      // Should complete both deployments
      expect(result.current.loading).toBe(false)
      
      // Should have notifications for both deployments
      const successNotifications = result.current.notifications.filter(n => 
        n.type === 'success' && n.message.includes('Performance Analytics Specialist')
      )
      expect(successNotifications.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Voice Information and Help', () => {
    it('should provide detailed analytics information', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')

      await act(async () => {
        result.current.processVoiceCommand('tell me about performance analytics specialist')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        expect.stringContaining('Performance Analytics Specialist is a Solar Performance Analytics AI')
      )
      expect(mockSpeakResponse).toHaveBeenCalledWith(
        expect.stringContaining('$199.99')
      )
    })

    it('should handle analytics-specific information requests', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')

      await act(async () => {
        result.current.processVoiceCommand('describe performance analytics specialist')
      })

      const notifications = result.current.notifications
      const infoNotification = notifications.find(n => n.type === 'info')
      
      expect(infoNotification).toBeDefined()
      expect(infoNotification?.title).toBe('About Performance Analytics Specialist')
      expect(infoNotification?.message).toContain('advanced AI for solar energy production analysis')
    })
  })

  describe('Premium Service Validation', () => {
    it('should be marked as popular due to advanced capabilities', () => {
      const { result } = renderHook(() => useAppStore())
      const performanceAnalyst = result.current.agents.find(a => a.id === 'performance-analyst')
      
      expect(performanceAnalyst?.isPopular).toBe(true)
    })

    it('should have appropriate deployment count for specialized service', () => {
      const { result } = renderHook(() => useAppStore())
      const performanceAnalyst = result.current.agents.find(a => a.id === 'performance-analyst')
      
      expect(performanceAnalyst?.metrics.deployments).toBe(756)
      // Lower deployment count reflects specialized, premium nature
      expect(performanceAnalyst?.metrics.deployments).toBeLessThan(2000)
    })

    it('should have longer response time reflecting complex processing', () => {
      const { result } = renderHook(() => useAppStore())
      const performanceAnalyst = result.current.agents.find(a => a.id === 'performance-analyst')
      
      expect(performanceAnalyst?.metrics.avgResponseTime).toBe('3.1s')
      
      // Should be the longest response time due to complex analytics
      const allResponseTimes = result.current.agents.map(a => parseFloat(a.metrics.avgResponseTime))
      const maxResponseTime = Math.max(...allResponseTimes)
      expect(parseFloat(performanceAnalyst?.metrics.avgResponseTime || '0')).toBe(maxResponseTime)
    })
  })

  describe('Error Handling and Resilience', () => {
    it('should handle TTS failures without affecting state integrity', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockTTS = jest.spyOn(elevenlabsService, 'textToSpeech')
        .mockRejectedValue(new Error('TTS service down'))
      
      const performanceAnalyst = result.current.agents.find(a => a.id === 'performance-analyst')
      const originalState = { ...result.current }
      
      await act(async () => {
        await result.current.deployAgent('performance-analyst')
      })
      
      // Core state should remain intact
      expect(result.current.agents).toEqual(originalState.agents)
      expect(result.current.loading).toBe(false)
      
      mockTTS.mockRestore()
    })

    it('should maintain favorites state during errors', async () => {
      const { result } = renderHook(() => useAppStore())
      
      act(() => {
        result.current.toggleFavorite('performance-analyst')
      })
      
      expect(result.current.favoriteAgents).toContain('performance-analyst')
      
      const mockTTS = jest.spyOn(elevenlabsService, 'textToSpeech')
        .mockRejectedValue(new Error('Network error'))
      
      await act(async () => {
        await result.current.deployAgent('performance-analyst')
      })
      
      // Favorites should persist through deployment errors
      expect(result.current.favoriteAgents).toContain('performance-analyst')
      
      mockTTS.mockRestore()
    })
  })
})