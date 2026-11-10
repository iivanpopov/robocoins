import type { Avatar } from '#/routes/-constants'

import { UserAvatar } from '../user-avatar'
import { VisualPickerGrid, VisualPickerTile } from '../visual-picker'
import { useAvatarPicker } from './hooks'

export interface AvatarPickerProps {
  value: Avatar
  onChange: (avatar: Avatar) => void
  name: string
  disabled?: boolean
}

export function AvatarPicker(props: AvatarPickerProps) {
  const picker = useAvatarPicker({
    value: props.value,
    onChange: props.onChange,
    disabled: props.disabled,
  })

  return (
    <VisualPickerGrid label={picker.state.label} layout="avatar">
      {picker.state.items.map((item) => (
        <VisualPickerTile
          key={item.avatar}
          label={item.label}
          layout="avatar"
          isSelected={item.isSelected}
          disabled={props.disabled}
          onClick={() => picker.functions.handleSelect(item.avatar)}
        >
          <UserAvatar name={props.name} avatar={item.avatar} size="lg" />
        </VisualPickerTile>
      ))}
    </VisualPickerGrid>
  )
}
