import { useTranslate } from '@kanjou/react'

import { Drawer, DrawerContent, HeroButton, Loader, Typography } from '#/components/ui'
import { LearningCard } from '#/routes/-components'
import { parseGroupSchedule } from '#/routes/-utils'
import { AuthLayout } from '#/routes/_auth/-components'

import { RegisterBackCaption } from '../../register-back-caption'
import { StepGroup } from '../step-group'
import { useStepCourse } from './hooks'

import styles from './step-course.module.css'

export function StepCourse() {
  const { state, queries, functions } = useStepCourse()

  const t = useTranslate()
  const schedule = parseGroupSchedule(state.selectedGroup?.name ?? '')

  return (
    <AuthLayout.Root>
      <AuthLayout.Top>
        <Typography variant="title">{t('step.course.title')}</Typography>
        <Typography variant="caption">{t('step.course.description')}</Typography>
        {state.total > 1 && (
          <div className={styles.progress}>
            <Typography variant="subtitle">
              {t('course.category', { category: state.category ?? '' })}
            </Typography>
            <Typography variant="caption">
              {t('step.direction.progress', { current: state.index + 1, total: state.total })}
            </Typography>
          </div>
        )}
      </AuthLayout.Top>
      <AuthLayout.Bottom>
        <div className={styles.courses}>
          {queries.courses.isPending && <Loader />}
          {queries.courses.isSuccess && !state.courses.length && (
            <Typography variant="caption">{t('step.selection.empty')}</Typography>
          )}
          {state.courses.map((course) => (
            <LearningCard.Root key={course.id} size="lg" selection="check">
              <LearningCard.Row
                render={
                  <button
                    type="button"
                    aria-pressed={state.selectedCourseId === course.id}
                    onClick={() => functions.handleSelectCourse(course.id)}
                  />
                }
              >
                <LearningCard.Icon category={course.category} />
                <LearningCard.Content>
                  <LearningCard.Title>{course.name}</LearningCard.Title>
                  {state.selectedCourseId === course.id && state.selectedGroup && (
                    <LearningCard.Description>
                      {schedule.weekday && t(`weekday.${schedule.weekday}`)} {schedule.time}
                    </LearningCard.Description>
                  )}
                </LearningCard.Content>
                <LearningCard.Indicator kind="select" />
              </LearningCard.Row>
            </LearningCard.Root>
          ))}
        </div>

        <HeroButton
          type="button"
          className="mt-8"
          disabled={!state.selectedCourseId || !queries.courses.isSuccess}
          onClick={functions.handleNext}
        >
          {t('action.next.title')}
        </HeroButton>
        <RegisterBackCaption search={state.previousSearch} />
      </AuthLayout.Bottom>
      <Drawer
        open={state.isDrawerOpen}
        onOpenChange={functions.handleDrawerOpenChange}
        showSwipeHandle
      >
        <DrawerContent>
          <StepGroup />
        </DrawerContent>
      </Drawer>
    </AuthLayout.Root>
  )
}
