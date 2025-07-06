// API Response Types
export interface ApiResponse<T = any> {
  data?: T
  error?: ApiError
  success: boolean
  message?: string
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
}

// User Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

// Solar System Types
export interface SolarSystem {
  id: string
  userId: string
  name: string
  location: Location
  capacity: number // in kW
  panelCount: number
  installationDate: Date
  status: SystemStatus
  performance: SystemPerformance
}

export interface Location {
  latitude: number
  longitude: number
  address: string
  city: string
  state: string
  country: string
  zipCode: string
}

export enum SystemStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
  ERROR = 'error'
}

export interface SystemPerformance {
  currentOutput: number // in kW
  dailyProduction: number // in kWh
  monthlyProduction: number // in kWh
  yearlyProduction: number // in kWh
  efficiency: number // percentage
  co2Saved: number // in tons
}

// Energy Data Types
export interface EnergyData {
  timestamp: Date
  production: number // in kWh
  consumption: number // in kWh
  gridImport: number // in kWh
  gridExport: number // in kWh
  batteryCharge?: number // percentage
  temperature: number // in Celsius
  weather: WeatherCondition
}

export enum WeatherCondition {
  SUNNY = 'sunny',
  PARTLY_CLOUDY = 'partly_cloudy',
  CLOUDY = 'cloudy',
  RAINY = 'rainy',
  SNOWY = 'snowy'
}

// Alert Types
export interface Alert {
  id: string
  systemId: string
  type: AlertType
  severity: AlertSeverity
  title: string
  description: string
  createdAt: Date
  resolvedAt?: Date
  acknowledged: boolean
}

export enum AlertType {
  PERFORMANCE = 'performance',
  MAINTENANCE = 'maintenance',
  WEATHER = 'weather',
  SYSTEM = 'system',
  BILLING = 'billing'
}

export enum AlertSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Dashboard Types
export interface DashboardStats {
  totalProduction: number
  currentOutput: number
  totalSystems: number
  activeSystems: number
  totalCO2Saved: number
  totalRevenue: number
}

// Chart Data Types
export interface ChartDataPoint {
  timestamp: Date
  value: number
  label?: string
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}

export interface ChartDataset {
  label: string
  data: number[]
  borderColor?: string
  backgroundColor?: string
  fill?: boolean
}

// Form Types
export interface ContactForm {
  firstName: string
  lastName: string
  email: string
  company?: string
  message?: string
}

// Pagination Types
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}
