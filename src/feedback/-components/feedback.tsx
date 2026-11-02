import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import { useId } from 'react'
import messages from 'virtual:messages/uk/feedback'

import {
  Button,
  Chip,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Field,
  FieldError,
  FieldLabel,
  Loader,
} from '#/components/ui'
import { TranslationProvider } from '#/lib/translations'
import { InlineError } from '#/routes/-components'

import {
  FEEDBACK_DESCRIPTION_KEYS,
  FEEDBACK_KIND_KEYS,
  FEEDBACK_MESSAGE_MAX_LENGTH,
  FEEDBACK_SUCCESS_KEYS,
  FEEDBACK_TITLE_KEYS,
  FEEDBACK_TRIGGER_KEYS,
  type FeedbackSource,
} from '../-constants'
import { useFeedback } from '../-hooks'

import styles from './feedback.module.css'

const TRIGGER_ICONS: Record<FeedbackSource, string> = {
  student_home: 'i-ph:chat-circle-dots',
  registration_avatar: 'i-ph:user-circle-plus',
  profile_avatar: 'i-ph:user-circle-gear',
  shop: 'i-ph:gift',
}

export interface FeedbackProps {
  source: FeedbackSource
  className?: string
  contentClassName?: string
  triggerLabel?: string
  triggerVariant?: 'contain' | 'ghost' | 'link'
  triggerSize?: 'sm' | 'md' | 'lg'
}

export function Feedback(props: FeedbackProps) {
  return (
    <TranslationProvider messages={messages}>
      <FeedbackContent {...props} />
    </TranslationProvider>
  )
}

function FeedbackContent(props: FeedbackProps) {
  const feedback = useFeedback({ source: props.source })
  const messageId = useId()

  const t = useTranslate()

  return (
    <Drawer
      open={feedback.state.isOpen}
      onOpenChange={feedback.functions.handleOpenChange}
      showSwipeHandle
    >
      <DrawerTrigger
        render={
          <Button
            type="button"
            variant={props.triggerVariant ?? 'link'}
            size={props.triggerSize ?? 'md'}
            className={cn(styles.trigger, props.className)}
          />
        }
      >
        <span
          aria-hidden="true"
          className={cn(TRIGGER_ICONS[props.source], styles['trigger-icon'])}
        />
        {props.triggerLabel ?? t(FEEDBACK_TRIGGER_KEYS[props.source])}
      </DrawerTrigger>
      <DrawerContent className={props.contentClassName}>
        <DrawerHeader>
          <DrawerTitle>{t(FEEDBACK_TITLE_KEYS[props.source])}</DrawerTitle>
          <DrawerDescription>{t(FEEDBACK_DESCRIPTION_KEYS[props.source])}</DrawerDescription>
        </DrawerHeader>
        {feedback.state.isSuccess && (
          <div className={styles.success} role="status">
            <span aria-hidden="true" className={cn('i-ph:check-circle', styles['success-icon'])} />
            <p className={styles['success-text']}>{t(FEEDBACK_SUCCESS_KEYS[props.source])}</p>
            <DrawerClose render={<Button type="button" className={styles['success-close']} />}>
              {t('feedback.success.close')}
            </DrawerClose>
          </div>
        )}
        {!feedback.state.isSuccess && (
          <form className={styles.form} noValidate onSubmit={feedback.functions.handleSubmit}>
            <div className={styles.fields}>
              {feedback.state.kindChoices.length > 1 && (
                <feedback.features.form.Field name="kind">
                  {(field) => (
                    <Field>
                      <FieldLabel>{t('feedback.field.kind')}</FieldLabel>
                      <div
                        className={styles.kinds}
                        role="group"
                        aria-label={t('feedback.field.kind')}
                      >
                        {feedback.state.kindChoices.map((kind) => (
                          <Chip
                            key={kind}
                            type="button"
                            selected={field.state.value === kind}
                            onClick={() => {
                              feedback.functions.handleResetSubmission()
                              field.handleChange(kind)
                            }}
                          >
                            {t(FEEDBACK_KIND_KEYS[kind])}
                          </Chip>
                        ))}
                      </div>
                      {!!field.state.meta.errors.length && (
                        <FieldError>{t('feedback.validation.kind')}</FieldError>
                      )}
                    </Field>
                  )}
                </feedback.features.form.Field>
              )}
              <feedback.features.form.Field name="message">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={messageId}>{t('feedback.field.message')}</FieldLabel>
                    <textarea
                      id={messageId}
                      name={field.name}
                      className={styles.textarea}
                      rows={6}
                      maxLength={FEEDBACK_MESSAGE_MAX_LENGTH}
                      value={field.state.value}
                      placeholder={t('feedback.field.message.placeholder')}
                      aria-invalid={!!field.state.meta.errors.length}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        feedback.functions.handleResetSubmission()
                        field.handleChange(event.target.value)
                      }}
                    />
                    <span className={styles.counter}>
                      {t('feedback.counter', {
                        count: field.state.value.length,
                        limit: FEEDBACK_MESSAGE_MAX_LENGTH,
                      })}
                    </span>
                    {!!field.state.meta.errors.length && (
                      <FieldError>{t('feedback.validation.message')}</FieldError>
                    )}
                  </Field>
                )}
              </feedback.features.form.Field>
              {feedback.state.errorKey && <InlineError>{t(feedback.state.errorKey)}</InlineError>}
            </div>
            <DrawerFooter>
              <Button
                type="submit"
                disabled={feedback.state.isSubmitting}
                aria-busy={feedback.state.isSubmitting}
              >
                {feedback.state.isSubmitting && <Loader />}
                {!feedback.state.isSubmitting && t('feedback.submit')}
              </Button>
              <DrawerClose
                render={
                  <Button type="button" variant="ghost" disabled={feedback.state.isSubmitting} />
                }
              >
                {t('action.cancel')}
              </DrawerClose>
            </DrawerFooter>
          </form>
        )}
      </DrawerContent>
    </Drawer>
  )
}
