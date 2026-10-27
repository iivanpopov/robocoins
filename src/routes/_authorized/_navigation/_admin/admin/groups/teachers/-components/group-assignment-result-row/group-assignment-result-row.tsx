import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import type { GroupTeacherBulkResult } from '../../-types'

import styles from './group-assignment-result-row.module.css'

export interface GroupAssignmentResultRowProps {
  result: GroupTeacherBulkResult
}

export function GroupAssignmentResultRow({ result }: GroupAssignmentResultRowProps) {
  const t = useTranslate()

  return (
    <article className={styles.row} data-status={result.status}>
      <span
        aria-hidden="true"
        className={cn(
          styles.icon,
          result.status === 'pending' && 'i-ph:circle-notch',
          result.status === 'success' && 'i-ph:check-circle-duotone',
          result.status === 'error' && 'i-ph:x-circle-duotone',
          result.status === 'unknown' && 'i-ph:question-duotone',
        )}
      />
      <div className={styles.details}>
        <span className={styles.name}>{result.groupName}</span>
        <span className={styles.course}>{result.courseName}</span>
        {result.status === 'pending' && (
          <span className={styles.status}>{t('admin.groups.bulk.results.pending')}</span>
        )}
        {result.status === 'success' && (
          <span className={styles.status}>{t('admin.groups.bulk.results.success')}</span>
        )}
        {result.status === 'error' && (
          <span className={styles.status}>
            {result.statusCode === 422 && <>{t('admin.groups.teachers.error.validation')}</>}
            {result.statusCode !== 422 && result.statusCode !== null && (
              <>
                {t('admin.groups.bulk.results.error-status', {
                  status: result.statusCode,
                })}
              </>
            )}
            {result.statusCode === null && <>{t('admin.groups.bulk.results.error')}</>}
          </span>
        )}
        {result.status === 'unknown' && (
          <span className={styles.status}>
            {t('admin.groups.bulk.results.unknown-description')}
          </span>
        )}
      </div>
      <Link
        to="/admin/groups/$groupId"
        params={{ groupId: result.groupId }}
        className={styles.open}
        aria-label={t('admin.groups.bulk.results.open', { group: result.groupName })}
      >
        <span aria-hidden="true" className="i-ph:caret-right-bold" />
      </Link>
    </article>
  )
}
