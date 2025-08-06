/**
 * Polyfills for Jest test environment
 * Provides necessary globals for Next.js API route testing
 */

// First, polyfill TextEncoder/TextDecoder which undici needs
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

// Then import undici which depends on TextEncoder
import { fetch, FormData, Headers, Request, Response } from 'undici'

// Assign fetch API globals
global.fetch = fetch as any
global.FormData = FormData as any
global.Headers = Headers as any
global.Request = Request as any
global.Response = Response as any

// Set test environment variable
process.env.NODE_ENV = 'test'