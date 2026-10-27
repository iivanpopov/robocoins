import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import type { StudentProfileResponse } from '#/api/types'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui'
import { AVATARS } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'

import styles from './group-student-row.module.css'

export interface GroupStudentRowProps {
  student: StudentProfileResponse
  className?: string
}

export function GroupStudentRow({ student, className }: GroupStudentRowProps) {
  const t = useTranslate()

  const knownAvatar = AVATARS.find((avatar) => avatar === student.avatar)

  return (
    <article className={cn(styles.row, className)}>
      <Avatar>
        {knownAvatar && <AvatarImage src={getAvatarUrl(knownAvatar)} alt="" aria-hidden="true" />}
        <AvatarFallback role="img" aria-label={student.name}>
          {getInitial(student.name)}
        </AvatarFallback>
      </Avatar>
      <span className={styles.details}>
        <span className={styles.name}>{student.name}</span>
        <span className={styles.groups}>
          {t('groups.count', { count: student.group_ids.length })}
        </span>
      </span>
    </article>
  )
}
