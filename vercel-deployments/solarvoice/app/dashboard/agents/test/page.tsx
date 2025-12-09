"use client"

import dynamic from 'next/dynamic'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic,
  Volume2,
  Play,
  Download,
  Globe,
  MessageSquare,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle,
  Users,
  Settings,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { VoiceVisualizer } from '@/components/voice/VoiceVisualizer'
import { elevenlabsService, AGENT_VOICES } from '@/lib/services/elevenlabs'

// Pre-built equipment models with voice configurations
const EQUIPMENT_MODELS = [
  {
    id: 'commercial-manager',
    name: 'Commercial Manager',
    description: 'Handles large commercial solar projects',
    voiceId: AGENT_VOICES['commercial-manager'],
    category: 'Commercial',
    capabilities: ['permit_checking', 'roi_calculation', 'project_management']
  },
  {
    id: 'customer-success',
    name: 'Customer Success Specialist',
    description: 'Ensures customer satisfaction and project success',
    voiceId: AGENT_VOICES['customer-success'],
    category: 'Customer Service',
    capabilities: ['customer_support', 'satisfaction_tracking', 'issue_resolution']
  },
  {
    id: 'performance-analyst',
    name: 'Performance Analyst',
    description: 'Analyzes system performance and optimization',
    voiceId: AGENT_VOICES['performance-analyst'],
    category: 'Analytics',
    capabilities: ['performance_analysis', 'optimization', 'reporting']
  },
  {
    id: 'sales-specialist',
    name: 'Sales Specialist',
    description: 'Drives sales and lead conversion',
    voiceId: AGENT_VOICES['sales-specialist'],
    category: 'Sales',
    capabilities: ['lead_qualification', 'proposal_generation', 'closing']
  },
  {
    id: 'utility-coordinator',
    name: 'Utility Coordinator',
    description: 'Manages utility interconnections and regulations',
    voiceId: AGENT_VOICES['utility-coordinator'],
    category: 'Utility',
    capabilities: ['interconnection', 'regulatory_compliance', 'tariff_analysis']
  },
  {
    id: 'residential-advisor',
    name: 'Residential Advisor',
    description: 'Specializes in residential solar installations',
    voiceId: 'EXAVITQu4vr4xnSDxMaL',
    category: 'Residential',
    capabilities: ['home_assessment', 'financing_options', 'installation_planning']
  },
  {
    id: 'battery-specialist',
    name: 'Battery Storage Specialist',
    description: 'Expert in energy storage solutions',
    voiceId: 'VR6AewLTigWG4xSOukaG',
    category: 'Storage',
    capabilities: ['battery_sizing', 'backup_systems', 'grid_services']
  },
  {
    id: 'compliance-officer',
    name: 'Compliance Officer',
    description: 'Ensures regulatory compliance and safety',
    voiceId: 'MF3mGyEYCl7XYWbV9V6O',
    category: 'Compliance',
    capabilities: ['code_compliance', 'safety_protocols', 'documentation']
  }
]

// Sample commands/prompts for users to try
const SAMPLE_COMMANDS = {
  en: [
    "Calculate ROI for a 500kW commercial system",
    "What permits do I need for this project?",
    "Analyze the performance data from last month",
    "Generate a proposal for this customer",
    "Check utility interconnection requirements",
    "What incentives are available in California?",
    "Schedule a site assessment",
    "Review the project timeline"
  ],
  es: [
    "Calcula el ROI para un sistema comercial de 500kW",
    "¿Qué permisos necesito para este proyecto?",
    "Analiza los datos de rendimiento del mes pasado",
    "Genera una propuesta para este cliente",
    "Verifica los requisitos de interconexión",
    "¿Qué incentivos están disponibles en California?",
    "Programar una evaluación del sitio",
    "Revisar el cronograma del proyecto"
  ]
}

