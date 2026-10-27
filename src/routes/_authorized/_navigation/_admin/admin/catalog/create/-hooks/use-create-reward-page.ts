import { useQueryClient } from '@tanstack/react-query'
import { useState, type SyntheticEvent } from 'react'

import { useCreateRewardRewardsPost } from '#/api/hooks/useCreateRewardRewardsPost'
import { getAllRewardsRewardsGetQueryKey } from '#/api/hooks/useGetAllRewardsRewardsGet'

import { useRewardImagePicker } from '../../-hooks'
import type { RewardDraft } from '../../-types'
import {
  createEmptyRewardDraft,
  getRewardDraftErrors,
  getRewardRequestErrorKey,
  toCreateRewardRequest,
} from '../../-utils'

export function useCreateRewardPage() {
  const queryClient = useQueryClient()

  const [draft, setDraft] = useState(createEmptyRewardDraft)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const createMutation = useCreateRewardRewardsPost({
    mutation: {
      retry: false,
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: getAllRewardsRewardsGetQueryKey() }),
          queryClient.invalidateQueries({ queryKey: [{ url: '/shop' }] }),
        ])
      },
    },
  })

  const imagePicker = useRewardImagePicker()

  function handleDraftChange(nextDraft: RewardDraft) {
    setDraft(nextDraft)
    if (createMutation.isError) createMutation.reset()
  }

  function submitReward() {
    if (createMutation.isPending) return

    const nextErrors = getRewardDraftErrors(draft)
    if (Object.keys(nextErrors).length) return

    createMutation.mutate({ body: toCreateRewardRequest(draft) })
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitted(true)
    submitReward()
  }

  function handleRetry() {
    if (createMutation.isPending) return
    createMutation.reset()
    submitReward()
  }

  function handleCreateAnother() {
    createMutation.reset()
    setDraft(createEmptyRewardDraft())
    setIsSubmitted(false)
    imagePicker.functions.handleRemove()
  }

  const errors = isSubmitted ? getRewardDraftErrors(draft) : {}
  const createdReward = createMutation.data?.reward ?? null
  const errorKey = createMutation.isError
    ? getRewardRequestErrorKey(createMutation.error, 'admin.catalog.create.error')
    : null

  return {
    state: {
      draft,
      errors,
      isSubmitted,
      createdReward,
      errorKey,
    },
    mutations: {
      create: createMutation,
    },
    functions: {
      handleDraftChange,
      handleSubmit,
      handleRetry,
      handleCreateAnother,
    },
    features: {
      imagePicker,
    },
  }
}
