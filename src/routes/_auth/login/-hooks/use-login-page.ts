import { useMutation } from '@tanstack/react-query'
import { useHydrated, useSearch } from '@tanstack/react-router'
import { type SyntheticEvent, useState } from 'react'

import { useLoginAuthLoginPost } from '#/api/hooks/useLoginAuthLoginPost'
import { useField } from '#/hooks/use-field'
import { startGoogleOAuth } from '#/lib/google-oauth'
import { getHomePath } from '#/routes/-utils'

import { LoginStateSchema } from '../-schemas'

export function useLoginPage() {
  const search = useSearch({ from: '/_auth/login/' })

  const isHydrated = useHydrated()
  const [showGoogleNotice, setShowGoogleNotice] = useState(true)

  const loginMutation = useLoginAuthLoginPost()
  const googleMutation = useMutation({ mutationFn: () => startGoogleOAuth('login') })

  const passwordField = useField('', {
    schema: LoginStateSchema.entries.password,
    onChange: () => loginMutation.reset(),
    onSubmit: async (value) => {
      try {
        const response = await loginMutation.mutateAsync({ body: { code: value } })
        window.location.assign(getHomePath(response.user.role))
      } catch {
        return
      }
    },
  })

  const isSignInDisabled = !isHydrated || loginMutation.isPending || googleMutation.isPending

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (googleMutation.isPending) return
    void passwordField.handleSubmit()
  }

  function handleGoogleLogin() {
    if (googleMutation.isPending || loginMutation.isPending) return
    setShowGoogleNotice(false)
    googleMutation.mutate()
  }

  return {
    state: { isHydrated, isSignInDisabled, googleNotice: showGoogleNotice && search.google },
    mutations: {
      login: loginMutation,
      google: googleMutation,
    },
    functions: {
      handleSubmit,
      handleGoogleLogin,
    },
    features: {
      passwordField,
    },
  }
}
