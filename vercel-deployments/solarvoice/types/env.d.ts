declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // App
      NODE_ENV: 'development' | 'production' | 'test'
      NEXT_PUBLIC_APP_URL: string
      
      // Database
      DATABASE_URL?: string
      
      // Authentication
      JWT_SECRET?: string
      JWT_REFRESH_SECRET?: string
      
      // API Keys
      NEXT_PUBLIC_API_URL?: string
      API_SECRET_KEY?: string
      
      // AI Services
      ANTHROPIC_API_KEY?: string
      ELEVENLABS_API_KEY?: string
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?: string
      
      // Analytics
      NEXT_PUBLIC_GA_MEASUREMENT_ID?: string
      
      // Feature flags
      NEXT_PUBLIC_ENABLE_PWA?: string
      NEXT_PUBLIC_ENABLE_ANALYTICS?: string
    }
  }
}

export {}