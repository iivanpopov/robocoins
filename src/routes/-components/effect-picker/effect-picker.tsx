import { cn } from 'cn'

import type { Avatar, AvailableAvatarRing, AvatarRing } from '#/routes/-constants'

import { UserAvatar } from '../user-avatar'
import { VisualPickerGrid, VisualPickerTile } from '../visual-picker'
import { useEffectPicker } from './hooks'

export interface EffectPickerProps {
  name: string
  avatar: Avatar
  value: AvatarRing
  persistedValue: AvatarRing
  onChange: (ring: AvailableAvatarRing) => void
  disabled?: boolean
}

export function EffectPicker(props: EffectPickerProps) {
  const picker = useEffectPicker({
    value: props.value,
    persistedValue: props.persistedValue,
    onChange: props.onChange,
    disabled: props.disabled,
  })

  function getStatus(isLocked: boolean, isCurrent: boolean) {
    if (isLocked) {
      return (
        <>
          <span aria-hidden="true" className={cn('i-ph:lock-simple')} />
          {picker.state.soonLabel}
        </>
      )
    }
    if (isCurrent) return picker.state.currentLabel
    return undefined
  }

  return (
    <VisualPickerGrid label={picker.state.label} layout="effect">
      {picker.state.items.map((item) => (
        <VisualPickerTile
          key={item.id}
          label={item.label}
          layout="effect"
          isSelected={item.isSelected}
          isLocked={item.isLocked}
          disabled={props.disabled}
          onClick={() => picker.functions.handleSelect(item.id)}
          status={getStatus(item.isLocked, item.isCurrent)}
        >
          <UserAvatar name={props.name} avatar={props.avatar} avatarRing={item.id} size="lg" />
        </VisualPickerTile>
      ))}
    </VisualPickerGrid>
  )
}
