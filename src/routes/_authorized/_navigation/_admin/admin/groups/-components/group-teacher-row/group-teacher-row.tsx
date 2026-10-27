import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { getInitial } from '#/routes/-utils'

import styles from './group-teacher-row.module.css'

export interface GroupTeacherRowProps {
  userId: number
  name: string | null
  className?: string
}

export function GroupTeacherRow({ userId, name, className }: GroupTeacherRowProps) {
  const t = useTranslate()

  const content = (
    <>
      <span className={styles.avatar} aria-hidden="true">
        {getInitial(name ?? String(userId))}
      </span>
      <span className={styles.details}>
        {name && <span className={styles.name}>{name}</span>}
        {!name && (
          <span className={styles.name}>{t('admin.groups.teacher-unknown', { id: userId })}</span>
        )}
        <span className={styles.role}>{t('role.teacher')}</span>
      </span>
    </>
  )

  if (!name) {
    return <article className={cn(styles.row, className)}>{content}</article>
  }

  return (
    <Link
      to="/admin/people/teachers/$userId"
      params={{ userId }}
      className={cn(styles.row, className)}
      aria-label={t('profile.open-label', { name })}
    >
      {content}
      <span aria-hidden="true" className={cn('i-ph:caret-right-bold', styles.caret)} />
    </Link>
  )
}
