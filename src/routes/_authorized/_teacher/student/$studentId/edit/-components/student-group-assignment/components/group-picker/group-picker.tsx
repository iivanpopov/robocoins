import { useTranslate } from '@kanjou/react'
import { useState } from 'react'

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, Input, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import type { GroupCardData } from '#/routes/_authorized/-components/group-card'
import { GroupCard } from '#/routes/_authorized/-components/group-card'

import type { GroupOptions, GroupSelection } from '../../types'

import styles from './group-picker.module.css'

export interface GroupPickerProps {
  mode: GroupSelection['kind']
  options: GroupOptions
  onClose: () => void
  onRetry: () => void
  onSelect: (group: GroupCardData) => void
}

export function GroupPicker(props: GroupPickerProps) {
  const t = useTranslate()

  const [searchQuery, setSearchQuery] = useState('')

  const query = searchQuery.trim().toLowerCase()
  const filteredGroups = props.options.groups.filter(
    (group) =>
      !query ||
      group.name.toLowerCase().includes(query) ||
      group.courseName.toLowerCase().includes(query),
  )

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) props.onClose()
  }

  return (
    <Drawer open onOpenChange={handleOpenChange} showSwipeHandle>
      <DrawerContent>
        <div className={styles.sheet}>
          <DrawerHeader>
            <DrawerTitle className={styles['sheet-title']}>
              {t(`student.edit.groups.${props.mode}-picker-title`)}
            </DrawerTitle>
          </DrawerHeader>
          <Input
            value={searchQuery}
            placeholder={t('field.group-search.placeholder')}
            autoComplete="off"
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          {props.options.isPending && <Loader className={styles.loader} />}
          {props.options.isError && (
            <InlineError onRetry={props.onRetry} isRetrying={props.options.isRetrying}>
              {t('group.error')}
            </InlineError>
          )}
          {!props.options.isPending && !props.options.isError && !props.options.groups.length && (
            <p className={styles.empty}>{t('student.edit.groups.target-empty')}</p>
          )}
          {!props.options.isPending &&
            !props.options.isError &&
            !!props.options.groups.length &&
            !filteredGroups.length && <p className={styles.empty}>{t('student.empty')}</p>}
          <div className={styles.options}>
            {filteredGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                render={<button type="button" onClick={() => props.onSelect(group)} />}
              />
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
