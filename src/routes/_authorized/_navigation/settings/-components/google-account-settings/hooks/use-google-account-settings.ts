import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { getGoogleLink, startGoogleOAuth, unlinkGoogleAccount } from '#/lib/google-oauth'

export function useGoogleAccountSettings(userId: number) {
  const [isUnlinkOpen, setIsUnlinkOpen] = useState(false)
  const [showNotice, setShowNotice] = useState(true)

  const queryClient = useQueryClient()
  const queryKey = ['google-account-link', userId] as const
  const googleLink = useQuery({
    queryKey,
    queryFn: (context) => getGoogleLink(context.signal),
    refetchOnMount: 'always',
    retry: false,
  })
  const startLinkMutation = useMutation({ mutationFn: () => startGoogleOAuth('link') })
  const unlink = useMutation({
    mutationFn: unlinkGoogleAccount,
    onSuccess: async (link) => {
      await queryClient.cancelQueries({ queryKey })
      queryClient.setQueryData(queryKey, link)
      setIsUnlinkOpen(false)
      setShowNotice(false)
    },
  })

  function handleRetryStatus() {
    void googleLink.refetch()
  }

  function handleStartLink() {
    if (startLinkMutation.isPending) return
    setShowNotice(false)
    startLinkMutation.mutate()
  }

  function handleUnlinkOpenChange(open: boolean) {
    if (unlink.isPending) return
    if (open) unlink.reset()
    setIsUnlinkOpen(open)
  }

  function handleUnlink() {
    if (!unlink.isPending) unlink.mutate()
  }

  return {
    googleLink,
    startLinkMutation,
    unlink,
    isUnlinkOpen,
    showNotice,
    handleRetryStatus,
    handleStartLink,
    handleUnlinkOpenChange,
    handleUnlink,
  }
}
