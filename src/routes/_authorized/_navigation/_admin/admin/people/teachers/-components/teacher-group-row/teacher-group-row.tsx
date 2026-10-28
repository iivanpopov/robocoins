import type { TeacherGroupProfile } from '#/api/types'
import { LearningCard } from '#/routes/-components'

export interface TeacherGroupRowProps {
  group: TeacherGroupProfile
  className?: string
}

export function TeacherGroupRow({ group, className }: TeacherGroupRowProps) {
  return (
    <LearningCard.Root className={className} render={<article />}>
      <LearningCard.Row>
        <LearningCard.Icon>
          <span className="i-ph:users-three" />
        </LearningCard.Icon>
        <LearningCard.Content>
          <LearningCard.Title>{group.name}</LearningCard.Title>
          <LearningCard.Description>{group.course_name}</LearningCard.Description>
        </LearningCard.Content>
      </LearningCard.Row>
    </LearningCard.Root>
  )
}
