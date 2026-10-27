import { useForm } from '@tanstack/react-form'
import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import { RenameCourseStateSchema } from '../-schemas'
import type { CourseErrorKey } from '../-types'
import { getCourseErrorKey } from '../-utils'
import { useCourseRecord } from './use-course-record'

export function useCourseRenamePage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/courses/$courseId/rename/',
  })

  const courseId = params.courseId
  const courseData = useCourseRecord(courseId)

  const [renamedName, setRenamedName] = useState<string | null>(null)
  const isSyncedNameReference = useRef(false)

  const form = useForm({
    defaultValues: { name: '' },
    validators: { onChange: RenameCourseStateSchema },
    onSubmit: ({ value }) => {
      if (!courseData.course || renamedName) return
      setRenamedName(value.name.trim())
    },
  })

  useEffect(() => {
    const course = courseData.course
    if (!course) return
    if (isSyncedNameReference.current) return
    isSyncedNameReference.current = true
    form.setFieldValue('name', course.name)
  }, [courseData.course, form])

  const isUnchanged =
    !!courseData.course && form.state.values.name.trim() === courseData.course.name

  let errorKey: CourseErrorKey | null = null
  if (courseData.coursesQuery.isError) {
    errorKey = getCourseErrorKey(courseData.coursesQuery.error, 'admin.courses.error')
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!courseData.course || renamedName) return
    void form.handleSubmit()
  }

  function handleRetry() {
    if (courseData.coursesQuery.isFetching) return
    void courseData.coursesQuery.refetch()
  }

  return {
    state: {
      courseId,
      course: courseData.course,
      renamedName,
      isUnchanged,
      errorKey,
      isPending: courseData.coursesQuery.isPending,
      isError: courseData.coursesQuery.isError,
      isFetching: courseData.coursesQuery.isFetching,
      isNotFound: courseData.coursesQuery.isSuccess && !courseData.course,
    },
    queries: { courses: courseData.coursesQuery },
    functions: {
      handleSubmit,
      handleRetry,
    },
    features: { form },
  }
}
