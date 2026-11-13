import { useQueryClient } from '@tanstack/react-query'
import { useRef, useState, type SyntheticEvent } from 'react'

import { useCreateCoinEarningAchievementAchievementsPost } from '#/api/hooks/useCreateCoinEarningAchievementAchievementsPost'
import { getAchievementsAchievementsGetQueryKey } from '#/api/hooks/useGetAchievementsAchievementsGet'

import type { AchievementDraft } from '../-types'
import {
  createEmptyAchievementDraft,
  getAchievementDraftCoins,
  getAchievementDraftErrors,
  getAchievementRequestErrorKey,
  toCreateAchievementRequest,
} from '../-utils'

export function useCreateAchievementPage() {
  const [draft, setDraft] = useState(createEmptyAchievementDraft)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const submissionLock = useRef(false)

  const queryClient = useQueryClient()

  const createMutation = useCreateCoinEarningAchievementAchievementsPost({
    mutation: {
      retry: false,
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: getAchievementsAchievementsGetQueryKey(),
          }),
          queryClient.invalidateQueries({
            queryKey: [{ url: '/student/:student_id/achievements' }],
          }),
        ])
      },
      onSettled: () => {
        submissionLock.current = false
      },
    },
  })

  function handleDraftChange(nextDraft: AchievementDraft) {
    setDraft(nextDraft)
    if (createMutation.isError) createMutation.reset()
  }

  function submitDraft() {
    if (submissionLock.current || createMutation.isPending) return

    const errors = getAchievementDraftErrors(draft)
    if (Object.keys(errors).length) return

    submissionLock.current = true
    createMutation.mutate({ body: toCreateAchievementRequest(draft) })
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitted(true)
    submitDraft()
  }

  function handleRetry() {
    if (createMutation.isPending) return
    createMutation.reset()
    submitDraft()
  }

  function handleCreateAnother() {
    createMutation.reset()
    setDraft(createEmptyAchievementDraft())
    setIsSubmitted(false)
  }

  const errors = isSubmitted ? getAchievementDraftErrors(draft) : {}
  const previewCoins = getAchievementDraftCoins(draft)
  const createdAchievement = createMutation.data ?? null
  const errorKey = createMutation.isError
    ? getAchievementRequestErrorKey(createMutation.error, 'admin.achievements.create.error')
    : null

  return {
    state: {
      draft,
      errors,
      previewCoins,
      isSubmitted,
      createdAchievement,
      errorKey,
    },
    mutations: { create: createMutation },
    functions: {
      handleDraftChange,
      handleSubmit,
      handleRetry,
      handleCreateAnother,
    },
  }
}
