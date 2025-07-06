/**
 * Solar API Types - SolarVoice AI Platform
 * Core contracts for solar system management and calculations
 */

export interface Location {
  lat: number;
  lng: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface SolarSystemConfig {
  panels: number;
  panelWatts: number;
  sunHours: number;
  efficiency: number;
  location: Location;
  inverterType: InverterType;
  tilt?: number;
  azimuth?: number;
  shading?: ShadingInfo;
}

export type InverterType = 'string' | 'power' | 'micro';

export interface ShadingInfo {
  morningShading: number; // 0-1 (0 = no shading, 1 = full shading)
  afternoonShading: number;
  seasonalVariation: number;
}

export interface SolarSystemOutput {
  dailyOutput: number;
  monthlyOutput: number;
  annualOutput: number;
  co2Savings: number;
  costSavings: number;
  peakPowerGeneration: number;
  monthlyBreakdown: MonthlyOutput[];
}

export interface MonthlyOutput {
  month: number; // 1-12
  name: string;
  estimatedOutput: number;
  sunHours: number;
  efficiency: number;
}

export interface SolarSystem {
  id: string;
  customerId: string;
  systemName: string;
  config: SolarSystemConfig;
  output: SolarSystemOutput;
  installationDate?: Date;
  status: SolarSystemStatus;
  created_at: Date;
  updated_at: Date;
}

export type SolarSystemStatus = 'planned' | 'installing' | 'active' | 'maintenance' | 'deactivated';

export interface SolarPerformanceData {
  id: string;
  solarSystemId: string;
  date: Date;
  energyProduced: number;
  peakPower?: number;
  weatherConditions?: string;
  temperatureAvg?: number;
  irradianceAvg?: number;
  efficiencyRatio?: number;
}

export interface SolarCalculator {
  estimateOutput(config: SolarSystemConfig): Promise<SolarSystemOutput>;
  validateConfig(config: SolarSystemConfig): Promise<boolean>;
  getSolarPotential(location: Location): Promise<SolarPotentialData>;
}

export interface SolarPotentialData {
  location: Location;
  avgSunHours: number;
  avgIrradiance: number;
  optimalTilt: number;
  optimalAzimuth: number;
  seasonalVariation: SeasonalData[];
}

export interface SeasonalData {
  season: 'spring' | 'summer' | 'fall' | 'winter';
  sunHours: number;
  irradiance: number;
  efficiency: number;
}