import { useNavigate } from '@tanstack/react-router'
import { useEffect, useEffectEvent, useState } from 'react'
import type { SyntheticEvent } from 'react'

import type { CarouselApi } from '#/components/ui'
import { AVATARS, RegisterStep } from '#/routes/_auth/register/-constants'

import { useRegisterDraft } from '../../../register-provider'

export function useStepAvatar() {
  const register = useRegisterDraft()

  const navigate = useNavigate({ from: '/register' })
  const previousCategory = register.state.categories!.at(-1)!

  const [initialIndex] = useState(() => {
    const savedIndex = AVATARS.findIndex((key) => key === register.state.avatar)
    if (savedIndex === -1) return Math.floor(AVATARS.length / 2)
    return savedIndex
  })

  const [api, setApi] = useState<CarouselApi>()

  const handleSelectionChange = useEffectEvent(() => {
    if (!api) return
    const avatar = AVATARS[api.selectedScrollSnap()]
    if (avatar === register.state.avatar) return
    register.setState({ avatar })
  })

  useEffect(() => {
    if (!api) return

    const handleSelect = () => handleSelectionChange()

    handleSelect()
    api.on('select', handleSelect)

    return () => {
      api.off('select', handleSelect)
    }
  }, [api])

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!register.state.avatar) return
    void navigate({
      search: { step: RegisterStep.View },
      viewTransition: { types: ['register-forward', 'register-avatar'] },
    })
  }

  return {
    state: {
      initialIndex,
      previousSearch: { step: RegisterStep.Course, category: previousCategory },
    },
    queries: {},
    mutations: {},
    functions: {
      setApi,
      handleSubmit,
    },
  }
}
