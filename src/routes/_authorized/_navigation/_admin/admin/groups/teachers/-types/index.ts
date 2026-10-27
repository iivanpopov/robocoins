export type GroupTeacherBulkStatus = 'pending' | 'success' | 'error' | 'unknown'

export interface GroupTeacherBulkResult {
  groupId: number
  groupName: string
  courseName: string
  status: GroupTeacherBulkStatus
  statusCode: number | null
}
