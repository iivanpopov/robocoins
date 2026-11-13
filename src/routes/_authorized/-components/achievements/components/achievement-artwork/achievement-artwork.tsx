import { cn } from '#/utils/cn'

import { getAchievementArtworkUrl } from '../../utils'

import styles from './achievement-artwork.module.css'

export interface AchievementArtworkProps {
  requiredCoins: number | null
  size?: 'sm' | 'md' | 'lg'
  earned?: boolean
  className?: string
}

export function AchievementArtwork(props: AchievementArtworkProps) {
  const size = props.size ?? 'md'
  const earned = props.earned ?? true

  return (
    <span
      className={cn(styles.artwork, styles[size], props.className)}
      data-earned={earned}
      aria-hidden="true"
    >
      <img
        src={getAchievementArtworkUrl(props.requiredCoins)}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </span>
  )
}
