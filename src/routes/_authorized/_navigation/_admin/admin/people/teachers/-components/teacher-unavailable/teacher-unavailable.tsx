import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import { Button } from '#/components/ui'
import { InlineError } from '#/routes/-components'

import styles from './teacher-unavailable.module.css'

export interface TeacherUnavailableProps {
  notFound: boolean
  notTeacher: boolean
  isMismatch: boolean
}

export function TeacherUnavailable({ notFound, notTeacher, isMismatch }: TeacherUnavailableProps) {
  const t = useTranslate()

  return (
    <>
      {notFound && (
        <div className={styles.empty}>
          <span aria-hidden="true" className="i-ph:user-minus" />
          <h2 className={styles.title}>{t('admin.teachers.profile.not-found')}</h2>
          <Button nativeButton={false} render={<Link to="/admin/people/teachers" />}>
            {t('admin.teachers.profile.back')}
          </Button>
        </div>
      )}
      {notTeacher && <InlineError>{t('admin.teachers.profile.not-teacher')}</InlineError>}
      {isMismatch && <InlineError>{t('admin.teachers.profile.mismatch')}</InlineError>}
    </>
  )
}
