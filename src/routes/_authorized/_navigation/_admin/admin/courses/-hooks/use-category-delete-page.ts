import { useParams } from '@tanstack/react-router'
import { useState } from 'react'

export function useCategoryDeletePage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/courses/categories/$category/delete/',
  })

  const category = params.category

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeletedLocally, setIsDeletedLocally] = useState(false)

  function handleOpenDialog() {
    if (isDeletedLocally) return
    setIsDialogOpen(true)
  }

  function handleDialogOpenChange(isOpen: boolean) {
    setIsDialogOpen(isOpen)
  }

  function handleConfirmDelete() {
    if (isDeletedLocally) return
    setIsDialogOpen(false)
    setIsDeletedLocally(true)
  }

  return {
    state: {
      category,
      isDialogOpen,
      isDeletedLocally,
    },
    functions: {
      handleOpenDialog,
      handleDialogOpenChange,
      handleConfirmDelete,
    },
  }
}
