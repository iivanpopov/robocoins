import { Avatar, AvatarFallback, AvatarImage, type AvatarProps } from '#/components/ui'
import { AVATARS, isAvatarRing } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'
import { cn } from '#/utils/cn'

import styles from './user-avatar.module.css'

const FLAME_PATH =
  'M 50 118 C 28 118 12 106 9 90 C 6 74 10 60 16 49 C 19 43 18 38 15 33 C 24 39 32 44 37 48 C 40 43 42 34 44 24 C 46 15 48 8 50 2 C 52 9 55 17 58 26 C 61 35 64 41 66 45 C 69 39 74 33 82 26 C 78 34 80 43 86 53 C 93 66 97 82 93 96 C 89 109 73 118 50 118 Z'

export interface UserAvatarProps {
  name: string
  avatar?: string | null
  avatarRing?: string | null
  size?: AvatarProps['size']
  className?: string
}

export function UserAvatar(props: UserAvatarProps) {
  const knownAvatar = AVATARS.find((candidate) => candidate === props.avatar)
  const ring = isAvatarRing(props.avatarRing) ? props.avatarRing : 'none'

  return (
    <Avatar
      size={props.size ?? 'md'}
      className={cn(styles.avatar, props.className)}
      data-avatar-ring={ring}
    >
      {knownAvatar && <AvatarImage src={getAvatarUrl(knownAvatar)} alt="" aria-hidden="true" />}
      <AvatarFallback role="img" aria-label={props.name}>
        {getInitial(props.name)}
      </AvatarFallback>
      {ring !== 'none' && (
        <span className={styles.effect} aria-hidden="true">
          {ring === 'outline' && (
            <span className={styles.fire} data-effect-part="flame">
              <svg
                className={styles['flame-shape']}
                viewBox="0 0 100 120"
                preserveAspectRatio="xMidYMax meet"
              >
                <path className={styles['flame-outer']} d={FLAME_PATH} />
                <path
                  className={styles['flame-inner']}
                  d={FLAME_PATH}
                  transform="translate(50 118) scale(0.82) translate(-50 -118)"
                />
              </svg>
            </span>
          )}
          {ring === 'double' && (
            <span className={styles.aurora} data-effect-part="aurora">
              <span className={cn(styles['aurora-band'], styles['band-top'])} />
              <span className={cn(styles['aurora-band'], styles['band-bottom'])} />
            </span>
          )}
          {ring === 'star' && (
            <>
              <span className={cn('i-ph:star-four-fill', styles['star-top'])} />
              <span className={cn('i-ph:star-four-fill', styles['star-right'])} />
              <span className={cn('i-ph:star-four-fill', styles['star-bottom'])} />
              <span className={cn('i-ph:star-four-fill', styles['star-left'])} />
            </>
          )}
        </span>
      )}
    </Avatar>
  )
}
