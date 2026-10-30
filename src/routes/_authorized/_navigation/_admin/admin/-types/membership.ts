export type MembershipOperationMode = 'add' | 'transfer' | 'remove'

export type MembershipAdditionStatus =
  | 'pending'
  | 'added'
  | 'skipped'
  | 'failed'
  | 'unknown'
  | 'notRequired'

export type MembershipRemovalStatus =
  | 'pending'
  | 'waiting'
  | 'removed'
  | 'failed'
  | 'unknown'
  | 'notRequired'

export interface MembershipStudentCandidate {
  id: number
  name: string
  avatar?: string | null
  groupIds: number[]
}

export interface MembershipOperationResult {
  studentId: number
  studentName: string
  addition: MembershipAdditionStatus
  removal: MembershipRemovalStatus
  additionErrorStatus: number | null
  removalErrorStatus: number | null
}

export interface MembershipOperationInput {
  mode: MembershipOperationMode
  sourceGroupId: number | null
  targetGroupId: number | null
  students: MembershipStudentCandidate[]
}
