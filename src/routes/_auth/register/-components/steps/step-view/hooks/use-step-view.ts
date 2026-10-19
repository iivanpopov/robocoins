import { useTranslate } from '@kanjou/react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'

import { useCreateStudentStudentRegisterPost, useGetCoursesCourseGet } from '#/api/hooks'
import { toast } from '#/components/ui/toast'
import { refreshSession } from '#/lib/session'
import { LOCALSTORAGE_DID_REGISTER } from '#/routes/-constants'

import { LOCALSTORAGE_REGISTER_DRAFT } from '../../../../-constants'
import type { RegisterDraft } from '../../../../-schemas'
import { useRegisterDraft } from '../../../register-provider'

export function useStepView() {
  const register = useRegisterDraft()

  const navigate = useNavigate()
  const router = useRouter()
  const queryClient = useQueryClient()
  const t = useTranslate()

  const registerMutation = useCreateStudentStudentRegisterPost()
  const coursesQuery = useGetCoursesCourseGet()
  const draft = register.state as Required<RegisterDraft>
  const groups = (coursesQuery.data ?? []).flatMap((course) => {
    if (!draft.courseIds.includes(course.id)) return []
    const group = course.groups!.find((item) => draft.groupIds.includes(item.id))!
    return [{ ...group, courseName: course.name }]
  })

  const handleFinish = async () => {
    if (!coursesQuery.isSuccess || registerMutation.isPending) return

    try {
      await registerMutation.mutateAsync({
        body: {
          name: draft.name,
          avatar: draft.avatar,
          group_ids: draft.groupIds,
        },
      })
      localStorage.removeItem(LOCALSTORAGE_REGISTER_DRAFT)
      localStorage.setItem(LOCALSTORAGE_DID_REGISTER, 'true')
      await refreshSession(queryClient)
      await router.invalidate()
      await navigate({ to: '/' })
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
    },
    features: {},
  }
}