interface ConversationItem {
  id: string
  timestamp: Date
  type: 'user' | 'agent'
  text: string
  confidence?: number
  duration?: number
  language: string
  agentId?: string
}

interface VoiceTestStats {
  totalInteractions: number
  totalDuration: number
  averageConfidence: number
  errorCount: number
  languageBreakdown: { [key: string]: number }
}

function VoiceTestPage() {
  // Core state
  const [selectedAgent, setSelectedAgent] = useState(EQUIPMENT_MODELS[0])
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'es'>('en')
  const [conversation, setConversation] = useState<ConversationItem[]>([])
  const [sessionId] = useState(() => `session_${Date.now()}`)
  
  // Voice recognition state
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  
  // UI state
  const [isServiceAvailable, setIsServiceAvailable] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('test')

  // Settings state
  const [voiceSettings, setVoiceSettings] = useState({
    stability: 0.5,
    similarityBoost: 0.5,
    style: 0.5,
    speakerBoost: true,
    autoPlay: true
  })
  
  // Statistics
  const [stats, setStats] = useState<VoiceTestStats>({
    totalInteractions: 0,
    totalDuration: 0,
    averageConfidence: 0,
    errorCount: 0,
    languageBreakdown: { en: 0, es: 0 }
  })
  
  // Refs
  const conversationEndRef = useRef<HTMLDivElement>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      if (!SpeechRecognition) return
      
      const recognitionInstance = new SpeechRecognition()
      
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = true
      recognitionInstance.lang = currentLanguage === 'en' ? 'en-US' : 'es-ES'
      
      recognitionInstance.onstart = () => {
        console.log('🎤 Speech recognition started')
        setError(null)
      }
      
      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex
        const result = event.results?.[current]?.[0]
        if (!result) return

        const transcriptText = result.transcript
        const confidenceValue = result.confidence ?? 0

        setTranscript(transcriptText)
        setConfidence(confidenceValue)

        if (event.results?.[current]?.isFinal) {
          handleUserInput(transcriptText, confidenceValue)
        }
      }
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setError(`Speech recognition error: ${event.error}`)
        setIsListening(false)
      }
      
      recognitionInstance.onend = () => {
        setIsListening(false)
      }
      
      setRecognition(recognitionInstance)
    }
  }, [currentLanguage])

  // Check service availability
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkService = async () => {
        try {
          const available = await elevenlabsService.testConnection()
          setIsServiceAvailable(available)
        } catch (error) {
          console.error('Service check failed:', error)
          setIsServiceAvailable(false)
        }
      }
      
      checkService()
    }
  }, [])

  // Auto-scroll conversation
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation])

  // Handle user voice input
  const handleUserInput = useCallback(async (text: string, confidence: number) => {
    const userMessage: ConversationItem = {
      id: `user_${Date.now()}`,
      timestamp: new Date(),
      type: 'user',
      text,
      confidence,
      language: currentLanguage,
    }
    
    setConversation(prev => [...prev, userMessage])
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalInteractions: prev.totalInteractions + 1,
      averageConfidence: (prev.averageConfidence + confidence) / 2,
      languageBreakdown: {
        ...prev.languageBreakdown,
        [currentLanguage]: (prev.languageBreakdown[currentLanguage] ?? 0) + 1
      }
    }))
    
    // Generate agent response
    await generateAgentResponse(text)
  }, [currentLanguage, selectedAgent])

  // Generate agent response
  const generateAgentResponse = async (userInput: string) => {
    try {
      setIsSpeaking(true)
      
      // Simple response generation (in production, this would use AI)
      const responses = {
        en: [
          `I understand you want to ${userInput.toLowerCase()}. Let me help you with that.`,
          `Based on your request about "${userInput}", here's what I recommend...`,
          `I can assist with ${userInput.toLowerCase()}. Let me provide the information you need.`,
          `Regarding your question about "${userInput}", here are the key points...`
        ],
        es: [
          `Entiendo que quieres ${userInput.toLowerCase()}. Permíteme ayudarte con eso.`,
          `Basado en tu solicitud sobre "${userInput}", esto es lo que recomiendo...`,
          `Puedo ayudarte con ${userInput.toLowerCase()}. Permíteme proporcionarte la información que necesitas.`,
          `Con respecto a tu pregunta sobre "${userInput}", estos son los puntos clave...`
        ]
      }
      
      const langResponses = responses[currentLanguage]
      const responseText = langResponses[Math.floor(Math.random() * langResponses.length)] ?? 'I understand your request.'

      // Add agent message to conversation
      const agentMessage: ConversationItem = {
        id: `agent_${Date.now()}`,
        timestamp: new Date(),
        type: 'agent',
        text: responseText,
        language: currentLanguage,
        agentId: selectedAgent?.id ?? ''
      }

      setConversation(prev => [...prev, agentMessage])

      // TODO: Add voice synthesis when ElevenLabs is configured
      
    } catch (error) {
      console.error('Error generating response:', error)
      setError('Failed to generate agent response')
      setStats(prev => ({ ...prev, errorCount: prev.errorCount + 1 }))
    } finally {
      setIsSpeaking(false)
    }
  }

  // Toggle listening
  const toggleListening = async () => {
    if (!recognition) {
      setError('Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari.')
      return
    }
    
    try {
      if (isListening) {
        recognition.stop()
        setIsListening(false)
      } else {
        // Request microphone permission with better error handling
        if (typeof window !== 'undefined' && navigator.mediaDevices) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            // Release the stream immediately after permission check
            stream.getTracks().forEach(track => track.stop())
          } catch (permissionError: any) {
            console.error('Microphone permission error:', permissionError)
            
            // Provide specific error messages based on error type
            if (permissionError.name === 'NotAllowedError') {
              setError('🎤 Microphone access denied. Please click the lock icon in your browser address bar and allow microphone access, then refresh the page.')
            } else if (permissionError.name === 'NotFoundError') {
              setError('🎤 No microphone found. Please connect a microphone and refresh the page.')
            } else if (permissionError.name === 'NotReadableError') {
              setError('🎤 Microphone is being used by another application. Please close other apps using the microphone.')
            } else if (permissionError.name === 'SecurityError') {
              setError('🔒 Security error: This page must be served over HTTPS to access the microphone.')
            } else {
              setError(`🎤 Microphone error: ${permissionError.message}. Please check your browser settings.`)
            }
            return
          }
        }
        
        recognition.lang = currentLanguage === 'en' ? 'en-US' : 'es-ES'
        recognition.start()
        setIsListening(true)
        setTranscript('')
        setConfidence(0)
      }
    } catch (error: any) {
      console.error('Speech recognition error:', error)
      setError(`Voice recognition error: ${error.message}. Please try again.`)
    }
  }

  // Try sample command
  const trySampleCommand = (command: string) => {
    handleUserInput(command, 0.95) // High confidence for sample commands
  }

  // Clear conversation
  const clearConversation = () => {
    setConversation([])
    setStats({
      totalInteractions: 0,
      totalDuration: 0,
      averageConfidence: 0,
      errorCount: 0,
      languageBreakdown: { en: 0, es: 0 }
    })
  }

  // Export conversation
  const exportConversation = () => {
    const data = {
      sessionId,
      agent: selectedAgent,
      language: currentLanguage,
      conversation,
      stats,
      timestamp: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `voice-test-session-${sessionId}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto py-8 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-solar-500 via-energy-500 to-ai-500">
          Voice Testing Interface
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Test your custom voice agents and the 8 pre-built equipment models with real-time voice recognition,
          synthesis, and comprehensive analytics.
        </p>
        
        {/* Service status */}
        <div className="flex items-center justify-center space-x-2">
          {isServiceAvailable ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-600">Voice service available</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-600">Voice service unavailable</span>
            </>
          )}
        </div>
      </div>

      {/* Main content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
          <TabsTrigger value="test">Voice Test</TabsTrigger>
          <TabsTrigger value="conversation">Conversation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Voice Test Tab */}
        <TabsContent value="test" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Agent Selection */}
            <Card className="xl:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Select Agent</span>
                </CardTitle>
                <CardDescription>
                  Choose from 8 pre-built equipment models or your custom agents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={selectedAgent?.id ?? ''}
                  onValueChange={(value: string) => setSelectedAgent(EQUIPMENT_MODELS.find(m => m.id === value) || EQUIPMENT_MODELS[0])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EQUIPMENT_MODELS.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{model.category}</Badge>
                          <span>{model.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedAgent && (
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <h4 className="font-semibold">{selectedAgent.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedAgent.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedAgent.capabilities.map((cap) => (
                      <Badge key={cap} variant="secondary" className="text-xs">
                        {cap.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                )}

                {/* Language Selection */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium">
                    <Globe className="w-4 h-4" />
                    <span>Language</span>
                  </label>
                  <Select value={currentLanguage} onValueChange={(value: 'en' | 'es') => setCurrentLanguage(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Voice Interface */}
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mic className="w-5 h-5" />
                  <span>Voice Interface</span>
                </CardTitle>
                <CardDescription>
                  Click the microphone to start voice recognition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-6">
                  {/* Error display */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="w-full p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-800">Error</p>
                          <p className="text-sm text-red-600">{error}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setError(null)}
                          className="ml-auto"
                        >
                          ×
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Voice Visualizer */}
                  <VoiceVisualizer
                    isListening={isListening}
                    onToggleListening={toggleListening}
                    transcript={transcript}
                    confidence={confidence}
                    className="w-full"
                  />

                  {/* Status indicators */}
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Activity className={`w-4 h-4 ${isListening ? 'text-green-500' : 'text-gray-400'}`} />
                      <span className={isListening ? 'text-green-600' : 'text-muted-foreground'}>
                        {isListening ? 'Listening' : 'Ready'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-blue-500' : 'text-gray-400'}`} />
                      <span className={isSpeaking ? 'text-blue-600' : 'text-muted-foreground'}>
                        {isSpeaking ? 'Speaking' : 'Quiet'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {currentLanguage === 'en' ? 'English' : 'Español'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sample Commands */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Sample Commands</span>
              </CardTitle>
              <CardDescription>
                Try these sample commands to test your voice agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SAMPLE_COMMANDS[currentLanguage].map((command, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto p-4 text-left"
                    onClick={() => trySampleCommand(command)}
                    disabled={isListening || isSpeaking}
                  >
                    <div className="flex items-start space-x-3">
                      <Play className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{command}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversation Tab */}
        <TabsContent value="conversation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Conversation History</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={exportConversation}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm" variant="outline" onClick={clearConversation}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Session ID: {sessionId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 w-full">
                <div className="space-y-4 p-4">
                  {conversation.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        item.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <div className="flex items-start space-x-2">
                          <div className="flex-1">
                            <p className="text-sm">{item.text}</p>
                            <div className="flex items-center space-x-2 mt-2 text-xs opacity-70">
                              <Clock className="w-3 h-3" />
                              <span>{item.timestamp.toLocaleTimeString()}</span>
                              {item.confidence && (
                                <>
                                  <span>•</span>
                                  <span>{Math.round(item.confidence * 100)}% confidence</span>
                                </>
                              )}
                              <span>•</span>
                              <span>{item.language.toUpperCase()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {conversation.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No conversation yet. Start by testing voice commands.</p>
                    </div>
                  )}
                  <div ref={conversationEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalInteractions}</div>
                <p className="text-xs text-muted-foreground">
                  Voice conversations this session
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(stats.averageConfidence * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Voice recognition accuracy
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {stats.totalInteractions > 0 
                    ? Math.round((stats.errorCount / stats.totalInteractions) * 100)
                    : 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.errorCount} errors total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Session Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(stats.totalDuration / 60)}m
                </div>
                <p className="text-xs text-muted-foreground">
                  Active testing time
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Language Breakdown</CardTitle>
              <CardDescription>
                Distribution of voice interactions by language
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>English</span>
                  <span>{stats.languageBreakdown?.en ?? 0} interactions</span>
                </div>
                <Progress
                  value={stats.totalInteractions > 0
                    ? ((stats.languageBreakdown?.en ?? 0) / stats.totalInteractions) * 100
                    : 0
                  }
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Spanish</span>
                  <span>{stats.languageBreakdown?.es ?? 0} interactions</span>
                </div>
                <Progress
                  value={stats.totalInteractions > 0
                    ? ((stats.languageBreakdown?.es ?? 0) / stats.totalInteractions) * 100
                    : 0
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Voice Settings</span>
              </CardTitle>
              <CardDescription>
                Customize voice synthesis parameters for optimal performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Stability: {voiceSettings.stability}
                  </label>
                  <Slider
                    value={[voiceSettings.stability]}
                    onValueChange={(values: number[]) => setVoiceSettings(prev => ({ ...prev, stability: values[0] ?? prev.stability }))}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Higher values make the voice more consistent but less expressive
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Similarity Boost: {voiceSettings.similarityBoost}
                  </label>
                  <Slider
                    value={[voiceSettings.similarityBoost]}
                    onValueChange={(values: number[]) => setVoiceSettings(prev => ({ ...prev, similarityBoost: values[0] ?? prev.similarityBoost }))}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Higher values make the voice more similar to the original speaker
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Style: {voiceSettings.style}
                  </label>
                  <Slider
                    value={[voiceSettings.style]}
                    onValueChange={(values: number[]) => setVoiceSettings(prev => ({ ...prev, style: values[0] ?? prev.style }))}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Higher values add more expressiveness and emotion to the voice
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Speaker Boost</label>
                    <p className="text-xs text-muted-foreground">
                      Enhances the speaker's voice characteristics
                    </p>
                  </div>
                  <Button
                    variant={voiceSettings.speakerBoost ? "default" : "outline"}
                    size="sm"
                    onClick={() => setVoiceSettings(prev => ({ ...prev, speakerBoost: !prev.speakerBoost }))}
                  >
                    {voiceSettings.speakerBoost ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Auto-play Responses</label>
                    <p className="text-xs text-muted-foreground">
                      Automatically play agent voice responses
                    </p>
                  </div>
                  <Button
                    variant={voiceSettings.autoPlay ? "default" : "outline"}
                    size="sm"
                    onClick={() => setVoiceSettings(prev => ({ ...prev, autoPlay: !prev.autoPlay }))}
                  >
                    {voiceSettings.autoPlay ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>
                Voice service capabilities and browser support
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Speech Recognition:</strong> {
                    'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
                      ? '✅ Supported'
                      : '❌ Not supported'
                  }
                </div>
                <div>
                  <strong>Speech Synthesis:</strong> {
                    'speechSynthesis' in window
                      ? '✅ Supported'
                      : '❌ Not supported'
                  }
                </div>
                <div>
                  <strong>MediaRecorder:</strong> {
                    'MediaRecorder' in window
                      ? '✅ Supported'
                      : '❌ Not supported'
                  }
                </div>
                <div>
                  <strong>ElevenLabs Service:</strong> {
                    isServiceAvailable
                      ? '✅ Available'
                      : '❌ Unavailable'
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Dynamic import to prevent SSR issues
const VoiceTestPageNoSSR = dynamic(() => Promise.resolve(VoiceTestPage), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto py-8 space-y-8 max-w-7xl">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-solar-500 via-energy-500 to-ai-500">
          Voice Testing Interface
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Loading voice testing interface...
        </p>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
})

export default VoiceTestPageNoSSR