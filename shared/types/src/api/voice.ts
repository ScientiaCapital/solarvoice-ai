/**
 * Voice API Types - SolarVoice AI Platform
 * Core contracts for voice processing and command handling
 */

export interface VoiceCommand {
  id: string;
  command: string;
  parameters: Record<string, any>;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
  metadata?: VoiceCommandMetadata;
}

export interface VoiceCommandMetadata {
  ipAddress?: string;
  userAgent?: string;
  language?: string;
  confidence?: number;
  audioFormat?: 'wav' | 'mp3' | 'ogg';
  sampleRate?: number;
}

export interface VoiceResponse {
  id: string;
  commandId: string;
  result: 'success' | 'error' | 'partial';
  data?: any;
  message?: string;
  processingTime: number;
  timestamp: Date;
  audioResponse?: VoiceAudioResponse;
}

export interface VoiceAudioResponse {
  audioUrl?: string;
  audioData?: Buffer;
  format: 'wav' | 'mp3' | 'ogg';
  duration?: number;
  voiceId?: string;
}

export interface VoiceIntent {
  name: string;
  confidence: number;
  entities: VoiceEntity[];
}

export interface VoiceEntity {
  type: string;
  value: any;
  confidence: number;
  start?: number;
  end?: number;
}

export interface VoiceSession {
  id: string;
  userId?: string;
  startTime: Date;
  lastActivity: Date;
  context: Record<string, any>;
  isActive: boolean;
}

export interface VoiceProcessor {
  processCommand(command: VoiceCommand): Promise<VoiceResponse>;
  createSession(userId?: string): Promise<VoiceSession>;
  endSession(sessionId: string): Promise<void>;
  getSession(sessionId: string): Promise<VoiceSession | null>;
}