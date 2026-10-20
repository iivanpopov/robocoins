import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  HeroButton,
  Loader,
  Typography,
} from '#/components/ui'
import { CategoryIcon } from '#/routes/-components'
import { getAvatarUrl, getInitial, parseGroupSchedule } from '#/routes/-utils'
import { AuthLayout } from '#/routes/_auth/-components'

import { RegisterStep } from '../../../-constants'
import { RegisterBackCaption } from '../../register-back-caption'
import { useCourseCardSizes, useStepView } from './-hooks'

import styles from './step-view.module.css'

export function StepView() {
  const { state, queries, mutations, functions } = useStepView()
  const groupsReference = useCourseCardSizes(state.groups)

  const t = useTranslate()

  return (
    <AuthLayout.Root>
      <AuthLayout.Top>
        <Typography variant="title">{t('step.view.title')}</Typography>
        <div className="flex items-center gap-3 mt-4">
          <Avatar size="lg" className={styles.avatar}>
            <AvatarImage src={getAvatarUrl(state.avatar)} alt={state.name} />
            <AvatarFallback role="img" aria-label={state.name}>
              {getInitial(state.name)}
            </AvatarFallback>
          </Avatar>
          <Typography variant="accent">{state.name}</Typography>
        </div>

        <div ref={groupsReference} className={styles.groups}>
          {queries.courses.isPending && <Loader />}
          {state.groups.map((group) => {
            const schedule = parseGroupSchedule(group.name)
            return (
              <div
                key={group.id}
                className={cn('category-theme', styles.card)}
                data-category={group.category}
              >
                <div className={styles['category-icon']}>
                  <CategoryIcon category={group.category} />
                </div>
                <div className={styles.details} data-course-details>
                  <Typography variant="subtitle">{group.courseName}</Typography>
                  <div className={styles.schedule}>
                    {schedule.weekday && (
                      <span className={styles.weekday}>{t(`weekday.${schedule.weekday}`)}</span>
                    )}
                    <span className={styles.time}>{schedule.time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </AuthLayout.Top>
      <AuthLayout.Bottom style={{ marginTop: 0 }}>
        <HeroButton
          onClick={functions.handleFinish}
          disabled={!queries.courses.isSuccess || mutations.register.isPending}
        >
          {t('action.finish.title')}
        </HeroButton>
        <RegisterBackCaption
          search={{ step: RegisterStep.Avatar }}
          viewTransition={{ types: ['slide-backward', 'register-avatar'] }}
        />
      </AuthLayout.Bottom>
    </AuthLayout.Root>
  )
}
