import { useTranslate } from '@kanjou/react'

import { useLogoutAuthLogoutPost } from '#/api/hooks/useLogoutAuthLogoutPost'
import { toast } from '#/components/ui'
import { queryClient } from '#/lib/query'

export function useSettingsPage() {
  const t = useTranslate()
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

  return {
    mutations: { logout: logoutMutation },
    functions: { handleLogout },
  }
}
