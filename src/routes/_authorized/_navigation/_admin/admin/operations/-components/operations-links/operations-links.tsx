import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import styles from './operations-links.module.css'

export function OperationsLinks() {
  const t = useTranslate()

  return (
    <nav className={styles.links} aria-label={t('admin.operations.links.label')}>
      <Link to="/admin/operations/practice" className={styles.link}>
        <span aria-hidden="true" className={cn('i-ph:check-circle', styles.icon)} />
        <span className={styles.copy}>
          <span className={styles.title}>{t('group.practice.title')}</span>
          <span className={styles.description}>
            {t('admin.operations.links.practice-description')}
          </span>
        </span>
        <span aria-hidden="true" className="i-ph:caret-right" />
      </Link>
      {/* No API integration: balance corrections and tariffs are local drafts only.
      <Link to="/admin/operations/settings" className={styles.link}>
        <span aria-hidden="true" className={cn('i-ph:sliders-horizontal', styles.icon)} />
        <span className={styles.copy}>
          <span className={styles.title}>{t('admin.operations.links.settings')}</span>
          <span className={styles.description}>
            {t('admin.operations.links.settings-description')}
          </span>
        </span>
        <span aria-hidden="true" className="i-ph:caret-right" />
      </Link>
      */}
    </nav>
  )
}
