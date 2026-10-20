import { useTranslate } from '@kanjou/react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { useState } from 'react'

import { useGetStudentCredentialsAuthMeCredentialsGet } from '#/api/hooks/useGetStudentCredentialsAuthMeCredentialsGet'
import { useLogoutAuthLogoutPost } from '#/api/hooks/useLogoutAuthLogoutPost'
import { toast } from '#/components/ui'

export function useSettingsPage() {
  const context = useRouteContext({ from: '/_authorized' })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const t = useTranslate()
  const queryClient = useQueryClient()
  const credentialsQuery = useGetStudentCredentialsAuthMeCredentialsGet({
    query: {
      enabled: context.user?.role === 'student' && isPasswordVisible,
      gcTime: 0,
    },
  })
  const logoutMutation = useLogoutAuthLogoutPost({
    mutation: {
      onSuccess: async () => {
        await queryClient.cancelQueries()
        queryClient.clear()
        window.location.assign('/login')
      },
      onError: () => {
        toast.add({ title: t('settings.logout.error'), type: 'error' })
      },
    },
  })

  const handleLogout = () => {
    logoutMutation.mutate(undefined)
  }

  const handleTogglePassword = () => {
    setIsPasswordVisible((value) => !value)
  }

  function handleRetryCredentials() {
    void credentialsQuery.refetch()
  }

  return {
    state: { user: context.user, isPasswordVisible },
    queries: { credentials: credentialsQuery },
    mutations: { logout: logoutMutation },
    functions: { handleLogout, handleTogglePassword, handleRetryCredentials },
  }
}
