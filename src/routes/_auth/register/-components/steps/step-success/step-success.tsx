import { useTranslate } from '@kanjou/react'
import { Navigate } from '@tanstack/react-router'

import { HeroButton, IconButton, Typography } from '#/components/ui'

import { RegisterStep } from '../../../-constants'
import { useStepSuccess } from './-hooks'

import styles from './step-success.module.css'

export function StepSuccess() {
  const { state, mutations, functions } = useStepSuccess()
  const t = useTranslate()
  const passwordLabel = state.isRevealed ? t('field.password.hide') : t('field.password.show')

  if (!state.accessCode) {
    return <Navigate to="/register" search={{ step: RegisterStep.Name }} replace />
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div>
          <Typography variant="title">{t('step.success.title')}</Typography>
          <Typography variant="subtitle">{t('step.success.subtitle')}</Typography>
        </div>
        <div className={styles.credentials}>
          <div>
            <Typography variant="subtitle">{t('step.success.password')}</Typography>
            <Typography variant="caption">{t('step.success.description')}</Typography>
          </div>
          <div className={styles.password}>
            <span className={styles.code}>
              {state.isRevealed && state.accessCode}
              {!state.isRevealed && '••••••••'}
            </span>
            <IconButton
              type="button"
              variant="ghost"
              size="lg"
              aria-pressed={state.isRevealed}
              aria-label={passwordLabel}
              onClick={functions.handleToggleRevealed}
            >
              {state.isRevealed && <span className="i-ph:eye-slash-bold" />}
              {!state.isRevealed && <span className="i-ph:eye-bold" />}
            </IconButton>
          </div>
        </div>
      </div>
      <HeroButton
        type="button"
        disabled={mutations.login.isPending}
        onClick={functions.handleProfile}
      >
        {t('step.success.profile')}
      </HeroButton>
    </div>
  )
}
