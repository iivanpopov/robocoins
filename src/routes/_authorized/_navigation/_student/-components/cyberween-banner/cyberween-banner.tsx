import { useTranslate } from '@kanjou/react'

import styles from './cyberween-banner.module.css'

const CYBERWEEN_POST_URL = 'https://www.instagram.com/robocode_ua/p/DeykiZTjbUV'

export function CyberweenBanner() {
  const t = useTranslate()

  return (
    <a
      className={styles.banner}
      href={CYBERWEEN_POST_URL}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={t('profile.cyberween.open')}
    >
      <span className={styles.content}>
        <span className={styles.title} data-text="GAMEVERSE" aria-hidden="true">
          GAMEVERSE
        </span>
        <span className={styles.tagline}>{t('profile.cyberween.tagline')}</span>
        <span className={styles.period}>{t('profile.cyberween.period')}</span>
      </span>
      <span aria-hidden="true" className={styles['open-icon']}>
        <span className="i-ph:arrow-up-right" />
      </span>
    </a>
  )
}
