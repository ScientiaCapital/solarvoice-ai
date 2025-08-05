/**
 * Sales Automation Specialist Agent Tests
 * Tests voice command processing and sales-specific functionality
 */

import { renderHook, act } from '@testing-library/react'
import { useAppStore } from '@/lib/stores/appStore'
import { elevenlabsService, AGENT_VOICES } from '@/lib/services/elevenlabs'

// Mock the ElevenLabs service
jest.mock('@/lib/services/elevenlabs')

describe('Sales Automation Specialist Agent', () => {
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
    it('should have correct sales specialist configuration', () => {
      const { result } = renderHook(() => useAppStore())
      const salesSpecialist = result.current.agents.find(a => a.id === 'sales-specialist')
      
      expect(salesSpecialist).toBeDefined()
      expect(salesSpecialist).toMatchObject({
        id: 'sales-specialist',
        name: 'Sales Automation Specialist',
        category: 'Solar Sales Automation Expert',
        price: 129.99,
        icon: 'zap',
        gradient: ['purple-500', 'pink-600'],
        isPopular: false
      })
      
      // Verify sales-focused features
      expect(salesSpecialist?.features).toContain('Solar site assessment automation')
      expect(salesSpecialist?.features).toContain('Energy savings proposal generation')
      expect(salesSpecialist?.features).toContain('Tax incentive calculations')
      expect(salesSpecialist?.features).toContain('Sales pipeline optimization')
    })

    it('should have appropriate metrics for sales role', () => {
      const { result } = renderHook(() => useAppStore())
      const salesSpecialist = result.current.agents.find(a => a.id === 'sales-specialist')
      
      expect(salesSpecialist?.metrics).toMatchObject({
        rating: 4.9,
        deployments: 1456,
        successRate: 92, // Good but realistic for sales
        avgResponseTime: '2.0s'
      })
    })

    it('should have correct Antoni voice mapping', () => {
      expect(AGENT_VOICES['sales-specialist']).toBe('ErXwobaYiN019PkySvjV')
    })

    it('should have mid-tier pricing appropriate for sales automation', () => {
      const { result } = renderHook(() => useAppStore())
      const salesSpecialist = result.current.agents.find(a => a.id === 'sales-specialist')
      
      expect(salesSpecialist?.price).toBe(129.99)
      
      // Should be more than customer success but less than commercial/performance
      const customerSuccess = result.current.agents.find(a => a.id === 'customer-success')
      const commercialManager = result.current.agents.find(a => a.id === 'commercial-manager')
      
      expect(salesSpecialist?.price).toBeGreaterThan(customerSuccess?.price || 0)
      expect(salesSpecialist?.price).toBeLessThan(commercialManager?.price || 999)
    })
  })

  describe('Voice Command Recognition Tests', () => {
    it('should recognize "deploy sales" command', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('deploy sales')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Sales Automation Specialist specialist now',
        'sales-specialist'
      )
      expect(mockDeployAgent).toHaveBeenCalledWith('sales-specialist')
    })

    it('should handle case-insensitive voice commands', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('DEPLOY SALES SPECIALIST')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Sales Automation Specialist specialist now',
        'sales-specialist'
      )
      expect(mockDeployAgent).toHaveBeenCalledWith('sales-specialist')
    })

    it('should recognize variations of sales commands', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      const commands = [
        'launch sales',
        'start sales specialist',
        'deploy sales automation',
        'launch sales expert'
      ]

      for (const command of commands) {
        jest.clearAllMocks()
        
        await act(async () => {
          result.current.processVoiceCommand(command)
        })

        expect(mockSpeakResponse).toHaveBeenCalledWith(
          'Deploying Sales Automation Specialist specialist now',
          'sales-specialist'
        )
        expect(mockDeployAgent).toHaveBeenCalledWith('sales-specialist')
      }
    })

    it('should handle noisy voice input with sales keywords', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('um please deploy the sales specialist now')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Sales Automation Specialist specialist now',
        'sales-specialist'
      )
      expect(mockDeployAgent).toHaveBeenCalledWith('sales-specialist')
    })

    it('should not trigger on partial keyword matches', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('deploy wholesale pricing')
      })

      // Should not deploy sales specialist for "wholesale"
      expect(mockDeployAgent).not.toHaveBeenCalledWith('sales-specialist')
      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Which specialist would you like to deploy? Say Commercial, Customer Success, Performance Analytics, Sales, or Utility Coordinator.'
      )
    })
  })

  describe('Sales-Specific Features Validation', () => {
    it('should have comprehensive sales automation features', () => {
      const { result } = renderHook(() => useAppStore())
      const salesSpecialist = result.current.agents.find(a => a.id === 'sales-specialist')
      
      const expectedFeatures = [
        'Solar site assessment automation',
        'Energy savings proposal generation',
        'Financing options analysis',
        'Tax incentive calculations',
        'Sales pipeline optimization'
      ]
      
      expectedFeatures.forEach(feature => {
        expect(salesSpecialist?.features).toContain(feature)
      })
      
      expect(salesSpecialist?.features).toHaveLength(5)
    })

    it('should have sales-optimized metrics', () => {
      const { result } = renderHook(() => useAppStore())
      const salesSpecialist = result.current.agents.find(a => a.id === 'sales-specialist')
      
      // Sales should have good but realistic success rate
      expect(salesSpecialist?.metrics.successRate).toBe(92)
      expect(salesSpecialist?.metrics.successRate).toBeGreaterThanOrEqual(90)
      expect(salesSpecialist?.metrics.successRate).toBeLessThan(95) // Realistic for sales
      
      // Should have reasonable response time for sales interactions
      expect(salesSpecialist?.metrics.avgResponseTime).toBe('2.0s')
      expect(parseFloat(salesSpecialist?.metrics.avgResponseTime || '999')).toBeLessThan(3.0)
    })

    it('should have appropriate deployment count for sales market', () => {
      const { result } = renderHook(() => useAppStore())
      const salesSpecialist = result.current.agents.find(a => a.id === 'sales-specialist')
      
      expect(salesSpecialist?.metrics.deployments).toBe(1456)
      expect(salesSpecialist?.metrics.deployments).toBeGreaterThan(1000) // Popular sales tool
      expect(salesSpecialist?.metrics.deployments).toBeLessThan(2000) // Not as universal as commercial
    })
  })

  describe('Voice Command Processing Edge Cases', () => {
    it('should handle multiple matching keywords gracefully', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('deploy sales and performance')
      })

      // Should prioritize the first match (sales)
      expect(mockDeployAgent).toHaveBeenCalledWith('sales-specialist')
      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Sales Automation Specialist specialist now',
        'sales-specialist'
      )
    })

    it('should handle transcript with confidence levels', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')

      // Set transcript with high confidence
      act(() => {
        result.current.setTranscript('deploy sales specialist', 0.95)
      })

      expect(result.current.transcript).toBe('deploy sales specialist')
      expect(result.current.confidence).toBe(0.95)

      // Process the transcript
      await act(async () => {
        result.current.processVoiceCommand(result.current.transcript)
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Sales Automation Specialist specialist now',
        'sales-specialist'
      )
    })

    it('should handle voice command timing and state transitions', async () => {
      const { result } = renderHook(() => useAppStore())
      const stateChanges: any[] = []
      
      const unsubscribe = useAppStore.subscribe((state) => {
        stateChanges.push({
          isListening: state.isListening,
          transcript: state.transcript,
          loading: state.loading,
          timestamp: Date.now()
        })
      })

      // Simulate voice input flow
      act(() => {
        result.current.setListening(true)
        result.current.setTranscript('deploy sales', 0.8)
      })

      await act(async () => {
        result.current.processVoiceCommand('deploy sales')
      })

      act(() => {
        result.current.setListening(false)
      })

      // Should see appropriate state transitions
      const listeningStates = stateChanges.map(s => s.isListening)
      expect(listeningStates).toContain(true)
      expect(listeningStates).toContain(false)

      unsubscribe()
    })
  })

  describe('Agent Information and Help Commands', () => {
    it('should provide sales specialist information via voice', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')

      await act(async () => {
        result.current.processVoiceCommand('tell me about sales automation specialist')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        expect.stringContaining('Sales Automation Specialist is a Solar Sales Automation Expert')
      )
      expect(mockSpeakResponse).toHaveBeenCalledWith(
        expect.stringContaining('$129.99')
      )
    })

    it('should create informational notifications for sales queries', async () => {
      const { result } = renderHook(() => useAppStore())

      await act(async () => {
        result.current.processVoiceCommand('what is sales specialist')
      })

      const notifications = result.current.notifications
      const infoNotification = notifications.find(n => n.type === 'info')
      
      expect(infoNotification).toBeDefined()
      expect(infoNotification?.title).toBe('About Sales Automation Specialist')
      expect(infoNotification?.message).toContain('Solar Sales Automation Expert')
    })

    it('should handle sales-specific help requests', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')

      await act(async () => {
        result.current.processVoiceCommand('help with sales')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        expect.stringContaining('I can deploy solar specialists by voice')
      )
    })
  })

  describe('Integration with TTS System', () => {
    it('should use Antoni voice for sales responses', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockTTS = jest.spyOn(elevenlabsService, 'textToSpeech')

      await act(async () => {
        await result.current.deployAgent('sales-specialist')
      })

      expect(mockTTS).toHaveBeenCalledWith(
        'Sales Automation Specialist has been successfully deployed',
        'sales-specialist'
      )
    })

    it('should handle TTS failures during sales deployment', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockTTS = jest.spyOn(elevenlabsService, 'textToSpeech')
        .mockRejectedValue(new Error('Antoni voice unavailable'))
      
      await act(async () => {
        await result.current.deployAgent('sales-specialist')
      })

      // Should still complete deployment
      const notifications = result.current.notifications
      const successNotification = notifications.find(n => n.type === 'success')
      expect(successNotification).toBeDefined()
      expect(successNotification?.message).toBe('Sales Automation Specialist has been successfully deployed')
      
      mockTTS.mockRestore()
    })

    it('should provide sales-specific voice feedback', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')

      await act(async () => {
        result.current.processVoiceCommand('deploy sales')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Sales Automation Specialist specialist now',
        'sales-specialist'
      )
      
      // Voice feedback should use Antoni's voice ID
      expect(mockSpeakResponse).toHaveBeenCalledWith(
        expect.any(String),
        'sales-specialist'
      )
    })
  })

  describe('Business Logic Validation', () => {
    it('should not be marked as popular (specialized sales tool)', () => {
      const { result } = renderHook(() => useAppStore())
      const salesSpecialist = result.current.agents.find(a => a.id === 'sales-specialist')
      
      expect(salesSpecialist?.isPopular).toBe(false)
    })

    it('should have appropriate success rate for sales conversion challenges', () => {
      const { result } = renderHook(() => useAppStore())
      const salesSpecialist = result.current.agents.find(a => a.id === 'sales-specialist')
      
      // Sales has inherent conversion challenges, so success rate should be realistic
      expect(salesSpecialist?.metrics.successRate).toBe(92)
      expect(salesSpecialist?.metrics.successRate).toBeLessThan(95)
      
      // But should still be competitive
      expect(salesSpecialist?.metrics.successRate).toBeGreaterThanOrEqual(90)
    })

    it('should have competitive pricing for sales market', () => {
      const { result } = renderHook(() => useAppStore())
      const salesSpecialist = result.current.agents.find(a => a.id === 'sales-specialist')
      
      // Should be priced competitively for sales teams
      expect(salesSpecialist?.price).toBe(129.99)
      expect(salesSpecialist?.price).toBeGreaterThan(100) // Professional tier
      expect(salesSpecialist?.price).toBeLessThan(150) // Accessible for sales teams
    })
  })

  describe('Error Handling and Resilience', () => {
    it('should handle malformed voice commands gracefully', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')

      await act(async () => {
        result.current.processVoiceCommand('deploy something sales related maybe')
      })

      // Should provide helpful fallback
      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Which specialist would you like to deploy? Say Commercial, Customer Success, Performance Analytics, Sales, or Utility Coordinator.'
      )
    })

    it('should maintain state consistency during voice processing errors', async () => {
      const { result } = renderHook(() => useAppStore())
      const originalState = { ...result.current }
      
      // Simulate error in voice processing
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      await act(async () => {
        result.current.processVoiceCommand('deploy sales with corrupted data')
      })
      
      // Core state should remain intact
      expect(result.current.agents).toEqual(originalState.agents)
      expect(result.current.selectedAgent).toBe(originalState.selectedAgent)
      
      consoleSpy.mockRestore()
    })
  })
})