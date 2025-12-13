"use client"

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Agent IDs for voice selection
type AgentId = 'commercial-manager' | 'customer-success' | 'performance-analyst' | 'sales-specialist' | 'utility-coordinator'

// Speech API Types imported from @/types/speech.d.ts (global declarations)

// Types
interface Agent {
  id: string
  name: string
  category: string
  description: string
  price: number
  icon: string
  gradient: [string, string]
  metrics: {
    rating: number
    deployments: number
    successRate: number
    avgResponseTime: string
  }
  features: string[]
  isPopular?: boolean
}

interface VoiceState {
  isListening: boolean
  transcript: string
  confidence: number
  isSupported: boolean
  error: string | null
}

interface UIState {
  theme: 'light' | 'dark' | 'auto'
  sidebarOpen: boolean
  notifications: Notification[]
  loading: boolean
  currentView: 'marketplace' | 'dashboard' | 'agents' | 'settings'
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
}

interface AppState extends VoiceState, UIState {
  // Agents
  agents: Agent[]
  selectedAgent: Agent | null
  favoriteAgents: string[]
  
  // Actions
  setListening: (listening: boolean) => void
  setTranscript: (transcript: string, confidence: number) => void
  setVoiceError: (error: string | null) => void
  
  selectAgent: (agent: Agent | null) => void
  toggleFavorite: (agentId: string) => void
  
  setTheme: (theme: 'light' | 'dark' | 'auto') => void
  toggleSidebar: () => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  setLoading: (loading: boolean) => void
  setCurrentView: (view: UIState['currentView']) => void
  
  // Async actions
  initializeVoiceRecognition: () => Promise<void>
  startListening: () => Promise<void>
  stopListening: () => void
  deployAgent: (agentId: string) => Promise<void>
  processVoiceCommand: (command: string) => void
  speakResponse: (text: string, agentId?: AgentId) => void
}

