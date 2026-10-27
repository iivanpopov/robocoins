import { useNavigate, useParams } from '@tanstack/react-router'

import { useTeacherRecord } from './use-teacher-record'

export function useTeacherProfilePage() {
  const navigate = useNavigate()
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/teachers/$userId/',
  })

  const teacherData = useTeacherRecord(params.userId)

  function handleBack() {
    void navigate({ to: '/admin/people/teachers' })
  }

  return {
    state: teacherData.state,
    queries: teacherData.queries,
    functions: {
      handleBack,
      handleRetry: teacherData.functions.handleRetry,
    },
  }
}
