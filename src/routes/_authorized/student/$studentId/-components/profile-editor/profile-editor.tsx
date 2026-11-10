import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import { Button, Field, FieldLabel, Input, Loader } from '#/components/ui'
import { AvatarPicker, EffectPicker, InlineError } from '#/routes/-components'
import { UserAvatar } from '#/routes/-components/user-avatar'
import { type AvailableAvatarRing, type Avatar, type AvatarRing } from '#/routes/-constants'

import {
  PROFILE_FIELDS,
  type ProfileEditorTab,
  type ProfileField,
  type ProfileFieldSaveState,
  type ProfileSaveOutcome,
} from '../../-types'

import styles from './profile-editor.module.css'

const FIELD_LABEL_KEYS: Record<
  ProfileField,
  'profile.edit.fields.nickname' | 'profile.edit.fields.avatar' | 'profile.edit.fields.ring'
> = {
  nickname: 'profile.edit.fields.nickname',
  avatar: 'profile.edit.fields.avatar',
  ring: 'profile.edit.fields.ring',
}

export interface ProfileEditorProps {
  name: string
  nicknameDraft: string
  avatarDraft: Avatar
  ringDraft: AvatarRing
  persistedRing: AvatarRing
  activeTab: ProfileEditorTab
  fieldSaveStates: Record<ProfileField, ProfileFieldSaveState>
  saveOutcome: ProfileSaveOutcome
  isSaving: boolean
  isNicknameEmpty: boolean
  hasUnsavedChanges: boolean
  onNicknameChange: (value: string) => void
  onAvatarSelect: (avatar: Avatar) => void
  onRingSelect: (ring: AvailableAvatarRing) => void
  onTabChange: (tab: ProfileEditorTab) => void
  onSave: () => void
  onCancel: () => void
}

export function ProfileEditor(props: ProfileEditorProps) {
  const t = useTranslate()

  const saveFeedbackId = 'profile-save-feedback'
  const hasAvatarError = props.fieldSaveStates.avatar === 'error'
  const hasRingError = props.fieldSaveStates.ring === 'error'
  const savedFieldLabels = PROFILE_FIELDS.filter(
    (field) => props.fieldSaveStates[field] === 'saved',
  ).map((field) => t(FIELD_LABEL_KEYS[field]))
  const failedFieldLabels = PROFILE_FIELDS.filter(
    (field) => props.fieldSaveStates[field] === 'error',
  ).map((field) => t(FIELD_LABEL_KEYS[field]))

  return (
    <div className={styles.editor}>
      <article className={styles.identity}>
        <UserAvatar
          key={props.ringDraft}
          name={props.nicknameDraft || props.name}
          avatar={props.avatarDraft}
          avatarRing={props.ringDraft}
          className={styles.preview}
        />
        <div className={styles['identity-info']}>
          <Field>
            <FieldLabel htmlFor="profile-nickname">{t('profile.edit.nickname.label')}</FieldLabel>
            <Input
              id="profile-nickname"
              value={props.nicknameDraft}
              placeholder={t('profile.edit.nickname.placeholder')}
              maxLength={200}
              autoComplete="off"
              disabled={props.isSaving}
              aria-invalid={props.fieldSaveStates.nickname === 'error'}
              onChange={(event) => props.onNicknameChange(event.target.value)}
            />
          </Field>
          {props.fieldSaveStates.nickname === 'error' && (
            <InlineError>
              {props.isNicknameEmpty && t('profile.edit.nickname.required')}
              {!props.isNicknameEmpty && t('profile.edit.nickname.error')}
            </InlineError>
          )}
        </div>
      </article>

      <section className={styles.personalization} aria-label={t('profile.edit.personalization')}>
        <div className={styles.tabs} role="group" aria-label={t('profile.edit.personalization')}>
          <button
            type="button"
            className={cn(styles.tab, hasAvatarError && styles['tab-error'])}
            data-error={hasAvatarError || undefined}
            aria-pressed={props.activeTab === 'avatar'}
            aria-describedby={hasAvatarError ? saveFeedbackId : undefined}
            onClick={() => props.onTabChange('avatar')}
            disabled={props.isSaving}
          >
            {hasAvatarError && (
              <span aria-hidden="true" className={cn('i-ph:warning-circle', styles['tab-icon'])} />
            )}
            {t('profile.edit.tab.avatar')}
          </button>
          <button
            type="button"
            className={cn(styles.tab, hasRingError && styles['tab-error'])}
            data-error={hasRingError || undefined}
            aria-pressed={props.activeTab === 'ring'}
            aria-describedby={hasRingError ? saveFeedbackId : undefined}
            onClick={() => props.onTabChange('ring')}
            disabled={props.isSaving}
          >
            {hasRingError && (
              <span aria-hidden="true" className={cn('i-ph:warning-circle', styles['tab-icon'])} />
            )}
            {t('profile.edit.tab.ring')}
          </button>
        </div>

        {props.activeTab === 'avatar' && (
          <AvatarPicker
            value={props.avatarDraft}
            onChange={props.onAvatarSelect}
            name={props.nicknameDraft || props.name}
            disabled={props.isSaving}
          />
        )}

        {props.activeTab === 'avatar' && props.fieldSaveStates.avatar === 'error' && (
          <InlineError>{t('profile.edit.avatar.error')}</InlineError>
        )}

        {props.activeTab === 'ring' && (
          <EffectPicker
            name={props.nicknameDraft || props.name}
            avatar={props.avatarDraft}
            value={props.ringDraft}
            persistedValue={props.persistedRing}
            onChange={props.onRingSelect}
            disabled={props.isSaving}
          />
        )}

        {props.activeTab === 'ring' && props.fieldSaveStates.ring === 'error' && (
          <InlineError>{t('profile.edit.ring.error')}</InlineError>
        )}
      </section>

      <div className={styles.actions}>
        {props.saveOutcome === 'partial' && (
          <InlineError id={saveFeedbackId} onRetry={props.onSave} isRetrying={props.isSaving}>
            {t('profile.edit.partial', {
              saved: savedFieldLabels.join(', '),
              failed: failedFieldLabels.join(', '),
            })}
          </InlineError>
        )}
        {props.saveOutcome === 'error' && (
          <InlineError id={saveFeedbackId} onRetry={props.onSave} isRetrying={props.isSaving}>
            {!!failedFieldLabels.length &&
              t('profile.edit.failed', {
                failed: failedFieldLabels.join(', '),
              })}
            {!failedFieldLabels.length && t('profile.edit.error')}
          </InlineError>
        )}
        <div className={styles.buttons}>
          <Button variant="ghost" onClick={props.onCancel} disabled={props.isSaving}>
            {t('action.cancel')}
          </Button>
          <Button
            variant="contain"
            onClick={props.onSave}
            disabled={props.isSaving || !props.hasUnsavedChanges}
            aria-busy={props.isSaving}
          >
            {props.isSaving && <Loader />}
            {t('profile.edit.save')}
          </Button>
        </div>
      </div>
    </div>
  )
}
