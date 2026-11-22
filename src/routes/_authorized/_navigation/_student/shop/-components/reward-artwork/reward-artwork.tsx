import type { RewardResponse } from '#/api/types/RewardResponse'
import { cn } from '#/utils/cn'

import { RewardSymbol } from '../reward-symbol'

import styles from './reward-artwork.module.css'

export function RewardArtwork(props: { reward: RewardResponse; compact?: boolean }) {
  return (
    <div
      className={cn(
        styles.artwork,
        props.reward.type === 'privilege' && styles.privilege,
        props.compact && styles.compact,
      )}
      aria-hidden="true"
    >
      <div className={styles.core}>
        <RewardSymbol reward={props.reward} />
      </div>
      <span className={cn('i-ph:star-four', styles.spark)} />
      <span className={styles.satellite} />
    </div>
  )
}
