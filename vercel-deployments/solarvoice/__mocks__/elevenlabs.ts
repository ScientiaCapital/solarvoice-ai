// Mock for ElevenLabs service
export const mockElevenLabs = {
  textToSpeech: {
    convert: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
    convertWithSettings: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
    convertAsStream: jest.fn().mockResolvedValue({
      getReader: jest.fn().mockReturnValue({
        read: jest.fn()
          .mockResolvedValueOnce({ done: false, value: new Uint8Array(8) })
          .mockResolvedValueOnce({ done: true }),
      }),
    }),
  },
  voices: {
    getAll: jest.fn().mockResolvedValue({
      voices: [
        { voice_id: 'adam', name: 'Adam', labels: { accent: 'american' } },
        { voice_id: 'bella', name: 'Bella', labels: { accent: 'american' } },
        { voice_id: 'arnold', name: 'Arnold', labels: { accent: 'american' } },
        { voice_id: 'antoni', name: 'Antoni', labels: { accent: 'american' } },
        { voice_id: 'elli', name: 'Elli', labels: { accent: 'american' } },
      ],
    }),
    get: jest.fn().mockResolvedValue({
      voice_id: 'adam',
      name: 'Adam',
      labels: { accent: 'american' },
    }),
  },
  user: {
    getSubscription: jest.fn().mockResolvedValue({
      character_count: 10000,
      character_limit: 100000,
    }),
  },
  models: {
    getAll: jest.fn().mockResolvedValue([
      { model_id: 'eleven_monolingual_v1', name: 'Eleven Monolingual v1' },
      { model_id: 'eleven_multilingual_v2', name: 'Eleven Multilingual v2' },
    ]),
  },
}

export class ElevenLabsClient {
  textToSpeech = mockElevenLabs.textToSpeech
  voices = mockElevenLabs.voices
  user = mockElevenLabs.user
  models = mockElevenLabs.models

  constructor(config?: any) {
    // Mock constructor
  }
}

export default ElevenLabsClient