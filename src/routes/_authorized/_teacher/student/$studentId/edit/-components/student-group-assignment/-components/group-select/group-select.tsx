import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import { useState } from 'react'

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, Input, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import type { GroupCardData } from '#/routes/_authorized/-components/group-card'
import { GroupCard } from '#/routes/_authorized/-components/group-card'

import styles from './group-select.module.css'

export interface GroupSelectProps {
  label: string
  groups: GroupCardData[]
  value: number | null
  placeholder: string
  emptyLabel: string
  isPending: boolean
  isError: boolean
  isRetrying: boolean
  disabled: boolean
  isNotice: boolean
  notice: string
  onRetry: () => void
  onSelect: (groupId: number) => void
}

export function GroupSelect(props: GroupSelectProps) {
  const t = useTranslate()

  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const valueGroup = props.groups.find((group) => group.id === props.value)
  const query = searchQuery.trim().toLowerCase()
  const filteredGroups = props.groups.filter(
    (group) =>
      !query ||
      group.name.toLowerCase().includes(query) ||
      group.courseName.toLowerCase().includes(query),
  )

  return (
    <>
      <span className={styles.label}>{props.label}</span>
      <button
        type="button"
        className={cn(styles.trigger, props.disabled && styles['trigger-disabled'])}
        onClick={() => setIsOpen(true)}
        disabled={props.disabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {valueGroup && <GroupCard group={valueGroup} className={styles['trigger-card']} />}
        {!valueGroup && <span className={styles.placeholder}>{props.placeholder}</span>}
        <span aria-hidden="true" className={cn('i-ph:caret-down-bold', styles.icon)} />
      </button>
      {props.isNotice && <p className={styles.notice}>{props.notice}</p>}
      <Drawer open={isOpen} onOpenChange={setIsOpen} showSwipeHandle>
        <DrawerContent>
          <div className={styles.sheet}>
            <DrawerHeader>
              <DrawerTitle className={styles['sheet-title']}>{props.label}</DrawerTitle>
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
                <button
                  key={group.id}
                  type="button"
                  role="option"
                  aria-selected={group.id === props.value}
                  className={styles.option}
                  onClick={() => {
                    props.onSelect(group.id)
                    setIsOpen(false)
                  }}
                >
                  <GroupCard group={group} className={styles['option-card']} />
                </button>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
