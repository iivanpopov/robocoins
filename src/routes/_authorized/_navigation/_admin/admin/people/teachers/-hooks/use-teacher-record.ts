import { useGetTeacherProfileTeacherTeacherIdGet } from '#/api/hooks/useGetTeacherProfileTeacherTeacherIdGet'
import { useGetUserByIdUsersUserIdGet } from '#/api/hooks/useGetUserByIdUsersUserIdGet'

import { getRequestErrorStatus } from '../-utils'

export function useTeacherRecord(teacherId: number) {
  const accountQuery = useGetUserByIdUsersUserIdGet({ path: { user_id: teacherId } })

  const canLoadProfile = accountQuery.isSuccess && accountQuery.data.role === 'teacher'

  const profileQuery = useGetTeacherProfileTeacherTeacherIdGet(
    { path: { teacher_id: teacherId } },
    { query: { enabled: canLoadProfile } },
  )

  function handleRetry() {
    if (accountQuery.isError && !accountQuery.isFetching) void accountQuery.refetch()
    if (profileQuery.isError && !profileQuery.isFetching) void profileQuery.refetch()
  }

  const accountErrorStatus = getRequestErrorStatus(accountQuery.error)
  const profileErrorStatus = getRequestErrorStatus(profileQuery.error)
  const profile = profileQuery.data ?? null
  const isMapped =
    !!profile && profile.user_id === teacherId && (!profile.role || profile.role === 'teacher')
  const isPending = accountQuery.isPending || (canLoadProfile && profileQuery.isPending)
  const isError = accountQuery.isError || profileQuery.isError
  const notFound = accountErrorStatus === 404 || profileErrorStatus === 404
  const notTeacher = accountQuery.isSuccess && accountQuery.data.role !== 'teacher'
  const isMismatch = profileQuery.isSuccess && !isMapped

  return {
    state: {
      teacherId,
      name: accountQuery.data?.name ?? '',
      profile: isMapped ? profile : null,
      groups: isMapped ? (profile.groups ?? []) : [],
      isMapped,
      isPending,
      isError,
      isFetching: accountQuery.isFetching || profileQuery.isFetching,
      isAvailable: isMapped && !isPending && !isError,
      errorStatus: accountErrorStatus ?? profileErrorStatus,
      notFound,
      notTeacher,
      isMismatch,
    },
    queries: {
      account: accountQuery,
      profile: profileQuery,
    },
    functions: { handleRetry },
  }
}
