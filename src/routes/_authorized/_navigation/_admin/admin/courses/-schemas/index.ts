import * as v from 'valibot'

import { courseCategory } from '#/api/types'

import { COURSE_NAME_MAX_LENGTH } from '../-constants'

export const CourseIdParamsSchema = v.object({
  courseId: v.pipe(
    v.string(),
    v.regex(/^\d+$/),
    v.transform(Number),
    v.safeInteger(),
    v.minValue(1),
  ),
})

export const CourseNameSchema = v.pipe(
  v.string(),
  v.trim(),
  v.minLength(1),
  v.maxLength(COURSE_NAME_MAX_LENGTH),
)

export const CreateCourseStateSchema = v.object({
  name: CourseNameSchema,
  category: v.enum(courseCategory),
})

export const RenameCourseStateSchema = v.object({
  name: CourseNameSchema,
})

export const ChangeCourseCategoryStateSchema = v.object({
  category: v.enum(courseCategory),
})

export const DeleteCourseStateSchema = v.object({
  confirmation: v.pipe(v.string(), v.trim(), v.minLength(1)),
})
