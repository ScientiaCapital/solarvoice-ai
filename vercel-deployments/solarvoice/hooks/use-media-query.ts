import { useEffect, useState } from 'react'

interface UseMediaQueryOptions {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

/**
 * Custom hook for responsive design using media queries
 * @param query - Media query string
 * @param options - Configuration options
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {}
): boolean {
  const {
    defaultValue = false,
    initializeWithValue = true,
  } = options

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue && typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return defaultValue
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Set the initial value
    setMatches(media.matches)

    // Create event listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add event listener
    media.addEventListener('change', listener)

    // Clean up
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

// Predefined media queries
export const useIsMobile = () => useMediaQuery('(max-width: 640px)')
export const useIsTablet = () => useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)')
export const useIsDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)')
export const useIsReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
