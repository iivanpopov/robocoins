import { useSyncExternalStore } from 'react'

import {
  animationsDisabled,
  subscribeAnimationsDisabled,
  subscribeSystemReducedMotion,
  systemPrefersReducedMotion,
} from '#/utils/motion'

export function useAnimationsDisabled(initialDisabled = false) {
  return useSyncExternalStore(
    subscribeAnimationsDisabled,
    animationsDisabled,
    () => initialDisabled,
  )
}

export function useMotionPreference(initialDisabled = false) {
  const disabled = useAnimationsDisabled(initialDisabled)
  const systemReducedMotion = useSyncExternalStore(
    subscribeSystemReducedMotion,
    systemPrefersReducedMotion,
    () => false,
  )

  return { disabled, systemReducedMotion, reducedMotion: disabled || systemReducedMotion }
}
