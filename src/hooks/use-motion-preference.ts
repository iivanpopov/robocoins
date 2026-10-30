import { useSyncExternalStore } from 'react'

import {
  animationsDisabled,
  subscribeMotionPreference,
  systemPrefersReducedMotion,
} from '#/utils/motion'

export function useMotionPreference(initialDisabled = false) {
  const disabled = useSyncExternalStore(
    subscribeMotionPreference,
    animationsDisabled,
    () => initialDisabled,
  )
  const systemReducedMotion = useSyncExternalStore(
    subscribeMotionPreference,
    systemPrefersReducedMotion,
    () => false,
  )

  return { disabled, systemReducedMotion, reducedMotion: disabled || systemReducedMotion }
}
