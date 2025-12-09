# Voice Platform PRD - SolarVoice AI
## Low-Latency Voice Upgrade for Solar AI Agents

**Version:** 1.0  
**Updated:** December 2024  
**Status:** Planning - Upgrade from ElevenLabs to Cerebras+Cartesia

---

## Executive Summary

Upgrade SolarVoice AI voice pipeline from current ElevenLabs + Web Speech API to low-latency Cerebras + AssemblyAI/Deepgram + Cartesia stack. Target: sub-500ms premium tier for professional solar agent conversations.

**Current Stack:** Web Speech API (STT) + OpenAI/Claude (LLM) + ElevenLabs (TTS)  
**Target Stack:** AssemblyAI/Deepgram (STT) + Cerebras (LLM) + Cartesia (TTS)

---

## 1. Current State Analysis

### 1.1 Existing Voice System
```
STT: Web Speech API (browser-native, ~500-1000ms)
LLM: OpenAI/Claude via API (~800-1500ms)
TTS: ElevenLabs eleven_monolingual_v1 (~300-500ms)
Total Loop: ~1600-3000ms
```

### 1.2 Issues with Current Stack
- Web Speech API inconsistent across browsers
- LLM latency too high for natural conversation
- ElevenLabs good quality but slower than Cartesia
- No streaming audio support

---

## 2. Target Architecture

### 2.1 Premium Tier (Sub-500ms TTFT)

| Component | Provider | Latency | Cost |
|-----------|----------|---------|------|
| STT | AssemblyAI Universal | 90-150ms | $0.0025/min |
| LLM | Cerebras LLaMA 3.1 8B | 100-200ms | $0.0003/min |
| TTS | Cartesia Sonic-3 | 40-90ms | $0.031/min |
| **Total** | - | **~350ms** | ~$0.034/min |

### 2.2 Standard Tier (Sub-2s)

| Component | Provider | Latency | Cost |
|-----------|----------|---------|------|
| STT | Deepgram Nova-3 | 300-500ms | $0.0043/min |
| LLM | Cerebras + DeepSeek | 300-700ms | $0.0001/min |
| TTS | Cartesia/CosyVoice | 100-200ms | $0.00-0.015/min |
| **Total** | - | **~700-1400ms** | ~$0.005-0.02/min |

---

## 3. Voice Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SOLARVOICE CLIENTS                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ solarvoice │  │ netzerobot │  │ netzero    │            │
│  │    .ai     │  │   .com     │  │ expert.com │            │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘            │
└────────┼───────────────┼───────────────┼────────────────────┘
         │               │               │
         ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────┐
│                   VOICE PIPELINE (NEW)                       │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐                │
│  │   STT    │──▶│   LLM    │──▶│   TTS    │                │
│  │AssemblyAI│   │ Cerebras │   │ Cartesia │                │
│  │ Deepgram │   │          │   │          │                │
│  └──────────┘   └──────────┘   └──────────┘                │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│               SOLAR AI AGENTS                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Commercial   │  │ Residential  │  │  Technical   │      │
│  │   Manager    │  │   Advisor    │  │   Expert     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ Solar Calc   │  │ Custom Agent │                        │
│  │   Engine     │  │   Builder    │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Agent Voice Personas

### 4.1 Agent-Specific Voices (Cartesia)

| Agent | Voice ID | Personality |
|-------|----------|-------------|
| Commercial Manager | Professional Male | Authoritative, technical |
| Residential Advisor | Friendly Female | Warm, consultative |
| Technical Expert | Neutral Expert | Precise, educational |
| NetZeroBot | Helpful Assistant | Conversational |
| Custom Agents | User-selected | Configurable |

### 4.2 Multilingual Support
- English: `eleven_monolingual_v1` → Cartesia Sonic-3
- Spanish: `eleven_multilingual_v2` → Cartesia multilingual
- Voice cloning for custom agents (future)

---

## 5. Database Schema

```sql
-- Voice conversations
CREATE TABLE voice_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    agent_id UUID REFERENCES custom_agents(id),
    domain TEXT,  -- 'solarvoice', 'netzerobot', 'netzeroexpert'
    tier TEXT CHECK (tier IN ('premium', 'standard')),
    voice_id TEXT,  -- Cartesia voice ID
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    metadata JSONB
);

-- Voice turns with latency
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

-- Indexes
CREATE INDEX idx_voice_conv_domain ON voice_conversations(domain);
CREATE INDEX idx_voice_turns_conv ON voice_turns(conversation_id);
```

---

## 6. A/B Test Plan

### 6.1 STT Provider Test
```typescript
const AB_TEST_STT = {
  testName: 'stt-provider-solar',
  variants: {
    control: { provider: 'deepgram', weight: 0.9 },
    treatment: { provider: 'assemblyai', weight: 0.1 }
  },
  metrics: ['stt_latency', 'word_error_rate', 'solar_term_accuracy']
}
```

### 6.2 TTS Migration Test
```typescript
const AB_TEST_TTS = {
  testName: 'tts-elevenlabs-vs-cartesia',
  variants: {
    control: { provider: 'elevenlabs', weight: 0.5 },
    treatment: { provider: 'cartesia', weight: 0.5 }
  },
  metrics: ['tts_latency', 'user_satisfaction', 'voice_quality_rating']
}
```

---

## 7. Migration Path

### Phase 1: Add Cerebras LLM (Week 1)
- [ ] Add Cerebras API integration
- [ ] Route agent conversations through Cerebras
- [ ] Keep ElevenLabs TTS (working)
- [ ] Measure LLM latency improvement

### Phase 2: Add Cartesia TTS (Week 2)
- [ ] Integrate Cartesia API
- [ ] Map ElevenLabs voices to Cartesia
- [ ] A/B test ElevenLabs vs Cartesia
- [ ] Migrate winning provider

### Phase 3: Upgrade STT (Week 3)
- [ ] Add AssemblyAI real-time STT
- [ ] Replace Web Speech API
- [ ] A/B test Deepgram vs AssemblyAI
- [ ] Full pipeline optimization

### Phase 4: Production Hardening (Week 4)
- [ ] Latency tracking dashboard
- [ ] Fallback chains
- [ ] Multi-domain deployment
- [ ] Premium/standard tier routing

---

## 8. Environment Variables

```env
# Voice STT (NEW)
ASSEMBLYAI_API_KEY=        # A/B test
DEEPGRAM_API_KEY=          # Primary STT replacement

# Voice LLM (NEW)
CEREBRAS_API_KEY=          # Low-latency LLM

# Voice TTS
ELEVENLABS_API_KEY=        # Current (keep for fallback)
CARTESIA_API_KEY=          # New primary TTS

# Existing
DATABASE_URL=              # PostgreSQL
OPENAI_API_KEY=            # Fallback LLM
ANTHROPIC_API_KEY=         # Fallback LLM
```

---

## 9. Success Metrics

| Metric | Current | Target | Improvement |
|--------|---------|--------|-------------|
| Voice Loop | 2000ms+ | <500ms | 4x faster |
| LLM TTFT | 800ms+ | <200ms | 4x faster |
| TTS TTFA | 400ms | <100ms | 4x faster |
| STT Latency | 700ms | <150ms | 4.5x faster |

---

## Appendices

### A. Provider References
- [Cerebras Inference](https://inference-docs.cerebras.ai/)
- [AssemblyAI Real-time](https://www.assemblyai.com/docs/speech-to-text/real-time)
- [Deepgram Nova-3](https://developers.deepgram.com/)
- [Cartesia Sonic](https://docs.cartesia.ai/)
- [ElevenLabs](https://elevenlabs.io/docs) (current)
