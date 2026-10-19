import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import { HeroButton, Typography } from '#/components/ui'

import styles from './not-found.module.css'

export function NotFound() {
  const t = useTranslate()

  return (
    <main className={styles.page}>
      <p className={styles.code}>{t('not-found.code')}</p>
      <div>
        <Typography variant="title" className="mt-4">
          {t('not-found.title')}
        </Typography>
        <Typography variant="caption" className="mt-1">
          {t('not-found.description')}
        </Typography>
        <HeroButton className="mt-8" render={<Link to="/" />}>
          {t('not-found.home')}
        </HeroButton>
      </div>
    </main>
  )
}
