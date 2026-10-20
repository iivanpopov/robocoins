import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import { Drawer, DrawerContent, HeroButton, Loader, Typography } from '#/components/ui'
import { CategoryIcon } from '#/routes/-components'
import { parseGroupSchedule } from '#/routes/-utils'
import { AuthLayout } from '#/routes/_auth/-components'

import { RegisterBackCaption } from '../../register-back-caption'
import { StepGroup } from '../step-group'
import { useStepCourse } from './-hooks'

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
            <button
              type="button"
              key={course.id}
              data-category={course.category}
              className={cn('category-theme', 'category-choice', styles.course)}
              aria-pressed={state.selectedCourseId === course.id}
              onClick={() => functions.handleSelectCourse(course.id)}
            >
              <div className="category-tile">
                <CategoryIcon category={course.category} />
              </div>
              <div>
                <Typography variant="subtitle">{course.name}</Typography>
                {state.selectedCourseId === course.id && state.selectedGroup && (
                  <Typography variant="caption">
                    {schedule.weekday && t(`weekday.${schedule.weekday}`)}
                    <br />
                    {schedule.time}
                  </Typography>
                )}
              </div>
            </button>
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
