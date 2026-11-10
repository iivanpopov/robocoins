import { useTranslate } from '@kanjou/react'

import {
  AVATAR_RING_CATALOGUE,
  isAvatarRingAvailable,
  type AvatarRing,
  type AvailableAvatarRing,
} from '#/routes/-constants'

const RING_LABEL_KEYS = {
  none: 'profile.edit.ring.none',
  outline: 'profile.edit.ring.outline',
  double: 'profile.edit.ring.double',
  orbital: 'profile.edit.ring.orbital',
  star: 'profile.edit.ring.star',
} as const

export interface UseEffectPickerOptions {
  value: AvatarRing
  persistedValue: AvatarRing
  onChange: (ring: AvailableAvatarRing) => void
  disabled?: boolean
}

export function useEffectPicker(options: UseEffectPickerOptions) {
  const t = useTranslate()

  function handleSelect(ring: AvatarRing) {
    if (options.disabled || !isAvatarRingAvailable(ring) || ring === options.value) return
    options.onChange(ring)
  }

  const items = AVATAR_RING_CATALOGUE.map((option) => ({
    id: option.id,
    label: t(RING_LABEL_KEYS[option.id]),
    isSelected: option.id === options.value,
    isLocked: option.isLocked,
    isCurrent: option.id === options.persistedValue,
  }))

  return {
    state: {
      label: t('profile.edit.tab.ring'),
      currentLabel: t('profile.edit.ring.current'),
      soonLabel: t('profile.edit.ring.soon'),
      items,
    },
    functions: {
      handleSelect,
    },
  }
}
