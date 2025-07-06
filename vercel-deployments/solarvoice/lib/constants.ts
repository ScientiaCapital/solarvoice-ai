// App constants
export const APP_NAME = 'SolarVoice'
export const APP_DESCRIPTION = 'AI-Powered Solar Energy Management'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://solarvoice.ai'

// API constants
export const API_TIMEOUT = 30000 // 30 seconds
export const API_RETRY_COUNT = 3
export const API_RETRY_DELAY = 1000 // 1 second

// Pagination
export const DEFAULT_PAGE_SIZE = 10
export const MAX_PAGE_SIZE = 100

// Cache TTL (in seconds)
export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
}

// Solar system constants
export const PANEL_EFFICIENCY = {
  MIN: 0.15, // 15%
  MAX: 0.22, // 22%
  AVERAGE: 0.185, // 18.5%
}

export const SYSTEM_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  ERROR: 'error',
} as const

// Weather conditions
export const WEATHER_CONDITIONS = {
  SUNNY: 'sunny',
  PARTLY_CLOUDY: 'partly_cloudy',
  CLOUDY: 'cloudy',
  RAINY: 'rainy',
  SNOWY: 'snowy',
} as const

// Alert types
export const ALERT_TYPES = {
  PERFORMANCE: 'performance',
  MAINTENANCE: 'maintenance',
  WEATHER: 'weather',
  SYSTEM: 'system',
  BILLING: 'billing',
} as const

export const ALERT_SEVERITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const

// Chart colors
export const CHART_COLORS = {
  primary: 'hsl(221.2, 83.2%, 53.3%)',
  secondary: 'hsl(210, 40%, 96.1%)',
  success: 'hsl(142, 76%, 36%)',
  warning: 'hsl(38, 92%, 50%)',
  danger: 'hsl(0, 84.2%, 60.2%)',
  info: 'hsl(199, 89%, 48%)',
}

// Date formats
export const DATE_FORMATS = {
  SHORT: 'MMM d',
  MEDIUM: 'MMM d, yyyy',
  LONG: 'MMMM d, yyyy',
  DATETIME: 'MMM d, yyyy h:mm a',
  TIME: 'h:mm a',
}

// Energy units
export const ENERGY_UNITS = {
  W: 'W',
  KW: 'kW',
  MW: 'MW',
  WH: 'Wh',
  KWH: 'kWh',
  MWH: 'MWh',
}

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  SERVER: 'Server error. Please try again later.',
}

// Success messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully.',
  DELETED: 'Item deleted successfully.',
  UPDATED: 'Item updated successfully.',
  CREATED: 'Item created successfully.',
  SENT: 'Message sent successfully.',
}

// Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  SYSTEMS: '/systems',
  ANALYTICS: '/analytics',
  ALERTS: '/alerts',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'solarvoice-theme',
  AUTH_TOKEN: 'solarvoice-auth-token',
  USER_PREFERENCES: 'solarvoice-user-preferences',
  RECENT_SEARCHES: 'solarvoice-recent-searches',
} as const
