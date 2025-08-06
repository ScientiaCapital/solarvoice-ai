/**
 * Mock implementation of Zustand for testing
 * Properly handles React 18 concurrent rendering and state management
 */

import { act } from '@testing-library/react'
import * as React from 'react'

const actualZustand = jest.requireActual('zustand')

// Use the actual create implementation but wrap with act
const create = (createState: any) => {
  // If it's a configuration object (middleware), use the actual implementation
  if (typeof createState !== 'function') {
    return actualZustand.create(createState)
  }
  
  // Create the actual store
  const store = actualZustand.create(createState)
  
  // Wrap setState with act for React testing
  const originalSetState = store.setState
  store.setState = (...args: any[]) => {
    // Check if we're in a test environment
    if (typeof jest !== 'undefined') {
      act(() => {
        originalSetState(...args)
      })
    } else {
      originalSetState(...args)
    }
  }
  
  return store
}

// Mock devtools middleware to be a pass-through
const devtools = (fn: any, options?: any) => {
  // In tests, just return the store creator function without devtools
  return fn
}

// Mock persist middleware
const persist = (fn: any, options?: any) => {
  return (set: any, get: any, api: any) => {
    const store = fn(
      (...args: any[]) => {
        // Wrap set with act
        act(() => {
          set(...args)
        })
      },
      get,
      api
    )
    
    // Add persist API methods
    return {
      ...store,
      persist: {
        clearStorage: jest.fn(() => Promise.resolve()),
        rehydrate: jest.fn(() => Promise.resolve()),
        hasHydrated: jest.fn(() => true),
        onHydrate: jest.fn(),
        onFinishHydration: jest.fn(),
        getOptions: () => options || {},
        setOptions: jest.fn()
      }
    }
  }
}

// Mock subscribeWithSelector middleware
const subscribeWithSelector = (fn: any) => {
  return (set: any, get: any, api: any) => {
    const store = fn(set, get, {
      ...api,
      subscribe: (listener: any, selector?: any, equalityFn?: any) => {
        if (selector) {
          let currentSlice = selector(get())
          return api.subscribe(() => {
            const nextSlice = selector(get())
            if (equalityFn ? !equalityFn(currentSlice, nextSlice) : currentSlice !== nextSlice) {
              currentSlice = nextSlice
              listener(nextSlice, currentSlice)
            }
          })
        }
        return api.subscribe(listener)
      }
    })
    return store
  }
}

// Export the mocked zustand
module.exports = {
  ...actualZustand,
  create,
  default: create,
  devtools,
  persist,
  subscribeWithSelector
}

// Also export for ESM imports
export { create, devtools, persist, subscribeWithSelector }
export default create