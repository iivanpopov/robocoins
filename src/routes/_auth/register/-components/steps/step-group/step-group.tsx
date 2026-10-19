import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import {
  Button,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Loader,
  Typography,
} from '#/components/ui'

import { GroupSchedule } from '../../group-schedule'
import { useStepGroup } from './-hooks'

import styles from './step-group.module.css'

export function StepGroup() {
  const { state, queries, functions } = useStepGroup()

  const t = useTranslate()

  return (
    <form className={styles.form} onSubmit={functions.handleSubmit}>
      <DrawerHeader className={styles.header}>
        <DrawerTitle className={styles.title}>{t('step.group.title')}</DrawerTitle>
        <DrawerDescription className={styles.description}>{state.course?.name}</DrawerDescription>
      </DrawerHeader>
      <div className={styles.groups}>
        {queries.courses.isPending && <Loader />}
        {queries.courses.isSuccess && !state.course?.groups?.length && (
          <Typography variant="caption">{t('step.selection.empty')}</Typography>
        )}
        {state.course?.groups?.map((group) => (
          <button
            key={group.id}
            type="button"
            className={cn(styles.group, state.selectedGroupId === group.id && styles.selected)}
            aria-pressed={state.selectedGroupId === group.id}
            onClick={() => functions.handleSelectGroup(group.id)}
          >
            <GroupSchedule name={group.name} />
          </button>
        ))}
      </div>
      <DrawerFooter className={styles.footer}>
        <Button type="submit" size="lg" disabled={!state.canSubmit}>
          {t('action.next.title')}
        </Button>
      </DrawerFooter>
    </form>
  )
}
