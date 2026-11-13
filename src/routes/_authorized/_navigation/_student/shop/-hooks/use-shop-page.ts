import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useChangeGoalStudentStudentIdChangeGoalPatch } from '#/api/hooks/useChangeGoalStudentStudentIdChangeGoalPatch'
import { getCurrentUserAuthMeGetQueryKey } from '#/api/hooks/useGetCurrentUserAuthMeGet'
import { useGetShopRewardsShopGet } from '#/api/hooks/useGetShopRewardsShopGet'
import { getStudentByIdStudentStudentIdGetQueryKey } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import {
  getStudentRewardProgressStudentStudentIdRewardProgressGetQueryKey,
  useGetStudentRewardProgressStudentStudentIdRewardProgressGet,
} from '#/api/hooks/useGetStudentRewardProgressStudentStudentIdRewardProgressGet'
import type { RewardResponse } from '#/api/types/RewardResponse'
import type { StudentProfileResponse } from '#/api/types/StudentProfileResponse'

import { Route } from '..'
import { getStarPositions } from '../-utils'
import { getStudentRewardCategoriesQueryOptions, isRewardEligible } from '../../-utils'
import { useCamera } from './use-camera'
import { useDraggableMap } from './use-draggable-map'
import { useMapAnimation } from './use-map-animation'
import { useRewardSelection } from './use-reward-selection'

