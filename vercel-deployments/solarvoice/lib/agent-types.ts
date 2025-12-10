/**
 * Agent Types Configuration
 *
 * 19 MEP+Energy voice agents across 6 trades and multiple scales.
 * Follows Vozlux BUSINESS_TYPES pattern for consistency.
 */

import {
  Sun,
  Building,
  Factory,
  Zap,
  Flame,
  Droplet,
  Home,
  Shield,
  Cable,
  Bell,
  type LucideIcon,
} from "lucide-react"

// Trade types
export const TRADES = [
  "Solar",
  "Electrical",
  "HVAC",
  "Plumbing",
  "Roofing",
  "Low Voltage",
] as const

export type Trade = (typeof TRADES)[number]

// Scale types
export const SCALES = [
  "Residential",
  "Commercial",
  "Industrial",
  "Utility",
] as const

export type Scale = (typeof SCALES)[number]

// Trade colors matching brand guidelines
export const TRADE_COLORS: Record<Trade, string> = {
  Solar: "#F59E0B", // Amber
  Electrical: "#3B82F6", // Blue
  HVAC: "#EF4444", // Red (heat/cool)
  Plumbing: "#06B6D4", // Cyan (water)
  Roofing: "#8B5CF6", // Purple
  "Low Voltage": "#10B981", // Emerald
}

// Trade icons
export const TRADE_ICONS: Record<Trade, string> = {
  Solar: "Sun",
  Electrical: "Zap",
  HVAC: "Flame",
  Plumbing: "Droplet",
  Roofing: "Home",
  "Low Voltage": "Shield",
}

// Agent type definition
export interface AgentType {
  id: string
  slug: string
  name: string
  trade: Trade
  scale: Scale
  icon: string
  color: string
  monthlyPrice: number // in cents
  description: string
  promptPath: string
  cartesiaVoiceId?: string
  features: string[]
}

/**
 * All 19 MEP+Energy voice agents
 */
