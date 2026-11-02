import { getGroupLessonWindow } from './get-group-lesson-window'
import type { parseGroupSchedule } from './parse-group-schedule'

export function isGroupScheduleActive(
  schedule: ReturnType<typeof parseGroupSchedule>,
  now: Date | null,
) {
  return !!getGroupLessonWindow(schedule, now)
}
