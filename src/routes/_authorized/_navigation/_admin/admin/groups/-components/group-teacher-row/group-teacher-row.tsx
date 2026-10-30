import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import { UserCard } from '#/routes/-components'

export interface GroupTeacherRowProps {
  userId: number
  name: string | null
  className?: string
}

export function GroupTeacherRow({ userId, name, className }: GroupTeacherRowProps) {
  const t = useTranslate()

  const content = (
    <>
      <UserCard.Avatar name={name ?? String(userId)} />
      <UserCard.Content>
        {name && <UserCard.Name>{name}</UserCard.Name>}
        {!name && (
          <UserCard.Name>{t('admin.groups.teacher-unknown', { id: userId })}</UserCard.Name>
        )}
        <UserCard.Description>{t('role.teacher')}</UserCard.Description>
      </UserCard.Content>
    </>
  )

  if (!name) {
    return (
      <UserCard.Root className={className} render={<article />}>
        {content}
      </UserCard.Root>
    )
  }

  return (
    <UserCard.Root
      className={className}
      render={
        <Link
          to="/admin/people/teachers/$userId"
          params={{ userId }}
          aria-label={t('profile.open-label', { name })}
        />
      }
    >
      {content}
      <UserCard.Indicator />
    </UserCard.Root>
  )
}
