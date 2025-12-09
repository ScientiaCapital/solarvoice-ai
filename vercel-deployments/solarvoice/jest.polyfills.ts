/**
 * Polyfills for Jest test environment
 * Provides necessary globals for Next.js API route testing
 */

// Polyfill TextEncoder/TextDecoder BEFORE any other imports
import { TextEncoder, TextDecoder } from 'util'

// Must set these before importing anything that uses them
Object.defineProperty(globalThis, 'TextEncoder', {
  value: TextEncoder,
  writable: true,
})

Object.defineProperty(globalThis, 'TextDecoder', {
  value: TextDecoder,
  writable: true,
})

// Use whatwg-fetch instead of undici (simpler, less issues with Node globals)
import 'whatwg-fetch'

// Set test environment variable
process.env.NODE_ENV = 'test'
