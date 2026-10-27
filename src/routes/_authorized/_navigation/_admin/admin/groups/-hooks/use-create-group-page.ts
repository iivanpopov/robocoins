import { useForm, useSelector } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'

import { useCreateGroupGroupCreatePost } from '#/api/hooks/useCreateGroupGroupCreatePost'
import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import type { GroupResponse } from '#/api/types'

import { CreateGroupStateSchema } from '../-schemas'
import type { GroupErrorKey } from '../-types'
import { getGroupErrorKey, invalidateGroupCaches } from '../-utils'

export function useCreateGroupPage() {
  const queryClient = useQueryClient()

  const [createdGroup, setCreatedGroup] = useState<GroupResponse | null>(null)

  const coursesQuery = useGetCoursesCourseGet()
  const createGroupMutation = useCreateGroupGroupCreatePost()

  const form = useForm({
    defaultValues: {
      name: '',
      courseId: '',
    },
    validators: { onChange: CreateGroupStateSchema },
    listeners: {
      onChange: () => createGroupMutation.reset(),
    },
    onSubmit: async ({ value }) => {
      if (createGroupMutation.isPending || createdGroup) return

      try {
        const group = await createGroupMutation.mutateAsync({
          body: { name: value.name.trim(), course_id: Number(value.courseId) },
        })
        setCreatedGroup(group)
        await invalidateGroupCaches(queryClient).catch(() => undefined)
      } catch {
        return
      }
    },
  })

  const isFormSubmitting = useSelector(form.store, (state) => state.isSubmitting)

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (createGroupMutation.isPending || createdGroup) return
    void form.handleSubmit()
  }

  function handleCreateAnother() {
    if (createGroupMutation.isPending) return
    setCreatedGroup(null)
    createGroupMutation.reset()
    form.reset()
  }

  function handleRetryCourses() {
    if (coursesQuery.isFetching) return
    void coursesQuery.refetch()
  }

  const courses = coursesQuery.data ?? []
  const createdCourse = courses.find((course) => course.id === createdGroup?.course_id) ?? null

  let coursesErrorKey: GroupErrorKey | null = null
  if (coursesQuery.isError) {
    coursesErrorKey = getGroupErrorKey(coursesQuery.error, 'admin.groups.detail.error')
  }

  let errorKey: GroupErrorKey | null = null
  if (createGroupMutation.isError) {
    if (createGroupMutation.error.status === 422) {
      errorKey = 'admin.groups.create.error.validation'
    } else {
      errorKey = getGroupErrorKey(createGroupMutation.error, 'admin.groups.create.error')
    }
  }

  return {
    state: {
      createdGroup,
      createdCourse,
      courses,
      hasCourses: !!courses.length,
      coursesErrorKey,
      errorKey,
      isCoursesPending: coursesQuery.isPending,
      isCoursesError: coursesQuery.isError,
      isCoursesFetching: coursesQuery.isFetching,
      isSubmitting: createGroupMutation.isPending || isFormSubmitting,
    },
    queries: { courses: coursesQuery },
    mutations: { createGroup: createGroupMutation },
    functions: { handleSubmit, handleCreateAnother, handleRetryCourses },
    features: { form },
  }
}
