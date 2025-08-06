// SolarVoice.ai Equipment Model Seeder
// Seeds initial AI equipment models for the marketplace

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ElevenLabs Voice IDs (using their pre-made voices)
const VOICE_IDS = {
  adam: 'pNInz6obpgDQGcFmaJgB',      // Professional male
  bella: 'EXAVITQu4vr4xnSDxMaL',     // Friendly female  
  arnold: 'VR6AewLTigWG4xSOukaG',    // Technical male
  antoni: 'ErXwobaYiN019PkySvjV',    // Persuasive male
  elli: 'MF3mGyEYCl7XYWbV9V6O',      // Authoritative female
  matilda: 'XrExE9yKIg1WjnnlVkGX',   // Warm female
  josh: 'TxGEqnHWrfWFTfGW9XjX',      // Young professional male
}

const equipmentModels = [
  // ========== CORE SOLAR MODELS ==========
  {
    modelCode: 'CPM-24',
    name: 'Commercial Project Manager',
    description: 'Specialized AI for managing commercial solar installations (250kW-2MW). Handles permits, timelines, and crew coordination.',
    category: 'COMMERCIAL',
    tradeTypes: ['SOLAR_ONLY', 'SOLAR_ELECTRICAL'],
    projectSizeMin: 250,
    projectSizeMax: 2000,
    voiceId: VOICE_IDS.adam,
    spanishVoiceId: VOICE_IDS.antoni,
    languages: ['en', 'es'],
    voicePersonality: 'Professional',
    hourlyRate: 4.99,
    dailyRate: 99,
    weeklyRate: 499,
    monthlyRate: 1499,
    capabilities: [
      'permit_tracking',
      'timeline_management',
      'crew_coordination',
      'compliance_checking',
      'progress_reporting'
    ],
    integrations: ['ServiceTitan', 'ProCore', 'Aurora']
  },
  
  // ========== WHOLE HOME ENERGY MODELS ==========
  {
    modelCode: 'WHE-24',
    name: 'Whole Home Energy Advisor',
    description: 'Complete energy retrofit specialist for residential net-zero projects. Analyzes solar, battery, HVAC, and insulation options.',
    category: 'WHOLE_HOME',
    tradeTypes: ['WHOLE_HOME_ENERGY', 'NET_ZERO_COMMERCIAL'],
    projectSizeMin: 5,
    projectSizeMax: 100,
    voiceId: VOICE_IDS.bella,
    spanishVoiceId: VOICE_IDS.matilda,
    languages: ['en', 'es'],
    voicePersonality: 'Friendly',
    hourlyRate: 3.99,
    dailyRate: 79,
    weeklyRate: 399,
    monthlyRate: 1199,
    capabilities: [
      'energy_audit',
      'roi_calculation',
      'incentive_finding',
      'load_analysis',
      'financing_options'
    ],
    integrations: ['OpenSolar', 'EnergyHub', 'DSIRE']
  },
  
  // ========== MULTI-TRADE MODELS ==========
  {
    modelCode: 'SRC-24',
    name: 'Solar + Roof Coordinator',
    description: 'Coordinates solar installations with roofing projects. Assesses roof condition, manages warranties, and sequences work.',
    category: 'MULTI_TRADE',
    tradeTypes: ['SOLAR_ROOF'],
    projectSizeMin: 5,
    projectSizeMax: 500,
    voiceId: VOICE_IDS.arnold,
    spanishVoiceId: VOICE_IDS.antoni,
    languages: ['en', 'es'],
    voicePersonality: 'Technical',
    hourlyRate: 4.49,
    dailyRate: 89,
    weeklyRate: 449,
    monthlyRate: 1349,
    capabilities: [
      'roof_assessment',
      'warranty_coordination',
      'installation_sequencing',
      'material_planning',
      'weather_monitoring'
    ],
    integrations: ['GAF', 'CertainTeed', 'EagleView']
  },
  
  {
    modelCode: 'SHC-24',
    name: 'Solar + HVAC Controller',
    description: 'Optimizes solar with heat pump and HVAC systems. Calculates load balancing and seasonal performance.',
    category: 'MULTI_TRADE',
    tradeTypes: ['SOLAR_HVAC'],
    projectSizeMin: 5,
    projectSizeMax: 250,
    voiceId: VOICE_IDS.josh,
    spanishVoiceId: VOICE_IDS.antoni,
    languages: ['en', 'es'],
    voicePersonality: 'Technical',
    hourlyRate: 4.49,
    dailyRate: 89,
    weeklyRate: 449,
    monthlyRate: 1349,
    capabilities: [
      'load_calculation',
      'heat_pump_sizing',
      'seasonal_modeling',
      'efficiency_optimization',
      'rebate_calculation'
    ],
    integrations: ['Carrier', 'Trane', 'Mitsubishi', 'Manual J']
  },
  
  // ========== BATTERY & EV MODELS ==========
  {
    modelCode: 'BES-24',
    name: 'Battery Energy Specialist',
    description: 'Expert in battery storage systems. Configures Tesla Powerwall, Enphase, LG systems with backup and TOU optimization.',
    category: 'MULTI_TRADE',
    tradeTypes: ['SOLAR_BATTERY'],
    projectSizeMin: 5,
    projectSizeMax: 1000,
    voiceId: VOICE_IDS.elli,
    spanishVoiceId: VOICE_IDS.matilda,
    languages: ['en', 'es'],
    voicePersonality: 'Authoritative',
    hourlyRate: 5.49,
    dailyRate: 109,
    weeklyRate: 549,
    monthlyRate: 1649,
    capabilities: [
      'battery_sizing',
      'backup_configuration',
      'tou_optimization',
      'microgrid_design',
      'vpp_integration'
    ],
    integrations: ['Tesla', 'Enphase', 'SolarEdge', 'Fortress']
  },
  
  {
    modelCode: 'EVC-24',
    name: 'EV Charging Coordinator',
    description: 'Plans and configures EV charging installations with solar integration. Handles Level 2/3 chargers and fleet solutions.',
    category: 'MULTI_TRADE',
    tradeTypes: ['SOLAR_EV'],
    projectSizeMin: 10,
    projectSizeMax: 500,
    voiceId: VOICE_IDS.josh,
    spanishVoiceId: VOICE_IDS.antoni,
    languages: ['en', 'es'],
    voicePersonality: 'Professional',
    hourlyRate: 3.99,
    dailyRate: 79,
    weeklyRate: 399,
    monthlyRate: 1199,
    capabilities: [
      'charger_selection',
      'load_management',
      'panel_upgrade_calc',
      'fleet_planning',
      'utility_coordination'
    ],
    integrations: ['ChargePoint', 'Tesla', 'Electrify America', 'Blink']
  },
  
  // ========== UTILITY SCALE MODELS ==========
  {
    modelCode: 'UFM-24',
    name: 'Utility Farm Manager',
    description: 'Manages MW-scale solar farm projects. Handles interconnection, PPA negotiations, and O&M planning.',
    category: 'UTILITY',
    tradeTypes: ['UTILITY_SCALE'],
    projectSizeMin: 1000,
    projectSizeMax: null, // No upper limit
    voiceId: VOICE_IDS.arnold,
    spanishVoiceId: VOICE_IDS.antoni,
    languages: ['en', 'es'],
    voicePersonality: 'Authoritative',
    hourlyRate: 9.99,
    dailyRate: 199,
    weeklyRate: 999,
    monthlyRate: 2999,
    capabilities: [
      'interconnection_queue',
      'ppa_analysis',
      'tracker_optimization',
      'vegetation_management',
      'performance_modeling'
    ],
    integrations: ['PVSyst', 'HelioScope', 'PlantPredict', 'SCADA']
  },
  
  // ========== SALES & FINANCING MODELS ==========
  {
    modelCode: 'SFS-24',
    name: 'Solar Finance Specialist',
    description: 'Expert in solar financing options. Handles loans, leases, PPAs, PACE, and tax credit optimization.',
    category: 'RESIDENTIAL',
    tradeTypes: ['SOLAR_ONLY', 'WHOLE_HOME_ENERGY'],
    projectSizeMin: 5,
    projectSizeMax: 500,
    voiceId: VOICE_IDS.bella,
    spanishVoiceId: VOICE_IDS.matilda,
    languages: ['en', 'es'],
    voicePersonality: 'Friendly',
    hourlyRate: 2.99,
    dailyRate: 59,
    weeklyRate: 299,
    monthlyRate: 899,
    capabilities: [
      'financing_comparison',
      'tax_credit_calculation',
      'roi_analysis',
      'cash_flow_modeling',
      'incentive_stacking'
    ],
    integrations: ['Mosaic', 'Sunlight', 'GoodLeap', 'PACE']
  }
]

