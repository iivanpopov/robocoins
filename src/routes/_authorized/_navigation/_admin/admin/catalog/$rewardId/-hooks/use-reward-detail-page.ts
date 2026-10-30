import { useNavigate, useParams } from '@tanstack/react-router'
import { useState } from 'react'

import { useGetShopRewardShopRewardIdGet } from '#/api/hooks/useGetShopRewardShopRewardIdGet'

import type { RewardActionNotice } from '../../-types'
import { getRewardRequestErrorKey } from '../../-utils'

export function useRewardDetailPage() {
  const navigate = useNavigate()
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/catalog/$rewardId/',
  })

  const [isHideOpen, setIsHideOpen] = useState(false)
  const [isShowOpen, setIsShowOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [notice, setNotice] = useState<RewardActionNotice | null>(null)

  const rewardQuery = useGetShopRewardShopRewardIdGet(
    { path: { reward_id: params.rewardId } },
    { query: { retry: false } },
  )

  function handleHideOpenChange(isOpen: boolean) {
    setIsHideOpen(isOpen)
  }

  function handleShowOpenChange(isOpen: boolean) {
    setIsShowOpen(isOpen)
  }

  function handleDeleteOpenChange(isOpen: boolean) {
    setIsDeleteOpen(isOpen)
  }

  function handleOpenHide() {
    setNotice(null)
    setIsHideOpen(true)
  }

  function handleOpenShow() {
    setNotice(null)
    setIsShowOpen(true)
  }

  function handleOpenDelete() {
    setNotice(null)
    setIsDeleteOpen(true)
  }

  function handleConfirmHide() {
    setIsHideOpen(false)
    setNotice('hide')
  }

  function handleConfirmShow() {
    setIsShowOpen(false)
    setNotice('show')
  }

  function handleConfirmDelete() {
    setIsDeleteOpen(false)
    setNotice('delete')
  }

  function handleDismissNotice() {
    setNotice(null)
  }

  function handleRetry() {
    void rewardQuery.refetch()
  }

  function handleBack() {
    void navigate({ to: '/admin/catalog' })
  }

  function handleEdit() {
    void navigate({
      to: '/admin/catalog/$rewardId/edit',
      params: { rewardId: params.rewardId },
    })
  }

  const errorKey = rewardQuery.isError
    ? getRewardRequestErrorKey(rewardQuery.error, 'admin.catalog.error.load')
    : null

  return {
    state: {
      rewardId: params.rewardId,
      reward: rewardQuery.data ?? null,
      isPending: rewardQuery.isPending,
      isError: rewardQuery.isError,
      isFetching: rewardQuery.isFetching,
      errorKey,
      isHideOpen,
      isShowOpen,
      isDeleteOpen,
      notice,
    },
    queries: {
      reward: rewardQuery,
    },
    functions: {
      handleHideOpenChange,
      handleShowOpenChange,
      handleDeleteOpenChange,
      handleOpenHide,
      handleOpenShow,
      handleOpenDelete,
      handleConfirmHide,
      handleConfirmShow,
      handleConfirmDelete,
      handleDismissNotice,
      handleRetry,
      handleBack,
      handleEdit,
    },
  }
}
