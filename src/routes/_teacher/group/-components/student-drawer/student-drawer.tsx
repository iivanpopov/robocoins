import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import { useEffect, useRef, useState } from 'react'

import {
  BalanceChangeReasonsKey,
  BalanceTransactionResponse,
  StudentProfileResponse,
} from '#/api/types'
import { Chip, Drawer, DrawerContent, DrawerHeader, DrawerTitle, Loader } from '#/components/ui'
import { getAvatarUrl } from '#/routes/-utils/get-avatar-url'
import { Avatar } from '#/routes/_auth/register/-constants'

import { AwardDirection } from '../../-types'

import styles from './student-drawer.module.css'

const POSITIVE_REASONS: BalanceChangeReasonsKey[] = [
  'theory',
  'practice_completed',
  'additional_task_completed',
]
const NEGATIVE_REASONS: BalanceChangeReasonsKey[] = [
  'discipline_breakdown',
  'middle_level_violation',
  'serious_violation',
]

export interface StudentDrawerProps {
  open: boolean
  student: (StudentProfileResponse & { avatar: Avatar }) | null
  awards: BalanceTransactionResponse[]
  isPending: boolean
  isError: boolean
  isHistoryPending: boolean
  isHistoryError: boolean
  onOpenChange: (open: boolean) => void
  onAward: (studentId: number, reason: BalanceChangeReasonsKey) => void
}

export function StudentDrawer(props: StudentDrawerProps) {
  const t = useTranslate()
  const [direction, setDirection] = useState<AwardDirection>(1)
  const [pendingReason, setPendingReason] = useState<BalanceChangeReasonsKey | null>(null)
  const timeoutReference = useRef<ReturnType<typeof setTimeout>>(undefined)
  const reasonDebounceInMilliseconds = 800

  useEffect(() => {
    return () => clearTimeout(timeoutReference.current)
  }, [props.open, props.student?.id])

  function cancelPendingReason() {
    clearTimeout(timeoutReference.current)
    setPendingReason(null)
  }

  function handleOpenChange(isOpen: boolean) {
    cancelPendingReason()
    setDirection(1)
    props.onOpenChange(isOpen)
  }

  function handleDirectionSelect(selectedDirection: AwardDirection) {
    cancelPendingReason()
    setDirection(selectedDirection)
  }

  function handleReasonClick(reason: BalanceChangeReasonsKey) {
    if (!props.student || props.isPending) return
    if (pendingReason === reason) {
      cancelPendingReason()
      return
    }
    clearTimeout(timeoutReference.current)
    setPendingReason(reason)
    const studentId = props.student.id
    timeoutReference.current = setTimeout(() => {
      setPendingReason(null)
      props.onAward(studentId, reason)
    }, reasonDebounceInMilliseconds)
  }

  const isPlus = direction === 1
  const isMinus = direction === -1
  const reasons = [
    ...((isPlus && POSITIVE_REASONS) || []),
    ...((isMinus && NEGATIVE_REASONS) || []),
  ]

  return (
    <Drawer open={props.open} onOpenChange={handleOpenChange} showSwipeHandle>
      <DrawerContent>
        {props.student && (
          <>
            <DrawerHeader>
              <div className={styles['student-wrap']}>
                <img
                  src={getAvatarUrl(props.student.avatar)}
                  alt={props.student.name}
                  className={styles.avatar}
                  draggable={false}
                />
                <DrawerTitle>{props.student.name}</DrawerTitle>
              </div>
            </DrawerHeader>
            <div className={styles['direction-toggle']}>
              <button
                type="button"
                disabled={props.isPending}
                className={cn(
                  styles['direction-btn'],
                  isPlus && styles['direction-btn-plus-active'],
                )}
                onClick={() => handleDirectionSelect(1)}
                aria-label={t('award.reward')}
                aria-pressed={isPlus}
                title={t('award.reward')}
              >
                {props.isPending && isPlus && <Loader />}
                {(!props.isPending || isMinus) && (
                  <span aria-hidden="true" className={cn('i-ph:star', styles['coin-icon'])} />
                )}
              </button>
              <button
                type="button"
                disabled={props.isPending}
                className={cn(
                  styles['direction-btn'],
                  isMinus && styles['direction-btn-minus-active'],
                )}
                onClick={() => handleDirectionSelect(-1)}
                aria-label={t('award.punish')}
                aria-pressed={isMinus}
                title={t('award.punish')}
              >
                {props.isPending && isMinus && <Loader />}
                {(!props.isPending || isPlus) && (
                  <span
                    aria-hidden="true"
                    className={cn('i-ph:gavel', styles['coin-icon'], styles['punish-icon'])}
                  />
                )}
              </button>
            </div>
            <div>
              <span className={styles['section-label']}>{t('award.reason.label')}</span>
              <div className={styles['reasons-list']}>
                {reasons.map((reason) => (
                  <Chip
                    key={reason}
                    size="lg"
                    tone={(isMinus && 'error') || undefined}
                    disabled={props.isPending}
                    selected={pendingReason === reason}
                    onClick={() => handleReasonClick(reason)}
                  >
                    {t(`reason.${reason}`)}
                  </Chip>
                ))}
              </div>
              {props.isError && <div role="alert">{t('award.error')}</div>}
            </div>
            <div className={styles['history-section']}>
              <div className={styles['history-header']}>
                <span className={styles['section-label']}>{t('award.history.title')}</span>
              </div>
              {props.isHistoryPending && <Loader />}
              {props.isHistoryError && <div role="alert">{t('group.error')}</div>}
              {!props.isHistoryPending && !props.isHistoryError && !props.awards.length && (
                <div className={styles['history-empty']}>{t('award.history.empty')}</div>
              )}
              <div className={styles['history-list']}>
                {props.awards.map((award) => {
                  const isAwardPlus = award.operation === 'deposit'
                  return (
                    <div key={award.id} className={styles['history-item']}>
                      <div className={styles['history-left']}>
                        <span
                          className={cn(
                            styles['history-amount'],
                            isAwardPlus && styles['history-amount-plus'],
                            !isAwardPlus && styles['history-amount-minus'],
                          )}
                        >
                          {isAwardPlus && '+'}
                          {!isAwardPlus && '−'}
                          {award.amount}
                        </span>
                        <div className={styles['history-details']}>
                          <span className={styles['history-reason']}>
                            {t.unsafe(`reason.${award.reason}`, { fallback: award.reason ?? '' })}
                          </span>
                          <span className={styles['history-time']}>
                            {new Date(award.created_at).toLocaleString('uk-UA')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
