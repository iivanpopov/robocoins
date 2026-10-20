import type { StudentDrawerProps } from '../student-drawer'

export function useStudentDrawer(props: StudentDrawerProps) {
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
    console.log('View student history', props.student!.id)
  }

  return {
    groupId: props.groupId,
    handleOpenChange,
    handleClose,
    handleViewProfile,
    handleViewHistory,
  }
}
