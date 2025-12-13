/**
 * Database Module - Barrel Export
 *
 * Centralized exports for all database functionality:
 * - IndexedDB (offline-first caching)
 * - React Hooks (client-side integration)
 * - PostgreSQL (server-side persistence via lib/db.ts)
 */

// Re-export all IndexedDB functionality
export * from "./indexeddb"

// Re-export React hooks
export * from "./hooks"

// Re-export database instance and types
export { db as indexedDB } from "./indexeddb"
