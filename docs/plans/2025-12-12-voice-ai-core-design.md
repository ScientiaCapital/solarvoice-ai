# Voice AI Core - Architecture Design

**Date:** 2025-12-12
**Status:** Approved
**Author:** Principal Architect + Claude Code

---

## Executive Summary

Voice AI Core is a shared Python package that provides enterprise-grade voice capabilities to both SolarVoice and Vozlux. The system uses a plugin architecture for voice providers (Cartesia, Deepgram, Twilio) deployed as FastAPI microservices.

**Key Decisions:**
- Language: Python (pip-installable package)
- Architecture: Domain microservices with plugin providers
- Integration: FastAPI services consumed via REST/WebSocket
- Priority: Voice (TTS/STT) first, then Phone, then Orchestrator

---

## Repository Structure

```
tk_projects/
├── voice-ai-core/              # NEW: Shared voice package
│   ├── voice_core/             # pip-installable library
│   │   ├── providers/          # TTS/STT/Phone plugins
│   │   ├── middleware/         # Rate limit, cost, safety
│   │   ├── pipeline/           # Tier-based voice pipelines
│   │   ├── types/              # Pydantic models
│   │   └── emotions.py         # 57 Cartesia emotions
│   ├── services/               # Deployable microservices
│   │   ├── tts/               # Text-to-Speech API
│   │   ├── stt/               # Speech-to-Text API
│   │   └── phone/             # Twilio integration
│   ├── tests/                  # Unit, integration, e2e
│   ├── pyproject.toml
│   └── docker-compose.yml
│
├── solarvoice-ai/              # Consumes voice-ai-core
└── vozlux/                     # Consumes voice-ai-core
```

---

## Provider Plugin System

### Abstract Interfaces

```python
class TTSProvider(ABC):
    async def synthesize(text: str, config: TTSConfig) -> bytes
    async def synthesize_stream(text: str, config: TTSConfig) -> AsyncGenerator[AudioChunk]
    def get_voices(language: str) -> list[dict]

class STTProvider(ABC):
    async def transcribe(audio: bytes, config: STTConfig) -> TranscriptResult
    async def create_stream(config: STTConfig) -> STTStream

class PhoneProvider(ABC):
    async def handle_incoming(call_data: dict) -> str
    async def initiate_outbound(to: str, agent_type: str) -> str
```

### Concrete Implementations

| Provider | Class | Source |
|----------|-------|--------|
| Cartesia TTS | `CartesiaTTS` | Extract from Vozlux |
| Deepgram STT | `DeepgramSTT` | Extract from Vozlux |
| Twilio Phone | `TwilioPhone` | Extract from Vozlux |

---

## Microservices API

### TTS Service (Port 8001)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/synthesize` | POST | Generate audio from text |
| `/v1/synthesize/stream` | WebSocket | Real-time audio streaming |
| `/v1/voices` | GET | List available voices |
| `/v1/emotions` | GET | List 57 Cartesia emotions |

### STT Service (Port 8002)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/transcribe` | POST | Batch audio transcription |
| `/v1/stream` | WebSocket | Real-time streaming STT |
| `/v1/languages` | GET | Supported languages |

### Phone Service (Port 8003) - Phase 2

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/calls/incoming` | POST | Twilio webhook |
| `/v1/calls/outbound` | POST | Initiate outbound call |
| `/v1/media-stream/{sid}` | WebSocket | Real-time audio |

---

## Multi-Tenant Enterprise Features

### Tenant Context (All Requests)

```
X-Tenant-ID: business_123
X-Tier: pro
X-API-Key: vac_xxx...
```

### Tier-Based Features

| Feature | Free | Starter | Pro | Enterprise |
|---------|------|---------|-----|------------|
| TTS Latency | 2500ms | 1000ms | 600ms | 400ms |
| STT Streaming | No | No | Yes | Yes |
| Emotions | 5 | 20 | 57 | 57 + Custom |
| Phone | No | Inbound | In+Out | Full IVR |
| Rate Limit | 10/min | 30/min | 100/min | 500/min |

---

## Middleware Chain

All requests pass through middleware in order:

1. **ObservabilityMiddleware** - Logging, metrics, tracing
2. **RateLimitMiddleware** - Per-tenant rate enforcement
3. **CostControlMiddleware** - Credit check, usage tracking
4. **SafetyMiddleware** - PII detection, input validation

```python
executor = ToolExecutor([
    ObservabilityMiddleware(),
    RateLimitMiddleware(backend="redis"),
    CostControlMiddleware(),
    SafetyMiddleware(redact_pii=True),
])
```

---

## Deployment Architecture

```
                    Load Balancer
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   TTS Service     STT Service     Phone Service
   (FastAPI)       (FastAPI)       (FastAPI)
        │                │                │
   Cartesia API    Deepgram API    Twilio API

Shared: Redis (rate limit) + PostgreSQL (usage) + Prometheus (metrics)
```

**Deployment Options:**
- Docker Compose (local dev)
- Kubernetes (enterprise scale)
- Railway/Render (managed PaaS)

---

## Source Files to Extract from Vozlux

| Component | Vozlux Path | Lines | Priority |
|-----------|-------------|-------|----------|
| Pipeline Base | `voice/pipeline/base.py` | 448 | HIGH |
| Pipeline Factory | `voice/pipeline/factory.py` | 135 | HIGH |
| Cartesia TTS | `voice/providers/cartesia_tts.py` | 630 | HIGH |
| Deepgram STT | `voice/providers/deepgram_stt.py` | 313 | HIGH |
| Media Streams | `voice/media_streams.py` | 150+ | MEDIUM |
| Twilio Integration | `voice/twilio_integration.py` | 1600+ | MEDIUM |
| Middleware Suite | `tools/middleware/*.py` | 800+ | HIGH |
| Config | `config.py` | 120 | HIGH |

---

## Dependencies

```toml
[project]
dependencies = [
    "fastapi>=0.124.0",
    "uvicorn>=0.30.0",
    "pydantic>=2.0.0",
    "pydantic-settings>=2.0.0",
    "cartesia>=1.0.0",
    "deepgram-sdk>=5.3.0",
    "twilio>=9.0.0",
    "redis>=7.0.0",
    "httpx>=0.27.0",
    "websockets>=13.0",
]
```

---

## Success Criteria

1. Both SolarVoice and Vozlux can import `voice_core` independently
2. TTS latency <600ms for Pro tier
3. STT streaming works in real-time
4. Multi-tenant isolation enforced
5. 95%+ test coverage
6. Zero hardcoded API keys

---

## Next Steps

1. Create `voice-ai-core` repository
2. Extract and refactor Vozlux voice providers
3. Build TTS microservice with tests
4. Build STT microservice with tests
5. Integrate with SolarVoice
6. Add Phone service (Phase 2)
