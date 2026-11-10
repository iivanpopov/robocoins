import type { parseGroupSchedule } from '#/routes/-utils'

import { getGroupLessonWindow } from './get-group-lesson-window'

export function isGroupScheduleActive(
  schedule: ReturnType<typeof parseGroupSchedule>,
  now: Date | null,
) {
  return !!getGroupLessonWindow(schedule, now)
}
