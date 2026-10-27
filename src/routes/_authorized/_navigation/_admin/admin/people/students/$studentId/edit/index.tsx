import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { cn } from 'cn'

import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  IconButton,
  Input,
  Loader,
} from '#/components/ui'
import { AVATARS } from '#/routes/-constants'
import { getAvatarUrl } from '#/routes/-utils'
import { AdminPageLayout } from '#/routes/_authorized/_navigation/_admin/admin/-components'

import { StudentRequestError } from '../-components'
import { parseStudentIdParams } from '../-utils'
import { StudentAvatar } from '../../-components'
import { useStudentEditPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/people/students/$studentId/edit/',
)({
  head: () => ({ meta: [{ title: 'Редагування учня | Robocoins' }] }),
  params: { parse: (params) => parseStudentIdParams(params) },
  component: StudentEditRoute,
})

function StudentEditRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/students/$studentId/edit/',
  })

  return <StudentEditPage key={params.studentId} />
}

function StudentEditPage() {
  const { state, mutations, functions, features } = useStudentEditPage()

  const t = useTranslate()

  return (
    <AdminPageLayout.Root bottomSpace>
      <AdminPageLayout.Header>
        <IconButton
          nativeButton={false}
          render={
            <Link to="/admin/people/students/$studentId" params={{ studentId: state.studentId }} />
          }
          title={t('navigation.profile')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <AdminPageLayout.Heading>
          <AdminPageLayout.Title>{t('students.edit.title')}</AdminPageLayout.Title>
          <AdminPageLayout.Description>
            {t('students.edit.description')}
          </AdminPageLayout.Description>
        </AdminPageLayout.Heading>
      </AdminPageLayout.Header>
      {state.isPending && <Loader grow />}
      {!state.isPending && state.isError && !state.student && (
        <StudentRequestError
          status={state.errorStatus}
          message={t('students.profile.error')}
          onRetry={functions.handleRetry}
          isRetrying={state.isFetching}
        />
      )}

      {!!state.student && (
        <>
          <article className={styles.card}>
            <div className={styles.identity}>
              <StudentAvatar
                name={state.student.name}
                avatar={state.student.avatar}
                size="lg"
                className={styles.avatar}
              />
              <div className={styles['identity-copy']}>
                <span className={styles.name}>{state.student.name}</span>
                <span className={styles.hint}>{t('students.edit.nickname.description')}</span>
              </div>
            </div>
          </article>

          <section className={styles.card}>
            <h2 className={styles['section-title']}>{t('field.nickname.label')}</h2>
            <form className={styles.form} onSubmit={functions.handleSubmitNickname} noValidate>
              <features.nicknameForm.Field name="nickname">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor="student-edit-nickname">
                      {t('field.student-nickname.placeholder')}
                    </FieldLabel>
                    <Input
                      id="student-edit-nickname"
                      name={field.name}
                      value={field.state.value}
                      maxLength={200}
                      autoComplete="off"
                      placeholder={t('field.student-nickname.placeholder')}
                      aria-invalid={!!field.state.meta.errors.length}
                      onChange={(event) => field.handleChange(event.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {!!field.state.meta.errors.length && (
                      <FieldError>{t('students.edit.nickname.error')}</FieldError>
                    )}
                    {state.isNicknameUnchanged && (
                      <FieldDescription>{t('students.edit.nickname.same')}</FieldDescription>
                    )}
                  </Field>
                )}
              </features.nicknameForm.Field>

              {mutations.nickname.isError && (
                <StudentRequestError
                  status={state.nicknameErrorStatus}
                  message={t('students.edit.nickname.save-error')}
                  onRetry={functions.handleRetryNickname}
                  isRetrying={mutations.nickname.isPending}
                />
              )}
              {mutations.nickname.isSuccess && (
                <p role="status" className={styles.status}>
                  {t('students.edit.nickname.saved')}
                </p>
              )}

              <div className={styles.actions}>
                <Button
                  type="submit"
                  disabled={mutations.nickname.isPending || !state.canSaveNickname}
                  aria-busy={mutations.nickname.isPending}
                >
                  {mutations.nickname.isPending && <Loader />}
                  {t('action.save-nickname')}
                </Button>
              </div>
            </form>
          </section>

          <section className={styles.card}>
            <h2 className={styles['section-title']}>{t('field.avatar.label')}</h2>
            <p className={styles.note}>{t('students.edit.avatar.description')}</p>
            <form className={styles.form} onSubmit={functions.handleSubmitAvatar} noValidate>
              <features.avatarForm.Field name="avatar">
                {(field) => (
                  <div className={styles.avatars} role="group" aria-label={t('field.avatar.label')}>
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
              </features.avatarForm.Field>

              {mutations.avatar.isError && (
                <StudentRequestError
                  status={state.avatarErrorStatus}
                  message={t('students.edit.avatar.save-error')}
                  onRetry={functions.handleRetryAvatar}
                  isRetrying={mutations.avatar.isPending}
                />
              )}
              {mutations.avatar.isSuccess && (
                <p role="status" className={styles.status}>
                  {t('students.edit.avatar.saved')}
                </p>
              )}

              <div className={styles.actions}>
                <Button
                  type="submit"
                  disabled={mutations.avatar.isPending || state.isAvatarUnchanged}
                  aria-busy={mutations.avatar.isPending}
                >
                  {mutations.avatar.isPending && <Loader />}
                  {t('action.save-avatar')}
                </Button>
              </div>
            </form>
          </section>
        </>
      )}
    </AdminPageLayout.Root>
  )
}
