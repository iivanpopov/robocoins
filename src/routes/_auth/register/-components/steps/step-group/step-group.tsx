import { useTranslate } from '@kanjou/react'

import {
  Button,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Loader,
  Typography,
} from '#/components/ui'
import { parseGroupSchedule } from '#/routes/-utils'

import { CategoryChoice } from '../../category-choice'
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
        <Typography variant="caption">{t('step.group.description')}</Typography>
      </DrawerHeader>
      <div className={styles.groups}>
        {queries.courses.isPending && <Loader />}
        {queries.courses.isSuccess && !state.course?.groups?.length && (
          <Typography variant="caption">{t('step.selection.empty')}</Typography>
        )}
        {state.course?.groups?.map((group) => {
          const schedule = parseGroupSchedule(group.name)
          return (
            <CategoryChoice
              key={group.id}
              className={styles.group}
              aria-pressed={state.selectedGroupId === group.id}
              onClick={() => functions.handleSelectGroup(group.id)}
            >
              <span className={styles.schedule}>
                {schedule.weekday && (
                  <span className={styles.weekday}>{t(`weekday.${schedule.weekday}`)}</span>
                )}
                <span className={styles.time}>{schedule.time}</span>
              </span>
            </CategoryChoice>
          )
        })}
      </div>
      {!!state.course?.groups?.length && (
        <DrawerFooter className={styles.footer}>
          <Button type="submit" size="lg" disabled={!state.canSubmit}>
            {t('action.next.title')}
          </Button>
        </DrawerFooter>
      )}
    </form>
  )
}
