import type { QueryKey } from '@tanstack/react-query'

export const DEFAULT_STALE_TIME = 60_000
export const CATALOG_STALE_TIME = 10 * 60_000
export const LIVE_STALE_TIME = 30_000
export const CACHE_GC_TIME = 30 * 60_000

export const CATALOG_QUERY_KEYS: QueryKey[] = [
  [{ url: '/shop' }],
  [{ url: '/shop/:reward_id' }],
  [{ url: '/course' }],
  [{ url: '/course/category/:category' }],
  [{ url: '/group/course/:course_id' }],
  [{ url: '/group/name/:name' }],
  [{ url: '/teacher/:teacher_id' }],
  [{ url: '/teacher/course/:course_id/groups' }],
  [{ url: '/users' }],
  [{ url: '/users/:user_id' }],
  [{ url: '/ext/balance/balanceChangeReasons' }],
  [{ url: '/auth/me/credentials' }],
  ['student-reward-categories'],
  ['session'],
]

export const LIVE_QUERY_KEYS: QueryKey[] = [
  [{ url: '/student/:student_id' }],
  [{ url: '/student/:student_id/balance' }],
  [{ url: '/student/:student_id/reward-progress' }],
  [{ url: '/student/:student_id/transactions' }],
  [{ url: '/group/id/:group_id' }],
  [{ url: '/teacher/groups' }],
]
