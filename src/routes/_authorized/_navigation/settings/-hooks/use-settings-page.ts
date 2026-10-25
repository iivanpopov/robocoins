import { useQueryClient } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { useState } from 'react'

import { useGetStudentCredentialsAuthMeCredentialsGet } from '#/api/hooks/useGetStudentCredentialsAuthMeCredentialsGet'
import { useLogoutAuthLogoutPost } from '#/api/hooks/useLogoutAuthLogoutPost'
import { useMotionPreference } from '#/hooks/use-motion-preference'
import { setAnimationsDisabled } from '#/utils/motion'

export function useSettingsPage() {
  const context = useRouteContext({ from: '/_authorized' })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const motionPreference = useMotionPreference(context.animationsDisabled)
  const queryClient = useQueryClient()
  const credentialsQuery = useGetStudentCredentialsAuthMeCredentialsGet({
    query: {
      enabled: context.user?.role === 'student',
    },
  })
  const logoutMutation = useLogoutAuthLogoutPost({
    mutation: {
      retry: false,
      onSuccess: async () => {
        await queryClient.cancelQueries()
        queryClient.clear()
        window.location.assign('/login')
      },
    },
  })

  const handleLogout = () => {
    if (logoutMutation.isPending) return
    logoutMutation.mutate(undefined)
  }

  function handleLogoutDialogOpenChange(open: boolean) {
    if (logoutMutation.isPending) return
    if (open) logoutMutation.reset()
    setIsLogoutDialogOpen(open)
  }

  const handleTogglePassword = () => {
    setIsPasswordVisible((value) => !value)
  }

  function handleRetryCredentials() {
    void credentialsQuery.refetch()
  }

  function handleAnimationsChange(checked: boolean) {
    if (checked === motionPreference.disabled) return
    setAnimationsDisabled(checked)
  }

  return {
    state: {
      user: context.user,
      isPasswordVisible,
      isLogoutDialogOpen,
      animationsDisabled: motionPreference.disabled,
      systemReducedMotion: motionPreference.systemReducedMotion,
      password: credentialsQuery.data?.access_code ?? '',
      isPasswordLoading: credentialsQuery.isPending,
    },
    queries: { credentials: credentialsQuery },
    mutations: { logout: logoutMutation },
    functions: {
      handleLogout,
      handleTogglePassword,
      handleRetryCredentials,
      handleLogoutDialogOpenChange,
      handleAnimationsChange,
    },
  }
}