export const AGENT_TYPES: Record<string, AgentType> = {
  // ==================== SOLAR (4 agents) ====================
  "residential-solar": {
    id: "residential-solar",
    slug: "residential-solar",
    name: "Residential Solar Specialist",
    trade: "Solar",
    scale: "Residential",
    icon: "Sun",
    color: "#F59E0B",
    monthlyPrice: 9900, // $99
    description:
      "Handle residential solar inquiries, qualify leads, schedule consultations, and explain solar benefits to homeowners.",
    promptPath: "prompts-import/prompts/solar/residential-solar.md",
    cartesiaVoiceId: "a0e99841-438c-4a64-b679-ae501e7d6091",
    features: [
      "Lead qualification",
      "Consultation scheduling",
      "Savings calculations",
      "Battery backup education",
    ],
  },
  "commercial-solar": {
    id: "commercial-solar",
    slug: "commercial-solar",
    name: "Commercial Solar Consultant",
    trade: "Solar",
    scale: "Commercial",
    icon: "Building",
    color: "#F59E0B",
    monthlyPrice: 14900, // $149
    description:
      "Handle C&I solar projects, demand charge analysis, and commercial property assessments for 25-500kW systems.",
    promptPath: "prompts-import/prompts/solar/commercial-solar.md",
    cartesiaVoiceId: "694f9389-aac1-45b6-b726-9d9369183238",
    features: [
      "C&I project scoping",
      "Demand charge analysis",
      "ROI calculations",
      "PPAs and leases",
    ],
  },
  "industrial-solar": {
    id: "industrial-solar",
    slug: "industrial-solar",
    name: "Industrial Solar Project Manager",
    trade: "Solar",
    scale: "Industrial",
    icon: "Factory",
    color: "#F59E0B",
    monthlyPrice: 19900, // $199
    description:
      "Manage large-scale C&I solar projects (500kW-10MW), microgrid solutions, and industrial energy storage.",
    promptPath: "prompts-import/prompts/solar/industrial-solar.md",
    cartesiaVoiceId: "694f9389-aac1-45b6-b726-9d9369183238",
    features: [
      "Large-scale project management",
      "BESS integration",
      "Microgrid design",
      "Industrial load analysis",
    ],
  },
  "utility-solar": {
    id: "utility-solar",
    slug: "utility-solar",
    name: "Utility-Scale Solar Coordinator",
    trade: "Solar",
    scale: "Utility",
    icon: "Zap",
    color: "#F59E0B",
    monthlyPrice: 19900, // $199
    description:
      "Coordinate utility-scale PV projects (10MW+), grid interconnection, and PPA negotiations.",
    promptPath: "prompts-import/prompts/solar/utility-solar.md",
    cartesiaVoiceId: "694f9389-aac1-45b6-b726-9d9369183238",
    features: [
      "Grid interconnection",
      "PPA negotiations",
      "Utility coordination",
      "Large-scale permitting",
    ],
  },

  // ==================== ELECTRICAL (4 agents) ====================
  "residential-electrician": {
    id: "residential-electrician",
    slug: "residential-electrician",
    name: "Residential Electrician",
    trade: "Electrical",
    scale: "Residential",
    icon: "Zap",
    color: "#3B82F6",
    monthlyPrice: 9900, // $99
    description:
      "Handle home electrical service calls, panel upgrades, EV charger installations, and emergency electrical issues.",
    promptPath: "prompts-import/prompts/electrical/residential-electrician.md",
    cartesiaVoiceId: "a0e99841-438c-4a64-b679-ae501e7d6091",
    features: [
      "Emergency dispatch",
      "Panel upgrades",
      "EV charger installs",
      "Outlet/switch repairs",
    ],
  },
  "commercial-electrician": {
    id: "commercial-electrician",
    slug: "commercial-electrician",
    name: "Commercial Electrician",
    trade: "Electrical",
    scale: "Commercial",
    icon: "Building",
    color: "#3B82F6",
    monthlyPrice: 14900, // $149
    description:
      "Manage commercial electrical projects, tenant improvements, and building electrical systems (200A-2000A).",
    promptPath: "prompts-import/prompts/electrical/commercial-electrician.md",
    cartesiaVoiceId: "694f9389-aac1-45b6-b726-9d9369183238",
    features: [
      "Tenant improvements",
      "Lighting retrofits",
      "Distribution panels",
      "Code compliance",
    ],
  },
  "industrial-electrician": {
    id: "industrial-electrician",
    slug: "industrial-electrician",
    name: "Industrial Electrician",
    trade: "Electrical",
    scale: "Industrial",
    icon: "Factory",
    color: "#3B82F6",
    monthlyPrice: 19900, // $199
    description:
      "Handle industrial electrical systems (>2000A), motor controls, switchgear, and plant automation.",
    promptPath: "prompts-import/prompts/electrical/industrial-electrician.md",
    cartesiaVoiceId: "694f9389-aac1-45b6-b726-9d9369183238",
    features: [
      "Motor controls",
      "Switchgear",
      "Plant automation",
      "Industrial power",
    ],
  },
  "utility-coordinator": {
    id: "utility-coordinator",
    slug: "utility-coordinator",
    name: "Utility Interconnection Coordinator",
    trade: "Electrical",
    scale: "Utility",
    icon: "Zap",
    color: "#3B82F6",
    monthlyPrice: 19900, // $199
    description:
      "Coordinate grid interconnections, substation work, and utility-scale electrical infrastructure.",
    promptPath: "prompts-import/prompts/electrical/utility-coordinator.md",
    cartesiaVoiceId: "694f9389-aac1-45b6-b726-9d9369183238",
    features: [
      "Grid interconnection",
      "Substation work",
      "Transmission systems",
      "Utility compliance",
    ],
  },

  // ==================== HVAC (3 agents) ====================
  "residential-hvac": {
    id: "residential-hvac",
    slug: "residential-hvac",
    name: "Residential HVAC Technician",
    trade: "HVAC",
    scale: "Residential",
    icon: "Flame",
    color: "#EF4444",
    monthlyPrice: 9900, // $99
    description:
      "Handle home HVAC service calls, AC/heating repairs, ductwork, and thermostat installations (<5 tons).",
    promptPath: "prompts-import/prompts/hvac/residential-hvac.md",
    cartesiaVoiceId: "a0e99841-438c-4a64-b679-ae501e7d6091",
    features: [
      "AC/heat service",
      "Ductwork",
      "Thermostats",
      "Emergency repairs",
    ],
  },
  "commercial-hvac": {
    id: "commercial-hvac",
    slug: "commercial-hvac",
    name: "Commercial HVAC Specialist",
    trade: "HVAC",
    scale: "Commercial",
    icon: "Building",
    color: "#EF4444",
    monthlyPrice: 14900, // $149
    description:
      "Manage commercial HVAC systems including RTUs, chillers, and VAV systems (5-50 tons).",
    promptPath: "prompts-import/prompts/hvac/commercial-hvac.md",
    cartesiaVoiceId: "694f9389-aac1-45b6-b726-9d9369183238",
    features: [
      "RTU service",
      "Chiller maintenance",
      "VAV systems",
      "Building automation",
    ],
  },
  "industrial-hvac": {
    id: "industrial-hvac",
    slug: "industrial-hvac",
    name: "Industrial HVAC Engineer",
    trade: "HVAC",
    scale: "Industrial",
    icon: "Factory",
    color: "#EF4444",
    monthlyPrice: 14900, // $149
    description:
      "Handle industrial HVAC and process cooling systems (>50 tons), boilers, and industrial controls.",
    promptPath: "prompts-import/prompts/hvac/industrial-hvac.md",
    cartesiaVoiceId: "694f9389-aac1-45b6-b726-9d9369183238",
    features: [
      "Process cooling",
      "Industrial boilers",
      "Controls",
      "Large-scale HVAC",
    ],
  },

  // ==================== PLUMBING (3 agents) ====================
  "residential-plumber": {
    id: "residential-plumber",
    slug: "residential-plumber",
    name: "Residential Plumber",
    trade: "Plumbing",
    scale: "Residential",
    icon: "Droplet",
    color: "#06B6D4",
    monthlyPrice: 9900, // $99
    description:
      "Handle home plumbing service calls, drain cleaning, water heaters, and fixture repairs.",
    promptPath: "prompts-import/prompts/plumbing/residential-plumber.md",
    cartesiaVoiceId: "a0e99841-438c-4a64-b679-ae501e7d6091",
    features: [
      "Drain cleaning",
      "Water heaters",
      "Fixture repairs",
      "Emergency service",
    ],
  },
  "commercial-plumber": {
    id: "commercial-plumber",
    slug: "commercial-plumber",
    name: "Commercial Plumber",
    trade: "Plumbing",
    scale: "Commercial",
    icon: "Building",
    color: "#06B6D4",
    monthlyPrice: 14900, // $149
    description:
      "Manage commercial plumbing systems including backflow prevention, grease traps, and commercial fixtures.",
    promptPath: "prompts-import/prompts/plumbing/commercial-plumber.md",
    cartesiaVoiceId: "694f9389-aac1-45b6-b726-9d9369183238",
    features: [
      "Backflow prevention",
      "Grease traps",
      "Commercial fixtures",
      "Code compliance",
    ],
  },
  "industrial-plumber": {
    id: "industrial-plumber",
    slug: "industrial-plumber",
    name: "Industrial Process Plumber",
    trade: "Plumbing",
    scale: "Industrial",
    icon: "Factory",
    color: "#06B6D4",
    monthlyPrice: 14900, // $149
    description:
      "Handle industrial process piping, boiler feed systems, and wastewater management.",
    promptPath: "prompts-import/prompts/plumbing/industrial-plumber.md",
    cartesiaVoiceId: "694f9389-aac1-45b6-b726-9d9369183238",
    features: [
      "Process piping",
      "Boiler feed",
      "Wastewater",
      "Industrial systems",
    ],
  },

  // ==================== ROOFING (2 agents) ====================
  "residential-roofing": {
    id: "residential-roofing",
    slug: "residential-roofing",
    name: "Residential Roofing Specialist",
    trade: "Roofing",
    scale: "Residential",
    icon: "Home",
    color: "#8B5CF6",
    monthlyPrice: 9900, // $99
    description:
      "Handle residential roofing inquiries, storm damage claims, and shingle replacement for homes (<5k sqft).",
    promptPath: "prompts-import/prompts/roofing/residential-roofing.md",
    cartesiaVoiceId: "a0e99841-438c-4a64-b679-ae501e7d6091",
    features: [
      "Storm damage",
      "Insurance claims",
      "Shingle replacement",
      "Gutter service",
    ],
  },
  "commercial-roofing": {
    id: "commercial-roofing",
    slug: "commercial-roofing",
    name: "Commercial Roofing Contractor",
    trade: "Roofing",
    scale: "Commercial",
    icon: "Building",
    color: "#8B5CF6",
    monthlyPrice: 12900, // $129
    description:
      "Manage commercial roofing projects including TPO, EPDM, and coating systems (5k-100k sqft).",
    promptPath: "prompts-import/prompts/roofing/commercial-roofing.md",
    cartesiaVoiceId: "694f9389-aac1-45b6-b726-9d9369183238",
    features: [
      "TPO/EPDM systems",
      "Roof coatings",
      "Maintenance plans",
      "Commercial repairs",
    ],
  },

  // ==================== LOW VOLTAGE (3 agents) ====================
  "security-alarm": {
    id: "security-alarm",
    slug: "security-alarm",
    name: "Security & Alarm Specialist",
    trade: "Low Voltage",
    scale: "Commercial",
    icon: "Shield",
    color: "#10B981",
    monthlyPrice: 9900, // $99
    description:
      "Handle security system inquiries, alarm monitoring, CCTV installations, and access control systems.",
    promptPath: "prompts-import/prompts/low-voltage/security-alarm.md",
    cartesiaVoiceId: "a0e99841-438c-4a64-b679-ae501e7d6091",
    features: [
      "Intrusion detection",
      "CCTV systems",
      "Access control",
      "24/7 monitoring",
    ],
  },
  "structured-cabling": {
    id: "structured-cabling",
    slug: "structured-cabling",
    name: "Structured Cabling Technician",
    trade: "Low Voltage",
    scale: "Commercial",
    icon: "Cable",
    color: "#10B981",
    monthlyPrice: 12900, // $129
    description:
      "Manage data cabling projects including Cat6/fiber installations, data centers, and network infrastructure.",
    promptPath: "prompts-import/prompts/low-voltage/structured-cabling.md",
    cartesiaVoiceId: "694f9389-aac1-45b6-b726-9d9369183238",
    features: [
      "Cat6/Cat6A cabling",
      "Fiber optic",
      "Data center",
      "Network testing",
    ],
  },
  "fire-alarm": {
    id: "fire-alarm",
    slug: "fire-alarm",
    name: "Fire Alarm Systems Specialist",
    trade: "Low Voltage",
    scale: "Commercial",
    icon: "Bell",
    color: "#10B981",
    monthlyPrice: 12900, // $129
    description:
      "Handle fire alarm system inquiries, inspections, testing, and monitoring services.",
    promptPath: "prompts-import/prompts/low-voltage/fire-alarm.md",
    cartesiaVoiceId: "694f9389-aac1-45b6-b726-9d9369183238",
    features: [
      "Annual inspections",
      "System testing",
      "Monitoring",
      "Code compliance",
    ],
  },
}

// Helper functions
export function getAgentsByTrade(trade: Trade): AgentType[] {
  return Object.values(AGENT_TYPES).filter((agent) => agent.trade === trade)
}

export function getAgentsByScale(scale: Scale): AgentType[] {
  return Object.values(AGENT_TYPES).filter((agent) => agent.scale === scale)
}

export function getAgentBySlug(slug: string): AgentType | undefined {
  return AGENT_TYPES[slug]
}

export function getAllAgents(): AgentType[] {
  return Object.values(AGENT_TYPES)
}

export function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(0)}`
}

// Export type for agent slugs
export type AgentSlug = keyof typeof AGENT_TYPES
