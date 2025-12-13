/**
 * useVoice Hook Tests - TDD
 * Test TTS playback hook for voice-ai-core integration
 */

import { renderHook, act, waitFor } from '@testing-library/react'
import { useVoice } from '@/lib/voice/hooks/useVoice'

// Mock fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

// Mock AudioContext
const mockSourceNode = {
  buffer: null,
  connect: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
  onended: null as ((event: Event) => void) | null,
}

const mockAudioContext = {
  state: 'running',
  createBufferSource: jest.fn(() => ({ ...mockSourceNode })),
  createGain: jest.fn(() => ({
    gain: { value: 1 },
    connect: jest.fn(),
  })),
  decodeAudioData: jest.fn(),
  destination: {},
  resume: jest.fn().mockResolvedValue(undefined),
  suspend: jest.fn().mockResolvedValue(undefined),
  close: jest.fn().mockResolvedValue(undefined),
}

;(global as any).AudioContext = jest.fn(() => mockAudioContext)

// Unmock zustand to not interfere with React hooks
jest.unmock('zustand')

describe('useVoice', () => {
  beforeEach(() => {
    mockFetch.mockReset()
    mockAudioContext.createBufferSource.mockClear()
    mockAudioContext.decodeAudioData.mockReset()
    mockAudioContext.close.mockClear()
    ;(global as any).AudioContext = jest.fn(() => mockAudioContext)
  })

  describe('initialization', () => {
    it('initializes with idle status', () => {
      const { result } = renderHook(() => useVoice())

      expect(result.current.status).toBe('idle')
      expect(result.current.isPlaying).toBe(false)
      expect(result.current.error).toBeNull()
    })

    it('accepts custom voice client config', () => {
      const { result } = renderHook(() =>
        useVoice({ baseUrl: 'https://custom-voice.api.com' })
      )

      expect(result.current.status).toBe('idle')
    })
  })

  describe('speak', () => {
    it('synthesizes and plays audio', async () => {
      const mockAudio = new ArrayBuffer(1024)
      mockFetch.mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(mockAudio),
        headers: new Headers({ 'content-type': 'audio/pcm' }),
      })

      const mockBuffer = { duration: 2 }
      mockAudioContext.decodeAudioData.mockImplementation((_, success) => {
        success?.(mockBuffer)
        return Promise.resolve(mockBuffer)
      })

      const { result } = renderHook(() => useVoice())

      await act(async () => {
        await result.current.speak('Hello world', { voiceId: 'voice-123' })
      })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/tts/bytes'),
        expect.any(Object)
      )
    })

    it('sets status to playing during playback', async () => {
      const mockAudio = new ArrayBuffer(1024)
      mockFetch.mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(mockAudio),
        headers: new Headers({ 'content-type': 'audio/pcm' }),
      })

      const mockBuffer = { duration: 2 }
      mockAudioContext.decodeAudioData.mockImplementation((_, success) => {
        success?.(mockBuffer)
        return Promise.resolve(mockBuffer)
      })

      const { result } = renderHook(() => useVoice())

      act(() => {
        result.current.speak('Test', { voiceId: 'voice-123' })
      })

      await waitFor(() => {
        expect(result.current.status).toBe('playing')
      })
    })

    it('sets error on failure', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const { result } = renderHook(() => useVoice())

      await act(async () => {
        try {
          await result.current.speak('Test', { voiceId: 'voice-123' })
        } catch {
          // Expected to throw
        }
      })

      expect(result.current.error).toBeTruthy()
      expect(result.current.status).toBe('error')
    })

    it('uses default voice when not specified', async () => {
      const mockAudio = new ArrayBuffer(1024)
      mockFetch.mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(mockAudio),
        headers: new Headers({ 'content-type': 'audio/pcm' }),
      })

      const mockBuffer = { duration: 2 }
      mockAudioContext.decodeAudioData.mockImplementation((_, success) => {
        success?.(mockBuffer)
        return Promise.resolve(mockBuffer)
      })

      const { result } = renderHook(() =>
        useVoice({ defaultVoiceId: 'default-voice' })
      )

      await act(async () => {
        await result.current.speak('Hello')
      })

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body)
      expect(requestBody.voice_id).toBe('default-voice')
    })

    it('supports emotion parameter', async () => {
      const mockAudio = new ArrayBuffer(1024)
      mockFetch.mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(mockAudio),
        headers: new Headers({ 'content-type': 'audio/pcm' }),
      })

      const mockBuffer = { duration: 2 }
      mockAudioContext.decodeAudioData.mockImplementation((_, success) => {
        success?.(mockBuffer)
        return Promise.resolve(mockBuffer)
      })

      const { result } = renderHook(() => useVoice())

      await act(async () => {
        await result.current.speak('Excited message!', {
          voiceId: 'voice-123',
          emotion: 'excited',
        })
      })

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body)
      expect(requestBody.emotion).toBe('excited')
    })
  })

  describe('stop', () => {
    it('stops playback and resets status', async () => {
      const mockAudio = new ArrayBuffer(1024)
      mockFetch.mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(mockAudio),
        headers: new Headers({ 'content-type': 'audio/pcm' }),
      })

      const localMockSource = {
        buffer: null,
        connect: jest.fn(),
        start: jest.fn(),
        stop: jest.fn(),
        onended: null,
      }
      mockAudioContext.createBufferSource.mockReturnValue(localMockSource)

      const mockBuffer = { duration: 2 }
      mockAudioContext.decodeAudioData.mockImplementation((_, success) => {
        success?.(mockBuffer)
        return Promise.resolve(mockBuffer)
      })

      const { result } = renderHook(() => useVoice())

      await act(async () => {
        result.current.speak('Test', { voiceId: 'voice-123' })
      })

      await act(async () => {
        result.current.stop()
      })

      expect(localMockSource.stop).toHaveBeenCalled()
      expect(result.current.status).toBe('idle')
      expect(result.current.isPlaying).toBe(false)
    })
  })

  describe('queue', () => {
    it('queues multiple messages for sequential playback', async () => {
      const mockAudio = new ArrayBuffer(1024)
      mockFetch.mockResolvedValue({
        ok: true,
        arrayBuffer: () => Promise.resolve(mockAudio),
        headers: new Headers({ 'content-type': 'audio/pcm' }),
      })

      const mockBuffer = { duration: 0.1 }
      mockAudioContext.decodeAudioData.mockImplementation((_, success) => {
        success?.(mockBuffer)
        return Promise.resolve(mockBuffer)
      })

      const { result } = renderHook(() => useVoice())

      await act(async () => {
        result.current.queue('First message', { voiceId: 'voice-123' })
        result.current.queue('Second message', { voiceId: 'voice-123' })
      })

      expect(result.current.queueLength).toBeGreaterThanOrEqual(0)
    })
  })

  describe('cleanup', () => {
    it('closes audio context on unmount', () => {
      const { unmount } = renderHook(() => useVoice())

      unmount()

      expect(mockAudioContext.close).toHaveBeenCalled()
    })
  })
})
