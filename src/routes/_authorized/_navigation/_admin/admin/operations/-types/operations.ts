import type { BalanceChangeReasonsKey } from '#/api/types'
import type { ApiErrorKind } from '#/routes/_authorized/_navigation/_admin/admin/-utils'

import type { OperationDirection } from '../-constants'

export type StudentOperationStatus = 'pending' | 'success' | 'failure' | 'unknown'

export type HistoryCheckStatus = 'idle' | 'checking' | 'checked' | 'error'

export interface OperationBatchSnapshot {
  direction: OperationDirection
  reasons: BalanceChangeReasonsKey[]
}

export interface StudentOperationResult {
  studentId: number
  studentName: string
  status: StudentOperationStatus
  balance: number | null
  transactionAmount: number | null
  errorKind: ApiErrorKind | null
  errorKey: string | null
  isRetryable: boolean
  historyCheck: HistoryCheckStatus
  historyAcknowledged: boolean
}

export interface PendingOperation extends OperationBatchSnapshot {
  kind: 'initial' | 'retry'
  studentIds: number[]
}

export interface LocalCorrectionDraft {
  studentName: string
  amount: number
  explanation: string
}

export interface LocalTariffDraft {
  reasonCount: number
}
