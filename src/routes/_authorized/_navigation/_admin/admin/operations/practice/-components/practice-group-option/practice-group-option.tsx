import { useTranslate } from '@kanjou/react'

import { LearningCard } from '#/routes/-components'

export interface PracticeGroupOptionData {
  id: number
  name: string
  courseName: string
  studentsCount: number
}

export interface PracticeGroupOptionProps {
  group: PracticeGroupOptionData
  selected: boolean
  disabled: boolean
  onSelect: (groupId: number) => void
}

export function PracticeGroupOption({
  group,
  selected,
  disabled,
  onSelect,
}: PracticeGroupOptionProps) {
  const t = useTranslate()

  return (
    <LearningCard.Root>
      <LearningCard.Row
        render={
          <button
            type="button"
            aria-pressed={selected}
            disabled={disabled}
            onClick={() => onSelect(group.id)}
          />
        }
      >
        <LearningCard.Content>
          <LearningCard.Title>{group.courseName}</LearningCard.Title>
          <LearningCard.Description>{group.name}</LearningCard.Description>
        </LearningCard.Content>
        <LearningCard.Meta>
          <span>{t('group.students-count', { count: group.studentsCount })}</span>
          <LearningCard.Indicator kind="select" />
        </LearningCard.Meta>
      </LearningCard.Row>
    </LearningCard.Root>
  )
}
