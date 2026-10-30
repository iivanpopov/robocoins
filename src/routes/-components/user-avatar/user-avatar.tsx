import { Avatar, AvatarFallback, AvatarImage, type AvatarProps } from '#/components/ui'
import { AVATARS } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'

export interface UserAvatarProps {
  name: string
  avatar?: string | null
  size?: AvatarProps['size']
  className?: string
}

export function UserAvatar({ name, avatar, size = 'md', className }: UserAvatarProps) {
  const knownAvatar = AVATARS.find((candidate) => candidate === avatar)

  return (
    <Avatar size={size} className={className}>
      {knownAvatar && <AvatarImage src={getAvatarUrl(knownAvatar)} alt="" aria-hidden="true" />}
      <AvatarFallback role="img" aria-label={name}>
        {getInitial(name)}
      </AvatarFallback>
    </Avatar>
  )
}
