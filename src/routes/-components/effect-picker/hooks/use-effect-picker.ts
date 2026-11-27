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

  function getStatusLabel(isLocked: boolean, isCurrent: boolean) {
    if (isLocked) return t('profile.edit.ring.soon')
    if (isCurrent) return t('profile.edit.ring.current')
  }

  const items = AVATAR_RING_CATALOGUE.map((option) => ({
    id: option.id,
    label: t(RING_LABEL_KEYS[option.id]),
    isSelected: option.id === options.value,
    isLocked: option.isLocked,
    statusLabel: getStatusLabel(option.isLocked, option.id === options.persistedValue),
  }))

  function handleSelect(ring: AvatarRing) {
    if (options.disabled || !isAvatarRingAvailable(ring) || ring === options.value) return
    options.onChange(ring)
  }

  return {
    state: {
      label: t('profile.edit.tab.ring'),
      items,
    },
    functions: {
      handleSelect,
    },
  }
}
