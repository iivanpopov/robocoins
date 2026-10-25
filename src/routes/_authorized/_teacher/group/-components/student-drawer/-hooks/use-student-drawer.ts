import { useNavigate } from '@tanstack/react-router'

import type { StudentDrawerProps } from '../student-drawer'

export function useStudentDrawer(props: StudentDrawerProps) {
  const navigate = useNavigate()

  function handleOpenChange(open: boolean) {
    props.onOpenChange(open)
  }

  function handleClose() {
    handleOpenChange(false)
  }

  function handleViewProfile() {
    console.log('View student profile', props.student!.id)
  }

  function handleViewHistory() {
    if (!props.student) return
    void navigate({
      to: '/group/$groupId/student/$studentId/history',
      params: { groupId: props.groupId, studentId: props.student.id },
    })
  }

  return {
    groupId: props.groupId,
    handleOpenChange,
    handleClose,
    handleViewProfile,
    handleViewHistory,
  }
}
