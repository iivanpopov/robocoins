import { useTranslate } from '@kanjou/react'

import { HeroButton, Loader, Typography } from '#/components/ui'
import { getAvatarUrl } from '#/routes/-utils/get-avatar-url'
import { AuthLayout } from '#/routes/_auth/-components'

import { RegisterStep } from '../../../-constants'
import { GroupSchedule } from '../../group-schedule'
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
          <img src={getAvatarUrl(state.avatar)} draggable={false} className="w-10 h-10" />
          <Typography variant="accent">{state.name}</Typography>
        </div>

        <div className={styles.groups}>
          {queries.courses.isPending && <Loader />}
          {state.groups.map((group) => (
            <div key={group.id} className={styles.card}>
              <Typography variant="subtitle">{group.courseName}</Typography>
              <div className={styles.schedule}>
                <span
                  aria-hidden="true"
                  className="i-ph:clock text-6 text-[var(--brand)] shrink-0"
                />
                <span className={styles['schedule-label']}>
                  <GroupSchedule name={group.name} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </AuthLayout.Top>
      <AuthLayout.Bottom style={{ marginTop: 0 }}>
        <HeroButton
          onClick={functions.handleFinish}
          disabled={!queries.courses.isSuccess || mutations.register.isPending}
        >
          {t('action.finish.title')}
        </HeroButton>
        <RegisterBackCaption search={{ step: RegisterStep.Avatar }} />
      </AuthLayout.Bottom>
    </AuthLayout.Root>
  )
}
