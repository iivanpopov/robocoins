import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import { useId } from 'react'

import { Button } from '#/components/ui'

import { useCyberweenBanner } from './-hooks'

import styles from './cyberween-banner.module.css'

const CYBERWEEN_POST_URL = 'https://www.instagram.com/robocode_ua/p/DeykiZTjbUV'

interface CyberweenBannerProps {
  renderedAt: number
}

export function CyberweenBanner(props: CyberweenBannerProps) {
  const titleId = useId()
  const banner = useCyberweenBanner(props.renderedAt)
  const t = useTranslate()

  if (!banner.isVisible) return null

  return (
    <section className={styles.banner} aria-labelledby={titleId}>
      <a
        className={styles.link}
        href={CYBERWEEN_POST_URL}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={t('profile.cyberween.open')}
      >
        <img
          className={styles.art}
          src="/images/avatar/skull.webp"
          alt=""
          aria-hidden="true"
          width={64}
          height={64}
        />
        <div className={styles.copy}>
          <h2 className={styles.title} id={titleId}>
            {t('profile.cyberween.title')}
          </h2>
          <p className={styles.greeting}>{t('profile.cyberween.greeting')}</p>
        </div>
      </a>
      <Button
        className={styles.dismiss}
        variant="ghost"
        aria-label={t('profile.cyberween.dismiss')}
        onClick={banner.handleDismiss}
      >
        <span aria-hidden="true" className={cn('i-ph:x-bold', styles.icon)} />
      </Button>
    </section>
  )
}
