import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { getCoursesCourseGetQueryOptions } from '#/api/hooks/useGetCoursesCourseGet'
import { Button, Field, FieldLabel, IconButton, Input, Loader } from '#/components/ui'
import { AVATARS } from '#/routes/-constants'
import { getAvatarUrl } from '#/routes/-utils'

import { ApiErrorNotice } from '../-components'
import { useRegisterStudentPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/people/students/register/',
)({
  head: () => ({ meta: [{ title: 'Новий учень | Robocoins' }] }),
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(getCoursesCourseGetQueryOptions())
  },
  component: RegisterStudentPage,
})

function RegisterStudentPage() {
  const { state, mutations, functions, features } = useRegisterStudentPage()

  const t = useTranslate()

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <IconButton onClick={functions.handleBack} title={t('students.profile.back')}>
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <h1 className={styles.title}>{t('students.register.title')}</h1>
      </header>

      {state.created && (
        <article className={styles.success}>
          <span
            aria-hidden="true"
            className={cn('i-ph:check-circle-duotone', styles['success-icon'])}
          />
          <h2 className={styles['success-title']}>{t('students.register.success.title')}</h2>
          <p className={styles['success-description']}>
            {t('students.register.success.description', { name: state.created.name })}
          </p>
          <div className={styles['code-block']}>
            <span className={styles['code-label']}>{t('students.register.success.code')}</span>
            <output className={styles.code} aria-label={t('students.register.success.code')}>
              {state.created.accessCode}
            </output>
          </div>
          <Button
            variant="contain"
            className={styles['copy-button']}
            onClick={features.clipboard.functions.handleCopy}
          >
            {features.clipboard.state.isCopied && (
              <span aria-hidden="true" className="i-ph:check-bold" />
            )}
            {!features.clipboard.state.isCopied && (
              <span aria-hidden="true" className="i-ph:copy-bold" />
            )}
            {t('students.register.success.copy')}
          </Button>
          <p
            role="status"
            aria-live="polite"
            className={cn(
              styles['copy-status'],
              features.clipboard.state.isCopyError && styles['copy-status-error'],
            )}
          >
            {features.clipboard.state.isCopied && t('students.register.success.copied')}
            {features.clipboard.state.isCopyError && t('students.register.success.copy-error')}
          </p>
          <div className={styles['success-actions']}>
            <Link
              to="/admin/people/students/$studentId"
              params={{ studentId: state.created.id }}
              className={styles['primary-link']}
            >
              {t('students.register.success.profile')}
            </Link>
            <Link to="/admin/people/students" className={styles['secondary-link']}>
              {t('students.register.success.list')}
            </Link>
          </div>
        </article>
      )}

      {!state.created && (
        <form className={styles.form} onSubmit={functions.handleSubmit} noValidate>
          <p className={styles.description}>{t('students.register.description')}</p>

          <section className={styles.section}>
            <features.form.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="student-register-name">
                    {t('students.register.name.label')}
                  </FieldLabel>
                  <Input
                    id="student-register-name"
                    name={field.name}
                    value={field.state.value}
                    placeholder={t('students.register.name.placeholder')}
                    autoComplete="name"
                    maxLength={200}
                    aria-invalid={!!field.state.meta.errors.length}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {!!field.state.meta.errors.length && (
                    <p className={styles.validation}>{t('students.register.name.error')}</p>
                  )}
                </Field>
              )}
            </features.form.Field>
          </section>

          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('students.register.avatar.label')}</h2>
            <features.form.Field name="avatar">
              {(field) => (
                <div
                  className={styles.avatars}
                  role="group"
                  aria-label={t('students.register.avatar.label')}
                >
                  {AVATARS.map((avatar, index) => (
                    <button
                      key={avatar}
                      type="button"
                      className={cn(
                        styles['avatar-option'],
                        field.state.value === avatar && styles.selected,
                      )}
                      aria-pressed={field.state.value === avatar}
                      aria-label={t('students.register.avatar.option', { number: index + 1 })}
                      title={t('students.register.avatar.option', { number: index + 1 })}
                      onClick={() => field.handleChange(avatar)}
                    >
                      <img src={getAvatarUrl(avatar)} alt="" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              )}
            </features.form.Field>
          </section>

          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('students.register.groups.label')}</h2>
            <p className={styles['section-description']}>
              {t('students.register.groups.description')}
            </p>
            {state.isGroupsPending && <Loader grow />}
            {state.isGroupsError && (
              <ApiErrorNotice
                kind={state.groupsErrorKind}
                fallback={t('students.register.groups.error')}
                onRetry={functions.handleRetryGroups}
                isRetrying={state.isGroupsRetrying}
                onLogin={functions.handleLogin}
              />
            )}
            {state.isGroupsEmpty && (
              <p className={styles.empty}>{t('students.register.groups.empty')}</p>
            )}
            {!state.isGroupsPending && !state.isGroupsError && !!state.groups.length && (
              <features.form.Field name="groupIds">
                {(field) => (
                  <>
                    <div
                      className={styles.groups}
                      role="group"
                      aria-label={t('students.register.groups.label')}
                    >
                      {state.groups.map((group) => {
                        const isSelected = field.state.value.includes(group.id)

                        return (
                          <button
                            key={group.id}
                            type="button"
                            className={cn(styles['group-option'], isSelected && styles.selected)}
                            aria-pressed={isSelected}
                            onClick={() => functions.handleGroupToggle(group.id)}
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                'i-ph:check-bold',
                                styles['group-check'],
                                !isSelected && styles['group-check-hidden'],
                              )}
                            />
                            <span className={styles['group-details']}>
                              <span className={styles['group-course']}>{group.courseName}</span>
                              <span className={styles['group-name']}>{group.name}</span>
                            </span>
                          </button>
                        )
                      })}
                    </div>
                    {!!field.state.meta.errors.length && (
                      <p className={styles.validation}>
                        {t('students.register.groups.validation')}
                      </p>
                    )}
                  </>
                )}
              </features.form.Field>
            )}
          </section>

          {mutations.create.isError && (
            <ApiErrorNotice
              kind={state.errorKind}
              fallback={t('students.register.error')}
              onRetry={functions.handleRetrySubmit}
              isRetrying={mutations.create.isPending}
              onLogin={functions.handleLogin}
            />
          )}

          <Button
            type="submit"
            variant="contain"
            className={styles.submit}
            disabled={
              state.isGroupsPending ||
              state.isGroupsError ||
              !state.groups.length ||
              mutations.create.isPending
            }
            aria-busy={mutations.create.isPending}
          >
            {mutations.create.isPending && <Loader />}
            {t('students.register.submit')}
          </Button>
        </form>
      )}
    </section>
  )
}
