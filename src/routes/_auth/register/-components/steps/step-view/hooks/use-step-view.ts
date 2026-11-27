import { useTranslate } from '@kanjou/react'
import { useNavigate } from '@tanstack/react-router'

import { useCreateStudentStudentRegisterPost, useGetCoursesCourseGet } from '#/api/hooks'
import { toast } from '#/components/ui/toast'
import { DID_REGISTER_STORAGE_KEY, STORAGE_YEAR_TTL_IN_MS } from '#/routes/-constants'
import { writeExpiringStorage } from '#/utils/storage'

import { RegisterStep } from '../../../../-constants'
import type { RegisterDraft } from '../../../../-schemas'
import { registerDraft } from '../../../../-utils/register-draft'
import { useRegisterDraft } from '../../../register-provider'

export function useStepView() {
  const register = useRegisterDraft()

  const navigate = useNavigate()
  const t = useTranslate()

  const registerMutation = useCreateStudentStudentRegisterPost()
  const coursesQuery = useGetCoursesCourseGet()

  function handleRetryCourses() {
    void coursesQuery.refetch()
  }

  const draft = register.state as Required<RegisterDraft>
  const groups = (coursesQuery.data ?? []).flatMap((course) => {
    if (!draft.courseIds.includes(course.id)) return []
    const group = course.groups?.find((item) => draft.groupIds.includes(item.id))
    if (!group) return []
    return [{ ...group, courseName: course.name, category: course.category }]
  })

  const handleFinish = async () => {
    if (!coursesQuery.isSuccess || registerMutation.isPending) return

    try {
      const response = await registerMutation.mutateAsync({
        body: {
          name: draft.name,
          avatar: draft.avatar,
          group_ids: draft.groupIds,
        },
      })
      register.setAccessCode(response.access_code)
      registerDraft.clear()
      writeExpiringStorage(DID_REGISTER_STORAGE_KEY, true, STORAGE_YEAR_TTL_IN_MS)
      await navigate({
        to: '/register',
        search: { step: RegisterStep.Success },
        replace: true,
        viewTransition: { types: ['slide-forward'] },
      })
    } catch {
      toast.add({ title: t('error.registration-failed'), type: 'error', timeout: 0 })
    }
  }

  return {
    state: {
      name: draft.name,
      avatar: draft.avatar,
      groups,
    },
    queries: { courses: coursesQuery },
    mutations: {
      register: registerMutation,
    },
    functions: {
      handleFinish,
      handleRetryCourses,
    },
  }
}
