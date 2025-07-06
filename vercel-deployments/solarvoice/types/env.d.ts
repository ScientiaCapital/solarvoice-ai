declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // App
      NODE_ENV: 'development' | 'production' | 'test'
      NEXT_PUBLIC_APP_URL: string
      
      // Database
      DATABASE_URL?: string
      
      // Authentication
      NEXTAUTH_URL?: string
      NEXTAUTH_SECRET?: string
      
      // API Keys
      NEXT_PUBLIC_API_URL?: string
      API_SECRET_KEY?: string
      
      // Third-party services
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?: string
      OPENWEATHER_API_KEY?: string
      
      // Analytics
      NEXT_PUBLIC_GA_MEASUREMENT_ID?: string
      NEXT_PUBLIC_VERCEL_ANALYTICS_ID?: string
      
      // Feature flags
      NEXT_PUBLIC_ENABLE_PWA?: string
      NEXT_PUBLIC_ENABLE_ANALYTICS?: string
    }
  }
}

export {}