async function seedEquipmentModels() {
  console.log('🌱 Seeding SolarVoice.ai Equipment Models...')
  
  for (const model of equipmentModels) {
    try {
      const created = await prisma.equipmentModel.create({
        data: {
          ...model,
          isMarketplace: false,
          isActive: true
        }
      })
      console.log(`✅ Created model: ${created.modelCode} - ${created.name}`)
    } catch (error) {
      console.error(`❌ Error creating model ${model.modelCode}:`, error)
    }
  }
  
  console.log('\n📊 Seeding complete!')
  console.log('Total models created:', equipmentModels.length)
}

// Seed voice commands for each model
async function seedVoiceCommands() {
  console.log('\n🎤 Seeding Voice Commands...')
  
  const commands = [
    // Universal commands for all models
    {
      intent: 'greeting',
      category: 'general',
      commandEn: 'Hello',
      commandEs: 'Hola',
      responseEn: 'Hello! I\'m your {{model_name}}. How can I help with your solar project today?',
      responseEs: '¡Hola! Soy su {{model_name}}. ¿Cómo puedo ayudar con su proyecto solar hoy?',
      variables: ['model_name']
    },
    {
      intent: 'project_size',
      category: 'technical',
      commandEn: 'What size system do I need for my building?',
      commandEs: '¿Qué tamaño de sistema necesito para mi edificio?',
      responseEn: 'Based on your building size of {{building_size}} sq ft and average usage, I recommend a {{system_size}}kW system.',
      responseEs: 'Basado en su edificio de {{building_size}} pies cuadrados y uso promedio, recomiendo un sistema de {{system_size}}kW.',
      variables: ['building_size', 'system_size']
    },
    {
      intent: 'roi_calculation',
      category: 'financing',
      commandEn: 'Calculate ROI for a {{size}}kW system',
      commandEs: 'Calcular ROI para sistema de {{size}}kW',
      responseEn: 'For a {{size}}kW system, with current incentives, your ROI would be {{roi_years}} years with {{savings}} in lifetime savings.',
      responseEs: 'Para un sistema de {{size}}kW, con incentivos actuales, su ROI sería {{roi_years}} años con {{savings}} en ahorros totales.',
      variables: ['size', 'roi_years', 'savings']
    },
    {
      intent: 'permit_check',
      category: 'permits',
      commandEn: 'What permits do I need in {{city}}?',
      commandEs: '¿Qué permisos necesito en {{city}}?',
      responseEn: 'In {{city}}, you\'ll need: building permit, electrical permit, and interconnection agreement. Processing time is typically {{days}} days.',
      responseEs: 'En {{city}}, necesitará: permiso de construcción, permiso eléctrico, y acuerdo de interconexión. El tiempo es típicamente {{days}} días.',
      variables: ['city', 'days']
    },
    {
      intent: 'incentive_search',
      category: 'financing',
      commandEn: 'What incentives are available?',
      commandEs: '¿Qué incentivos están disponibles?',
      responseEn: 'Available incentives: Federal ITC (30%), {{state}} rebate ({{rebate_amount}}), and net metering with {{utility}}.',
      responseEs: 'Incentivos disponibles: ITC Federal (30%), reembolso de {{state}} ({{rebate_amount}}), y medición neta con {{utility}}.',
      variables: ['state', 'rebate_amount', 'utility']
    }
  ]
  
  // Get all models
  const models = await prisma.equipmentModel.findMany()
  
  for (const model of models) {
    for (const command of commands) {
      try {
        await prisma.voiceCommand.create({
          data: {
            modelId: model.id,
            ...command,
            usageCount: 0,
            isActive: true
          }
        })
      } catch (error) {
        console.error(`Error creating command for ${model.modelCode}:`, error)
      }
    }
  }
  
  console.log('✅ Voice commands seeded')
}

// Main execution
async function main() {
  try {
    await seedEquipmentModels()
    await seedVoiceCommands()
  } catch (error) {
    console.error('Error during seeding:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()