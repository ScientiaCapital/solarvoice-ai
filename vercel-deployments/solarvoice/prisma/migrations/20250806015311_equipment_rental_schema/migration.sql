-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('CONTRACTOR', 'ENTERPRISE', 'ADMIN', 'DEVELOPER');

-- CreateEnum
CREATE TYPE "public"."TradeType" AS ENUM ('SOLAR_ONLY', 'SOLAR_ROOF', 'SOLAR_HVAC', 'SOLAR_ELECTRICAL', 'SOLAR_BATTERY', 'SOLAR_EV', 'SOLAR_GENERATOR', 'WHOLE_HOME_ENERGY', 'NET_ZERO_COMMERCIAL', 'UTILITY_SCALE');

-- CreateEnum
CREATE TYPE "public"."ModelCategory" AS ENUM ('RESIDENTIAL', 'RESI_COMMERCIAL', 'COMMERCIAL', 'BIG_COMMERCIAL', 'C_AND_I', 'INDUSTRIAL', 'UTILITY', 'WHOLE_HOME', 'MULTI_TRADE', 'NET_ZERO');

-- CreateEnum
CREATE TYPE "public"."DocumentType" AS ENUM ('PDF', 'TXT', 'URL', 'MANUAL', 'CODE_REGULATION', 'PERMIT_GUIDE', 'INCENTIVE_PROGRAM', 'UTILITY_TARIFF', 'PRODUCT_SPEC', 'FAQ');

