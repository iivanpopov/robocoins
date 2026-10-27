import * as v from 'valibot'

import { TEACHER_ASSIGNMENT_MAX } from '../../-constants'

export const GroupIdParamsSchema = v.object({
  groupId: v.pipe(
    v.string(),
    v.regex(/^\d+$/),
    v.transform(Number),
    v.safeInteger(),
    v.minValue(1),
  ),
})

export const GroupNameSchema = v.pipe(
  v.string(),
  v.trim(),
  v.regex(/^(ПН|ВТ|СР|ЧТ|ПТ|СБ|НД) ([01]\d|2[0-3]):[0-5]\d$/),
)

export const TeacherIdsSchema = v.pipe(
  v.array(v.pipe(v.number(), v.safeInteger(), v.minValue(1))),
  v.maxLength(TEACHER_ASSIGNMENT_MAX),
  v.check((teacherIds) => new Set(teacherIds).size === teacherIds.length),
)

export const TeacherAssignmentSearchSchema = v.object({
  teacherId: v.optional(v.pipe(v.number(), v.safeInteger(), v.minValue(1))),
})

export const CreateGroupStateSchema = v.object({
  name: GroupNameSchema,
  courseId: v.pipe(v.string(), v.regex(/^\d+$/), v.transform(Number), v.minValue(1)),
  teacherIds: TeacherIdsSchema,
})

export const GroupTeacherAssignmentStateSchema = v.object({
  teacherIds: TeacherIdsSchema,
})

export const RenameGroupStateSchema = v.object({
  name: GroupNameSchema,
})

export const ChangeGroupCourseStateSchema = v.object({
  courseId: v.pipe(v.string(), v.regex(/^\d+$/), v.transform(Number), v.minValue(1)),
})

export const DeleteGroupStateSchema = v.object({
  confirmation: v.pipe(v.string(), v.trim(), v.minLength(1)),
})
