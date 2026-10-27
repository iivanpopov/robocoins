import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import styles from './own-place.module.css'

export interface OwnPlaceProps {
  rank: number
  balance: number
  neededCoins: number | null
}

function CoinIcon() {
  return <span aria-hidden="true" className={cn('i-ph:coin-fill', styles.coin)} />
}

export function OwnPlace(props: OwnPlaceProps) {
  const t = useTranslate()

  return (
    <article className={styles.own} aria-label={t('leaderboard.place')}>
      <div className={styles.top}>
        <span className={styles.rank}>
          <strong className={styles.value}>#{props.rank}</strong>
          <span className={styles.place}>{t('leaderboard.own.place')}</span>
        </span>
        <span className={styles.points}>
          {t.rich(
            'leaderboard.own.points',
            { count: props.balance },
            { components: { coin: CoinIcon } },
          )}
        </span>
      </div>
      {props.neededCoins !== null && props.neededCoins > 0 && (
        <p className={styles.gap}>{t('leaderboard.gap', { count: props.neededCoins })}</p>
      )}
      {props.neededCoins !== null && props.neededCoins <= 0 && (
        <p className={styles.gap}>{t('leaderboard.own.near')}</p>
      )}
    </article>
  )
}
