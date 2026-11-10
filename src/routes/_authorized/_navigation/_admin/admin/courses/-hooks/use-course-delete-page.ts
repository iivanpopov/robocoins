import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import * as v from 'valibot'

import { useField } from '#/hooks/use-field'

import { DeleteCourseStateSchema } from '../-schemas'
import type { CourseErrorKey } from '../-types'
import { getCourseErrorKey } from '../-utils'
import { useCourseRecord } from './use-course-record'

export function useCourseDeletePage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/courses/$courseId/delete/',
  })

  const courseId = params.courseId

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeletedLocally, setIsDeletedLocally] = useState(false)

  const courseData = useCourseRecord(courseId)

  const confirmationField = useField('', {
    customValidate: (value) => {
      const result = v.safeParse(DeleteCourseStateSchema.entries.confirmation, value)
      if (!result.success) return 'invalid'
      if (!courseData.course) return 'unavailable'
      if (result.output !== courseData.course.name) return 'mismatch'
      return undefined
    },
    onSubmit: (value) => {
      if (!courseData.course || isDeletedLocally) return
      if (value.trim() !== courseData.course.name) return
      setIsDialogOpen(true)
    },
  })

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!courseData.course || isDeletedLocally) return
    void confirmationField.handleSubmit()
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

  let errorKey: CourseErrorKey | null = null
  if (courseData.coursesQuery.isError) {
    errorKey = getCourseErrorKey(courseData.coursesQuery.error, 'courses.error.load')
  }

  const isPending = courseData.coursesQuery.isPending
  const isError = courseData.coursesQuery.isError
  const isFetching = courseData.coursesQuery.isFetching
  const isNotFound = courseData.coursesQuery.isSuccess && !courseData.course

  return {
    state: {
      courseId,
      course: courseData.course,
      isDialogOpen,
      isDeletedLocally,
      errorKey,
      isPending,
      isError,
      isFetching,
      isNotFound,
    },
    queries: { courses: courseData.coursesQuery },
    functions: {
      handleSubmit,
      handleDialogOpenChange,
      handleConfirmDelete,
      handleRetry,
    },
    features: { confirmationField },
  }
}
