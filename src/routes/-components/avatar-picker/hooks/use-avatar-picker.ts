import { useTranslate } from '@kanjou/react'

import { AVATARS, type Avatar } from '#/routes/-constants'

export interface UseAvatarPickerOptions {
  value: Avatar
  onChange: (avatar: Avatar) => void
  disabled?: boolean
}

export function useAvatarPicker(options: UseAvatarPickerOptions) {
  const t = useTranslate()

  const items = AVATARS.map((avatar, index) => ({
    avatar,
    isSelected: avatar === options.value,
    label: t('avatar-picker.option', { number: index + 1 }),
  }))

  function handleSelect(avatar: Avatar) {
    if (options.disabled || avatar === options.value) return
    options.onChange(avatar)
  }

  return {
    state: {
      label: t('field.avatar.label'),
      items,
    },
    functions: {
      handleSelect,
    },
  }
}
