import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import { Button } from '#/components/ui/button'
import { Typography } from '#/components/ui/typography'

import styles from './not-found-component.module.css'

export function NotFoundComponent() {
  const t = useTranslate()

  return (
    <main className={styles.page}>
      <p className={styles.code}>{t('not-found.code')}</p>
      <div>
        <Typography variant="title" className={styles.title}>
          {t('not-found.title')}
        </Typography>
        <Typography variant="caption" className={styles.description}>
          {t('not-found.description')}
        </Typography>
        <Button size="lg" className={styles.home} nativeButton={false} render={<Link to="/" />}>
          {t('not-found.home')}
        </Button>
      </div>
    </main>
  )
}
