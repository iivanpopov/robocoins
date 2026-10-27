export type StreakErrorKey =
  | 'admin.streak.error.action'
  | 'admin.streak.error.forbidden'
  | 'admin.streak.error.load'
  | 'admin.streak.error.not-found'
  | 'admin.streak.error.unauthorized'
  | 'admin.streak.error.validation'

export type StreakActionResult = 'started' | 'ended' | 'updated'
