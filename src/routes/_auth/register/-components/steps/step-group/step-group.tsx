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
import { LearningCard } from '#/routes/-components'
import { parseGroupSchedule } from '#/routes/-utils'

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
            <LearningCard.Root key={group.id} size="lg" selection="check">
              <LearningCard.Row
                render={
                  <button
                    type="button"
                    aria-pressed={state.selectedGroupId === group.id}
                    onClick={() => functions.handleSelectGroup(group.id)}
                  />
                }
              >
                <LearningCard.Content>
                  {schedule.weekday && (
                    <LearningCard.Title>{t(`weekday.${schedule.weekday}`)}</LearningCard.Title>
                  )}
                  <LearningCard.Description>{schedule.time}</LearningCard.Description>
                </LearningCard.Content>
                <LearningCard.Indicator kind="select" />
              </LearningCard.Row>
            </LearningCard.Root>
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
