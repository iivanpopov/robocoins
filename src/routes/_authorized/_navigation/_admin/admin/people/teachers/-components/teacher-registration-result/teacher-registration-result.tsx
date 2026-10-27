import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import type { TeacherRegistrationResponse } from '#/api/types'
import { Button, IconButton } from '#/components/ui'

import styles from './teacher-registration-result.module.css'

export interface TeacherRegistrationResultProps {
  result: TeacherRegistrationResponse
  isCopied: boolean
  onCopy: () => void
  onRegisterAnother: () => void
}

export function TeacherRegistrationResult({
  result,
  isCopied,
  onCopy,
  onRegisterAnother,
}: TeacherRegistrationResultProps) {
  const t = useTranslate()

  let copyLabel = t('admin.teachers.result.copy')
  if (isCopied) copyLabel = t('admin.teachers.result.copied')

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <span className={styles['success-icon']} aria-hidden="true">
          <span className="i-ph:check-bold" />
        </span>
        <h1 className={styles.title}>{t('admin.teachers.result.title')}</h1>
        <p className={styles.name}>{result.name}</p>
        <p className={styles.description}>{t('admin.teachers.result.description')}</p>
      </header>

      <div className={styles.credentials}>
        <span className={styles.label}>{t('admin.teachers.result.code')}</span>
        <div className={styles['code-row']}>
          <code className={styles.code}>{result.access_code}</code>
          <IconButton
            type="button"
            variant="ghost"
            onClick={onCopy}
            aria-label={copyLabel}
            title={copyLabel}
          >
            {isCopied && <span aria-hidden="true" className="i-ph:check-bold" />}
            {!isCopied && <span aria-hidden="true" className="i-ph:copy-bold" />}
          </IconButton>
        </div>
        <span className={styles.status} role="status" aria-live="polite">
          {isCopied && t('admin.teachers.result.copied')}
        </span>
      </div>

      <div className={styles.actions}>
        <Button
          nativeButton={false}
          render={<Link to="/admin/people/teachers/$userId" params={{ userId: result.user_id }} />}
        >
          {t('admin.teachers.result.profile')}
        </Button>
        <Button type="button" variant="ghost" onClick={onRegisterAnother}>
          {t('admin.teachers.result.another')}
        </Button>
      </div>

      <Link to="/admin/people/teachers" className={styles.back}>
        {t('admin.teachers.result.list')}
      </Link>
    </section>
  )
}
