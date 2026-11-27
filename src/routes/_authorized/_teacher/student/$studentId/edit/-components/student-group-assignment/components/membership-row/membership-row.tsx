import { useTranslate } from '@kanjou/react'

import { Button } from '#/components/ui'
import { GroupCard, type GroupCardData } from '#/routes/_authorized/-components/group-card'

import styles from './membership-row.module.css'

interface MembershipRowProps {
  group: GroupCardData
  disabled: boolean
  onTransfer: (group: GroupCardData) => void
  onRemove: (group: GroupCardData) => void
}

export function MembershipRow(props: MembershipRowProps) {
  const t = useTranslate()

  return (
    <GroupCard
      group={props.group}
      actions={
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => props.onTransfer(props.group)}
            disabled={props.disabled}
          >
            <span aria-hidden="true" className="i-ph:arrows-left-right" />
            {t('student.edit.groups.transfer-action')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={styles.remove}
            onClick={() => props.onRemove(props.group)}
            disabled={props.disabled}
          >
            <span aria-hidden="true" className="i-ph:sign-out" />
            {t('student.edit.groups.remove-action')}
          </Button>
        </>
      }
    />
  )
}
