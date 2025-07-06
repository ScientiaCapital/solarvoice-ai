import { MetadataRoute } from 'next'
import { APP_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = APP_URL

  // Define your static routes
  const staticRoutes = [
    '',
    '/login',
    '/register',
    '/dashboard',
    '/systems',
    '/analytics',
    '/alerts',
    '/settings',
    '/profile',
  ]

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Add dynamic routes here if needed
  // const dynamicPages = await fetchDynamicRoutes()

  return [...staticPages]
}
