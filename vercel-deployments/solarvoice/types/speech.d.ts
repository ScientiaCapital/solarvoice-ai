// TypeScript declarations for Web Speech API

declare global {
  interface Window {
    SpeechRecognition?: typeof SpeechRecognition
    webkitSpeechRecognition?: typeof SpeechRecognition
    speechRecognition?: SpeechRecognition
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean
    grammars: SpeechGrammarList
    interimResults: boolean
    lang: string
    maxAlternatives: number
    serviceURI: string

    // Event handlers
    onaudioend: ((this: SpeechRecognition, ev: Event) => unknown) | null
    onaudiostart: ((this: SpeechRecognition, ev: Event) => unknown) | null
    onend: ((this: SpeechRecognition, ev: Event) => unknown) | null
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => unknown) | null
    onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown) | null
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown) | null
    onsoundend: ((this: SpeechRecognition, ev: Event) => unknown) | null
    onsoundstart: ((this: SpeechRecognition, ev: Event) => unknown) | null
    onspeechend: ((this: SpeechRecognition, ev: Event) => unknown) | null
    onspeechstart: ((this: SpeechRecognition, ev: Event) => unknown) | null
    onstart: ((this: SpeechRecognition, ev: Event) => unknown) | null

    // Methods
    abort(): void
    start(): void
    stop(): void
  }

  var SpeechRecognition: {
    prototype: SpeechRecognition
    new(): SpeechRecognition
  } | undefined

  interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number
    readonly results: SpeechRecognitionResultList
  }

  interface SpeechRecognitionErrorEvent extends Event {
    readonly error:
      | 'no-speech'
      | 'aborted'
      | 'audio-capture'
      | 'network'
      | 'not-allowed'
      | 'service-not-allowed'
      | 'bad-grammar'
      | 'language-not-supported'
    readonly message: string
  }

  interface SpeechRecognitionResultList {
    readonly length: number
    item(index: number): SpeechRecognitionResult
    [index: number]: SpeechRecognitionResult
  }

  interface SpeechRecognitionResult {
    readonly isFinal: boolean
    readonly length: number
    item(index: number): SpeechRecognitionAlternative
    [index: number]: SpeechRecognitionAlternative
  }

  interface SpeechRecognitionAlternative {
    readonly confidence: number
    readonly transcript: string
  }

  interface SpeechGrammarList {
    readonly length: number
    addFromString(string: string, weight?: number): void
    addFromURI(src: string, weight?: number): void
    item(index: number): SpeechGrammar
    [index: number]: SpeechGrammar
  }

  interface SpeechGrammar {
    src: string
    weight: number
  }
}

export {}