import * as v from 'valibot'

export const PracticeSearchSchema = v.object({
  groupId: v.optional(v.pipe(v.number(), v.safeInteger(), v.minValue(1))),
})
