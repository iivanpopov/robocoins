import { useTranslate } from '@kanjou/react'

export interface TeacherCompositionLabelProps {
  teacherIds: number[]
  teacherNames: Array<string | null>
}

export function TeacherCompositionLabel({
  teacherIds,
  teacherNames,
}: TeacherCompositionLabelProps) {
  const t = useTranslate()

  if (!teacherIds.length) return <>{t('admin.groups.teachers.no-teachers')}</>

  const labels = teacherIds.map(
    (userId, index) => teacherNames[index] ?? t('admin.groups.teacher-unknown', { id: userId }),
  )

  return <>{labels.join(', ')}</>
}
