import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import { useField } from '#/hooks/use-field'

import { RenameCourseStateSchema } from '../-schemas'
import type { CourseErrorKey } from '../-types'
import { getCourseErrorKey } from '../-utils'
import { useCourseRecord } from './use-course-record'

export function useCourseRenamePage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/courses/$courseId/rename/',
  })

  const courseId = params.courseId

  const [renamedName, setRenamedName] = useState<string | null>(null)
  const syncedCourseIdReference = useRef<number | null>(null)

  const courseData = useCourseRecord(courseId)

  const nameField = useField(courseData.course?.name ?? '', {
    schema: RenameCourseStateSchema.entries.name,
    onSubmit: (value) => {
      if (!courseData.course || renamedName) return
      setRenamedName(value.trim())
    },
  })

  useEffect(() => {
    const course = courseData.course
    if (!course) return
    if (syncedCourseIdReference.current === course.id) return
    syncedCourseIdReference.current = course.id
    nameField.setValue(course.name)
  }, [courseData.course, nameField])

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!courseData.course || renamedName) return
    void nameField.handleSubmit()
  }

  function handleRetry() {
    if (courseData.coursesQuery.isFetching) return
    void courseData.coursesQuery.refetch()
  }

  const isUnchanged = !!courseData.course && nameField.value.trim() === courseData.course.name

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
      renamedName,
      isUnchanged,
      errorKey,
      isPending,
      isError,
      isFetching,
      isNotFound,
    },
    queries: { courses: courseData.coursesQuery },
    functions: {
      handleSubmit,
      handleRetry,
    },
    features: { nameField },
  }
}
