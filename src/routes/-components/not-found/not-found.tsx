import { useTranslate } from '@kanjou/react'
import { useNavigate } from '@tanstack/react-router'

import { HeroButton } from '#/components/ui'

import styles from './not-found.module.css'

export function NotFound() {
  const t = useTranslate()
  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate({ to: '/' })
  }

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <p className={styles.code}>{t('not-found.code')}</p>
        <h1 className={styles.title}>{t('not-found.title')}</h1>
        <p className={styles.description}>{t('not-found.description')}</p>
        <HeroButton className={styles.button} onClick={handleHomeClick}>
          {t('not-found.home')}
          <span aria-hidden="true">→</span>
        </HeroButton>
      </section>
    </main>
  )
}
