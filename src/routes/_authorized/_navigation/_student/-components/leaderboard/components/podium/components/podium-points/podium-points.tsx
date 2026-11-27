import { useTranslate } from '@kanjou/react'

import { cn } from '#/utils/cn'

import styles from './podium-points.module.css'

interface PodiumPointsProps {
  balance: number
}

export function PodiumPoints(props: PodiumPointsProps) {
  const t = useTranslate()

  return (
    <strong
      className={styles.points}
      aria-label={t('leaderboard.points.label', { count: props.balance })}
    >
      <span aria-hidden="true" className={cn('i-ph:coin', styles.coin)} />
      {t('coins.amount', { count: props.balance })}
    </strong>
  )
}
