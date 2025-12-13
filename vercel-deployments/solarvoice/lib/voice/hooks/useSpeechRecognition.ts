'use client'

/**
 * useSpeechRecognition Hook
 * Real-time speech recognition with Web Speech API
 */

import { useState, useCallback, useRef, useEffect } from 'react'
import type { VoiceStatusType } from '../types'
import { VoiceStatus } from '../types'

export interface UseSpeechRecognitionOptions {
  language?: string
  continuous?: boolean
  interimResults?: boolean
  onTranscript?: (transcript: string) => void
  onError?: (error: Error) => void
  onEnd?: () => void
}

export interface UseSpeechRecognitionReturn {
  status: VoiceStatusType
  isListening: boolean
  isSupported: boolean
  transcript: string
  interimTranscript: string
  language: string
  error: Error | null
  startListening: () => Promise<void>
  stopListening: () => void
  reset: () => void
}

// Get SpeechRecognition constructor
const getSpeechRecognition = (): typeof SpeechRecognition | null => {
  if (typeof window === 'undefined') return null
  return (
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition ||
    null
  )
}

export function useSpeechRecognition(
  options: UseSpeechRecognitionOptions = {}
): UseSpeechRecognitionReturn {
  const {
    language = 'en-US',
    continuous = false,
    interimResults = false,
    onTranscript,
    onError,
    onEnd,
  } = options

  const [status, setStatus] = useState<VoiceStatusType>(VoiceStatus.IDLE)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [error, setError] = useState<Error | null>(null)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)

  // Check if supported
  const SpeechRecognitionClass = getSpeechRecognition()
  const isSupported = SpeechRecognitionClass !== null

  // Initialize recognition
  useEffect(() => {
    if (!isSupported) return

    const recognition = new SpeechRecognitionClass!()
    recognition.continuous = continuous
    recognition.interimResults = interimResults
    recognition.lang = language

    recognition.onstart = () => {
      setStatus(VoiceStatus.RECORDING)
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = ''
      let interim = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (!result) continue
        const alternative = result[0]
        if (!alternative) continue
        const text = alternative.transcript

        if (result.isFinal) {
          finalTranscript += text
        } else {
          interim += text
        }
      }

      if (finalTranscript) {
        setTranscript((prev) => prev + finalTranscript)
        onTranscript?.(finalTranscript)
      }

      setInterimTranscript(interim)
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const err = new Error(`Speech recognition error: ${event.error}`)
      setError(err)
      setStatus(VoiceStatus.ERROR)
      onError?.(err)
    }

    recognition.onend = () => {
      setStatus(VoiceStatus.IDLE)
      onEnd?.()
    }

    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort()
        } catch {
          // Already stopped
        }
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [language, continuous, interimResults, onTranscript, onError, onEnd, isSupported, SpeechRecognitionClass])

  // Request microphone permission and start listening
  const startListening = useCallback(async () => {
    if (!isSupported || !recognitionRef.current) {
      throw new Error('Speech recognition not supported')
    }

    setError(null)

    // Request microphone permission
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream
    } catch (e) {
      const err = new Error('Microphone permission denied')
      setError(err)
      setStatus(VoiceStatus.ERROR)
      throw err
    }

    try {
      recognitionRef.current.start()
      setStatus(VoiceStatus.RECORDING)
    } catch (e) {
      // Recognition might already be started
      if (e instanceof Error && !e.message.includes('already started')) {
        throw e
      }
    }
  }, [isSupported])

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch {
        // Already stopped
      }
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop())
      mediaStreamRef.current = null
    }

    setStatus(VoiceStatus.IDLE)
  }, [])

  // Reset state
  const reset = useCallback(() => {
    stopListening()
    setTranscript('')
    setInterimTranscript('')
    setError(null)
    setStatus(VoiceStatus.IDLE)
  }, [stopListening])

  return {
    status,
    isListening: status === VoiceStatus.RECORDING,
    isSupported,
    transcript,
    interimTranscript,
    language,
    error,
    startListening,
    stopListening,
    reset,
  }
}
