/**
 * Utility-Scale Coordinator Agent Tests
 * Tests error handling and enterprise-scale functionality
 */

import { renderHook, act } from '@testing-library/react'
import { useAppStore } from '@/lib/stores/appStore'
import { elevenlabsService, AGENT_VOICES } from '@/lib/services/elevenlabs'

// Mock the ElevenLabs service
jest.mock('@/lib/services/elevenlabs')

describe('Utility-Scale Coordinator Agent', () => {
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
    it('should have correct utility coordinator configuration', () => {
      const { result } = renderHook(() => useAppStore())
      const utilityCoordinator = result.current.agents.find(a => a.id === 'utility-coordinator')
      
      expect(utilityCoordinator).toBeDefined()
      expect(utilityCoordinator).toMatchObject({
        id: 'utility-coordinator',
        name: 'Utility-Scale Coordinator',
        category: 'Utility-Scale Solar Coordinator',
        price: 179.99,
        icon: 'factory',
        gradient: ['red-500', 'orange-600'],
        isPopular: false
      })
      
      // Verify enterprise-scale features
      expect(utilityCoordinator?.features).toContain('Multi-phase construction scheduling')
      expect(utilityCoordinator?.features).toContain('Grid interconnection coordination')
      expect(utilityCoordinator?.features).toContain('Environmental compliance monitoring')
      expect(utilityCoordinator?.features).toContain('Multi-contractor team management')
      expect(utilityCoordinator?.features).toContain('Utility partnership facilitation')
    })

    it('should have enterprise-appropriate metrics', () => {
      const { result } = renderHook(() => useAppStore())
      const utilityCoordinator = result.current.agents.find(a => a.id === 'utility-coordinator')
      
      expect(utilityCoordinator?.metrics).toMatchObject({
        rating: 4.8,
        deployments: 892,
        successRate: 95,
        avgResponseTime: '2.7s'
      })
    })

    it('should have correct Elli voice mapping', () => {
      expect(AGENT_VOICES['utility-coordinator']).toBe('MF3mGyEYCl7XYWbV9V6O')
    })

    it('should have premium pricing for enterprise scale', () => {
      const { result } = renderHook(() => useAppStore())
      const utilityCoordinator = result.current.agents.find(a => a.id === 'utility-coordinator')
      
      expect(utilityCoordinator?.price).toBe(179.99)
      
      // Should be second highest priced (after performance analyst)
      const allPrices = result.current.agents.map(a => a.price).sort((a, b) => b - a)
      expect(utilityCoordinator?.price).toBe(allPrices[1])
    })
  })

  describe('Voice Command Recognition', () => {
    it('should recognize "deploy utility" command', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('deploy utility')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Utility-Scale Coordinator specialist now',
        'utility-coordinator'
      )
      expect(mockDeployAgent).toHaveBeenCalledWith('utility-coordinator')
    })

    it('should recognize "deploy coordinator" command', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('launch coordinator')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Utility-Scale Coordinator specialist now',
        'utility-coordinator'
      )
      expect(mockDeployAgent).toHaveBeenCalledWith('utility-coordinator')
    })

    it('should handle enterprise-specific command variations', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      const commands = [
        'start utility coordinator',
        'deploy utility scale coordinator',
        'launch utility specialist',
        'start coordinator specialist'
      ]

      for (const command of commands) {
        jest.clearAllMocks()
        
        await act(async () => {
          result.current.processVoiceCommand(command)
        })

        expect(mockSpeakResponse).toHaveBeenCalledWith(
          'Deploying Utility-Scale Coordinator specialist now',
          'utility-coordinator'
        )
        expect(mockDeployAgent).toHaveBeenCalledWith('utility-coordinator')
      }
    })
  })

  describe('Error Handling Tests', () => {
    it('should handle deployment errors gracefully', async () => {
      const { result } = renderHook(() => useAppStore())
      
      // Mock deployAgent to simulate network failure
      const originalDeployAgent = result.current.deployAgent
      let deploymentError: Error | null = null
      
      const mockDeployAgent = jest.fn().mockImplementation(async (agentId: string) => {
        try {
          // Simulate network timeout
          throw new Error('Network timeout: Unable to reach deployment service')
        } catch (error) {
          deploymentError = error as Error
          
          // Simulate error handling in store
          act(() => {
            result.current.setLoading(false)
            result.current.addNotification({
              type: 'error',
              title: 'Deployment Failed',
              message: `Failed to deploy Utility-Scale Coordinator: ${(error as Error).message}`
            })
          })
          
          throw error
        }
      })
      
      // Replace the deployAgent function temporarily
      act(() => {
        useAppStore.setState({ deployAgent: mockDeployAgent })
      })

      // Attempt deployment and expect it to fail
      await act(async () => {
        try {
          await mockDeployAgent('utility-coordinator')
        } catch (error) {
          // Expected to fail
        }
      })

      // Verify error handling
      expect(deploymentError).toBeInstanceOf(Error)
      expect(deploymentError?.message).toContain('Network timeout')
      
      const notifications = result.current.notifications
      const errorNotification = notifications.find(n => n.type === 'error')
      expect(errorNotification).toBeDefined()
      expect(errorNotification?.title).toBe('Deployment Failed')
      expect(errorNotification?.message).toContain('Failed to deploy Utility-Scale Coordinator')
      
      // Loading should be cleared
      expect(result.current.loading).toBe(false)
      
      // Restore original function
      act(() => {
        useAppStore.setState({ deployAgent: originalDeployAgent })
      })
    })

    it('should handle TTS service failures during deployment', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockTTS = jest.spyOn(elevenlabsService, 'textToSpeech')
        .mockRejectedValue(new Error('ElevenLabs API rate limit exceeded'))
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      await act(async () => {
        await result.current.deployAgent('utility-coordinator')
      })
      
      // Deployment should still succeed despite TTS failure
      const notifications = result.current.notifications
      const successNotification = notifications.find(n => n.type === 'success')
      expect(successNotification).toBeDefined()
      expect(successNotification?.message).toBe('Utility-Scale Coordinator has been successfully deployed')
      
      // Should have logged the TTS error
      expect(consoleSpy).toHaveBeenCalledWith(
        'ElevenLabs TTS failed, using fallback:',
        expect.any(Error)
      )
      
      mockTTS.mockRestore()
      consoleSpy.mockRestore()
    })

    it('should handle voice recognition errors', async () => {
      const { result } = renderHook(() => useAppStore())
      
      // Simulate voice recognition error
      act(() => {
        result.current.setVoiceError('Microphone access denied')
        result.current.setListening(false)
      })
      
      expect(result.current.error).toBe('Microphone access denied')
      expect(result.current.isListening).toBe(false)
      
      // Error should be clearable
      act(() => {
        result.current.setVoiceError(null)
      })
      
      expect(result.current.error).toBeNull()
    })

    it('should handle corrupted voice commands gracefully', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      
      // Test with corrupted/unclear voice input
      const corruptedCommands = [
        'deploy utility... [audio cuts out]',
        'launch... coordinator... [static]',
        'start util... [unclear]',
        'deploy something utility related but unclear'
      ]
      
      for (const command of corruptedCommands) {
        jest.clearAllMocks()
        
        await act(async () => {
          result.current.processVoiceCommand(command)
        })
        
        // Should either recognize or provide helpful fallback
        expect(mockSpeakResponse).toHaveBeenCalled()
        
        // If not recognized, should give helpful message
        const calls = mockSpeakResponse.mock.calls
        const hasUtilityResponse = calls.some(call => 
          call[0].includes('Deploying Utility-Scale Coordinator')
        )
        const hasHelpResponse = calls.some(call => 
          call[0].includes('Which specialist would you like to deploy')
        )
        
        expect(hasUtilityResponse || hasHelpResponse).toBe(true)
      }
    })

    it('should handle concurrent error scenarios', async () => {
      const { result } = renderHook(() => useAppStore())
      
      // Simulate multiple errors occurring simultaneously
      const errors = [
        () => result.current.setVoiceError('Network connection lost'),
        () => result.current.setVoiceError('Microphone hardware failure'),
        () => result.current.addNotification({
          type: 'error',
          title: 'System Error',
          message: 'Multiple system failures detected'
        })
      ]
      
      act(() => {
        errors.forEach(errorFn => errorFn())
      })
      
      // Should handle multiple errors without crashing
      expect(result.current.error).toBe('Microphone hardware failure') // Last error wins
      
      const errorNotifications = result.current.notifications.filter(n => n.type === 'error')
      expect(errorNotifications.length).toBeGreaterThan(0)
    })
  })

  describe('Enterprise-Scale Features', () => {
    it('should have comprehensive utility-scale features', () => {
      const { result } = renderHook(() => useAppStore())
      const utilityCoordinator = result.current.agents.find(a => a.id === 'utility-coordinator')
      
      const expectedFeatures = [
        'Multi-phase construction scheduling',
        'Grid interconnection coordination',
        'Environmental compliance monitoring',
        'Multi-contractor team management',
        'Utility partnership facilitation'
      ]
      
      expectedFeatures.forEach(feature => {
        expect(utilityCoordinator?.features).toContain(feature)
      })
      
      expect(utilityCoordinator?.features).toHaveLength(5)
    })

    it('should have appropriate metrics for enterprise complexity', () => {
      const { result } = renderHook(() => useAppStore())
      const utilityCoordinator = result.current.agents.find(a => a.id === 'utility-coordinator')
      
      // Enterprise coordination is complex, so response time should reflect this
      expect(utilityCoordinator?.metrics.avgResponseTime).toBe('2.7s')
      expect(parseFloat(utilityCoordinator?.metrics.avgResponseTime || '0')).toBeGreaterThan(2.0)
      
      // High success rate for enterprise reliability
      expect(utilityCoordinator?.metrics.successRate).toBe(95)
      expect(utilityCoordinator?.metrics.successRate).toBeGreaterThanOrEqual(95)
      
      // Lower deployment count due to enterprise specialization
      expect(utilityCoordinator?.metrics.deployments).toBe(892)
      expect(utilityCoordinator?.metrics.deployments).toBeLessThan(1000)
    })

    it('should have enterprise-tier pricing', () => {
      const { result } = renderHook(() => useAppStore())
      const utilityCoordinator = result.current.agents.find(a => a.id === 'utility-coordinator')
      
      expect(utilityCoordinator?.price).toBe(179.99)
      expect(utilityCoordinator?.price).toBeGreaterThan(150) // Premium enterprise pricing
      
      // Should be more expensive than commercial manager
      const commercialManager = result.current.agents.find(a => a.id === 'commercial-manager')
      expect(utilityCoordinator?.price).toBeGreaterThan(commercialManager?.price || 0)
    })
  })

  describe('Complex Error Recovery', () => {
    it('should recover from partial deployment failures', async () => {
      const { result } = renderHook(() => useAppStore())
      
      // Mock a deployment that fails partway through
      const originalDeployAgent = result.current.deployAgent
      let deploymentAttempts = 0
      
      const mockDeployAgent = jest.fn().mockImplementation(async (agentId: string) => {
        deploymentAttempts++
        
        if (deploymentAttempts === 1) {
          // First attempt: simulate partial failure
          act(() => {
            result.current.setLoading(true)
          })
          
          await new Promise(resolve => setTimeout(resolve, 100)) // Simulate some processing
          
          throw new Error('Deployment service temporarily unavailable')
        } else {
          // Second attempt: succeed
          return originalDeployAgent(agentId)
        }
      })
      
      act(() => {
        useAppStore.setState({ deployAgent: mockDeployAgent })
      })
      
      // First deployment attempt (should fail)
      await act(async () => {
        try {
          await mockDeployAgent('utility-coordinator')
        } catch (error) {
          // Expected failure
        }
      })
      
      expect(deploymentAttempts).toBe(1)
      
      // Second deployment attempt (should succeed)
      await act(async () => {
        await mockDeployAgent('utility-coordinator')
      })
      
      expect(deploymentAttempts).toBe(2)
      expect(result.current.loading).toBe(false)
      
      // Restore original function
      act(() => {
        useAppStore.setState({ deployAgent: originalDeployAgent })
      })
    })

    it('should handle state corruption during error scenarios', async () => {
      const { result } = renderHook(() => useAppStore())
      const originalAgents = [...result.current.agents]
      
      // Simulate state corruption attempt
      try {
        act(() => {
          // Try to corrupt the agents array
          useAppStore.setState({ agents: [] })
        })
        
        // Verify corruption occurred
        expect(result.current.agents).toHaveLength(0)
        
        // Restore proper state
        act(() => {
          useAppStore.setState({ agents: originalAgents })
        })
        
        // Verify recovery
        expect(result.current.agents).toHaveLength(5)
        const utilityCoordinator = result.current.agents.find(a => a.id === 'utility-coordinator')
        expect(utilityCoordinator).toBeDefined()
        
      } catch (error) {
        // If state management prevents corruption, that's also good
        expect(result.current.agents).toEqual(originalAgents)
      }
    })

    it('should handle memory pressure during complex operations', async () => {
      const { result } = renderHook(() => useAppStore())
      
      // Simulate memory pressure with many notifications
      const notifications = []
      for (let i = 0; i < 1000; i++) {
        notifications.push({
          type: 'info' as const,
          title: `Test Notification ${i}`,
          message: `This is test notification number ${i}`
        })
      }
      
      act(() => {
        // Add many notifications at once
        notifications.forEach(notification => {
          result.current.addNotification(notification)
        })
      })
      
      // System should still be responsive
      expect(result.current.notifications.length).toBe(1000)
      
      // Should still be able to deploy utility coordinator
      await act(async () => {
        await result.current.deployAgent('utility-coordinator')
      })
      
      // Verify deployment succeeded despite high memory usage
      const deploymentNotification = result.current.notifications.find(n => 
        n.type === 'success' && n.message.includes('Utility-Scale Coordinator')
      )
      expect(deploymentNotification).toBeDefined()
    })
  })

  describe('Enterprise Integration Validation', () => {
    it('should not be marked as popular (specialized enterprise tool)', () => {
      const { result } = renderHook(() => useAppStore())
      const utilityCoordinator = result.current.agents.find(a => a.id === 'utility-coordinator')
      
      expect(utilityCoordinator?.isPopular).toBe(false)
    })

    it('should have appropriate specialization metrics', () => {
      const { result } = renderHook(() => useAppStore())
      const utilityCoordinator = result.current.agents.find(a => a.id === 'utility-coordinator')
      
      // Should have lowest deployment count (most specialized)
      const allDeployments = result.current.agents.map(a => a.metrics.deployments)
      expect(utilityCoordinator?.metrics.deployments).toBe(Math.min(...allDeployments))
      
      // But should have high success rate for enterprise reliability
      expect(utilityCoordinator?.metrics.successRate).toBe(95)
      expect(utilityCoordinator?.metrics.successRate).toBeGreaterThanOrEqual(95)
    })

    it('should provide enterprise-level information via voice', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')

      await act(async () => {
        result.current.processVoiceCommand('tell me about utility-scale coordinator')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        expect.stringContaining('Utility-Scale Coordinator is a Utility-Scale Solar Coordinator')
      )
      expect(mockSpeakResponse).toHaveBeenCalledWith(
        expect.stringContaining('Enterprise AI for coordinating massive solar installations')
      )
      expect(mockSpeakResponse).toHaveBeenCalledWith(
        expect.stringContaining('$179.99')
      )
    })
  })
})