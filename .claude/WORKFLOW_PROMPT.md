# SolarVoice AI Claude Code Session Starter

## Workflow Prompt

```
Load workflow-enforcer + project-context-skill for solarvoice-ai.

Check: .claude/context.md, CLAUDE.md, documentation/PRD_VOICE_UPGRADE.md, documentation/VOICE_ARCHITECTURE_REFERENCE.md

Current State:
- ✅ Voice system LIVE (Web Speech + OpenAI + ElevenLabs)
- ✅ Solar AI agents working (Commercial, Residential, Technical, Custom)
- ✅ Multi-domain deployment (solarvoice.ai, netzerobot.com, etc.)
- 🔴 Voice latency too high (~2000ms, target <500ms)

Voice Upgrade Focus:
- documentation/PRD_VOICE_UPGRADE.md (upgrade plan)
- documentation/VOICE_ARCHITECTURE_REFERENCE.md (implementation)

Target Voice Stack:
- STT: AssemblyAI (90-150ms) vs Deepgram (A/B test)
- LLM: Cerebras LLaMA 3.1 8B (100-200ms TTFT)
- TTS: Cartesia Sonic (40-90ms) - replace ElevenLabs

Priority Tasks:
1. Add Cerebras LLM integration in shared/voice/
2. Add Cartesia TTS as ElevenLabs replacement
3. Add AssemblyAI real-time STT (replace Web Speech API)
4. Voice latency tracking per turn
5. A/B test ElevenLabs vs Cartesia TTS

Blockers: CEREBRAS_API_KEY, CARTESIA_API_KEY, ASSEMBLYAI_API_KEY needed

Summarize completed work, current status, blockers, next tasks with agent assignments.
```

---

## Quick Context

**Project:** Multi-domain voice-first solar AI platform

**Domains:**
- solarvoice.ai - AI agent marketplace
- netzerobot.com - Solar chatbot
- netzeroexpert.com - Expert system
- netzerocalculator.com - Calculator tools

**Current Voice (working but slow):**
- Web Speech API → OpenAI/Claude → ElevenLabs
- ~2000ms voice loop

**Target Voice (4x faster):**
- AssemblyAI → Cerebras → Cartesia
- <500ms voice loop

**Key Files:**
- `shared/voice/` - Voice services
- `vercel-deployments/solarvoice/` - Main deployment
- `documentation/PRD_VOICE_UPGRADE.md` - Upgrade PRD

**Blockers:**
- CEREBRAS_API_KEY needed
- CARTESIA_API_KEY needed
- ASSEMBLYAI_API_KEY needed
