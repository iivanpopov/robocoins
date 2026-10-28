import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import type { RewardResponse } from '#/api/types'
import { Button } from '#/components/ui'

import styles from './goal-card.module.css'

export interface GoalCardProps {
  goal: RewardResponse | null
  balance: number
  remainingBalance: number
  progressPercent: number
  isCompleted: boolean
  onOpenShop: () => void
}

export function GoalCard(props: GoalCardProps) {
  const t = useTranslate()

  if (!props.goal) {
    return (
      <article className={styles.card}>
        <div className={styles.content}>
          <span className={styles.kicker}>{t('profile.goal.kicker')}</span>
          <h2 className={styles.title}>{t('profile.goal.none')}</h2>
          <p className={styles.remaining}>{t('profile.goal.shop')}</p>
          <Button className={styles.action} size="md" onClick={props.onOpenShop}>
            {t('profile.goal.choose')}
            <span aria-hidden="true" className="i-ph:arrow-right" />
          </Button>
        </div>
      </article>
    )
  }

  const progress = Math.min(100, Math.max(0, props.progressPercent))

  return (
    <article className={cn(styles.card, props.isCompleted && styles.completed)}>
      <div className={styles.content}>
        <span className={styles.kicker}>{t('profile.goal.kicker')}</span>
        <h2 className={styles.title}>{props.goal.name}</h2>
        <p className={styles.saved}>
          <strong>
            {t('profile.goal.progress', { saved: props.balance, price: props.goal.price })}
          </strong>
          <span aria-hidden="true" className={cn('i-ph:coin', styles.coin)} />
        </p>
        <div
          className={styles.track}
          role="progressbar"
          aria-label={props.goal.name}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <span className={styles.fill} style={{ width: `${progress}%` }} />
        </div>
        {!props.isCompleted && (
          <p className={styles.remaining}>
            {t('profile.goal.remaining', { count: props.remainingBalance })}
          </p>
        )}
        {props.isCompleted && <p className={styles.remaining}>{t('profile.goal.completed')}</p>}
        {!props.isCompleted && (
          <Button className={styles.change} size="md" variant="ghost" onClick={props.onOpenShop}>
            {t('profile.goal.change')}
            <span aria-hidden="true" className="i-ph:caret-right" />
          </Button>
        )}
        {props.isCompleted && (
          <Button className={styles.action} size="md" onClick={props.onOpenShop}>
            {t('profile.goal.claim')}
            <span aria-hidden="true" className="i-ph:gift" />
          </Button>
        )}
      </div>
    </article>
  )
}
