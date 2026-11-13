import { useTranslate } from '@kanjou/react'
import type { ChangeEvent } from 'react'

import { Field, FieldError, FieldGroup, FieldLabel, Input } from '#/components/ui'
import {
  AchievementArtwork,
  getAchievementArtworkTier,
} from '#/routes/_authorized/-components/achievements'

import type { AchievementDraft, AchievementDraftErrors } from '../../-types'

import styles from './achievement-fields.module.css'

export interface AchievementFieldsProps {
  draft: AchievementDraft
  errors: AchievementDraftErrors
  previewCoins: number | null
  disabled?: boolean
  onChange: (draft: AchievementDraft) => void
}

export function AchievementFields(props: AchievementFieldsProps) {
  const t = useTranslate()
  const tier = getAchievementArtworkTier(props.previewCoins)

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    props.onChange({ ...props.draft, name: event.target.value })
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    props.onChange({ ...props.draft, description: event.target.value })
  }

  function handleRequiredCoinsChange(event: ChangeEvent<HTMLInputElement>) {
    props.onChange({ ...props.draft, requiredCoins: event.target.value })
  }

  const nameErrorId = props.errors.name ? 'achievement-name-error' : undefined
  const descriptionErrorId = props.errors.description ? 'achievement-description-error' : undefined
  const requiredCoinsErrorId = props.errors.requiredCoins
    ? 'achievement-required-coins-error'
    : undefined

  return (
    <FieldGroup className={styles.fields}>
      <Field>
        <FieldLabel htmlFor="achievement-name">{t('admin.achievements.form.name')}</FieldLabel>
        <Input
          id="achievement-name"
          name="achievement-name"
          autoComplete="off"
          maxLength={200}
          value={props.draft.name}
          disabled={props.disabled}
          aria-invalid={!!props.errors.name}
          aria-describedby={nameErrorId}
          placeholder={t('admin.achievements.form.name.placeholder')}
          onChange={handleNameChange}
        />
        {props.errors.name && (
          <FieldError id="achievement-name-error">{t(props.errors.name)}</FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="achievement-description">
          {t('admin.achievements.form.description')}
        </FieldLabel>
        <textarea
          id="achievement-description"
          name="achievement-description"
          className={styles.textarea}
          rows={4}
          maxLength={1000}
          value={props.draft.description}
          disabled={props.disabled}
          aria-invalid={!!props.errors.description}
          aria-describedby={descriptionErrorId}
          placeholder={t('admin.achievements.form.description.placeholder')}
          onChange={handleDescriptionChange}
        />
        {props.errors.description && (
          <FieldError id="achievement-description-error">{t(props.errors.description)}</FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="achievement-required-coins">
          {t('admin.achievements.form.required')}
        </FieldLabel>
        <Input
          id="achievement-required-coins"
          name="achievement-required-coins"
          inputMode="numeric"
          autoComplete="off"
          value={props.draft.requiredCoins}
          disabled={props.disabled}
          aria-invalid={!!props.errors.requiredCoins}
          aria-describedby={requiredCoinsErrorId}
          placeholder={t('admin.achievements.form.required.placeholder')}
          onChange={handleRequiredCoinsChange}
        />
        {props.errors.requiredCoins && (
          <FieldError id="achievement-required-coins-error">
            {t(props.errors.requiredCoins)}
          </FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel>{t('admin.achievements.form.preview')}</FieldLabel>
        <div className={styles.preview}>
          <AchievementArtwork requiredCoins={props.previewCoins} size="lg" />
          <div className={styles['preview-body']}>
            {props.previewCoins !== null && (
              <span className={styles['preview-tier']}>{t(tier.labelKey)}</span>
            )}
            {props.previewCoins !== null && (
              <span>{t('achievements.required', { count: props.previewCoins })}</span>
            )}
            {props.previewCoins === null && (
              <span>{t('admin.achievements.form.preview.null')}</span>
            )}
            <span className={styles.note}>{t('admin.achievements.form.preview.note')}</span>
          </div>
        </div>
      </Field>

      <Field>
        <FieldLabel>{t('admin.achievements.form.type')}</FieldLabel>
        <p className={styles.static}>{t('admin.achievements.form.type.badge')}</p>
      </Field>
    </FieldGroup>
  )
}
