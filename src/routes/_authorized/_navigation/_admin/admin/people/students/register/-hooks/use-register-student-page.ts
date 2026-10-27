import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState, type SyntheticEvent } from 'react'

import { useCreateStudentStudentRegisterPost } from '#/api/hooks/useCreateStudentStudentRegisterPost'
import { getAllStudentsStudentGetQueryKey } from '#/api/hooks/useGetAllStudentsStudentGet'
import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import type { StudentProfileResponse } from '#/api/types'
import { AVATARS, UKRAINIAN_LOCALE } from '#/routes/-constants'

import { RegisterStudentFormSchema, type RegisterStudentFormValues } from '../-schemas'
import { combineCourseGroups, getApiErrorKind, invalidateStudentCaches } from '../../-utils'
import { useCopyAccessCode } from './use-copy-access-code'

interface CreatedStudent {
  id: number
  name: string
  accessCode: string
}

export function useRegisterStudentPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [created, setCreated] = useState<CreatedStudent | null>(null)

  const coursesQuery = useGetCoursesCourseGet()

  const createMutation = useCreateStudentStudentRegisterPost({
    mutation: {
      retry: false,
      onSuccess: (data) => {
        const profile: StudentProfileResponse = {
          id: data.id,
          user_id: data.user_id,
          role: data.role,
          name: data.name,
          course_names: data.course_names,
          group_ids: data.group_ids,
          avatar: data.avatar,
          balance: data.balance,
        }

        queryClient.setQueryData<StudentProfileResponse[]>(
          getAllStudentsStudentGetQueryKey(),
          (students) =>
            [...(students ?? []).filter((student) => student.id !== profile.id), profile].toSorted(
              (first, second) => first.name.localeCompare(second.name, UKRAINIAN_LOCALE),
            ),
        )
        setCreated({ id: data.id, name: data.name, accessCode: data.access_code })
        void invalidateStudentCaches(queryClient)
      },
    },
  })

  const form = useForm({
    defaultValues: {
      name: '',
      avatar: AVATARS[0],
      groupIds: [],
    } as RegisterStudentFormValues,
    validators: { onChange: RegisterStudentFormSchema },
    listeners: {
      onChange: () => {
        if (!createMutation.isPending) createMutation.reset()
      },
    },
    onSubmit: async ({ value }) => {
      if (createMutation.isPending || created) return

      try {
        await createMutation.mutateAsync({
          body: { name: value.name.trim(), avatar: value.avatar, group_ids: value.groupIds },
        })
        createMutation.reset()
      } catch {
        return
      }
    },
  })

  const clipboard = useCopyAccessCode(created?.accessCode ?? '')

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (createMutation.isPending || created) return
    void form.handleSubmit()
  }

  function handleRetrySubmit() {
    if (createMutation.isPending || created) return
    createMutation.reset()
    void form.handleSubmit()
  }

  function handleGroupToggle(groupId: number) {
    if (createMutation.isPending || created) return
    const groupIds = form.state.values.groupIds
    const nextGroupIds = groupIds.includes(groupId)
      ? groupIds.filter((candidate) => candidate !== groupId)
      : [...groupIds, groupId]
    form.setFieldValue('groupIds', nextGroupIds)
  }

  function handleBack() {
    void navigate({ to: '/admin/people/students' })
  }

  function handleLogin() {
    window.location.assign('/login')
  }

  function handleRetryGroups() {
    if (coursesQuery.isError && !coursesQuery.isFetching) void coursesQuery.refetch()
  }

  const groups = combineCourseGroups(coursesQuery.data)
  const isGroupsPending = coursesQuery.isPending
  const isGroupsError = coursesQuery.isError
  const isGroupsRetrying = coursesQuery.isFetching
  const groupsError = coursesQuery.error ?? null

  return {
    state: {
      created,
      groups,
      isGroupsPending,
      isGroupsError,
      isGroupsRetrying,
      isGroupsEmpty: !isGroupsPending && !isGroupsError && !groups.length,
      groupsErrorKind: getApiErrorKind(groupsError),
      errorKind: getApiErrorKind(createMutation.error),
    },
    queries: { courses: coursesQuery },
    mutations: { create: createMutation },
    functions: {
      handleSubmit,
      handleRetrySubmit,
      handleGroupToggle,
      handleBack,
      handleLogin,
      handleRetryGroups,
    },
    features: { form, clipboard },
  }
}
