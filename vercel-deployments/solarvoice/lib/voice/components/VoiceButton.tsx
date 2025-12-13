'use client'

/**
 * VoiceButton Component
 * Push-to-talk button with visual feedback
 */

import React, { useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { useVoice } from '../hooks/useVoice'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { VoiceStatus } from '../types'

export interface VoiceButtonProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onTranscript?: (transcript: string) => void
  onError?: (error: Error) => void
  voiceId?: string
  language?: string
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
}

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
}

export function VoiceButton({
  className,
  size = 'md',
  disabled = false,
  onTranscript,
  onError,
  voiceId,
  language = 'en-US',
}: VoiceButtonProps) {
  // Voice hook for TTS playback (unused in basic button but available)
  useVoice(voiceId ? { defaultVoiceId: voiceId } : undefined)

  const {
    status,
    isListening,
    isSupported,
    transcript,
    error,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    language,
    ...(onTranscript && { onTranscript }),
    ...(onError && { onError }),
  })

  // Call onTranscript when transcript changes
  useEffect(() => {
    if (transcript && onTranscript) {
      onTranscript(transcript)
    }
  }, [transcript, onTranscript])

  // Report errors
  useEffect(() => {
    if (error && onError) {
      onError(error)
    }
  }, [error, onError])

  const handleClick = useCallback(async () => {
    if (isListening) {
      stopListening()
    } else {
      try {
        await startListening()
      } catch (e) {
        // Error handled by hook
      }
    }
  }, [isListening, startListening, stopListening])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    },
    [handleClick]
  )

  const isDisabled = disabled || !isSupported || status === VoiceStatus.PROCESSING
  const isRecording = status === VoiceStatus.RECORDING
  const hasError = status === VoiceStatus.ERROR

  const iconSize = iconSizes[size]

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      aria-pressed={isRecording}
      aria-invalid={hasError}
      className={cn(
        'relative flex items-center justify-center rounded-full transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        sizeClasses[size],
        {
          // Default state
          'bg-primary text-primary-foreground hover:bg-primary/90': !isRecording && !hasError && !isDisabled,
          // Recording state
          'bg-red-500 text-white animate-pulse': isRecording,
          // Error state
          'bg-destructive text-destructive-foreground': hasError,
          // Disabled state
          'bg-muted text-muted-foreground cursor-not-allowed': isDisabled,
          // Focus ring colors
          'focus:ring-primary': !hasError,
          'focus:ring-destructive': hasError,
        },
        className
      )}
    >
      {/* Microphone Icon */}
      {!isRecording && !status.includes('processing') && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      )}

      {/* Stop Icon (when recording) */}
      {isRecording && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="6" y="6" width="12" height="12" rx="2" />
        </svg>
      )}

      {/* Processing spinner */}
      {status === VoiceStatus.PROCESSING && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      )}

      {/* Recording pulse ring */}
      {isRecording && (
        <span
          className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-75"
          aria-hidden="true"
        />
      )}
    </button>
  )
}
