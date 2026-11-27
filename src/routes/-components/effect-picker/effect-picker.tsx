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
  const picker = useEffectPicker(props)

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
          status={
            item.statusLabel && (
              <>
                {item.isLocked && <span aria-hidden="true" className="i-ph:lock-simple" />}
                {item.statusLabel}
              </>
            )
          }
        >
          <UserAvatar name={props.name} avatar={props.avatar} avatarRing={item.id} size="lg" />
        </VisualPickerTile>
      ))}
    </VisualPickerGrid>
  )
}
