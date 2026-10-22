import { useMemo, useRef } from 'react'

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

  function handleOpenReward(star: (typeof starPositions)[number], event: React.MouseEvent) {
    if (rewardSelection.handleIsBlocked()) return
    if (event.detail !== 0 && !draggableMap.handleCanSelect()) return
    draggableMap.handleStop()
    rewardSelection.handleOpen(star.reward, map.handleGetPosition(star))
  }

  const selectedReward = rewardSelection.selection.reward
  const profile = context.user as StudentProfileResponse

  return {
    refs: {
      map: map.mapRef,
      background: map.backgroundRef,
      starElements: map.starElementsRef,
    },
    state: {
      stars: starPositions,
      selectedReward,
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
      handleCloseReward: rewardSelection.handleClose,
      handleRewardAnimationEnd: rewardSelection.handleRewardAnimationEnd,
    },
  }
}
