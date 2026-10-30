import { courseCategory } from '#/api/types'

export const CourseCategoryFilter = {
  All: 'all',
  ...courseCategory,
} as const

export type CourseCategoryFilter = (typeof CourseCategoryFilter)[keyof typeof CourseCategoryFilter]

export const COURSE_CATEGORIES = Object.values(courseCategory)
