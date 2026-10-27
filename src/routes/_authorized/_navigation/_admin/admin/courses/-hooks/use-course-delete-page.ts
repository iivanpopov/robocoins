import { useForm } from '@tanstack/react-form'
import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import * as v from 'valibot'

import { DeleteCourseStateSchema } from '../-schemas'
import type { CourseErrorKey } from '../-types'
import { getCourseErrorKey } from '../-utils'
import { useCourseRecord } from './use-course-record'

export function useCourseDeletePage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/courses/$courseId/delete/',
  })

  const courseId = params.courseId
  const courseData = useCourseRecord(courseId)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeletedLocally, setIsDeletedLocally] = useState(false)

  const form = useForm({
    defaultValues: { confirmation: '' },
    validators: {
      onChange: ({ value }) => {
        const result = v.safeParse(DeleteCourseStateSchema, value)
        if (!result.success) return 'invalid'
        if (!courseData.course) return 'unavailable'
        if (result.output.confirmation !== courseData.course.name) return 'mismatch'
        return undefined
      },
    },
    onSubmit: ({ value }) => {
      if (!courseData.course || isDeletedLocally) return
      if (value.confirmation.trim() !== courseData.course.name) return
      setIsDialogOpen(true)
    },
  })

  let errorKey: CourseErrorKey | null = null
  if (courseData.coursesQuery.isError) {
    errorKey = getCourseErrorKey(courseData.coursesQuery.error, 'admin.courses.error')
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!courseData.course || isDeletedLocally) return
    void form.handleSubmit()
  }

  function handleDialogOpenChange(isOpen: boolean) {
    setIsDialogOpen(isOpen)
  }

  function handleConfirmDelete() {
    if (isDeletedLocally) return
    setIsDialogOpen(false)
    setIsDeletedLocally(true)
  }

  function handleRetry() {
    if (courseData.coursesQuery.isFetching) return
    void courseData.coursesQuery.refetch()
  }

  return {
    state: {
      courseId,
      course: courseData.course,
      isDialogOpen,
      isDeletedLocally,
      errorKey,
      isPending: courseData.coursesQuery.isPending,
      isError: courseData.coursesQuery.isError,
      isFetching: courseData.coursesQuery.isFetching,
      isNotFound: courseData.coursesQuery.isSuccess && !courseData.course,
    },
    queries: { courses: courseData.coursesQuery },
    functions: {
      handleSubmit,
      handleDialogOpenChange,
      handleConfirmDelete,
      handleRetry,
    },
    features: { form },
  }
}
