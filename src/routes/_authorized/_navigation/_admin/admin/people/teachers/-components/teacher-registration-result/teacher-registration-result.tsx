import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import type { TeacherRegistrationResponse } from '#/api/types'
import { Button, IconButton } from '#/components/ui'
import { PageLayout } from '#/routes/-components/page-layout'

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
  if (isCopied) copyLabel = t('access.code.copied')

  return (
    <PageLayout.Root bottomSpace className={styles.page}>
      <PageLayout.Header align="end">
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/people/teachers" />}
          title={t('admin.teachers.result.list')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <PageLayout.Heading>
          <PageLayout.Title>{t('admin.teachers.result.title')}</PageLayout.Title>
          <PageLayout.Description className={styles.name}>{result.name}</PageLayout.Description>
        </PageLayout.Heading>
      </PageLayout.Header>

      <div className={styles.credentials}>
        <span className={styles.label}>{t('access.code.label')}</span>
        <div className={styles['code-row']}>
          <code className={styles.code}>{result.access_code}</code>
          <IconButton
            type="button"
            variant="ghost"
            onClick={onCopy}
            aria-label={copyLabel}
            title={copyLabel}
          >
            {isCopied && <span aria-hidden="true" className="i-ph:check" />}
            {!isCopied && <span aria-hidden="true" className="i-ph:copy" />}
          </IconButton>
        </div>
        <span className={styles.status} role="status" aria-live="polite">
          {isCopied && t('access.code.copied')}
        </span>
      </div>

      <p className={styles.description}>{t('admin.teachers.result.description')}</p>

      <div className={styles.actions}>
        <Button
          nativeButton={false}
          render={<Link to="/admin/people/teachers/$userId" params={{ userId: result.user_id }} />}
        >
          {t('profile.open')}
        </Button>
        <Button type="button" variant="ghost" onClick={onRegisterAnother}>
          {t('admin.teachers.result.another')}
        </Button>
      </div>
    </PageLayout.Root>
  )
}
