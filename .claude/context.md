# SolarVoice AI - Project Context

**Last Updated:** December 9, 2024  
**Status:** Voice Upgrade Planning

---

## Current State

### Voice System (LIVE)
- STT: Web Speech API (browser-native, ~700ms)
- LLM: OpenAI/Claude (~800-1500ms)  
- TTS: ElevenLabs eleven_monolingual_v1 (~400ms)
- **Total Loop: ~2000ms+** (too slow)

### Target State
- STT: AssemblyAI/Deepgram (<150ms)
- LLM: Cerebras LLaMA 8B (<200ms)
- TTS: Cartesia Sonic (<100ms)
- **Target Loop: <500ms** (4x improvement)

---

## Architecture

```yaml
platform: Multi-domain voice-first solar AI
domains:
  - solarvoice.ai (marketplace)
  - netzerobot.com (chatbot)
  - netzerocalculator.com (tools)
  - netzeroexpert.com (expert system)

current_voice:
  stt: web_speech_api
  llm: openai_claude
  tts: elevenlabs

target_voice:
  stt: assemblyai (A/B with deepgram)
  llm: cerebras
  tts: cartesia (fallback: elevenlabs)
```

---

## Key Documentation

| Doc | Purpose |
|-----|---------|
| `documentation/PRD_VOICE_UPGRADE.md` | Voice upgrade PRD |
| `documentation/VOICE_ARCHITECTURE_REFERENCE.md` | Implementation patterns |
| `CLAUDE.md` | Main project context |
| `documentation/PRD-PRODUCT-REQUIREMENTS-DOCUMENT.md` | Full platform PRD |

---

## Solar AI Agents

| Agent | Voice | Status |
|-------|-------|--------|
| Commercial Manager | Professional Male | ✅ ElevenLabs |
| Residential Advisor | Friendly Female | ✅ ElevenLabs |
| Technical Expert | Neutral Expert | ✅ ElevenLabs |
| NetZeroBot | Assistant | ✅ ElevenLabs |
| Custom Agents | User-selected | ✅ MVP Builder |

---

## Voice Latency Targets

| Metric | Current | Target |
|--------|---------|--------|
| STT | 700ms | <150ms |
| LLM TTFT | 800ms+ | <200ms |
| TTS | 400ms | <100ms |
| Voice Loop | 2000ms+ | <500ms |

---

## Environment Variables

```env
# Voice - NEEDED
CEREBRAS_API_KEY=needed
CARTESIA_API_KEY=needed
ASSEMBLYAI_API_KEY=needed

# Voice - EXISTING
ELEVENLABS_API_KEY=configured

# LLM
OPENAI_API_KEY=configured
ANTHROPIC_API_KEY=configured

# Database
DATABASE_URL=configured
```

---

## Priority Tasks

1. **Add Cerebras LLM** - Critical for <200ms TTFT
2. **Integrate Cartesia TTS** - Replace ElevenLabs
3. **Add AssemblyAI STT** - Replace Web Speech API
4. **Voice latency tracking** - Per-turn metrics
5. **A/B test framework** - ElevenLabs vs Cartesia

---

## Blockers

- [ ] CEREBRAS_API_KEY needed
- [ ] CARTESIA_API_KEY needed  
- [ ] ASSEMBLYAI_API_KEY needed