-- CreateEnum
CREATE TYPE "public"."RentalType" AS ENUM ('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'PROJECT');

-- CreateEnum
CREATE TYPE "public"."RentalStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'EXTENDED');

-- CreateEnum
CREATE TYPE "public"."SubscriptionPlan" AS ENUM ('SOLO', 'TEAM', 'ENTERPRISE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."BillingCycle" AS ENUM ('MONTHLY', 'ANNUAL');

-- CreateEnum
CREATE TYPE "public"."SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'EXPIRED', 'SUSPENDED', 'TRIAL');

-- CreateEnum
CREATE TYPE "public"."InvoiceStatus" AS ENUM ('DRAFT', 'PENDING', 'PAID', 'OVERDUE', 'CANCELLED', 'REFUNDED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "companyName" TEXT,
    "phoneNumber" TEXT,
    "preferredLanguage" TEXT NOT NULL DEFAULT 'en',
    "role" "public"."UserRole" NOT NULL DEFAULT 'CONTRACTOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContractorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "licenseNumbers" JSONB,
    "insuranceCoverage" JSONB,
    "bondingCapacity" DECIMAL(12,2),
    "tradeTypes" "public"."TradeType"[],
    "certifications" TEXT[],
    "completedProjects" INTEGER NOT NULL DEFAULT 0,
    "totalMwInstalled" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "customerRating" DECIMAL(3,2),
    "verifiedInstaller" BOOLEAN NOT NULL DEFAULT false,
    "trustScore" INTEGER NOT NULL DEFAULT 50,
    "serviceZipCodes" TEXT[],
    "serviceStates" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EquipmentModel" (
    "id" TEXT NOT NULL,
    "modelCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."ModelCategory" NOT NULL,
    "tradeTypes" "public"."TradeType"[],
    "projectSizeMin" INTEGER,
    "projectSizeMax" INTEGER,
    "voiceId" TEXT NOT NULL,
    "spanishVoiceId" TEXT,
    "languages" TEXT[] DEFAULT ARRAY['en']::TEXT[],
    "voicePersonality" TEXT,
    "hourlyRate" DECIMAL(10,2) NOT NULL,
    "dailyRate" DECIMAL(10,2) NOT NULL,
    "weeklyRate" DECIMAL(10,2) NOT NULL,
    "monthlyRate" DECIMAL(10,2) NOT NULL,
    "creatorId" TEXT,
    "isMarketplace" BOOLEAN NOT NULL DEFAULT false,
    "revenueShare" DECIMAL(3,2),
    "capabilities" TEXT[],
    "integrations" TEXT[],
    "totalRentals" INTEGER NOT NULL DEFAULT 0,
    "totalRevenue" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "avgRating" DECIMAL(3,2),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EquipmentModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."KnowledgeBase" (
    "id" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "documentType" "public"."DocumentType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "url" TEXT,
    "category" TEXT,
    "tags" TEXT[],
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeBase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Rental" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "rentalType" "public"."RentalType" NOT NULL,
    "duration" INTEGER NOT NULL,
    "totalCost" DECIMAL(10,2) NOT NULL,
    "projectName" TEXT,
    "projectSize" DECIMAL(10,2),
    "projectType" "public"."TradeType",
    "projectZip" TEXT,
    "languageUsed" TEXT NOT NULL DEFAULT 'en',
    "voiceMinutesUsed" INTEGER NOT NULL DEFAULT 0,
    "conversationCount" INTEGER NOT NULL DEFAULT 0,
    "status" "public"."RentalStatus" NOT NULL DEFAULT 'ACTIVE',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VoiceInteraction" (
    "id" TEXT NOT NULL,
    "rentalId" TEXT,
    "userId" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "intent" TEXT,
    "confidence" DECIMAL(3,2),
    "projectContext" JSONB,
    "durationSeconds" INTEGER NOT NULL,
    "responseTime" INTEGER,
    "successful" BOOLEAN NOT NULL DEFAULT true,
    "errorMessage" TEXT,
    "voiceId" TEXT,
    "audioUrl" TEXT,
    "summary" TEXT,
    "actionItems" JSONB,
    "followUpNeeded" BOOLEAN NOT NULL DEFAULT false,
    "leadQuality" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VoiceInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VoiceCommand" (
    "id" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "commandEn" TEXT NOT NULL,
    "commandEs" TEXT,
    "intent" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "parameters" JSONB,
    "responseEn" TEXT NOT NULL,
    "responseEs" TEXT,
    "variables" TEXT[],
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "successRate" DECIMAL(3,2),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VoiceCommand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" "public"."SubscriptionPlan" NOT NULL,
    "monthlyPrice" DECIMAL(10,2) NOT NULL,
    "billingCycle" "public"."BillingCycle" NOT NULL DEFAULT 'MONTHLY',
    "modelsIncluded" INTEGER NOT NULL,
    "voiceMinutes" INTEGER NOT NULL,
    "customModels" INTEGER NOT NULL DEFAULT 0,
    "status" "public"."SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "stripeSubscriptionId" TEXT,
    "stripeCustomerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Invoice" (
    "id" TEXT NOT NULL,
    "rentalId" TEXT NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "tax" DECIMAL(10,2) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "status" "public"."InvoiceStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3) NOT NULL,
    "stripeInvoiceId" TEXT,
    "stripePaymentIntentId" TEXT,
    "lineItems" JSONB,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FavoriteModel" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DailyAnalytics" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "totalRentals" INTEGER NOT NULL,
    "totalRevenue" DECIMAL(12,2) NOT NULL,
    "activeUsers" INTEGER NOT NULL,
    "newSignups" INTEGER NOT NULL,
    "totalVoiceMinutes" INTEGER NOT NULL,
    "totalConversations" INTEGER NOT NULL,
    "avgConversationTime" INTEGER NOT NULL,
    "englishMinutes" INTEGER NOT NULL,
    "spanishMinutes" INTEGER NOT NULL,
    "topModels" JSONB NOT NULL,
    "tradeTypeMetrics" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ModelPerformance" (
    "id" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "rentalsCount" INTEGER NOT NULL DEFAULT 0,
    "voiceMinutes" INTEGER NOT NULL DEFAULT 0,
    "revenue" DECIMAL(10,2) NOT NULL,
    "avgRating" DECIMAL(3,2),
    "successRate" DECIMAL(3,2),
    "englishPercent" INTEGER NOT NULL DEFAULT 100,
    "spanishPercent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModelPerformance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ContractorProfile_userId_key" ON "public"."ContractorProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentModel_modelCode_key" ON "public"."EquipmentModel"("modelCode");

-- CreateIndex
CREATE INDEX "EquipmentModel_modelCode_idx" ON "public"."EquipmentModel"("modelCode");

-- CreateIndex
CREATE INDEX "EquipmentModel_category_idx" ON "public"."EquipmentModel"("category");

-- CreateIndex
CREATE INDEX "KnowledgeBase_modelId_idx" ON "public"."KnowledgeBase"("modelId");

-- CreateIndex
CREATE INDEX "KnowledgeBase_category_idx" ON "public"."KnowledgeBase"("category");

-- CreateIndex
CREATE INDEX "Rental_userId_idx" ON "public"."Rental"("userId");

-- CreateIndex
CREATE INDEX "Rental_modelId_idx" ON "public"."Rental"("modelId");

-- CreateIndex
CREATE INDEX "Rental_status_idx" ON "public"."Rental"("status");

-- CreateIndex
CREATE INDEX "VoiceInteraction_rentalId_idx" ON "public"."VoiceInteraction"("rentalId");

-- CreateIndex
CREATE INDEX "VoiceInteraction_userId_idx" ON "public"."VoiceInteraction"("userId");

-- CreateIndex
CREATE INDEX "VoiceInteraction_createdAt_idx" ON "public"."VoiceInteraction"("createdAt");

-- CreateIndex
CREATE INDEX "VoiceInteraction_intent_idx" ON "public"."VoiceInteraction"("intent");

-- CreateIndex
CREATE INDEX "VoiceCommand_modelId_idx" ON "public"."VoiceCommand"("modelId");

-- CreateIndex
CREATE INDEX "VoiceCommand_intent_idx" ON "public"."VoiceCommand"("intent");

-- CreateIndex
CREATE INDEX "VoiceCommand_category_idx" ON "public"."VoiceCommand"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "public"."Subscription"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "Subscription_userId_idx" ON "public"."Subscription"("userId");

-- CreateIndex
CREATE INDEX "Subscription_status_idx" ON "public"."Subscription"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_stripeInvoiceId_key" ON "public"."Invoice"("stripeInvoiceId");

-- CreateIndex
CREATE INDEX "Invoice_rentalId_idx" ON "public"."Invoice"("rentalId");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "public"."Invoice"("status");

-- CreateIndex
CREATE INDEX "FavoriteModel_userId_idx" ON "public"."FavoriteModel"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteModel_userId_modelId_key" ON "public"."FavoriteModel"("userId", "modelId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyAnalytics_date_key" ON "public"."DailyAnalytics"("date");

-- CreateIndex
CREATE INDEX "DailyAnalytics_date_idx" ON "public"."DailyAnalytics"("date");

-- CreateIndex
CREATE INDEX "ModelPerformance_modelId_idx" ON "public"."ModelPerformance"("modelId");

-- CreateIndex
CREATE INDEX "ModelPerformance_date_idx" ON "public"."ModelPerformance"("date");

-- CreateIndex
CREATE UNIQUE INDEX "ModelPerformance_modelId_date_key" ON "public"."ModelPerformance"("modelId", "date");

-- AddForeignKey
ALTER TABLE "public"."ContractorProfile" ADD CONSTRAINT "ContractorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EquipmentModel" ADD CONSTRAINT "EquipmentModel_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."KnowledgeBase" ADD CONSTRAINT "KnowledgeBase_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "public"."EquipmentModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rental" ADD CONSTRAINT "Rental_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rental" ADD CONSTRAINT "Rental_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "public"."EquipmentModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VoiceInteraction" ADD CONSTRAINT "VoiceInteraction_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "public"."Rental"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VoiceInteraction" ADD CONSTRAINT "VoiceInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VoiceCommand" ADD CONSTRAINT "VoiceCommand_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "public"."EquipmentModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invoice" ADD CONSTRAINT "Invoice_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "public"."Rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FavoriteModel" ADD CONSTRAINT "FavoriteModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FavoriteModel" ADD CONSTRAINT "FavoriteModel_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "public"."EquipmentModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
