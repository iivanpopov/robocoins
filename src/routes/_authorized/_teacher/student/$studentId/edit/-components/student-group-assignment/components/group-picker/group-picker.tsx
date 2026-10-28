import { useTranslate } from '@kanjou/react'
import { useState } from 'react'

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, Input, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import type { GroupCardData } from '#/routes/_authorized/-components/group-card'
import { GroupCard } from '#/routes/_authorized/-components/group-card'

import styles from './group-picker.module.css'

export interface GroupPickerProps {
  open: boolean
  title: string
  groups: GroupCardData[]
  emptyLabel: string
  isPending: boolean
  isError: boolean
  isRetrying: boolean
  onOpenChange: (isOpen: boolean) => void
  onRetry: () => void
  onSelect: (groupId: number) => void
}

export function GroupPicker(props: GroupPickerProps) {
  const t = useTranslate()

  const [searchQuery, setSearchQuery] = useState('')

  const query = searchQuery.trim().toLowerCase()
  const filteredGroups = props.groups.filter(
    (group) =>
      !query ||
      group.name.toLowerCase().includes(query) ||
      group.courseName.toLowerCase().includes(query),
  )

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) setSearchQuery('')
    props.onOpenChange(isOpen)
  }

  return (
    <Drawer open={props.open} onOpenChange={handleOpenChange} showSwipeHandle>
      <DrawerContent>
        <div className={styles.sheet}>
          <DrawerHeader>
            <DrawerTitle className={styles['sheet-title']}>{props.title}</DrawerTitle>
          </DrawerHeader>
          <Input
            value={searchQuery}
            placeholder={t('field.group-search.placeholder')}
            autoComplete="off"
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          {props.isPending && <Loader className={styles.loader} />}
          {props.isError && (
            <InlineError onRetry={props.onRetry} isRetrying={props.isRetrying}>
              {t('group.error')}
            </InlineError>
          )}
          {!props.isPending && !props.isError && !props.groups.length && (
            <p className={styles.empty}>{props.emptyLabel}</p>
          )}
          {!props.isPending &&
            !props.isError &&
            !!props.groups.length &&
            !filteredGroups.length && <p className={styles.empty}>{t('student.empty')}</p>}
          <div className={styles.options}>
            {filteredGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                render={<button type="button" onClick={() => props.onSelect(group.id)} />}
              />
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
