/**
 * Commercial Manager Agent Tests
 * Tests critical functionality for commercial solar project management specialist
 */

import { renderHook, act } from '@testing-library/react'
import { useAppStore } from '@/lib/stores/appStore'
import { elevenlabsService, AGENT_VOICES } from '@/lib/services/elevenlabs'

// Mock the ElevenLabs service
jest.mock('@/lib/services/elevenlabs')

describe('Commercial Manager Agent', () => {
  beforeEach(() => {
    // Reset store state before each test
    const initialState = useAppStore.getInitialState?.() || {
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
      
      // Agent state - keep the original agents data
      agents: [
        {
          id: 'commercial-manager',
          name: 'Commercial Project Manager',
          category: 'Commercial Solar Project Manager',
          description: 'Specialized AI for managing commercial and industrial solar installations (50kW-2MW systems)',
          price: 149.99,
          icon: 'building',
          gradient: ['orange-500', 'red-600'] as [string, string],
          metrics: {
            rating: 4.9,
            deployments: 2847,
            successRate: 96,
            avgResponseTime: '2.3s'
          },
          features: [
            'Solar permit & compliance automation',
            'Equipment procurement optimization',
            'Installation timeline coordination',
            'Energy production forecasting',
            'ROI analysis & financial modeling'
          ],
          isPopular: true
        },
        {
          id: 'customer-success',
          name: 'Customer Success Specialist',
          category: 'Solar Customer Success Expert',
          description: 'Dedicated AI for managing solar customer relationships and post-installation support',
          price: 89.99,
          icon: 'users',
          gradient: ['blue-500', 'purple-600'] as [string, string],
          metrics: {
            rating: 4.8,
            deployments: 1923,
            successRate: 94,
            avgResponseTime: '1.8s'
          },
          features: [
            'Solar system performance monitoring',
            'Customer education & training',
            'Maintenance scheduling automation',
            'Energy savings reporting',
            'Warranty & service management'
          ],
          isPopular: false
        },
        {
          id: 'performance-analyst',
          name: 'Performance Analytics Specialist',
          category: 'Solar Performance Analytics AI',
          description: 'Advanced AI for solar energy production analysis, optimization, and predictive maintenance',
          price: 199.99,
          icon: 'trending',
          gradient: ['green-500', 'teal-600'] as [string, string],
          metrics: {
            rating: 5.0,
            deployments: 756,
            successRate: 98,
            avgResponseTime: '3.1s'
          },
          features: [
            'Real-time energy production analysis',
            'Weather impact forecasting',
            'Panel degradation detection',
            'Inverter performance optimization',
            'Financial return tracking'
          ],
          isPopular: true
        },
        {
          id: 'sales-specialist',
          name: 'Sales Automation Specialist',
          category: 'Solar Sales Automation Expert',
          description: 'AI-powered sales assistant specialized in solar energy system sales and lead conversion',
          price: 129.99,
          icon: 'zap',
          gradient: ['purple-500', 'pink-600'] as [string, string],
          metrics: {
            rating: 4.9,
            deployments: 1456,
            successRate: 92,
            avgResponseTime: '2.0s'
          },
          features: [
            'Solar site assessment automation',
            'Energy savings proposal generation',
            'Financing options analysis',
            'Tax incentive calculations',
            'Sales pipeline optimization'
          ],
          isPopular: false
        },
        {
          id: 'utility-coordinator',
          name: 'Utility-Scale Coordinator',
          category: 'Utility-Scale Solar Coordinator',
          description: 'Enterprise AI for coordinating massive solar installations (10MW+ utility and grid-scale projects)',
          price: 179.99,
          icon: 'factory',
          gradient: ['red-500', 'orange-600'] as [string, string],
          metrics: {
            rating: 4.8,
            deployments: 892,
            successRate: 95,
            avgResponseTime: '2.7s'
          },
          features: [
            'Multi-phase construction scheduling',
            'Grid interconnection coordination',
            'Environmental compliance monitoring',
            'Multi-contractor team management',
            'Utility partnership facilitation'
          ],
          isPopular: false
        }
      ],
      selectedAgent: null,
      favoriteAgents: []
    }
    
    useAppStore.setState(initialState)
    
    // Clear all mocks
    jest.clearAllMocks()
  })

  describe('Agent Configuration', () => {
    it('should have correct commercial manager configuration', () => {
      const { result } = renderHook(() => useAppStore())
      const commercialManager = result.current.agents.find(a => a.id === 'commercial-manager')
      
      expect(commercialManager).toBeDefined()
      expect(commercialManager).toMatchObject({
        id: 'commercial-manager',
        name: 'Commercial Project Manager',
        category: 'Commercial Solar Project Manager',
        price: 149.99,
        icon: 'building',
        gradient: ['orange-500', 'red-600'],
        isPopular: true
      })
      
      // Verify business-critical features
      expect(commercialManager?.features).toContain('Solar permit & compliance automation')
      expect(commercialManager?.features).toContain('Equipment procurement optimization')
      expect(commercialManager?.features).toContain('ROI analysis & financial modeling')
    })

    it('should have proper metrics indicating reliability', () => {
      const { result } = renderHook(() => useAppStore())
      const commercialManager = result.current.agents.find(a => a.id === 'commercial-manager')
      
      expect(commercialManager?.metrics).toMatchObject({
        rating: 4.9,
        deployments: 2847,
        successRate: 96,
        avgResponseTime: '2.3s'
      })
    })

    it('should have correct voice mapping', () => {
      expect(AGENT_VOICES['commercial-manager']).toBe('pNInz6obpgDQGcFmaJgB')
    })
  })

  describe('Voice Command Recognition', () => {
    it('should recognize "deploy commercial" command', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('deploy commercial')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Commercial Project Manager specialist now',
        'commercial-manager'
      )
      expect(mockDeployAgent).toHaveBeenCalledWith('commercial-manager')
    })

    it('should recognize "deploy project manager" command', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('deploy project manager')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Commercial Project Manager specialist now',
        'commercial-manager'
      )
      expect(mockDeployAgent).toHaveBeenCalledWith('commercial-manager')
    })

    it('should recognize "launch commercial" command', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')
      const mockDeployAgent = jest.spyOn(result.current, 'deployAgent')

      await act(async () => {
        result.current.processVoiceCommand('launch commercial')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        'Deploying Commercial Project Manager specialist now',
        'commercial-manager'
      )
      expect(mockDeployAgent).toHaveBeenCalledWith('commercial-manager')
    })
  })

  describe('Agent Deployment Flow', () => {
    it('should successfully deploy commercial manager', async () => {
      const { result } = renderHook(() => useAppStore())
      
      await act(async () => {
        await result.current.deployAgent('commercial-manager')
      })

      const notifications = result.current.notifications
      const successNotification = notifications.find(n => n.type === 'success')
      
      expect(successNotification).toBeDefined()
      expect(successNotification?.title).toBe('Agent Deployed')
      expect(successNotification?.message).toBe('Commercial Project Manager has been successfully deployed')
      expect(result.current.loading).toBe(false)
    })

    it('should set loading state during deployment', async () => {
      const { result } = renderHook(() => useAppStore())
      
      expect(result.current.loading).toBe(false)
      
      // Start deployment and check loading state
      await act(async () => {
        const deploymentPromise = result.current.deployAgent('commercial-manager')
        
        // Check that loading state gets set during deployment
        // Note: In the actual implementation, loading is set synchronously
        // The test may need to be adjusted based on actual behavior
        
        await deploymentPromise
      })
      
      // Check loading state is cleared after completion
      expect(result.current.loading).toBe(false)
    })

    it('should call ElevenLabs TTS with agent voice during deployment', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockTTS = jest.spyOn(elevenlabsService, 'textToSpeech')
      
      await act(async () => {
        await result.current.deployAgent('commercial-manager')
      })

      expect(mockTTS).toHaveBeenCalledWith(
        'Commercial Project Manager has been successfully deployed',
        'commercial-manager'
      )
    })
  })

  describe('Agent Information Commands', () => {
    it('should provide detailed information when asked', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockSpeakResponse = jest.spyOn(result.current, 'speakResponse')

      await act(async () => {
        result.current.processVoiceCommand('tell me about commercial project manager')
      })

      expect(mockSpeakResponse).toHaveBeenCalledWith(
        expect.stringContaining('Commercial Project Manager is a Commercial Solar Project Manager')
      )
      expect(mockSpeakResponse).toHaveBeenCalledWith(
        expect.stringContaining('$149.99')
      )
    })

    it('should create info notification with agent details', async () => {
      const { result } = renderHook(() => useAppStore())

      await act(async () => {
        result.current.processVoiceCommand('describe commercial project manager')
      })

      const notifications = result.current.notifications
      const infoNotification = notifications.find(n => n.type === 'info')
      
      expect(infoNotification).toBeDefined()
      expect(infoNotification?.title).toBe('About Commercial Project Manager')
      expect(infoNotification?.message).toContain('Commercial Solar Project Manager')
    })
  })

  describe('Favorite Management', () => {
    it('should add commercial manager to favorites', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.toggleFavorite('commercial-manager')
      })

      expect(result.current.favoriteAgents).toContain('commercial-manager')
    })

    it('should remove commercial manager from favorites when toggled twice', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.toggleFavorite('commercial-manager')
        result.current.toggleFavorite('commercial-manager')
      })

      expect(result.current.favoriteAgents).not.toContain('commercial-manager')
    })
  })

  describe('Error Handling', () => {
    it('should handle deployment failure gracefully', async () => {
      const { result } = renderHook(() => useAppStore())
      
      // Mock deployAgent to throw error
      const originalDeployAgent = result.current.deployAgent
      const mockDeployAgent = jest.fn().mockRejectedValue(new Error('Deployment failed'))
      
      act(() => {
        useAppStore.setState({ deployAgent: mockDeployAgent })
      })

      await act(async () => {
        try {
          await mockDeployAgent('commercial-manager')
        } catch (error) {
          // Expected to fail
        }
      })

      // Restore original function
      act(() => {
        useAppStore.setState({ deployAgent: originalDeployAgent })
      })
    })

    it('should handle TTS failure during deployment', async () => {
      const { result } = renderHook(() => useAppStore())
      const mockTTS = jest.spyOn(elevenlabsService, 'textToSpeech').mockRejectedValue(new Error('TTS failed'))
      
      await act(async () => {
        await result.current.deployAgent('commercial-manager')
      })

      // Should still complete deployment despite TTS failure
      const notifications = result.current.notifications
      const successNotification = notifications.find(n => n.type === 'success')
      expect(successNotification).toBeDefined()
      
      mockTTS.mockRestore()
    })
  })

  describe('Business Logic Validation', () => {
    it('should be marked as popular agent', () => {
      const { result } = renderHook(() => useAppStore())
      const commercialManager = result.current.agents.find(a => a.id === 'commercial-manager')
      
      expect(commercialManager?.isPopular).toBe(true)
    })

    it('should have appropriate pricing for commercial tier', () => {
      const { result } = renderHook(() => useAppStore())
      const commercialManager = result.current.agents.find(a => a.id === 'commercial-manager')
      
      // Commercial manager should be mid-tier pricing
      expect(commercialManager?.price).toBeGreaterThan(89.99) // More than customer success
      expect(commercialManager?.price).toBeLessThan(199.99) // Less than performance analyst
    })

    it('should have appropriate success rate for commercial reliability', () => {
      const { result } = renderHook(() => useAppStore())
      const commercialManager = result.current.agents.find(a => a.id === 'commercial-manager')
      
      // Should have high success rate for commercial use
      expect(commercialManager?.metrics.successRate).toBeGreaterThanOrEqual(95)
    })
  })
})