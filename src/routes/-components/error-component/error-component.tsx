import { useTranslate } from '@kanjou/react'

import { HeroButton } from '#/components/ui/hero-button'
import { Typography } from '#/components/ui/typography'

import styles from './error-component.module.css'

export function ErrorComponent() {
  const t = useTranslate()

  return (
    <main className={styles.page}>
      <p className={styles.code}>{t('error.code')}</p>
      <div>
        <Typography variant="title" className={styles.title}>
          {t('error.title')}
        </Typography>
        <Typography variant="caption" className={styles.description}>
          {t('error.description')}
        </Typography>
        <HeroButton className={styles.retry} onClick={() => window.location.reload()}>
          {t('error.retry')}
        </HeroButton>
      </div>
    </main>
  )
}
