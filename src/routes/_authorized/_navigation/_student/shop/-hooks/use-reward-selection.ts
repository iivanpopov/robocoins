import { useEffect, useRef, useState } from 'react'

import type { RewardResponse } from '#/api/types/RewardResponse'
import { prefersReducedMotion } from '#/utils/motion'

type RewardState =
  | { phase: 'idle'; reward: null }
  | { phase: 'approaching' | 'open' | 'closing'; reward: RewardResponse }

type AnimateCamera = (
  target: { x: number; y: number; zoom: number },
  duration: number,
  onComplete?: () => void,
) => void

export function useRewardSelection(onAnimate: AnimateCamera) {
  const phaseRef = useRef<RewardState['phase']>('idle')
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [selection, setSelection] = useState<RewardState>({ phase: 'idle', reward: null })

  useEffect(
    () => () => {
      clearTimeout(closeTimeoutRef.current)
    },
    [],
  )

  function handleOpen(reward: RewardResponse, position: { x: number; y: number }) {
    if (phaseRef.current !== 'idle') return
    phaseRef.current = 'approaching'
    setSelection({ phase: 'approaching', reward })
    onAnimate({ x: (50 - position.x) * 4, y: (50 - position.y) * 4, zoom: 4 }, 500, () => {
      phaseRef.current = 'open'
      setSelection({ phase: 'open', reward })
    })
  }

  function handleClose() {
    if (phaseRef.current !== 'open' || !selection.reward) return
    phaseRef.current = 'closing'
    setSelection({ phase: 'closing', reward: selection.reward })
    function handleResetCamera() {
      onAnimate({ x: 0, y: 0, zoom: 1 }, 380, () => {
        phaseRef.current = 'idle'
        setSelection({ phase: 'idle', reward: null })
      })
    }
    if (prefersReducedMotion()) handleResetCamera()
    else closeTimeoutRef.current = setTimeout(handleResetCamera, 100)
  }

  function handleIsBlocked() {
    return phaseRef.current !== 'idle'
  }

  return { selection, handleOpen, handleClose, handleIsBlocked }
}
