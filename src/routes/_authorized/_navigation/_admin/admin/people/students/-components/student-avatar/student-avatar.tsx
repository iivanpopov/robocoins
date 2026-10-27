import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui'
import { AVATARS } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'

export interface StudentAvatarProps {
  name: string
  avatar?: string | null
  size?: 'md' | 'lg'
  className?: string
}

export function StudentAvatar({ name, avatar, size = 'md', className }: StudentAvatarProps) {
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
