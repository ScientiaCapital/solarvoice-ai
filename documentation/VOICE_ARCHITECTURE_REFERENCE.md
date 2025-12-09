# Voice Architecture Reference - SolarVoice AI
## Implementation Patterns for Low-Latency Solar Agent Voice

---

## Quick Start: Voice Pipeline Upgrade

```typescript
// shared/voice/VoicePipelineService.ts
import Cerebras from '@cerebras/sdk'

const SOLAR_AGENT_PROMPT = `You are a professional solar industry AI agent.
Provide concise, accurate information about solar installations, costs, and ROI.
Keep responses to 1-3 sentences for voice. Never use markdown.`

export class VoicePipelineService {
  private cerebras: Cerebras
  
  constructor() {
    this.cerebras = new Cerebras({
      apiKey: process.env.CEREBRAS_API_KEY
    })
  }
  
  async processVoiceQuery(
    transcript: string, 
    agentId: string,
    agentPrompt: string
  ): Promise<string> {
    const response = await this.cerebras.chat.completions.create({
      model: 'llama3.1-8b',
      messages: [
        { role: 'system', content: agentPrompt || SOLAR_AGENT_PROMPT },
        { role: 'user', content: transcript }
      ],
      max_tokens: 150,
      temperature: 0.7
    })
    
    return response.choices[0].message.content
  }
}
```

---

## Vercel Edge API Route

```typescript
// vercel-deployments/solarvoice/app/api/voice/route.ts
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'
export const preferredRegion = ['iad1', 'sfo1']

export async function POST(req: NextRequest) {
  const startTime = Date.now()
  const { transcript, agentId, tier = 'premium' } = await req.json()
  
  // Cerebras LLM call
  const llmResponse = await fetch('https://api.cerebras.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CEREBRAS_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3.1-8b',
      messages: [
        { role: 'system', content: getAgentPrompt(agentId) },
        { role: 'user', content: transcript }
      ],
      max_tokens: 150,
      stream: false
    })
  })
  
  const data = await llmResponse.json()
  const responseText = data.choices[0].message.content
  
  return NextResponse.json({
    text: responseText,
    agentId,
    latency: Date.now() - startTime
  })
}

function getAgentPrompt(agentId: string): string {
  const prompts: Record<string, string> = {
    'commercial-manager': 'You are a commercial solar project manager...',
    'residential-advisor': 'You are a residential solar consultant...',
    'technical-expert': 'You are a solar technical specialist...',
  }
  return prompts[agentId] || 'You are a helpful solar AI assistant.'
}
```

---

## Agent Voice Mapping

```typescript
// shared/voice/VoicePersonaService.ts
interface VoicePersona {
  agentId: string
  cartesiaVoiceId: string
  elevenLabsVoiceId: string  // fallback
  language: 'en' | 'es'
  speed: number
  emotion?: string[]
}

export const VOICE_PERSONAS: Record<string, VoicePersona> = {
  'commercial-manager': {
    agentId: 'commercial-manager',
    cartesiaVoiceId: 'professional-male-1',
    elevenLabsVoiceId: 'eleven_monolingual_v1',
    language: 'en',
    speed: 1.0
  },
  'residential-advisor': {
    agentId: 'residential-advisor',
    cartesiaVoiceId: 'friendly-female-1',
    elevenLabsVoiceId: 'eleven_monolingual_v1',
    language: 'en',
    speed: 1.05
  },
  'netzerobot': {
    agentId: 'netzerobot',
    cartesiaVoiceId: 'helpful-assistant',
    elevenLabsVoiceId: 'eleven_multilingual_v2',
    language: 'en',
    speed: 1.0
  }
}
```

---

## Cartesia TTS Integration

```typescript
// shared/voice/CartesiaTTSService.ts
export class CartesiaTTSService {
  private apiKey: string
  
  constructor() {
    this.apiKey = process.env.CARTESIA_API_KEY!
  }
  
  async synthesize(text: string, voiceId: string): Promise<ArrayBuffer> {
    const response = await fetch('https://api.cartesia.ai/tts/bytes', {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
        'Cartesia-Version': '2024-06-10',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model_id: 'sonic-english',
        transcript: text,
        voice: { mode: 'id', id: voiceId },
        output_format: {
          container: 'mp3',
          sample_rate: 44100
        }
      })
    })
    
    return response.arrayBuffer()
  }
}
```

---

## Migration: ElevenLabs → Cartesia

```typescript
// shared/voice/TTSProviderRouter.ts
export class TTSProviderRouter {
  private cartesia: CartesiaTTSService
  private elevenlabs: ElevenLabsTTSService
  
  async synthesize(
    text: string, 
    persona: VoicePersona,
    useCartesia: boolean = true
  ): Promise<ArrayBuffer> {
    try {
      if (useCartesia && process.env.CARTESIA_API_KEY) {
        return await this.cartesia.synthesize(text, persona.cartesiaVoiceId)
      }
      // Fallback to ElevenLabs
      return await this.elevenlabs.synthesize(text, persona.elevenLabsVoiceId)
    } catch (error) {
      // Fallback chain
      console.error('Primary TTS failed, using fallback')
      return await this.elevenlabs.synthesize(text, persona.elevenLabsVoiceId)
    }
  }
}
```

---

## Database Schema

```sql
-- Voice conversations across domains
CREATE TABLE voice_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    agent_id UUID,
    domain TEXT,
    tier TEXT CHECK (tier IN ('premium', 'standard')),
    voice_id TEXT,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ
);

-- Voice turns with latency tracking
CREATE TABLE voice_turns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES voice_conversations(id),
    role TEXT CHECK (role IN ('user', 'assistant')),
    content TEXT,
    agent_name TEXT,
    stt_latency_ms INTEGER,
    llm_latency_ms INTEGER,
    tts_latency_ms INTEGER,
    total_latency_ms INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Latency Targets

| Component | Current | Premium Target | Standard Target |
|-----------|---------|----------------|-----------------|
| STT | 700ms (Web Speech) | <150ms | <300ms |
| LLM | 800ms+ | <200ms | <500ms |
| TTS | 400ms (ElevenLabs) | <100ms | <200ms |
| **Voice Loop** | **2000ms+** | **<500ms** | **<1500ms** |

---

## File Structure

```
solarvoice-ai/
├── shared/voice/
│   ├── VoicePipelineService.ts    # Main pipeline
│   ├── VoicePersonaService.ts     # Agent voice mapping
│   ├── CartesiaTTSService.ts      # New TTS
│   ├── TTSProviderRouter.ts       # ElevenLabs/Cartesia router
│   └── voice-ai-supremacy-agent.ts # Existing
├── vercel-deployments/
│   └── solarvoice/app/api/voice/
│       └── route.ts               # Edge API
├── documentation/
│   ├── PRD_VOICE_UPGRADE.md       # This PRD
│   └── VOICE_ARCHITECTURE.md      # This file
```

---

## Environment Variables

```env
# Voice - NEW
CEREBRAS_API_KEY=          # Priority LLM
CARTESIA_API_KEY=          # New TTS
ASSEMBLYAI_API_KEY=        # A/B test STT
DEEPGRAM_API_KEY=          # Primary STT

# Voice - EXISTING (keep as fallback)
ELEVENLABS_API_KEY=        # Current TTS

# LLM Fallbacks
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Database
DATABASE_URL=
```
