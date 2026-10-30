import { useForm, useSelector } from '@tanstack/react-form'
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

  const [selectedCategory, setSelectedCategory] = useState<CourseCategoryKey | null>(null)
  const syncedCategoryReference = useRef<CourseCategoryKey | null>(null)

  const courseData = useCourseRecord(courseId)

  const form = useForm({
    defaultValues: { category: courseData.course?.category ?? 'embedded' },
    validators: { onChange: ChangeCourseCategoryStateSchema },
    onSubmit: ({ value }) => {
      if (!courseData.course || selectedCategory) return
      if (value.category === courseData.course.category) return
      setSelectedCategory(value.category)
    },
  })

  const category = useSelector(form.store, (state) => state.values.category)

  useEffect(() => {
    const course = courseData.course
    if (!course) return
    if (syncedCategoryReference.current === course.category) return
    syncedCategoryReference.current = course.category
    form.setFieldValue('category', course.category)
  }, [courseData.course, form])

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!courseData.course || selectedCategory) return
    void form.handleSubmit()
  }

  function handleRetry() {
    if (courseData.coursesQuery.isFetching) return
    void courseData.coursesQuery.refetch()
  }

  const isUnchanged = !!courseData.course && category === courseData.course.category

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
      selectedCategory,
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
    features: { form },
  }
}
