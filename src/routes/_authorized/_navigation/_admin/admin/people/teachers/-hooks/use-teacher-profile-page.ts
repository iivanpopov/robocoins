import { useNavigate, useParams } from '@tanstack/react-router'

import { useGetTeacherProfileTeacherTeacherIdGet } from '#/api/hooks/useGetTeacherProfileTeacherTeacherIdGet'
import { useGetUserByIdUsersUserIdGet } from '#/api/hooks/useGetUserByIdUsersUserIdGet'

import { getRequestErrorStatus } from '../-utils'

export function useTeacherProfilePage() {
  const navigate = useNavigate()
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/teachers/$userId/',
  })

  const userId = params.userId

  const accountQuery = useGetUserByIdUsersUserIdGet({ path: { user_id: userId } })

  const canLoadProfile = accountQuery.isSuccess && accountQuery.data.role === 'teacher'

  const teacherQuery = useGetTeacherProfileTeacherTeacherIdGet(
    { path: { teacher_id: userId } },
    { query: { enabled: canLoadProfile } },
  )

  function handleBack() {
    void navigate({ to: '/admin/people/teachers' })
  }

  function handleRetry() {
    if (accountQuery.isError && !accountQuery.isFetching) void accountQuery.refetch()
    if (teacherQuery.isError && !teacherQuery.isFetching) void teacherQuery.refetch()
  }

  const accountErrorStatus = getRequestErrorStatus(accountQuery.error)
  const profileErrorStatus = getRequestErrorStatus(teacherQuery.error)
  const profile = teacherQuery.data ?? null
  const isMapped =
    !!profile && profile.user_id === userId && (!profile.role || profile.role === 'teacher')
  const isPending = accountQuery.isPending || (canLoadProfile && teacherQuery.isPending)
  const isError = accountQuery.isError || teacherQuery.isError

  return {
    state: {
      name: accountQuery.data?.name ?? '',
      profile: isMapped ? profile : null,
      groups: isMapped ? (profile?.groups ?? []) : [],
      notFound: accountErrorStatus === 404,
      notTeacher: accountQuery.isSuccess && accountQuery.data.role !== 'teacher',
      isMismatch: teacherQuery.isSuccess && !isMapped,
      errorStatus: accountErrorStatus ?? profileErrorStatus,
      isPending,
      isError,
      isRetrying: accountQuery.isFetching || teacherQuery.isFetching,
    },
    queries: { account: accountQuery, profile: teacherQuery },
    functions: { handleBack, handleRetry },
  }
}
