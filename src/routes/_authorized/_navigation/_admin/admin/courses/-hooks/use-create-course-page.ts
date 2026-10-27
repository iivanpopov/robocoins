import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'

import { useCreateCourseCoursePost } from '#/api/hooks/useCreateCourseCoursePost'
import { getCoursesCourseGetQueryKey } from '#/api/hooks/useGetCoursesCourseGet'
import type { CourseCategoryKey, CourseResponse } from '#/api/types'

import { CreateCourseStateSchema } from '../-schemas'
import type { CourseErrorKey } from '../-types'
import { getCourseErrorKey } from '../-utils'

export function useCreateCoursePage() {
  const queryClient = useQueryClient()

  const [createdCourse, setCreatedCourse] = useState<CourseResponse | null>(null)

  const createCourseMutation = useCreateCourseCoursePost()

  const form = useForm({
    defaultValues: {
      name: '',
      category: 'embedded' as CourseCategoryKey,
    },
    validators: { onChange: CreateCourseStateSchema },
    listeners: {
      onChange: () => createCourseMutation.reset(),
    },
    onSubmit: async ({ value }) => {
      if (createCourseMutation.isPending || createdCourse) return

      try {
        const course = await createCourseMutation.mutateAsync({
          body: { name: value.name.trim(), category: value.category },
        })
        setCreatedCourse(course)
        await queryClient
          .invalidateQueries({ queryKey: getCoursesCourseGetQueryKey() })
          .catch(() => undefined)
      } catch {
        return
      }
    },
  })

  let errorKey: CourseErrorKey | null = null
  if (createCourseMutation.isError) {
    if (createCourseMutation.error.status === 422) {
      errorKey = 'admin.courses.create.error.validation'
    } else {
      errorKey = getCourseErrorKey(createCourseMutation.error, 'admin.courses.create.error')
    }
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (createCourseMutation.isPending || createdCourse) return
    void form.handleSubmit()
  }

  function handleCreateAnother() {
    if (createCourseMutation.isPending) return
    setCreatedCourse(null)
    createCourseMutation.reset()
    form.reset()
  }

  return {
    state: {
      createdCourse,
      errorKey,
      isSubmitting: createCourseMutation.isPending || form.state.isSubmitting,
    },
    mutations: { createCourse: createCourseMutation },
    functions: {
      handleSubmit,
      handleCreateAnother,
    },
    features: { form },
  }
}
