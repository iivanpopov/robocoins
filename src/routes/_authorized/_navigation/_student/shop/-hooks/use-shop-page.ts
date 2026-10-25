import { useEffect, useMemo, useRef, useState } from 'react'

import type { RewardResponse } from '#/api/types/RewardResponse'
import type { StudentProfileResponse } from '#/api/types/StudentProfileResponse'

import { Route } from '..'
import { getStarPositions } from '../-utils'
import { useCamera } from './use-camera'
import { useDraggableMap } from './use-draggable-map'
import { useMapAnimation } from './use-map-animation'
import { useRewardSelection } from './use-reward-selection'

export function useShopPage() {
  const galaxy = Route.useLoaderData()
  const context = Route.useRouteContext()

  const starsRef = useRef<(ReturnType<typeof getStarPositions>[number] & { glow: number })[]>([])
  const rewardBack = useRef<HTMLButtonElement>(null)
  const selectedStar = useRef<HTMLButtonElement | null>(null)
  const [view, setView] = useState<'galaxy' | 'list'>('galaxy')
  const map = useMapAnimation(starsRef)
  const camera = useCamera(map.cameraRef, map.handleInvalidate)
  const rewardSelection = useRewardSelection(camera.handleAnimate)
  const draggableMap = useDraggableMap(
    map.offsetRef,
    map.handleInvalidate,
    rewardSelection.handleIsBlocked,
  )

  const starPositions = useMemo(() => {
    const maximumPrice = galaxy.rewards.reduce(
      (maximum, reward) => Math.max(maximum, reward.price),
      1,
    )
    return getStarPositions(galaxy.rewards, galaxy.seed).map((star) => ({
      ...star,
      glow: Math.max(0, star.reward.price) / maximumPrice,
    }))
  }, [galaxy.rewards, galaxy.seed])
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
    selectedStar.current = map.starElementsRef.current.get(star.reward.id) ?? null
    rewardSelection.handleOpen(star.reward, map.handleGetPosition(star))
  }

  function handleOpenListReward(
    reward: RewardResponse,
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    if (rewardSelection.handleIsBlocked()) return
    draggableMap.handleStop()
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

  const selectedReward = rewardSelection.selection.reward
  const profile = context.user as StudentProfileResponse

  return {
    refs: {
      map: map.mapRef,
      background: map.backgroundRef,
      starElements: map.starElementsRef,
      rewardBack,
    },
    state: {
      isListView: view === 'list',
      rewards: galaxy.rewards,
      stars: starPositions,
      selectedReward,
      rewardDescription: selectedReward?.description?.trim(),
      isRewardActive: rewardSelection.selection.phase !== 'idle',
      canClaimReward: Boolean(selectedReward && profile.balance >= selectedReward.price),
      balance: profile.balance,
      isRewardVisible:
        rewardSelection.selection.phase === 'open' || rewardSelection.selection.phase === 'closing',
      isRewardOpen: rewardSelection.selection.phase === 'open',
      isClosingReward: rewardSelection.selection.phase === 'closing',
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
      handleCloseReward: rewardSelection.handleClose,
      handleRewardAnimationEnd: rewardSelection.handleRewardAnimationEnd,
    },
  }
}
