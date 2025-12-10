-- Voice Pipeline Latency Tracking Migration
-- Port from Vozlux: Voice pipeline metrics for A/B testing and optimization
-- Target: <600ms E2E (PRO tier)

-- Add latency tracking columns to VoiceInteraction
ALTER TABLE "VoiceInteraction" ADD COLUMN IF NOT EXISTS "sttLatencyMs" INTEGER;
ALTER TABLE "VoiceInteraction" ADD COLUMN IF NOT EXISTS "llmTtftMs" INTEGER;
ALTER TABLE "VoiceInteraction" ADD COLUMN IF NOT EXISTS "ttsLatencyMs" INTEGER;
ALTER TABLE "VoiceInteraction" ADD COLUMN IF NOT EXISTS "totalLatencyMs" INTEGER;

-- Add provider tracking for A/B testing
ALTER TABLE "VoiceInteraction" ADD COLUMN IF NOT EXISTS "sttProvider" TEXT;
ALTER TABLE "VoiceInteraction" ADD COLUMN IF NOT EXISTS "llmProvider" TEXT;
ALTER TABLE "VoiceInteraction" ADD COLUMN IF NOT EXISTS "ttsProvider" TEXT DEFAULT 'cartesia';

-- Add emotion tracking
ALTER TABLE "VoiceInteraction" ADD COLUMN IF NOT EXISTS "inputEmotion" TEXT;
ALTER TABLE "VoiceInteraction" ADD COLUMN IF NOT EXISTS "responseEmotion" TEXT;

-- Create index for latency analysis
CREATE INDEX IF NOT EXISTS "VoiceInteraction_totalLatencyMs_idx" ON "VoiceInteraction"("totalLatencyMs");

-- Create index for provider analysis
CREATE INDEX IF NOT EXISTS "VoiceInteraction_llmProvider_idx" ON "VoiceInteraction"("llmProvider");

-- Create index for emotion analysis
CREATE INDEX IF NOT EXISTS "VoiceInteraction_responseEmotion_idx" ON "VoiceInteraction"("responseEmotion");

-- Create view for latency dashboard
CREATE OR REPLACE VIEW voice_latency_stats AS
SELECT
  DATE_TRUNC('hour', "createdAt") AS hour,
  COUNT(*) AS total_interactions,
  AVG("sttLatencyMs") AS avg_stt_ms,
  AVG("llmTtftMs") AS avg_llm_ttft_ms,
  AVG("ttsLatencyMs") AS avg_tts_ms,
  AVG("totalLatencyMs") AS avg_total_ms,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY "totalLatencyMs") AS p95_total_ms,
  PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY "totalLatencyMs") AS p99_total_ms,
  "llmProvider",
  "ttsProvider"
FROM "VoiceInteraction"
WHERE "totalLatencyMs" IS NOT NULL
GROUP BY DATE_TRUNC('hour', "createdAt"), "llmProvider", "ttsProvider"
ORDER BY hour DESC;

COMMENT ON VIEW voice_latency_stats IS 'Voice pipeline latency metrics for monitoring and A/B testing';
