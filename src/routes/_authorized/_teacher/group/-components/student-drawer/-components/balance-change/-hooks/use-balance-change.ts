import { useTranslate } from '@kanjou/react'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

import { useChangeStudentBalanceStudentStudentIdBalanceTransactionsPost } from '#/api/hooks/useChangeStudentBalanceStudentStudentIdBalanceTransactionsPost'
import { useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet } from '#/api/hooks/useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet'
import { getGroupByIdGroupIdGroupIdGetQueryKey } from '#/api/hooks/useGetGroupByIdGroupIdGroupIdGet'
import { getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import { BalanceChangeReasonsKey } from '#/api/types'
import { toast } from '#/components/ui'
import { AwardDirection } from '#/routes/_authorized/_teacher/group/-constants'

import { useDirectionSwipe } from './use-direction-swipe'

const REASON_DEBOUNCE_IN_MILLISECONDS = 800

interface UseBalanceChangeProps {
  studentId: number
  groupId: number
  enabled: boolean
  onSuccess: () => void
}

export function useBalanceChange(props: UseBalanceChangeProps) {
  const t = useTranslate()
  const queryClient = useQueryClient()

  const [direction, setDirection] = useState<AwardDirection>(AwardDirection.Reward)
  const [selectedReasons, setSelectedReasons] = useState<BalanceChangeReasonsKey[]>([])
  const timeoutReference = useRef<ReturnType<typeof setTimeout>>(undefined)
  const activeReference = useRef(false)

  const reasonsQuery = useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet()
  const createAwardMutation = useChangeStudentBalanceStudentStudentIdBalanceTransactionsPost({
    mutation: {
      onError: () => {
        toast.add({ title: t('award.error'), type: 'error' })
      },
      onSuccess: async (_data, variables) => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: getGroupByIdGroupIdGroupIdGetQueryKey({
              path: { group_id: props.groupId },
            }),
          }),
          queryClient.invalidateQueries({
            queryKey: getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey({
              path: { student_id: variables.path.student_id },
            }),
          }),
        ])
        if (activeReference.current) props.onSuccess()
      },
    },
  })

  const swipeRef = useDirectionSwipe({
    direction,
    enabled: props.enabled && !createAwardMutation.isPending,
    onDirectionChange: handleDirectionSelect,
  })

  useEffect(() => {
    activeReference.current = props.enabled

    return () => {
      activeReference.current = false
      clearTimeout(timeoutReference.current)
    }
  }, [props.enabled, props.studentId])

  function handleDirectionSelect(selectedDirection: AwardDirection) {
    if (!props.enabled || createAwardMutation.isPending) return

    clearTimeout(timeoutReference.current)
    setSelectedReasons([])
    setDirection(selectedDirection)
  }

  function handleRetryReasons() {
    void reasonsQuery.refetch()
  }

  function handleReasonClick(reason: BalanceChangeReasonsKey) {
    if (!props.enabled || createAwardMutation.isPending) return

    clearTimeout(timeoutReference.current)
    const nextReasons = selectedReasons.filter((selectedReason) => selectedReason !== reason)
    if (!selectedReasons.includes(reason)) nextReasons.push(reason)
    setSelectedReasons(nextReasons)

    if (!nextReasons.length) return

    timeoutReference.current = setTimeout(() => {
      createAwardMutation.mutate({
        path: { student_id: props.studentId },
        body: { reason: nextReasons },
      })
      setSelectedReasons([])
    }, REASON_DEBOUNCE_IN_MILLISECONDS)
  }

  const reasons = (reasonsQuery.data?.reasons ?? [])
    .filter(
      (reason) =>
        (direction === AwardDirection.Reward && reason.type === 'reward') ||
        (direction === AwardDirection.Punish && reason.type === 'punish'),
    )
    .map((reason) => reason.reason)

  const isPlus = direction === AwardDirection.Reward
  const isMinus = direction === AwardDirection.Punish

  let reasonTone: 'error' | undefined
  if (isMinus) reasonTone = 'error'

  return {
    refs: { swipe: swipeRef },
    state: { direction, selectedReasons, reasons, isPlus, isMinus, reasonTone },
    queries: { reasonsQuery },
    mutations: { createAwardMutation },
    functions: { handleDirectionSelect, handleReasonClick, handleRetryReasons },
  }
}
