import { useTranslate } from '@kanjou/react'

import { clampAchievementProgress } from '#/routes/_authorized/-utils'
import { cn } from '#/utils/cn'

import styles from './achievement-status.module.css'

export interface AchievementStatusProps {
  earned: boolean
  progressPercent: number
  requiredCoins: number | null
  showThreshold?: boolean
  className?: string
}

export function AchievementStatus(props: AchievementStatusProps) {
  const t = useTranslate()
  const progressPercent = clampAchievementProgress(props.progressPercent)
  const showThreshold = props.showThreshold ?? true

  return (
    <span className={cn(styles.status, props.className)} data-earned={props.earned}>
      <span className={styles.label} data-earned={props.earned}>
        <span
          aria-hidden="true"
          className={cn(
            props.earned && 'i-ph:check-circle-fill',
            !props.earned && 'i-ph:lock-simple',
          )}
        />
        {props.earned && t('achievements.earned')}
        {!props.earned && t('achievements.locked')}
      </span>
      {!props.earned && (
        <span
          className={styles.track}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t('achievements.progress.label', { percent: progressPercent })}
        >
          <span className={styles.fill} style={{ width: `${progressPercent}%` }} />
        </span>
      )}
      {!props.earned && (
        <span className={styles.progress}>
          {t('achievements.progress', { percent: progressPercent })}
        </span>
      )}
      {showThreshold && props.requiredCoins !== null && (
        <span className={styles.threshold}>
          {t('achievements.required', { count: props.requiredCoins })}
        </span>
      )}
    </span>
  )
}
