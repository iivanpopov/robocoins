import type { CoinAchievementProgressItem } from '#/api/types'
import { cn } from '#/utils/cn'

import { AchievementArtwork } from '../achievement-artwork'
import { AchievementStatus } from '../achievement-status'

import styles from './achievement-showcase-item.module.css'

export interface AchievementShowcaseItemProps {
  achievement: CoinAchievementProgressItem
  className?: string
}

export function AchievementShowcaseItem(props: AchievementShowcaseItemProps) {
  return (
    <figure className={cn(styles.item, props.className)} data-earned={props.achievement.earned}>
      <span className={styles.media}>
        <AchievementArtwork
          requiredCoins={props.achievement.required_coins}
          earned={props.achievement.earned}
          size="lg"
        />
      </span>
      <figcaption className={styles.body}>
        <h3 className={styles.name}>{props.achievement.name}</h3>
        <p className={styles.description}>{props.achievement.description}</p>
        <AchievementStatus
          earned={props.achievement.earned}
          progressPercent={props.achievement.progress_percent}
          requiredCoins={props.achievement.required_coins}
        />
      </figcaption>
    </figure>
  )
}
