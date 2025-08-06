/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import VoiceTestPage from '@/app/dashboard/agents/test/page'

// Mock the dynamic import
jest.mock('next/dynamic', () => {
  return function dynamic(dynamicFunction: any, options: any) {
    const Component = dynamicFunction()
    return Component
  }
})

// Mock the voice services
jest.mock('@/lib/services/elevenlabs', () => ({
  elevenlabsService: {
    testConnection: jest.fn().mockResolvedValue(true),
    textToSpeech: jest.fn().mockResolvedValue(undefined),
  },
  AGENT_VOICES: {
    'commercial-manager': 'voice-id-1',
    'customer-success': 'voice-id-2',
    'performance-analyst': 'voice-id-3',
    'sales-specialist': 'voice-id-4',
    'utility-coordinator': 'voice-id-5',
  },
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    button: 'button',
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock speech recognition
Object.defineProperty(window, 'webkitSpeechRecognition', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    continuous: false,
    interimResults: false,
    lang: 'en-US',
    start: jest.fn(),
    stop: jest.fn(),
    abort: jest.fn(),
    onstart: null,
    onend: null,
    onresult: null,
    onerror: null,
  })),
})

// Mock navigator.mediaDevices
Object.defineProperty(navigator, 'mediaDevices', {
  writable: true,
  value: {
    getUserMedia: jest.fn().mockResolvedValue({
      getTracks: () => [],
      stop: jest.fn(),
    }),
  },
})

describe('Voice Test Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the voice testing interface', async () => {
    render(<VoiceTestPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Voice Testing Interface')).toBeInTheDocument()
    })

    expect(screen.getByText(/Test your custom voice agents/)).toBeInTheDocument()
  })

  it('displays agent selection dropdown', async () => {
    render(<VoiceTestPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Select Agent')).toBeInTheDocument()
    })
  })

  it('shows language selection options', async () => {
    render(<VoiceTestPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Language')).toBeInTheDocument()
    })
  })

  it('displays voice interface controls', async () => {
    render(<VoiceTestPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Voice Interface')).toBeInTheDocument()
    })
  })

  it('shows sample commands section', async () => {
    render(<VoiceTestPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Sample Commands')).toBeInTheDocument()
    })
  })

  it('displays conversation tab', async () => {
    render(<VoiceTestPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Conversation')).toBeInTheDocument()
    })
  })

  it('shows analytics tab', async () => {
    render(<VoiceTestPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Analytics')).toBeInTheDocument()
    })
  })

  it('displays settings tab', async () => {
    render(<VoiceTestPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })
  })

  it('switches between tabs correctly', async () => {
    render(<VoiceTestPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Voice Test')).toBeInTheDocument()
    })

    // Click on conversation tab
    const conversationTab = screen.getByText('Conversation')
    fireEvent.click(conversationTab)
    
    await waitFor(() => {
      expect(screen.getByText('Conversation History')).toBeInTheDocument()
    })
  })

  it('displays service status indicator', async () => {
    render(<VoiceTestPage />)
    
    await waitFor(() => {
      expect(screen.getByText(/Voice service/)).toBeInTheDocument()
    })
  })

  it('shows equipment model selection', async () => {
    render(<VoiceTestPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Commercial Manager')).toBeInTheDocument()
    })
  })
})