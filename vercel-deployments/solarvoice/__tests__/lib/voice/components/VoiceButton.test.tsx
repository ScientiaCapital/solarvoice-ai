/**
 * VoiceButton Component Tests - TDD
 * Push-to-talk button with visual feedback
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VoiceButton } from '@/lib/voice/components/VoiceButton'

// Unmock zustand
jest.unmock('zustand')

// Mock hooks
jest.mock('@/lib/voice/hooks/useVoice', () => ({
  useVoice: jest.fn(() => ({
    status: 'idle',
    isPlaying: false,
    error: null,
    queueLength: 0,
    speak: jest.fn(),
    queue: jest.fn(),
    stop: jest.fn(),
    clearQueue: jest.fn(),
  })),
}))

jest.mock('@/lib/voice/hooks/useSpeechRecognition', () => ({
  useSpeechRecognition: jest.fn(() => ({
    status: 'idle',
    isListening: false,
    isSupported: true,
    transcript: '',
    interimTranscript: '',
    language: 'en-US',
    error: null,
    startListening: jest.fn(),
    stopListening: jest.fn(),
    reset: jest.fn(),
  })),
}))

import { useVoice } from '@/lib/voice/hooks/useVoice'
import { useSpeechRecognition } from '@/lib/voice/hooks/useSpeechRecognition'

describe('VoiceButton', () => {
  const mockStartListening = jest.fn()
  const mockStopListening = jest.fn()
  const mockSpeak = jest.fn()
  const mockOnTranscript = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(useVoice as jest.Mock).mockReturnValue({
      status: 'idle',
      isPlaying: false,
      error: null,
      queueLength: 0,
      speak: mockSpeak,
      queue: jest.fn(),
      stop: jest.fn(),
      clearQueue: jest.fn(),
    })

    ;(useSpeechRecognition as jest.Mock).mockReturnValue({
      status: 'idle',
      isListening: false,
      isSupported: true,
      transcript: '',
      interimTranscript: '',
      language: 'en-US',
      error: null,
      startListening: mockStartListening,
      stopListening: mockStopListening,
      reset: jest.fn(),
    })
  })

  describe('rendering', () => {
    it('renders microphone button', () => {
      render(<VoiceButton />)

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('shows microphone icon by default', () => {
      render(<VoiceButton />)

      expect(screen.getByLabelText(/start/i)).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<VoiceButton className="custom-class" />)

      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })
  })

  describe('interaction', () => {
    it('starts listening on click', async () => {
      render(<VoiceButton onTranscript={mockOnTranscript} />)

      await userEvent.click(screen.getByRole('button'))

      expect(mockStartListening).toHaveBeenCalled()
    })

    it('stops listening on second click', async () => {
      ;(useSpeechRecognition as jest.Mock).mockReturnValue({
        status: 'recording',
        isListening: true,
        isSupported: true,
        transcript: '',
        interimTranscript: '',
        language: 'en-US',
        error: null,
        startListening: mockStartListening,
        stopListening: mockStopListening,
        reset: jest.fn(),
      })

      render(<VoiceButton onTranscript={mockOnTranscript} />)

      await userEvent.click(screen.getByRole('button'))

      expect(mockStopListening).toHaveBeenCalled()
    })

    it('calls onTranscript when transcript is available', () => {
      ;(useSpeechRecognition as jest.Mock).mockReturnValue({
        status: 'idle',
        isListening: false,
        isSupported: true,
        transcript: 'Hello world',
        interimTranscript: '',
        language: 'en-US',
        error: null,
        startListening: mockStartListening,
        stopListening: mockStopListening,
        reset: jest.fn(),
      })

      render(<VoiceButton onTranscript={mockOnTranscript} />)

      expect(mockOnTranscript).toHaveBeenCalledWith('Hello world')
    })
  })

  describe('visual states', () => {
    it('shows recording state when listening', () => {
      ;(useSpeechRecognition as jest.Mock).mockReturnValue({
        status: 'recording',
        isListening: true,
        isSupported: true,
        transcript: '',
        interimTranscript: '',
        language: 'en-US',
        error: null,
        startListening: mockStartListening,
        stopListening: mockStopListening,
        reset: jest.fn(),
      })

      render(<VoiceButton />)

      expect(screen.getByLabelText(/stop/i)).toBeInTheDocument()
    })

    it('shows processing state', () => {
      ;(useSpeechRecognition as jest.Mock).mockReturnValue({
        status: 'processing',
        isListening: false,
        isSupported: true,
        transcript: '',
        interimTranscript: '',
        language: 'en-US',
        error: null,
        startListening: mockStartListening,
        stopListening: mockStopListening,
        reset: jest.fn(),
      })

      render(<VoiceButton />)

      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('shows error state', () => {
      ;(useSpeechRecognition as jest.Mock).mockReturnValue({
        status: 'error',
        isListening: false,
        isSupported: true,
        transcript: '',
        interimTranscript: '',
        language: 'en-US',
        error: new Error('Microphone access denied'),
        startListening: mockStartListening,
        stopListening: mockStopListening,
        reset: jest.fn(),
      })

      render(<VoiceButton />)

      expect(screen.getByRole('button')).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('accessibility', () => {
    it('has accessible label', () => {
      render(<VoiceButton />)

      expect(screen.getByRole('button')).toHaveAccessibleName()
    })

    it('indicates recording state to screen readers', () => {
      ;(useSpeechRecognition as jest.Mock).mockReturnValue({
        status: 'recording',
        isListening: true,
        isSupported: true,
        transcript: '',
        interimTranscript: '',
        language: 'en-US',
        error: null,
        startListening: mockStartListening,
        stopListening: mockStopListening,
        reset: jest.fn(),
      })

      render(<VoiceButton />)

      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    })

    it('handles keyboard activation', async () => {
      render(<VoiceButton />)

      const button = screen.getByRole('button')
      button.focus()
      fireEvent.keyDown(button, { key: 'Enter' })

      await waitFor(() => {
        expect(mockStartListening).toHaveBeenCalled()
      })
    })
  })

  describe('disabled state', () => {
    it('shows not supported message when speech recognition unavailable', () => {
      ;(useSpeechRecognition as jest.Mock).mockReturnValue({
        status: 'idle',
        isListening: false,
        isSupported: false,
        transcript: '',
        interimTranscript: '',
        language: 'en-US',
        error: null,
        startListening: mockStartListening,
        stopListening: mockStopListening,
        reset: jest.fn(),
      })

      render(<VoiceButton />)

      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('respects disabled prop', () => {
      render(<VoiceButton disabled />)

      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('size variants', () => {
    it('renders small size', () => {
      render(<VoiceButton size="sm" />)

      expect(screen.getByRole('button')).toHaveClass('h-8')
    })

    it('renders medium size by default', () => {
      render(<VoiceButton />)

      expect(screen.getByRole('button')).toHaveClass('h-10')
    })

    it('renders large size', () => {
      render(<VoiceButton size="lg" />)

      expect(screen.getByRole('button')).toHaveClass('h-12')
    })
  })
})
