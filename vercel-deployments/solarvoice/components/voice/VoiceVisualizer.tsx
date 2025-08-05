"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VoiceVisualizerProps {
  isListening?: boolean
  onToggleListening?: () => void
  transcript?: string
  confidence?: number
  className?: string
}

export function VoiceVisualizer({
  isListening = false,
  onToggleListening,
  transcript = "",
  confidence = 0,
  className = ""
}: VoiceVisualizerProps) {
  const [audioData, setAudioData] = useState<number[]>(() => new Array(20).fill(0))
  const animationRef = useRef<number | undefined>(undefined)
  
  // Generate realistic audio wave data
  useEffect(() => {
    if (isListening) {
      const generateWaveData = () => {
        const newData = audioData.map((_, index) => {
          const baseAmplitude = Math.random() * 0.5 + 0.1
          const frequency = 0.1 + (index * 0.05)
          const time = Date.now() * 0.001
          return Math.sin(time * frequency) * baseAmplitude + Math.random() * 0.3
        })
        setAudioData(newData)
        animationRef.current = requestAnimationFrame(generateWaveData)
      }
      generateWaveData()
    } else {
      setAudioData(new Array(20).fill(0))
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isListening])
  
  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {/* Voice activation button */}
      <motion.div
        animate={isListening ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: isListening ? Infinity : 0 }}
      >
        <Button
          onClick={onToggleListening}
          size="lg"
          className={`relative p-6 rounded-full ${
            isListening 
              ? 'btn-energy animate-pulse-glow' 
              : 'btn-solar'
          }`}
        >
          <motion.div
            animate={isListening ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 2, repeat: isListening ? Infinity : 0, ease: "linear" }}
          >
            {isListening ? (
              <Mic className="w-6 h-6" />
            ) : (
              <MicOff className="w-6 h-6" />
            )}
          </motion.div>
          
          {/* Pulse rings */}
          <AnimatePresence>
            {isListening && (
              <>
                {[0, 0.5, 1].map((delay, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 rounded-full border-2 border-current"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ 
                      scale: [1, 2, 3], 
                      opacity: [0.8, 0.3, 0] 
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: delay,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
      
      {/* Audio wave visualization */}
      <div className="voice-visualizer h-16 px-4">
        {audioData.map((amplitude, index) => (
          <motion.div
            key={index}
            className="voice-bar"
            style={{ 
              '--delay': `${index * 0.1}s`,
              height: `${Math.max(10, amplitude * 40)}px`
            } as any}
            animate={isListening ? {
              scaleY: [1, amplitude + 0.5, 1],
              opacity: [0.6, 1, 0.6]
            } : {
              scaleY: 0.2,
              opacity: 0.3
            }}
            transition={{
              duration: 0.5,
              repeat: isListening ? Infinity : 0,
              delay: index * 0.05
            }}
          />
        ))}
      </div>
      
      {/* Transcript display */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-4 rounded-lg max-w-md text-center"
          >
            <div className="flex items-center justify-between mb-2">
              <Volume2 className="w-4 h-4 text-ai-500" />
              <div className="text-xs text-muted-foreground">
                Confidence: {Math.round(confidence * 100)}%
              </div>
            </div>
            <p className="text-sm">{transcript}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Status indicator */}
      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
        <div className={`w-2 h-2 rounded-full ${
          isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
        }`} />
        <span>
          {isListening ? 'Listening...' : 'Click to activate voice'}
        </span>
      </div>
    </div>
  )
}

// Compact version for smaller spaces
export function VoiceVisualizerCompact({
  isListening = false,
  onToggleListening,
  className = ""
}: Pick<VoiceVisualizerProps, 'isListening' | 'onToggleListening' | 'className'>) {
  return (
    <Button
      onClick={onToggleListening}
      size="sm"
      variant={isListening ? "default" : "outline"}
      className={`relative ${className}`}
    >
      <motion.div
        animate={isListening ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
      >
        {isListening ? (
          <Mic className="w-4 h-4" />
        ) : (
          <MicOff className="w-4 h-4" />
        )}
      </motion.div>
      
      {isListening && (
        <motion.div
          className="absolute -inset-1 rounded-full border border-primary"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ 
            scale: [1, 1.5], 
            opacity: [0.8, 0] 
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}
    </Button>
  )
}