import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'

import { Button, Field, FieldError, FieldLabel, IconButton, Input, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { PageLayout } from '#/routes/-components/page-layout'

import { TeacherRegistrationResult } from '../-components'
import { useTeacherRegistrationPage } from '../-hooks'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/people/teachers/register/',
)({
  head: () => ({ meta: [{ title: 'Новий викладач | Robocoins' }] }),
  component: TeacherRegistrationPage,
})

function TeacherRegistrationPage() {
  const { state, mutations, functions, features } = useTeacherRegistrationPage()

  const t = useTranslate()

  if (state.result) {
    return (
      <TeacherRegistrationResult
        result={state.result}
        isCopied={state.isCopied}
        onCopy={functions.handleCopyCode}
        onRegisterAnother={functions.handleRegisterAnother}
      />
    )
  }

  return (
    <PageLayout.Root bottomSpace className={styles.page}>
      <PageLayout.Header align="end" className={styles.header}>
        <IconButton
          onClick={functions.handleBack}
          title={t('admin.teachers.profile.back')}
          aria-label={t('admin.teachers.profile.back')}
          disabled={mutations.register.isPending}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <PageLayout.Heading>
          <PageLayout.Title>{t('admin.teachers.register.title')}</PageLayout.Title>
        </PageLayout.Heading>
      </PageLayout.Header>

      <form className={styles.form} onSubmit={functions.handleSubmit}>
        <features.form.Field name="name">
          {(field) => (
            <Field>
              <FieldLabel htmlFor="teacher-registration-name">{t('teachers.name')}</FieldLabel>
              <Input
                id="teacher-registration-name"
                name={field.name}
                value={field.state.value}
                maxLength={200}
                autoComplete="off"
                placeholder={t('field.full-name.placeholder')}
                aria-invalid={!!field.state.meta.errors.length}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
              {!!field.state.meta.errors.length && (
                <FieldError>{t('admin.teachers.register.name.error')}</FieldError>
              )}
            </Field>
          )}
        </features.form.Field>

        {mutations.register.isError && (
          <InlineError>
            {state.errorStatus === 401 && t('error.session')}
            {state.errorStatus === 403 && t('admin.teachers.error.forbidden')}
            {state.errorStatus !== 401 &&
              state.errorStatus !== 403 &&
              t('admin.teachers.register.error')}
          </InlineError>
        )}

        <Button
          type="submit"
          disabled={mutations.register.isPending}
          aria-busy={mutations.register.isPending}
        >
          {mutations.register.isPending && <Loader />}
          {t('action.register')}
        </Button>
      </form>
    </PageLayout.Root>
  )
}
