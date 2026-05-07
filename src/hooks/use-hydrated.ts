'use client'

import { useSyncExternalStore } from 'react'

/**
 * Hydration-safe hook that returns `false` on the server and `true` on the client.
 * Uses useSyncExternalStore with different server/client snapshots
 * to avoid hydration mismatches without triggering React lint warnings.
 */
const emptySubscribe = () => () => {}

export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,   // client snapshot — always hydrated
    () => false   // server snapshot — never hydrated
  )
}
