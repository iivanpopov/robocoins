import { useTranslate } from '@kanjou/react'
import { useState } from 'react'

import { useLoginAuthLoginPost } from '#/api/hooks'
import { toast } from '#/components/ui/toast'

import { useRegisterDraft } from '../../../register-provider'

export function useStepSuccess() {
  const register = useRegisterDraft()
  const [isRevealed, setIsRevealed] = useState(false)
  const loginMutation = useLoginAuthLoginPost()
  const t = useTranslate()

  const handleToggleRevealed = () => {
    setIsRevealed((value) => !value)
  }

  const handleProfile = async () => {
    if (loginMutation.isPending || !register.accessCode) return

    try {
      await loginMutation.mutateAsync({ body: { code: register.accessCode } })
      window.location.assign('/')
    } catch {
      toast.add({ title: t('error.profile-entry-failed'), type: 'error' })
    }
  }

  return {
    state: { accessCode: register.accessCode, isRevealed },
    mutations: { login: loginMutation },
    functions: { handleToggleRevealed, handleProfile },
  }
}
