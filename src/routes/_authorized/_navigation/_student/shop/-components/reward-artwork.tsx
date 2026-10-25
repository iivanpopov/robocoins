import { cn } from 'cn'

import type { RewardResponse } from '#/api/types/RewardResponse'

import styles from './reward-artwork.module.css'

const REWARD_SYMBOLS: Record<number, string> = {
  1: 'i-ph:question-duotone',
  2: 'i-ph:sticker-duotone',
  3: 'i-ph:circuitry-duotone',
  5: 'i-ph:cpu-duotone',
  6: 'i-ph:toolbox-duotone',
  7: 'i-ph:music-notes-duotone',
  8: 'i-ph:drop-duotone',
  9: 'i-ph:swap-duotone',
  10: 'i-ph:user-circle-duotone',
  11: 'i-ph:stack-duotone',
  12: 'i-ph:keyboard-duotone',
  13: 'i-ph:record-duotone',
  14: 'i-ph:cube-duotone',
}

export function RewardSymbol(props: { reward: RewardResponse; className?: string }) {
  const symbol = REWARD_SYMBOLS[props.reward.id]

  return (
    <span
      className={cn(
        styles.symbol,
        symbol,
        !symbol && props.reward.type === 'reward' && 'i-ph:cube-duotone',
        !symbol && props.reward.type === 'privilege' && 'i-ph:star-four-fill',
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
      <div className={styles.halo} />
      <div className={styles.core}>
        <RewardSymbol reward={props.reward} />
      </div>
      <span className={cn('i-ph:star-four-fill', styles.spark)} />
      <span className={styles.satellite} />
    </div>
  )
}
