import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui'
import type { Avatar as AvatarName } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'

import styles from './student-hero.module.css'

export interface StudentHeroProps {
  name: string
  avatar: AvatarName | null
  balance: number
  hasNewReward: boolean
  onOpenProfile: () => void
  onOpenShop: () => void
}

export function StudentHero(props: StudentHeroProps) {
  const t = useTranslate()
  const avatarUrl = props.avatar ? getAvatarUrl(props.avatar) : undefined

  return (
    <header className={styles.hero}>
      <button
        type="button"
        className={styles.identity}
        onClick={props.onOpenProfile}
        title={t('student.profile.title')}
      >
        <span className={styles['avatar-ring']}>
          <Avatar size="lg" className={styles.avatar}>
            <AvatarImage src={avatarUrl} alt="" aria-hidden="true" />
            <AvatarFallback role="img" aria-label={props.name}>
              {getInitial(props.name)}
            </AvatarFallback>
          </Avatar>
        </span>
        <span className={styles.greeting}>
          <span className={styles['greeting-title']}>
            {t('profile.greeting.hello', { name: props.name })}
          </span>
          <span className={styles['greeting-caption']}>{t('profile.greeting.caption')}</span>
        </span>
      </button>
      <button
        type="button"
        className={styles.balance}
        onClick={props.onOpenShop}
        data-new={props.hasNewReward}
        aria-label={`${t('profile.balance.amount', { count: props.balance })} ${t('profile.balance.caption', { count: props.balance })}. ${t('profile.balance.open-shop')}`}
      >
        <span aria-hidden="true" className={cn('i-ph:coin-fill', styles.coin)} />
        <span className={styles['balance-value']}>
          {t('profile.balance.amount', { count: props.balance })}
        </span>
        <span aria-hidden="true" className={cn('i-ph:caret-right-bold', styles.chevron)} />
      </button>
    </header>
  )
}
