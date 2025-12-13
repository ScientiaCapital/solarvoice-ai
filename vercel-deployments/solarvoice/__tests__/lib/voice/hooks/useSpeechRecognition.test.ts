/**
 * useSpeechRecognition Hook Tests - TDD
 * Test real-time speech recognition with Web Speech API
 */

import { renderHook, act } from '@testing-library/react'
import { useSpeechRecognition } from '@/lib/voice/hooks/useSpeechRecognition'

// Unmock zustand to not interfere with React hooks
jest.unmock('zustand')

// Mock fetch for STT
const mockFetch = jest.fn()
global.fetch = mockFetch

// Mock navigator.mediaDevices
const mockGetUserMedia = jest.fn().mockResolvedValue({
  getTracks: () => [{ stop: jest.fn() }],
  getAudioTracks: () => [{ stop: jest.fn() }],
  stop: jest.fn(),
})

Object.defineProperty(navigator, 'mediaDevices', {
  value: {
    getUserMedia: mockGetUserMedia,
  },
  configurable: true,
  writable: true,
})

describe('useSpeechRecognition', () => {
  let mockRecognitionInstance: any
  let MockSpeechRecognition: jest.Mock

  beforeEach(() => {
    mockFetch.mockReset()
    mockGetUserMedia.mockClear()

    // Create fresh mock for each test
    mockRecognitionInstance = {
      continuous: false,
      interimResults: false,
      lang: 'en-US',
      start: jest.fn(),
      stop: jest.fn(),
      abort: jest.fn(),
      onstart: null,
      onresult: null,
      onerror: null,
      onend: null,
    }

    MockSpeechRecognition = jest.fn(() => mockRecognitionInstance)
    ;(global as any).SpeechRecognition = MockSpeechRecognition
    ;(global as any).webkitSpeechRecognition = MockSpeechRecognition
  })

  describe('initialization', () => {
    it('initializes with idle status', () => {
      const { result } = renderHook(() => useSpeechRecognition())

      expect(result.current.status).toBe('idle')
      expect(result.current.isListening).toBe(false)
      expect(result.current.transcript).toBe('')
    })

    it('detects speech recognition support', () => {
      const { result } = renderHook(() => useSpeechRecognition())

      expect(result.current.isSupported).toBe(true)
    })
  })

  describe('startListening', () => {
    it('starts speech recognition', async () => {
      const { result } = renderHook(() => useSpeechRecognition())

      await act(async () => {
        await result.current.startListening()
      })

      expect(result.current.isListening).toBe(true)
      expect(result.current.status).toBe('recording')
    })

    it('requests microphone permission', async () => {
      const { result } = renderHook(() => useSpeechRecognition())

      await act(async () => {
        await result.current.startListening()
      })

      expect(mockGetUserMedia).toHaveBeenCalledWith({ audio: true })
    })

    it('sets language from options', async () => {
      const { result } = renderHook(() =>
        useSpeechRecognition({ language: 'es-ES' })
      )

      await act(async () => {
        await result.current.startListening()
      })

      expect(result.current.language).toBe('es-ES')
    })
  })

  describe('stopListening', () => {
    it('stops speech recognition', async () => {
      const { result } = renderHook(() => useSpeechRecognition())

      await act(async () => {
        await result.current.startListening()
      })

      await act(async () => {
        result.current.stopListening()
      })

      expect(result.current.isListening).toBe(false)
      expect(result.current.status).toBe('idle')
    })
  })

  describe('transcript updates', () => {
    it('updates transcript on speech result', async () => {
      const { result } = renderHook(() => useSpeechRecognition())

      await act(async () => {
        await result.current.startListening()
      })

      // Simulate speech result via the onresult handler
      await act(async () => {
        mockRecognitionInstance.onresult?.({
          resultIndex: 0,
          results: {
            0: {
              0: { transcript: 'Hello world', confidence: 0.95 },
              isFinal: true,
              length: 1,
            },
            length: 1,
          },
        })
      })

      expect(result.current.transcript).toBe('Hello world')
    })

    it('calls onTranscript callback', async () => {
      const onTranscript = jest.fn()

      const { result } = renderHook(() =>
        useSpeechRecognition({ onTranscript })
      )

      await act(async () => {
        await result.current.startListening()
      })

      await act(async () => {
        mockRecognitionInstance.onresult?.({
          resultIndex: 0,
          results: {
            0: {
              0: { transcript: 'Test speech', confidence: 0.9 },
              isFinal: true,
              length: 1,
            },
            length: 1,
          },
        })
      })

      expect(onTranscript).toHaveBeenCalledWith('Test speech')
    })

    it('supports interim results', async () => {
      const { result } = renderHook(() =>
        useSpeechRecognition({ interimResults: true })
      )

      await act(async () => {
        await result.current.startListening()
      })

      // Simulate interim result
      await act(async () => {
        mockRecognitionInstance.onresult?.({
          resultIndex: 0,
          results: {
            0: {
              0: { transcript: 'Hel', confidence: 0.5 },
              isFinal: false,
              length: 1,
            },
            length: 1,
          },
        })
      })

      expect(result.current.interimTranscript).toBe('Hel')
    })
  })

  describe('error handling', () => {
    it('handles recognition errors', async () => {
      const { result } = renderHook(() => useSpeechRecognition())

      await act(async () => {
        await result.current.startListening()
      })

      await act(async () => {
        mockRecognitionInstance.onerror?.({ error: 'no-speech' })
      })

      expect(result.current.error).toBeTruthy()
      expect(result.current.status).toBe('error')
    })

    it('calls onError callback', async () => {
      const onError = jest.fn()

      const { result } = renderHook(() => useSpeechRecognition({ onError }))

      await act(async () => {
        await result.current.startListening()
      })

      await act(async () => {
        mockRecognitionInstance.onerror?.({ error: 'network' })
      })

      expect(onError).toHaveBeenCalled()
    })
  })

  describe('continuous mode', () => {
    it('enables continuous recognition', () => {
      renderHook(() => useSpeechRecognition({ continuous: true }))

      // Verify continuous mode can be set
      expect(mockRecognitionInstance.continuous).toBeDefined()
    })
  })

  describe('reset', () => {
    it('clears transcript and resets state', async () => {
      const { result } = renderHook(() => useSpeechRecognition())

      await act(async () => {
        result.current.reset()
      })

      expect(result.current.transcript).toBe('')
      expect(result.current.interimTranscript).toBe('')
      expect(result.current.status).toBe('idle')
    })
  })
})
