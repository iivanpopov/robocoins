import { useTranslate } from '@kanjou/react'
import { Navigate } from '@tanstack/react-router'

import { HeroButton, IconButton, Typography } from '#/components/ui'
import { useBoolean } from '#/hooks'

import { RegisterStep } from '../../../-constants'
import { useStepSuccess } from './-hooks'

import styles from './step-success.module.css'

export function StepSuccess() {
  const { state, mutations, functions } = useStepSuccess()
  const [isRevealed, toggleRevealed] = useBoolean()
  const t = useTranslate()

  let passwordLabel = t('field.password.show')
  if (isRevealed) passwordLabel = t('field.password.hide')

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
            <Typography variant="subtitle">{t('field.password.caption')}</Typography>
            <Typography variant="caption">{t('step.success.description')}</Typography>
          </div>
          <div className={styles.password}>
            <span className={styles.code}>
              {isRevealed && state.accessCode}
              {!isRevealed && '••••••••'}
            </span>
            <IconButton
              type="button"
              variant="ghost"
              size="lg"
              aria-pressed={isRevealed}
              aria-label={passwordLabel}
              onClick={() => toggleRevealed()}
            >
              {isRevealed && <span className="i-ph:eye-slash-bold" />}
              {!isRevealed && <span className="i-ph:eye-bold" />}
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
