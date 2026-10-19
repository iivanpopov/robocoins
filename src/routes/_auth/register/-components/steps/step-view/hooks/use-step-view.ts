import { useTranslate } from '@kanjou/react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'

import { useCreateStudentStudentRegisterPost } from '#/api/hooks'
import { toast } from '#/components/ui/toast'
import { refreshSession } from '#/lib/session'
import { LOCALSTORAGE_DID_REGISTER } from '#/routes/-constants'

import { LOCALSTORAGE_REGISTER_DRAFT } from '../../../../-constants'
import { CompleteRegisterDraft } from '../../../../-schemas'
import { useRegisterContext } from '../../../register-provider'

export function useStepView() {
  const register = useRegisterContext()

  const navigate = useNavigate()
  const router = useRouter()
  const queryClient = useQueryClient()
  const t = useTranslate()

  const registerMutation = useCreateStudentStudentRegisterPost()

  const handleFinish = async () => {
    const draft = CompleteRegisterDraft.safeParse(register.state)

    if (!draft.success) return

    const { name, avatar, courseName, group } = draft.data

    try {
      await registerMutation.mutateAsync({
        body: { name, avatar, course_name: courseName, group_id: group.id },
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
      name: register.state.name,
      avatar: register.state.avatar,
      courseName: register.state.courseName,
      group: register.state.group,
    },
    mutations: {
      register: registerMutation,
    },
    functions: {
      handleFinish,
    },
    features: {},
  }
}
