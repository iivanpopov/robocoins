import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import { Drawer, DrawerContent, HeroButton, Loader, Typography } from '#/components/ui'
import { AuthLayout } from '#/routes/_auth/-components'

import { CategoryIcon } from '../../category-icon'
import { GroupSchedule } from '../../group-schedule'
import { RegisterBackCaption } from '../../register-back-caption'
import { StepGroup } from '../step-group'
import { useStepCourse } from './-hooks'

import styles from './step-course.module.css'

export function StepCourse() {
  const { state, queries, functions } = useStepCourse()

  const t = useTranslate()

  return (
    <AuthLayout.Root>
      <AuthLayout.Top>
        <Typography variant="title">{t('step.course.title')}</Typography>
        {state.total > 1 && (
          <>
            <Typography variant="subtitle">
              {t('course.category', { category: state.category ?? '' })}
            </Typography>
            <Typography variant="caption">
              {t('step.direction.progress', { current: state.index + 1, total: state.total })}
            </Typography>
          </>
        )}
      </AuthLayout.Top>
      <AuthLayout.Bottom style={{ marginTop: 0 }}>
        <div className={styles.courses}>
          {queries.courses.isPending && <Loader />}
          {queries.courses.isSuccess && !state.courses.length && (
            <Typography variant="caption">{t('step.selection.empty')}</Typography>
          )}
          {state.courses.map((course) => (
            <button
              type="button"
              key={course.id}
              className={cn(styles.course, state.selectedCourseId === course.id && styles.selected)}
              aria-pressed={state.selectedCourseId === course.id}
              onClick={() => functions.handleSelectCourse(course.id)}
            >
              <CategoryIcon category={course.category} className={styles['category-icon']} />
              <div>
                <Typography variant="subtitle">{course.name}</Typography>
                {state.selectedCourseId === course.id && state.selectedGroup && (
                  <Typography variant="caption" className="whitespace-pre-line">
                    <GroupSchedule name={state.selectedGroup.name} />
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
        <DrawerContent>{state.isDrawerOpen && <StepGroup />}</DrawerContent>
      </Drawer>
    </AuthLayout.Root>
  )
}
