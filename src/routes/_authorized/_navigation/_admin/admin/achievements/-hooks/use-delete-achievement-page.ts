import { useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'

import { useDeleteCoinEarningAchievementAchievementsAchievementIdDelete } from '#/api/hooks/useDeleteCoinEarningAchievementAchievementsAchievementIdDelete'
import {
  getAchievementsAchievementsGetQueryKey,
  useGetAchievementsAchievementsGet,
} from '#/api/hooks/useGetAchievementsAchievementsGet'
import type { AchievementResponse } from '#/api/types'

import { getAchievementRequestErrorKey } from '../-utils'

export function useDeleteAchievementPage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/achievements/$achievementId/delete/',
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deletedAchievement, setDeletedAchievement] = useState<AchievementResponse | null>(null)

  const queryClient = useQueryClient()

  const achievementsQuery = useGetAchievementsAchievementsGet({ query: { retry: false } })

  const deleteMutation = useDeleteCoinEarningAchievementAchievementsAchievementIdDelete({
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
      onError: () => {
        setDeletedAchievement(null)
      },
    },
  })

  function handleDialogOpenChange(isOpen: boolean) {
    setIsDialogOpen(isOpen)
  }

  function handleConfirmDelete() {
    if (!achievement || deleteMutation.isPending) return

    setDeletedAchievement(achievement)
    setIsDialogOpen(false)
    deleteMutation.mutate({ path: { achievement_id: achievement.id } })
  }

  function handleRetry() {
    void achievementsQuery.refetch()
  }

  const achievement =
    achievementsQuery.data?.find((candidate) => candidate.id === params.achievementId) ?? null
  const errorKey = achievementsQuery.isError
    ? getAchievementRequestErrorKey(achievementsQuery.error, 'admin.achievements.error.load')
    : null
  const deleteErrorKey = deleteMutation.isError
    ? getAchievementRequestErrorKey(deleteMutation.error, 'admin.achievements.delete.error')
    : null

  return {
    state: {
      achievementId: params.achievementId,
      achievement,
      deletedAchievement,
      isDialogOpen,
      isPending: achievementsQuery.isPending,
      isError: achievementsQuery.isError,
      isFetching: achievementsQuery.isFetching,
      isNotFound: achievementsQuery.isSuccess && !achievement && !deleteMutation.isSuccess,
      errorKey,
      deleteErrorKey,
    },
    queries: { achievements: achievementsQuery },
    mutations: { delete: deleteMutation },
    functions: {
      handleDialogOpenChange,
      handleConfirmDelete,
      handleRetry,
    },
  }
}
