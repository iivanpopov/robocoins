import { balanceChangeType } from '#/api/types'

export const OperationDirection = {
  Reward: balanceChangeType.reward,
  Punish: balanceChangeType.punish,
} as const

export type OperationDirection = (typeof OperationDirection)[keyof typeof OperationDirection]

export const OperationBatchKind = {
  Initial: 'initial',
  Retry: 'retry',
} as const

export type OperationBatchKind = (typeof OperationBatchKind)[keyof typeof OperationBatchKind]
