import { courseCategory } from '#/api/types'

export const GroupFilter = {
  All: 'all',
  ...courseCategory,
} as const

export type GroupFilter = (typeof GroupFilter)[keyof typeof GroupFilter]
