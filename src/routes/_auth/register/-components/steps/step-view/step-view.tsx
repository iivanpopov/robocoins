import { useTranslate } from '@kanjou/react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  HeroButton,
  Loader,
  Typography,
} from '#/components/ui'
import { LearningCard } from '#/routes/-components'
import { getAvatarUrl, getInitial, parseGroupSchedule } from '#/routes/-utils'
import { AuthLayout } from '#/routes/_auth/-components'

import { RegisterStep } from '../../../-constants'
import { RegisterBackCaption } from '../../register-back-caption'
import { useStepView } from './-hooks'

import styles from './step-view.module.css'

export function StepView() {
  const { state, queries, mutations, functions } = useStepView()

  const t = useTranslate()

  return (
    <AuthLayout.Root>
      <AuthLayout.Top>
        <Typography variant="title">{t('step.view.title')}</Typography>
        <Typography variant="caption">{t('step.view.description')}</Typography>
        <div className="flex items-center gap-3 mt-4">
          <Avatar size="lg" className={styles.avatar}>
            <AvatarImage src={getAvatarUrl(state.avatar)} alt={state.name} />
            <AvatarFallback role="img" aria-label={state.name}>
              {getInitial(state.name)}
            </AvatarFallback>
          </Avatar>
          <Typography variant="accent">{state.name}</Typography>
        </div>

        <div className={styles.groups}>
          {queries.courses.isPending && <Loader />}
          {state.groups.map((group) => {
            const schedule = parseGroupSchedule(group.name)
            return (
              <LearningCard.Root key={group.id}>
                <LearningCard.Row>
                  <LearningCard.Icon category={group.category} />
                  <LearningCard.Content>
                    <LearningCard.Title>{group.courseName}</LearningCard.Title>
                    <LearningCard.Description>
                      {schedule.weekday && <>{t(`weekday.${schedule.weekday}`)}, </>}
                      {schedule.time}
                    </LearningCard.Description>
                  </LearningCard.Content>
                </LearningCard.Row>
              </LearningCard.Root>
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
