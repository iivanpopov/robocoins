import { useTranslate } from '@kanjou/react'

import type { GroupPracticeAwardResponse } from '#/api/types'
import { Button, Loader } from '#/components/ui'

import styles from './practice-result.module.css'

function getSignedAmount(
  transaction: GroupPracticeAwardResponse['students'][number]['transaction'],
) {
  if (transaction.operation === 'deposit') return transaction.amount
  return -transaction.amount
}

export interface PracticeResultProps {
  result: GroupPracticeAwardResponse
  studentNames: Map<number, string>
  groupStudentsCount: number
  refreshError: boolean
  isRefreshing: boolean
  onReset: () => void
  onRefreshData: () => void
}

export function PracticeResult({
  result,
  studentNames,
  groupStudentsCount,
  refreshError,
  isRefreshing,
  onReset,
  onRefreshData,
}: PracticeResultProps) {
  const t = useTranslate()

  return (
    <div className={styles.result}>
      <header className={styles.header}>
        <span aria-hidden="true" className={styles.icon}>
          <span className="i-ph:check-circle-duotone" />
        </span>
        <div className={styles.heading}>
          <h2 className={styles.title}>{t('admin.operations.practice.result.title')}</h2>
          <p className={styles.description}>
            {t('admin.operations.practice.result.affected', { count: result.affected_students })}
          </p>
        </div>
      </header>

      {result.affected_students !== result.students.length && (
        <p className={styles.note}>
          {t('admin.operations.practice.result.returned', { count: result.students.length })}
        </p>
      )}

      {groupStudentsCount > result.affected_students && (
        <p className={styles.note}>
          {t('admin.operations.practice.result.partial', {
            affected: result.affected_students,
            total: groupStudentsCount,
          })}
        </p>
      )}

      {!result.students.length && (
        <p className={styles.empty}>{t('admin.operations.practice.result.empty')}</p>
      )}

      {!!result.students.length && (
        <ol className={styles.list}>
          {result.students.map((student) => (
            <li key={student.student_id} className={styles.item}>
              <span className={styles.name}>
                {studentNames.get(student.student_id) ??
                  t('admin.operations.student-fallback', { id: student.student_id })}
              </span>
              <span className={styles.amount}>
                {t('profile.history.amount', {
                  count: getSignedAmount(student.transaction),
                })}
              </span>
              <span className={styles.balance}>
                {t('admin.operations.result.new-balance', { count: student.balance })}
              </span>
            </li>
          ))}
        </ol>
      )}

      {refreshError && (
        <div className={styles.refresh} role="alert">
          <p>{t('admin.operations.result.refresh-error')}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefreshData}
            disabled={isRefreshing}
            aria-busy={isRefreshing}
          >
            {isRefreshing && <Loader />}
            {t('admin.balance.refresh.action')}
          </Button>
        </div>
      )}

      <Button variant="ghost" onClick={onReset}>
        {t('admin.operations.practice.result.new')}
      </Button>
    </div>
  )
}