// Initial agent data
const initialAgents: Agent[] = [
  {
    id: 'commercial-manager',
    name: 'Commercial Project Manager',
    category: 'Commercial Solar Project Manager',
    description: 'Specialized AI for managing commercial and industrial solar installations (50kW-2MW systems)',
    price: 149.99,
    icon: 'building',
    gradient: ['orange-500', 'red-600'],
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
    gradient: ['blue-500', 'purple-600'],
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
    gradient: ['green-500', 'teal-600'],
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
    gradient: ['purple-500', 'pink-600'],
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
    gradient: ['red-500', 'orange-600'],
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
]

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
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
        agents: initialAgents,
        selectedAgent: null,
        favoriteAgents: [],
        
        // Voice actions
        setListening: (listening) => 
          set({ isListening: listening }),
          
        setTranscript: (transcript, confidence) => 
          set({ transcript, confidence }),
          
        setVoiceError: (error) => 
          set({ error }),
          
        // Agent actions
        selectAgent: (agent) => 
          set({ selectedAgent: agent }),
          
        toggleFavorite: (agentId) => 
          set((state) => ({
            favoriteAgents: state.favoriteAgents.includes(agentId)
              ? state.favoriteAgents.filter(id => id !== agentId)
              : [...state.favoriteAgents, agentId]
          })),
          
        // UI actions
        setTheme: (theme) => 
          set({ theme }),
          
        toggleSidebar: () => 
          set((state) => ({ sidebarOpen: !state.sidebarOpen })),
          
        addNotification: (notification) => 
          set((state) => ({
            notifications: [
              ...state.notifications,
              {
                ...notification,
                id: Math.random().toString(36).substr(2, 9),
                timestamp: new Date()
              }
            ]
          })),
          
        removeNotification: (id) => 
          set((state) => ({
            notifications: state.notifications.filter(n => n.id !== id)
          })),
          
        setLoading: (loading) => 
          set({ loading }),
          
        setCurrentView: (view) => 
          set({ currentView: view }),
          
        // Async actions
        initializeVoiceRecognition: async () => {
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
          
          if (!SpeechRecognition) {
            set({ isSupported: false, error: 'Speech recognition not supported' })
            return
          }
          
          // Initialize speech recognition
          const recognition = new SpeechRecognition()
          recognition.continuous = true
          recognition.interimResults = true
          recognition.lang = 'en-US'
          
          recognition.onstart = () => {
            set({ isListening: true, error: null })
          }
          
          recognition.onresult = (event: SpeechRecognitionEvent) => {
            let finalTranscript = ''
            let interimTranscript = ''

            for (let i = event.resultIndex; i < event.results.length; i++) {
              const result = event.results[i]
              if (!result) continue
              const alternative = result[0]
              if (!alternative) continue

              const transcript = alternative.transcript
              const confidence = alternative.confidence

              if (result.isFinal) {
                finalTranscript += transcript
                set({ transcript: finalTranscript, confidence: confidence || 0 })

                // Process voice commands
                get().processVoiceCommand(finalTranscript.toLowerCase().trim())
              } else {
                interimTranscript += transcript
                set({ transcript: interimTranscript, confidence: confidence || 0 })
              }
            }
          }

          recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            const errorMessage = event.error === 'no-speech' 
              ? 'No speech detected. Please try again.'
              : `Speech recognition error: ${event.error}`
            
            set({ error: errorMessage, isListening: false })
            get().addNotification({
              type: 'error',
              title: 'Voice Recognition Error',
              message: errorMessage
            })
          }
          
          recognition.onend = () => {
            set({ isListening: false })
          }
          
          // Store recognition instance globally
          ;(window as any).speechRecognition = recognition
          set({ isSupported: true, error: null })
        },
        
        startListening: async () => {
          const { isSupported } = get()
          if (!isSupported) {
            get().addNotification({
              type: 'error',
              title: 'Voice Not Supported',
              message: 'Speech recognition is not supported in this browser'
            })
            return
          }
          
          try {
            // Request microphone permission explicitly
            const permission = await navigator.mediaDevices.getUserMedia({ audio: true })
            permission.getTracks().forEach(track => track.stop()) // Stop the stream immediately
            
            const recognition = (window as any).speechRecognition
            if (recognition) {
              // Clear any previous state
              set({ error: null, transcript: '' })
              
              recognition.start()
              get().addNotification({
                type: 'success',
                title: 'Voice Activated',
                message: 'Microphone ready - speak your command...'
              })
            } else {
              throw new Error('Speech recognition not available')
            }
          } catch (error: any) {
            const errorMessage = error.name === 'NotAllowedError' 
              ? 'Microphone permission denied. Please allow microphone access.'
              : error.name === 'NotFoundError'
              ? 'No microphone found. Please connect a microphone.'
              : 'Failed to start voice recognition: ' + error.message
              
            set({ error: errorMessage, isListening: false })
            get().addNotification({
              type: 'error',
              title: 'Voice Error',
              message: errorMessage
            })
          }
        },
        
        stopListening: () => {
          try {
            const recognition = (window as any).speechRecognition
            if (recognition) {
              recognition.stop()
            }
            set({ isListening: false, transcript: '' })
          } catch (error) {
            set({ isListening: false, transcript: '' })
          }
        },
        
        deployAgent: async (agentId) => {
          const agent = get().agents.find(a => a.id === agentId)
          if (!agent) return
          
          set({ loading: true })
          
          try {
            // Simulate deployment API call
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            const successMessage = `${agent.name} has been successfully deployed`
            get().addNotification({
              type: 'success',
              title: 'Agent Deployed',
              message: successMessage
            })
            
            // Speak deployment confirmation with agent's voice
            get().speakResponse(successMessage, agent.id as AgentId)
          } catch (error) {
            const errorMessage = `Failed to deploy ${agent.name}`
            get().addNotification({
              type: 'error',
              title: 'Deployment Failed',
              message: errorMessage
            })
            get().speakResponse(errorMessage)
          } finally {
            set({ loading: false })
          }
        },

        processVoiceCommand: (command: string) => {
          const { agents } = get()
          
          // Agent deployment commands
          if (command.includes('deploy') || command.includes('launch') || command.includes('start')) {
            // Extract agent name from command
            const agentKeywords = {
              'commercial': 'commercial-manager',
              'project manager': 'commercial-manager',
              'customer': 'customer-success',
              'customer success': 'customer-success',
              'performance': 'performance-analyst',
              'analytics': 'performance-analyst',
              'sales': 'sales-specialist',
              'utility': 'utility-coordinator',
              'coordinator': 'utility-coordinator'
            }
            
            for (const [keyword, agentId] of Object.entries(agentKeywords)) {
              if (command.includes(keyword)) {
                const agent = agents.find(a => a.id === agentId)
                if (agent) {
                  get().speakResponse(`Deploying ${agent.name} specialist now`, agentId as AgentId)
                  get().deployAgent(agentId)
                  return
                }
              }
            }
            
            // Generic deploy command
            get().speakResponse('Which specialist would you like to deploy? Say Commercial, Customer Success, Performance Analytics, Sales, or Utility Coordinator.')
            return
          }
          
          // Navigation commands
          if (command.includes('marketplace') || command.includes('browse agents')) {
            get().setCurrentView('marketplace')
            get().speakResponse('Navigating to agent marketplace')
            return
          }
          
          if (command.includes('dashboard')) {
            get().setCurrentView('dashboard')
            get().speakResponse('Opening dashboard')
            return
          }
          
          if (command.includes('settings')) {
            get().setCurrentView('settings')
            get().speakResponse('Opening settings')
            return
          }
          
          // Help commands
          if (command.includes('help') || command.includes('what can you do')) {
            const helpMessage = 'I can deploy solar specialists by voice. Say "deploy commercial manager" or "launch customer success". You can also say "marketplace", "dashboard", or "settings" to navigate.'
            get().speakResponse(helpMessage)
            get().addNotification({
              type: 'info',
              title: 'Voice Commands',
              message: helpMessage
            })
            return
          }
          
          // Agent information commands
          if (command.includes('tell me about') || command.includes('what is') || command.includes('describe')) {
            for (const agent of agents) {
              if (command.includes(agent.name.toLowerCase())) {
                const description = `${agent.name} is a ${agent.category} that ${agent.description.toLowerCase()}. It costs $${agent.price} per deployment.`
                get().speakResponse(description)
                get().addNotification({
                  type: 'info',
                  title: `About ${agent.name}`,
                  message: description
                })
                return
              }
            }
          }
          
          // Theme commands
          if (command.includes('dark mode') || command.includes('dark theme')) {
            get().setTheme('dark')
            get().speakResponse('Switching to dark mode')
            return
          }
          
          if (command.includes('light mode') || command.includes('light theme')) {
            get().setTheme('light')
            get().speakResponse('Switching to light mode')
            return
          }
          
          // Default response for unrecognized commands
          get().speakResponse('I didn\'t understand that command. Try saying "help" to learn what I can do.')
          get().addNotification({
            type: 'warning',
            title: 'Command Not Recognized',
            message: 'Say "help" to see available voice commands'
          })
        },

        speakResponse: (text: string, _agentId?: AgentId) => {
          // Browser TTS implementation
          get().addNotification({
            type: 'info',
            title: 'AI Speaking',
            message: text
          })

          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel()

            const utterance = new SpeechSynthesisUtterance(text)
            utterance.rate = 0.9
            utterance.pitch = 1.0
            utterance.volume = 0.8

            const voices = window.speechSynthesis.getVoices()
            const preferredVoice = voices.find(voice =>
              voice.name.includes('Google') ||
              voice.name.includes('Enhanced') ||
              voice.name.includes('Neural')
            )

            if (preferredVoice) {
              utterance.voice = preferredVoice
            }

            window.speechSynthesis.speak(utterance)
          }
        }
      }),
      {
        name: 'solarvoice-app-store',
        partialize: (state) => ({
          theme: state.theme,
          favoriteAgents: state.favoriteAgents,
          currentView: state.currentView
        })
      }
    ),
    {
      name: 'SolarVoice App Store'
    }
  )
)