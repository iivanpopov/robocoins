import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import { Button } from '#/components/ui/button'
import { Typography } from '#/components/ui/typography'

import styles from './shop-error-component.module.css'

export function ShopErrorComponent() {
  const t = useTranslate()

  return (
    <main className={cn('galaxy', styles.page)} data-galaxy="">
      <p className={styles.code}>{t('error.code')}</p>
      <div>
        <Typography variant="title" className={styles.title}>
          {t('error.title')}
        </Typography>
        <Typography variant="caption" className={styles.description}>
          {t('error.description')}
        </Typography>
        <Button className={styles.retry} onClick={() => window.location.reload()}>
          {t('error.retry')}
        </Button>
      </div>
    </main>
  )
}
