import { useForm } from '@tanstack/react-form'
import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import type { CourseCategoryKey } from '#/api/types'

import { ChangeCourseCategoryStateSchema } from '../-schemas'
import type { CourseErrorKey } from '../-types'
import { getCourseErrorKey } from '../-utils'
import { useCourseRecord } from './use-course-record'

export function useCourseCategoryPage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/courses/$courseId/category/',
  })

  const courseId = params.courseId
  const courseData = useCourseRecord(courseId)

  const [selectedCategory, setSelectedCategory] = useState<CourseCategoryKey | null>(null)
  const isSyncedCategoryReference = useRef(false)

  const form = useForm({
    defaultValues: { category: 'embedded' as CourseCategoryKey },
    validators: { onChange: ChangeCourseCategoryStateSchema },
    onSubmit: ({ value }) => {
      if (!courseData.course || selectedCategory) return
      if (value.category === courseData.course.category) return
      setSelectedCategory(value.category)
    },
  })

  useEffect(() => {
    const course = courseData.course
    if (!course) return
    if (isSyncedCategoryReference.current) return
    isSyncedCategoryReference.current = true
    form.setFieldValue('category', course.category)
  }, [courseData.course, form])

  const isUnchanged =
    !!courseData.course && form.state.values.category === courseData.course.category

  let errorKey: CourseErrorKey | null = null
  if (courseData.coursesQuery.isError) {
    errorKey = getCourseErrorKey(courseData.coursesQuery.error, 'admin.courses.error')
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!courseData.course || selectedCategory) return
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
      selectedCategory,
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
