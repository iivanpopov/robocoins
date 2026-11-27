import { TranslateProvider, useTranslate } from '@kanjou/react'
import { useId } from 'react'
import messages from 'virtual:kanjou/uk/feedback'

import {
  Button,
  Chip,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Field,
  FieldError,
  FieldLabel,
} from '#/components/ui'
import { cn } from '#/utils/cn'

import {
  FEEDBACK_DESCRIPTION_KEYS,
  FEEDBACK_KIND_KEYS,
  FEEDBACK_MESSAGE_MAX_LENGTH,
  FEEDBACK_TITLE_KEYS,
  FEEDBACK_TRIGGER_KEYS,
  type FeedbackSource,
} from './constants'
import { useFeedback } from './hooks'

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
    <TranslateProvider messages={messages}>
      <FeedbackContent {...props} />
    </TranslateProvider>
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
                          onClick={() => field.handleChange(kind)}
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
                    onChange={(event) => field.handleChange(event.target.value)}
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
          </div>
          <DrawerFooter>
            <Button type="submit">{t('feedback.submit')}</Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
