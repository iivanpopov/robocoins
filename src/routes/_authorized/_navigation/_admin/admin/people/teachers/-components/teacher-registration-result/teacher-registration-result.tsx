import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import type { TeacherRegistrationResponse } from '#/api/types'
import { Button, IconButton } from '#/components/ui'
import { AdminPageLayout } from '#/routes/_authorized/_navigation/_admin/admin/-components'

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
    <AdminPageLayout.Root bottomSpace className={styles.page}>
      <AdminPageLayout.Header align="end">
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/people/teachers" />}
          title={t('admin.teachers.result.list')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <AdminPageLayout.Heading>
          <AdminPageLayout.Title>{t('admin.teachers.result.title')}</AdminPageLayout.Title>
          <AdminPageLayout.Description className={styles.name}>
            {result.name}
          </AdminPageLayout.Description>
        </AdminPageLayout.Heading>
      </AdminPageLayout.Header>

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
            {isCopied && <span aria-hidden="true" className="i-ph:check-bold" />}
            {!isCopied && <span aria-hidden="true" className="i-ph:copy-bold" />}
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
    </AdminPageLayout.Root>
  )
}
