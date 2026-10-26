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

  function navigateToStudent(path: '/student/$studentId' | '/student/$studentId/edit') {
    if (!props.student) return
    props.onOpenChange(false)
    void navigate({
      to: path,
      params: { studentId: props.student.id },
      search: { fromGroupId: props.groupId },
    })
  }

  function handleViewProfile() {
    navigateToStudent('/student/$studentId')
  }

  function handleEditStudent() {
    navigateToStudent('/student/$studentId/edit')
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
    handleEditStudent,
    handleViewHistory,
  }
}
