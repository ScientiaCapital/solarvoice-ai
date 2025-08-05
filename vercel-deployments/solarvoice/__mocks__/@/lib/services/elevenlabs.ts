// Mock for @/lib/services/elevenlabs module
export const elevenLabsService = {
  textToSpeech: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
  getVoices: jest.fn().mockResolvedValue([
    { voice_id: 'adam', name: 'Adam' },
    { voice_id: 'bella', name: 'Bella' },
    { voice_id: 'arnold', name: 'Arnold' },
    { voice_id: 'antoni', name: 'Antoni' },
    { voice_id: 'elli', name: 'Elli' },
  ]),
  synthesizeSpeech: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
  streamSpeech: jest.fn().mockResolvedValue({
    getReader: jest.fn().mockReturnValue({
      read: jest.fn()
        .mockResolvedValueOnce({ done: false, value: new Uint8Array(8) })
        .mockResolvedValueOnce({ done: true }),
    }),
  }),
}

export const voiceMap = {
  'commercial-manager': 'adam',
  'customer-success': 'bella',
  'performance-analytics': 'arnold',
  'sales-optimizer': 'antoni',
  'utility-coordinator': 'elli',
}

export const getVoiceForAgent = jest.fn((agentId: string) => {
  return voiceMap[agentId] || 'adam'
})

export const createAudioContext = jest.fn().mockReturnValue({
  decodeAudioData: jest.fn().mockResolvedValue({
    duration: 10,
    length: 441000,
    numberOfChannels: 2,
    sampleRate: 44100,
  }),
  createBufferSource: jest.fn().mockReturnValue({
    buffer: null,
    connect: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
  }),
  destination: {},
})

export default elevenLabsService