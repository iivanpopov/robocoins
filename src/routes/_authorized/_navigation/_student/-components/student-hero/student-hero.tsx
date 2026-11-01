import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { Mascot } from '#/components/mascot'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui'
import type { Avatar as AvatarName } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'

import styles from './student-hero.module.css'

export interface StudentHeroProps {
  name: string
  avatar: AvatarName | null
  balance: number
  streakDays: number
  hasStreak: boolean
  hasNewReward: boolean
  greetingVariant: string
  captionVariant: string
  onOpenProfile: () => void
  onOpenShop: () => void
}

export function StudentHero(props: StudentHeroProps) {
  const t = useTranslate()
  const avatarUrl = props.avatar ? getAvatarUrl(props.avatar) : undefined

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
          <Avatar size="lg" className={styles.avatar}>
            <AvatarImage src={avatarUrl} alt="" aria-hidden="true" />
            <AvatarFallback aria-hidden="true">{getInitial(props.name)}</AvatarFallback>
          </Avatar>
        </button>
        <div className={styles.stats}>
          {props.hasStreak && (
            <Link
              to="/daily-mission"
              className={styles.streak}
              aria-label={t('daily-mission.streak', { count: props.streakDays })}
              title={t('daily-mission.streak', { count: props.streakDays })}
            >
              <span className="i-ph:flame-fill" aria-hidden="true" />
              <strong>{props.streakDays}</strong>
            </Link>
          )}
          <button
            type="button"
            className={styles.balance}
            onClick={props.onOpenShop}
            data-new={props.hasNewReward}
            aria-label={`${t('coins.amount', { count: props.balance })} ${t('coins.unit', { count: props.balance })}. ${t('profile.balance.open-shop')}`}
          >
            <span className={styles['balance-value']}>
              {t('coins.amount', { count: props.balance })}
            </span>
            <span aria-hidden="true" className={cn('i-ph:coin', styles.coin)} />
          </button>
        </div>
      </div>
      <Mascot mood="happy" size={76} alt="" aria-hidden="true" className={styles.mascot} />
    </header>
  )
}
