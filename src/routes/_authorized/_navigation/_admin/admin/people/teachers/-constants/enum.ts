export const TeacherAccessAction = {
  Block: 'block',
  Unblock: 'unblock',
  ResetCode: 'reset-code',
  RevokeSessions: 'revoke-sessions',
} as const

export type TeacherAccessAction = (typeof TeacherAccessAction)[keyof typeof TeacherAccessAction]
