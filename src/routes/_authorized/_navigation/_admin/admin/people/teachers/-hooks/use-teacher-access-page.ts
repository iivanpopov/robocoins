import { useParams } from '@tanstack/react-router'
import { useState } from 'react'

import type { TeacherAccessAction } from '../-constants'
import { useTeacherRecord } from './use-teacher-record'

export function useTeacherAccessPage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/teachers/$userId/access/',
  })

  const teacherId = params.userId

  const [pendingAction, setPendingAction] = useState<TeacherAccessAction | null>(null)
  const [completedAction, setCompletedAction] = useState<TeacherAccessAction | null>(null)

  const teacherData = useTeacherRecord(teacherId)

  function handleActionSelect(action: TeacherAccessAction) {
    if (!teacherData.state.isAvailable || completedAction) return
    setPendingAction(action)
  }

  function handleDrawerOpenChange(isOpen: boolean) {
    if (isOpen) return
    setPendingAction(null)
  }

  function handleCancel() {
    setPendingAction(null)
  }

  function handleConfirm() {
    if (!pendingAction) return
    setCompletedAction(pendingAction)
    setPendingAction(null)
  }

  function handleResetResult() {
    setCompletedAction(null)
  }

  return {
    state: {
      ...teacherData.state,
      pendingAction,
      completedAction,
    },
    queries: teacherData.queries,
    functions: {
      handleActionSelect,
      handleDrawerOpenChange,
      handleCancel,
      handleConfirm,
      handleResetResult,
      handleRetry: teacherData.functions.handleRetry,
    },
  }
}
