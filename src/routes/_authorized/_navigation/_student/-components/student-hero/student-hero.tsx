import { useTranslate } from '@kanjou/react'

import { Mascot } from '#/components/mascot'
import { UserAvatar } from '#/routes/-components/user-avatar'
import type { Avatar as AvatarName } from '#/routes/-constants'
import { cn } from '#/utils/cn'

import styles from './student-hero.module.css'

export interface StudentHeroProps {
  name: string
  avatar: AvatarName | null
  avatarRing: string | null
  balance: number
  streakDays: number
  hasStreak: boolean
  isStreakInactive: boolean
  hasNewReward: boolean
  greetingVariant: string
  captionVariant: string
  onOpenProfile: () => void
}

export function StudentHero(props: StudentHeroProps) {
  const t = useTranslate()

  return (
    <header className={styles.hero}>
      <div className={styles.greeting}>
        <span className={styles['greeting-title']}>{t.unsafe(props.greetingVariant)}</span>
        <span className={styles['greeting-caption']}>{t.unsafe(props.captionVariant)}</span>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.profile}
          onClick={props.onOpenProfile}
          title={t('student.profile.title')}
          aria-label={t('student.profile.title')}
        >
          <UserAvatar
            name={props.name}
            avatar={props.avatar}
            avatarRing={props.avatarRing}
            size="lg"
            className={styles.avatar}
          />
        </button>
        <div className={styles.stats}>
          {props.hasStreak && (
            <div
              className={styles.streak}
              data-inactive={props.isStreakInactive}
              title={t('daily-mission.streak', { count: props.streakDays })}
            >
              <span className="i-ph:flame-bold" aria-hidden="true" />
              <strong>{props.streakDays}</strong>
            </div>
          )}
          <div className={styles.balance} data-new={props.hasNewReward}>
            <span className={styles['balance-value']}>
              {t('coins.amount', { count: props.balance })}
            </span>
            <span aria-hidden="true" className={cn('i-ph:coin', styles.coin)} />
          </div>
        </div>
      </div>
      <Mascot mood="happy" size={76} alt="" aria-hidden="true" className={styles.mascot} />
    </header>
  )
}