export function useShopPage() {
  const galaxy = Route.useLoaderData()
  const context = Route.useRouteContext()
  const router = useRouter()
  const queryClient = useQueryClient()

  const starsRef = useRef<(ReturnType<typeof getStarPositions>[number] & { glow: number })[]>([])
  const rewardBack = useRef<HTMLButtonElement>(null)
  const selectedStar = useRef<HTMLButtonElement | null>(null)
  const [view, setView] = useState<'galaxy' | 'list'>('galaxy')

  const profile = context.user as StudentProfileResponse
  const rewardsQuery = useGetShopRewardsShopGet()
  const categoriesQuery = useQuery(getStudentRewardCategoriesQueryOptions(queryClient, profile))
  const goalQuery = useGetStudentRewardProgressStudentStudentIdRewardProgressGet({
    path: { student_id: profile.id },
  })
  const goalMutation = useChangeGoalStudentStudentIdChangeGoalPatch({
    mutation: {
      retry: false,
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: getStudentRewardProgressStudentStudentIdRewardProgressGetQueryKey({
              path: { student_id: profile.id },
            }),
          }),
          queryClient.invalidateQueries({
            queryKey: getStudentByIdStudentStudentIdGetQueryKey({
              path: { student_id: profile.id },
            }),
          }),
          queryClient.invalidateQueries({ queryKey: getCurrentUserAuthMeGetQueryKey() }),
          queryClient.invalidateQueries({ queryKey: ['session'] }),
        ])
        await router.invalidate()
      },
    },
  })

  const map = useMapAnimation(starsRef)
  const camera = useCamera(map.cameraRef, map.handleInvalidate)
  const rewardSelection = useRewardSelection(camera.handleAnimate)
  const draggableMap = useDraggableMap(
    map.offsetRef,
    map.boundsRef,
    map.handleInvalidate,
    rewardSelection.handleIsBlocked,
  )

  const rewards = useMemo(
    () =>
      (rewardsQuery.data ?? []).filter((reward) => isRewardEligible(reward, categoriesQuery.data)),
    [rewardsQuery.data, categoriesQuery.data],
  )
  const starPositions = useMemo(() => {
    const maximumPrice = rewards.reduce((maximum, reward) => Math.max(maximum, reward.price), 1)
    return getStarPositions(rewards, galaxy.seed).map((star) => ({
      ...star,
      glow: Math.max(0, star.reward.price) / maximumPrice,
    }))
  }, [rewards, galaxy.seed])
  starsRef.current = starPositions

  useEffect(() => {
    if (rewardSelection.selection.phase === 'open')
      rewardBack.current?.focus({ preventScroll: true })
    if (rewardSelection.selection.phase === 'idle' && selectedStar.current) {
      selectedStar.current.focus({ preventScroll: true })
      selectedStar.current = null
    }
  }, [rewardSelection.selection.phase])

  function handleOpenReward(star: (typeof starPositions)[number], event: React.MouseEvent) {
    if (rewardSelection.handleIsBlocked()) return
    if (event.detail !== 0 && !draggableMap.handleCanSelect()) return
    draggableMap.handleStop()
    goalMutation.reset()
    selectedStar.current = map.starElementsRef.current.get(star.reward.id) ?? null
    rewardSelection.handleOpen(star.reward, map.handleGetPosition(star))
  }

  function handleOpenListReward(
    reward: RewardResponse,
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    if (rewardSelection.handleIsBlocked()) return
    draggableMap.handleStop()
    goalMutation.reset()
    selectedStar.current = event.currentTarget
    rewardSelection.handleOpenDirect(reward)
  }

  function handleShowGalaxy() {
    if (rewardSelection.handleIsBlocked()) return
    draggableMap.handleStop()
    setView('galaxy')
    map.handleInvalidate()
  }

  function handleShowList() {
    if (rewardSelection.handleIsBlocked()) return
    draggableMap.handleStop()
    setView('list')
  }

  function handleFocusStar(
    star: (typeof starPositions)[number],
    event: React.FocusEvent<HTMLButtonElement>,
  ) {
    if (rewardSelection.handleIsBlocked() || selectedStar.current) return
    if (!event.currentTarget.matches(':focus-visible')) return
    draggableMap.handleStop()
    map.handleFocusStar(star)
  }

  function handleChangeGoal() {
    const reward = rewardSelection.selection.reward
    if (
      !reward ||
      goalMutation.isPending ||
      !goalQuery.isSuccess ||
      !categoriesQuery.isSuccess ||
      !rewardsQuery.isSuccess
    )
      return
    if (reward.id === currentGoalId) return
    if (goalMutation.isError) goalMutation.reset()
    goalMutation.mutate({
      path: { student_id: profile.id },
      body: { new_goal_reward_id: reward.id },
    })
  }

  function handleRetryCatalog() {
    void rewardsQuery.refetch()
    void categoriesQuery.refetch()
  }

  function handleRetryGoal() {
    if (goalQuery.isError) {
      void goalQuery.refetch()
      return
    }
    handleChangeGoal()
  }

  const selectedReward = rewardSelection.selection.reward
  const currentGoalId = goalQuery.data?.reward?.id ?? null
  const isCurrentGoal = Boolean(selectedReward && selectedReward.id === currentGoalId)
  const isGoalBusy =
    goalMutation.isPending ||
    goalQuery.isFetching ||
    !goalQuery.isSuccess ||
    !categoriesQuery.isSuccess ||
    !rewardsQuery.isSuccess
  const goalAction = goalQuery.isPending
    ? 'loading'
    : goalMutation.isPending
      ? 'saving'
      : isCurrentGoal
        ? 'current'
        : 'select'

  return {
    refs: {
      map: map.mapRef,
      background: map.backgroundRef,
      starElements: map.starElementsRef,
      rewardBack,
    },
    state: {
      isListView: view === 'list',
      rewards,
      isCatalogPending: rewardsQuery.isPending || categoriesQuery.isPending,
      isCatalogError: rewardsQuery.isError || categoriesQuery.isError,
      isCatalogFetching: rewardsQuery.isFetching || categoriesQuery.isFetching,
      stars: starPositions,
      selectedReward,
      rewardDescription: selectedReward?.description?.trim(),
      isRewardActive: rewardSelection.selection.phase !== 'idle',
      balance: profile.balance,
      isRewardVisible:
        rewardSelection.selection.phase === 'open' || rewardSelection.selection.phase === 'closing',
      isRewardOpen: rewardSelection.selection.phase === 'open',
      isClosingReward: rewardSelection.selection.phase === 'closing',
      isCurrentGoal,
      isGoalBusy,
      isGoalSaving: goalMutation.isPending,
      goalAction,
      isGoalError: goalMutation.isError || goalQuery.isError,
      isGoalSuccess: goalMutation.isSuccess,
    },
    functions: {
      handlePointerDown: draggableMap.handlePointerDown,
      handlePointerMove: draggableMap.handlePointerMove,
      handlePointerUp: draggableMap.handlePointerUp,
      handlePointerCancel: draggableMap.handlePointerCancel,
      handlePointerLeave: draggableMap.handlePointerLeave,
      handleLostPointerCapture: draggableMap.handleLostPointerCapture,
      handleWheel: draggableMap.handleWheel,
      handleOpenReward,
      handleOpenListReward,
      handleShowGalaxy,
      handleShowList,
      handleFocusStar,
      handleChangeGoal,
      handleRetryCatalog,
      handleRetryGoal,
      handleCloseReward: rewardSelection.handleClose,
      handleRewardAnimationEnd: rewardSelection.handleRewardAnimationEnd,
    },
  }
}
