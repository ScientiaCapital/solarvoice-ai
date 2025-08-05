import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// Polyfills for Node.js environment
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

// Mock environment variables for testing
process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY = 'test-api-key'
process.env.JWT_SECRET = 'test-jwt-secret'
process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-secret'
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'

// Mock Web Speech API
global.SpeechRecognition = jest.fn().mockImplementation(() => ({
  continuous: false,
  interimResults: false,
  lang: 'en-US',
  start: jest.fn(),
  stop: jest.fn(),
  abort: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}))

global.webkitSpeechRecognition = global.SpeechRecognition as any

// Mock SpeechSynthesisUtterance
global.SpeechSynthesisUtterance = jest.fn().mockImplementation((text) => ({
  text,
  lang: 'en-US',
  pitch: 1,
  rate: 1,
  voice: null,
  volume: 1,
  onstart: null,
  onend: null,
  onerror: null,
  onpause: null,
  onresume: null,
  onboundary: null,
  onmark: null,
}))

// Mock SpeechSynthesis
global.speechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  getVoices: jest.fn(() => []),
  pending: false,
  speaking: false,
  paused: false,
} as any

// Mock AudioContext
global.AudioContext = jest.fn().mockImplementation(() => ({
  state: 'running',
  createBufferSource: jest.fn(() => ({
    buffer: null,
    connect: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    onended: null,
  })),
  createGain: jest.fn(() => ({
    gain: { value: 1 },
    connect: jest.fn(),
  })),
  decodeAudioData: jest.fn(),
  destination: {},
  resume: jest.fn(),
  suspend: jest.fn(),
}))

// Mock getUserMedia
global.navigator.mediaDevices = {
  getUserMedia: jest.fn().mockImplementation(() =>
    Promise.resolve({
      getTracks: () => [],
      getAudioTracks: () => [],
      getVideoTracks: () => [],
      stop: jest.fn(),
    })
  ),
} as any

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock ElevenLabs SDK
jest.mock('@elevenlabs/elevenlabs-js', () => ({
  ElevenLabs: jest.fn().mockImplementation(() => ({
    generate: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
    voices: {
      getAll: jest.fn().mockResolvedValue({
        voices: [
          { voice_id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam' },
          { voice_id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella' },
          { voice_id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold' },
          { voice_id: 'ErXwobaYiN019PkySvjV', name: 'Antoni' },
          { voice_id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli' }
        ]
      })
    }
  })),
  ElevenLabsApi: jest.fn().mockImplementation(() => ({
    generate: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
    voices: {
      getAll: jest.fn().mockResolvedValue({
        voices: []
      })
    }
  }))
}))