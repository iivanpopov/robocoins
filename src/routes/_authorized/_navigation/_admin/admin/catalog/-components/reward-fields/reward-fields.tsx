import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import type { ChangeEvent } from 'react'

import {
  Chip,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from '#/components/ui'

import { REWARD_FORM_CATEGORY_OPTIONS, REWARD_TYPE_OPTIONS } from '../../-constants'
import type { RewardDraft, RewardDraftErrors } from '../../-types'

import styles from './reward-fields.module.css'

export interface RewardFieldsProps {
  draft: RewardDraft
  errors: RewardDraftErrors
  disabled?: boolean
  onChange: (draft: RewardDraft) => void
}

export function RewardFields({ draft, errors, disabled = false, onChange }: RewardFieldsProps) {
  const t = useTranslate()

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    onChange({ ...draft, name: event.target.value })
  }

  function handlePriceChange(event: ChangeEvent<HTMLInputElement>) {
    onChange({ ...draft, price: event.target.value })
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange({ ...draft, description: event.target.value })
  }

  return (
    <FieldGroup className={styles.fields}>
      <Field>
        <FieldLabel htmlFor="reward-name">{t('admin.catalog.form.name')}</FieldLabel>
        <Input
          id="reward-name"
          name="reward-name"
          autoComplete="off"
          value={draft.name}
          disabled={disabled}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'reward-name-error' : undefined}
          placeholder={t('admin.catalog.form.name.placeholder')}
          onChange={handleNameChange}
        />
        {errors.name && <FieldError id="reward-name-error">{t(errors.name)}</FieldError>}
      </Field>

      <Field>
        <FieldLabel htmlFor="reward-price">{t('admin.catalog.form.price')}</FieldLabel>
        <Input
          id="reward-price"
          name="reward-price"
          inputMode="numeric"
          autoComplete="off"
          value={draft.price}
          disabled={disabled}
          aria-invalid={!!errors.price}
          aria-describedby={errors.price ? 'reward-price-error' : 'reward-price-description'}
          placeholder={t('admin.catalog.form.price.placeholder')}
          onChange={handlePriceChange}
        />
        <FieldDescription id="reward-price-description">
          {t('admin.catalog.form.price.description')}
        </FieldDescription>
        {errors.price && <FieldError id="reward-price-error">{t(errors.price)}</FieldError>}
      </Field>

      <Field>
        <FieldLabel htmlFor="reward-description">{t('admin.catalog.form.description')}</FieldLabel>
        <textarea
          id="reward-description"
          name="reward-description"
          className={styles.textarea}
          rows={4}
          value={draft.description}
          disabled={disabled}
          placeholder={t('admin.catalog.form.description.placeholder')}
          onChange={handleDescriptionChange}
        />
      </Field>

      <Field>
        <FieldLabel>{t('admin.catalog.form.type')}</FieldLabel>
        <div className={styles.choices} role="group" aria-label={t('admin.catalog.form.type')}>
          {REWARD_TYPE_OPTIONS.map((type) => (
            <Chip
              key={type}
              type="button"
              selected={draft.type === type}
              disabled={disabled}
              onClick={() => onChange({ ...draft, type })}
            >
              <span
                aria-hidden="true"
                className={cn(
                  type === 'reward' && 'i-ph:cube-duotone',
                  type === 'privilege' && 'i-ph:star-four-fill',
                )}
              />
              {t(`admin.catalog.type.${type}`)}
            </Chip>
          ))}
        </div>
        {errors.type && <FieldError>{t(errors.type)}</FieldError>}
      </Field>

      <Field>
        <FieldLabel>{t('admin.catalog.form.category')}</FieldLabel>
        <div className={styles.choices} role="group" aria-label={t('admin.catalog.form.category')}>
          <Chip
            type="button"
            selected={!draft.courseCategory}
            disabled={disabled}
            onClick={() => onChange({ ...draft, courseCategory: null })}
          >
            {t('admin.catalog.category.none')}
          </Chip>
          {REWARD_FORM_CATEGORY_OPTIONS.map((category) => (
            <Chip
              key={category}
              type="button"
              selected={draft.courseCategory === category}
              disabled={disabled}
              onClick={() => onChange({ ...draft, courseCategory: category })}
            >
              {t('course.category', { category })}
            </Chip>
          ))}
        </div>
        {errors.courseCategory && <FieldError>{t(errors.courseCategory)}</FieldError>}
      </Field>
    </FieldGroup>
  )
}
