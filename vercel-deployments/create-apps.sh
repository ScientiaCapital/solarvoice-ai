#!/bin/bash

# Create all 4 Next.js apps with proper flags to skip prompts

echo "🚀 Creating SolarVoice.ai..."
npx create-next-app@latest solarvoice \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --no-src-dir \
  --import-alias "@/*" \
  --use-npm

echo "🤖 Creating NetZeroBot.com..."
npx create-next-app@latest netzerobot \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --no-src-dir \
  --import-alias "@/*" \
  --use-npm

echo "🧮 Creating NetZeroCalculator.com..."
npx create-next-app@latest netzerocalculator \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --no-src-dir \
  --import-alias "@/*" \
  --use-npm

echo "🎓 Creating NetZeroExpert.com..."
npx create-next-app@latest netzeroexpert \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --no-src-dir \
  --import-alias "@/*" \
  --use-npm

echo "✅ All apps created successfully!"