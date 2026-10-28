import { cn } from 'cn'

import type { RewardResponse } from '#/api/types/RewardResponse'

import styles from './reward-artwork.module.css'

const REWARD_SYMBOLS: Record<number, string> = {
  1: 'i-ph:question',
  2: 'i-ph:sticker',
  3: 'i-ph:circuitry',
  5: 'i-ph:cpu',
  6: 'i-ph:toolbox',
  7: 'i-ph:music-notes',
  8: 'i-ph:drop',
  9: 'i-ph:swap',
  10: 'i-ph:user-circle',
  11: 'i-ph:stack',
  12: 'i-ph:keyboard',
  13: 'i-ph:record',
  14: 'i-ph:cube',
}

export function RewardSymbol(props: { reward: RewardResponse; className?: string }) {
  const symbol = REWARD_SYMBOLS[props.reward.id]

  return (
    <span
      className={cn(
        styles.symbol,
        symbol,
        !symbol && props.reward.type === 'reward' && 'i-ph:cube',
        !symbol && props.reward.type === 'privilege' && 'i-ph:star-four',
        props.className,
      )}
      aria-hidden="true"
    />
  )
}

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
