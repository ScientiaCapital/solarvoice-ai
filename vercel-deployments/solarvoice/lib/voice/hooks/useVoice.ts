'use client'

/**
 * useVoice Hook
 * TTS playback with queue support and Web Audio API
 */

import { useState, useCallback, useRef, useEffect } from 'react'
import { VoiceClient } from '../client'
import type { VoiceStatusType, Emotion, VoiceClientConfig } from '../types'
import { VoiceStatus } from '../types'

export interface UseVoiceOptions extends VoiceClientConfig {
  defaultVoiceId?: string
  defaultEmotion?: Emotion
  autoPlay?: boolean
}

export interface SpeakOptions {
  voiceId?: string
  emotion?: Emotion | string
  speed?: number
  language?: string
}

export interface UseVoiceReturn {
  status: VoiceStatusType
  isPlaying: boolean
  error: Error | null
  queueLength: number
  speak: (text: string, options?: SpeakOptions) => Promise<void>
  queue: (text: string, options?: SpeakOptions) => void
  stop: () => void
  clearQueue: () => void
}

interface QueueItem {
  text: string
  options: SpeakOptions
}

export function useVoice(options: UseVoiceOptions = {}): UseVoiceReturn {
  const [status, setStatus] = useState<VoiceStatusType>(VoiceStatus.IDLE)
  const [error, setError] = useState<Error | null>(null)
  const [queueLength, setQueueLength] = useState(0)

  const clientRef = useRef<VoiceClient | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const queueRef = useRef<QueueItem[]>([])
  const isProcessingRef = useRef(false)

  // Initialize client and audio context
  useEffect(() => {
    clientRef.current = new VoiceClient({
      baseUrl: options.baseUrl,
      sttBaseUrl: options.sttBaseUrl,
      apiKey: options.apiKey,
    })

    if (typeof window !== 'undefined' && typeof AudioContext !== 'undefined') {
      audioContextRef.current = new AudioContext()
    }

    return () => {
      // Cleanup
      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.stop()
        } catch {
          // Already stopped
        }
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [options.baseUrl, options.sttBaseUrl, options.apiKey])

  // Process queue
  const processQueue = useCallback(async () => {
    if (isProcessingRef.current || queueRef.current.length === 0) {
      return
    }

    isProcessingRef.current = true
    const item = queueRef.current.shift()
    setQueueLength(queueRef.current.length)

    if (item) {
      try {
        await speakInternal(item.text, item.options)
      } catch (e) {
        // Continue processing queue even on error
        console.error('Queue item failed:', e)
      }
    }

    isProcessingRef.current = false

    // Process next item
    if (queueRef.current.length > 0) {
      processQueue()
    }
  }, [])

  // Internal speak function
  const speakInternal = useCallback(
    async (text: string, speakOptions: SpeakOptions = {}): Promise<void> => {
      if (!clientRef.current || !audioContextRef.current) {
        throw new Error('Voice client or audio context not initialized')
      }

      setStatus(VoiceStatus.PROCESSING)
      setError(null)

      try {
        // Resume audio context if suspended
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }

        // Get voice ID from options or defaults
        const voiceId =
          speakOptions.voiceId ||
          options.defaultVoiceId ||
          'a0e99841-438c-4a64-b679-ae501e7d6091'

        // Synthesize audio
        const response = await clientRef.current.synthesize({
          text,
          voiceId,
          emotion: speakOptions.emotion || options.defaultEmotion,
          speed: speakOptions.speed,
          language: speakOptions.language,
        })

        // Decode audio data
        const audioBuffer = await new Promise<AudioBuffer>((resolve, reject) => {
          audioContextRef.current!.decodeAudioData(
            response.audio,
            resolve,
            reject
          )
        })

        // Create source node and play
        const sourceNode = audioContextRef.current.createBufferSource()
        sourceNode.buffer = audioBuffer
        sourceNode.connect(audioContextRef.current.destination)

        sourceNodeRef.current = sourceNode

        // Handle playback end
        sourceNode.onended = () => {
          setStatus(VoiceStatus.IDLE)
          sourceNodeRef.current = null
        }

        setStatus(VoiceStatus.PLAYING)
        sourceNode.start(0)
      } catch (e) {
        const err = e instanceof Error ? e : new Error(String(e))
        setError(err)
        setStatus(VoiceStatus.ERROR)
        throw err
      }
    },
    [options.defaultVoiceId, options.defaultEmotion]
  )

  // Public speak function
  const speak = useCallback(
    async (text: string, speakOptions: SpeakOptions = {}): Promise<void> => {
      return speakInternal(text, speakOptions)
    },
    [speakInternal]
  )

  // Add to queue
  const queue = useCallback(
    (text: string, speakOptions: SpeakOptions = {}) => {
      queueRef.current.push({ text, options: speakOptions })
      setQueueLength(queueRef.current.length)

      // Start processing if not already
      processQueue()
    },
    [processQueue]
  )

  // Stop playback
  const stop = useCallback(() => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop()
      } catch {
        // Already stopped
      }
      sourceNodeRef.current = null
    }
    setStatus(VoiceStatus.IDLE)
  }, [])

  // Clear queue
  const clearQueue = useCallback(() => {
    queueRef.current = []
    setQueueLength(0)
  }, [])

  return {
    status,
    isPlaying: status === VoiceStatus.PLAYING,
    error,
    queueLength,
    speak,
    queue,
    stop,
    clearQueue,
  }
}
