import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import { HeroButton, Loader, Typography } from '#/components/ui'
import { parseGroupSchedule } from '#/routes/-utils'
import { getAvatarUrl } from '#/routes/-utils/get-avatar-url'
import { AuthLayout } from '#/routes/_auth/-components'

import { RegisterStep } from '../../../-constants'
import { RegisterBackCaption } from '../../register-back-caption'
import { useStepView } from './hooks'

import styles from './step-view.module.css'

export function StepView() {
  const { state, queries, mutations, functions } = useStepView()

  const t = useTranslate()

  return (
    <AuthLayout.Root>
      <AuthLayout.Top>
        <Typography variant="title">{t('step.view.title')}</Typography>
        <div className="flex items-center gap-3 mt-4">
          <img src={getAvatarUrl(state.avatar)} draggable={false} className={styles.avatar} />
          <Typography variant="accent">{state.name}</Typography>
        </div>

        <div className={styles.groups}>
          {queries.courses.isPending && <Loader />}
          {state.groups.map((group) => {
            const schedule = parseGroupSchedule(group.name)
            return (
              <div key={group.id} className={styles.card}>
                <Typography variant="subtitle">{group.courseName}</Typography>
                <div className={styles.schedule}>
                  <span aria-hidden="true" className={cn('i-ph:clock', styles.clock)} />
                  <span className={styles.label}>
                    {schedule.weekday && (
                      <span className={styles.weekday}>{t(`weekday.${schedule.weekday}`)}</span>
                    )}
                    <span className={styles.time}>{schedule.time}</span>
                  </span>
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
