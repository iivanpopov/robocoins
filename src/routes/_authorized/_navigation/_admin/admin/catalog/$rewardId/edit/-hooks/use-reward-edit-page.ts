import { useNavigate, useParams } from '@tanstack/react-router'
import { useState, type SyntheticEvent } from 'react'

import { useGetShopRewardShopRewardIdGet } from '#/api/hooks/useGetShopRewardShopRewardIdGet'

import { useRewardImagePicker } from '../../../-hooks'
import type { RewardDraft } from '../../../-types'
import {
  createEmptyRewardDraft,
  getRewardDraftErrors,
  getRewardDraftFromReward,
  getRewardRequestErrorKey,
  haveRewardDraftsChanged,
} from '../../../-utils'

export function useRewardEditPage() {
  const navigate = useNavigate()
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/catalog/$rewardId/edit/',
  })

  const [draftState, setDraftState] = useState<RewardDraft | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isNoticeVisible, setIsNoticeVisible] = useState(false)

  const rewardQuery = useGetShopRewardShopRewardIdGet(
    { path: { reward_id: params.rewardId } },
    { query: { retry: false } },
  )

  const imagePicker = useRewardImagePicker()

  function handleDraftChange(nextDraft: RewardDraft) {
    setDraftState(nextDraft)
    setIsNoticeVisible(false)
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitted(true)
    setIsNoticeVisible(false)

    if (Object.keys(getRewardDraftErrors(draft)).length) return

    setIsNoticeVisible(true)
  }

  function handleReset() {
    setDraftState(null)
    setIsSubmitted(false)
    setIsNoticeVisible(false)
    imagePicker.functions.handleRemove()
  }

  function handleRetry() {
    void rewardQuery.refetch()
  }

  function handleBack() {
    if (!rewardQuery.data) {
      void navigate({ to: '/admin/catalog' })
      return
    }
    void navigate({
      to: '/admin/catalog/$rewardId',
      params: { rewardId: params.rewardId },
    })
  }

  const savedDraft = rewardQuery.data ? getRewardDraftFromReward(rewardQuery.data) : null
  const draft = draftState ?? savedDraft ?? createEmptyRewardDraft()
  const errors = isSubmitted ? getRewardDraftErrors(draft) : {}
  const isDirty = savedDraft ? haveRewardDraftsChanged(draft, savedDraft) : false
  const canSubmit = isDirty || !!imagePicker.state.selection
  const errorKey = rewardQuery.isError
    ? getRewardRequestErrorKey(rewardQuery.error, 'admin.catalog.error.load')
    : null

  return {
    state: {
      rewardId: params.rewardId,
      reward: rewardQuery.data ?? null,
      draft,
      errors,
      isSubmitted,
      isNoticeVisible,
      isPending: rewardQuery.isPending,
      isError: rewardQuery.isError,
      isFetching: rewardQuery.isFetching,
      errorKey,
      isDirty,
      canSubmit,
    },
    queries: {
      reward: rewardQuery,
    },
    functions: {
      handleDraftChange,
      handleSubmit,
      handleReset,
      handleRetry,
      handleBack,
    },
    features: {
      imagePicker,
    },
  }
}
