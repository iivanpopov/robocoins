import { useTranslate } from '@kanjou/react'
import { useNavigate } from '@tanstack/react-router'

import { useCreateStudentStudentRegisterPost } from '#/api/hooks'
import { toast } from '#/components/ui/toast'
import { LOCALSTORAGE_DID_REGISTER } from '#/routes/-constants'

import { LOCALSTORAGE_REGISTER_STATE } from '../../../../-constants'
import { CompleteRegisterStateSchema } from '../../../../-schemas'
import { useRegisterContext } from '../../../register-provider'

export function useStepView() {
  const register = useRegisterContext()

  const navigate = useNavigate()
  const t = useTranslate()

  const registerMutation = useCreateStudentStudentRegisterPost()

  const handleFinish = async () => {
    const draft = CompleteRegisterStateSchema.safeParse(register.state)

    if (!draft.success) return

    const { name, avatar, courseName, group } = draft.data

    try {
      await registerMutation.mutateAsync({
        body: { name, avatar, course_name: courseName, group_id: group.id },
      })
      localStorage.removeItem(LOCALSTORAGE_REGISTER_STATE)
      localStorage.setItem(LOCALSTORAGE_DID_REGISTER, 'true')
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
