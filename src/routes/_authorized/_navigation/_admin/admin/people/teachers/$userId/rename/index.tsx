import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'

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

import {
  TeacherForm,
  TeacherPageLayout,
  TeacherRequestError,
  TeacherResultPanel,
  TeacherUnavailable,
} from '../../-components'
import { useTeacherRenamePage } from '../../-hooks'
import { parseTeacherIdParams } from '../../-utils'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/people/teachers/$userId/rename/',
)({
  head: () => ({ meta: [{ title: 'Редагування імені викладача | Robocoins' }] }),
  params: { parse: (params) => parseTeacherIdParams(params) },
  component: TeacherRenameRoute,
})

function TeacherRenameRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/teachers/$userId/rename/',
  })

  return <TeacherRenamePage key={params.userId} />
}

function TeacherRenamePage() {
  const { state, functions, features } = useTeacherRenamePage()

  const t = useTranslate()

  return (
    <TeacherPageLayout
      title={t('admin.teachers.rename.title')}
      description={
        <>
          {!state.isAvailable && t('admin.teachers.rename.description-empty')}
          {state.isAvailable && t('admin.teachers.rename.description', { name: state.name })}
        </>
      }
      back={
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/people/teachers/$userId" params={{ userId: state.teacherId }} />}
          title={t('admin.teachers.back-to-profile')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
      }
    >
      {state.isPending && <Loader grow />}
      {!state.isPending && state.isError && !state.notFound && (
        <TeacherRequestError
          status={state.errorStatus}
          message={t('admin.teachers.profile.error')}
          onRetry={functions.handleRetry}
          isRetrying={state.isFetching}
        />
      )}
      <TeacherUnavailable
        notFound={state.notFound}
        notTeacher={state.notTeacher}
        isMismatch={state.isMismatch}
      />

      {state.isAvailable && !state.renamedName && (
        <TeacherForm
          onSubmit={functions.handleSubmit}
          submitLabel={t('admin.teachers.rename.submit')}
          submitDisabled={state.isUnchanged}
          note={t('admin.teachers.rename.note')}
          cancel={
            <Button
              variant="ghost"
              nativeButton={false}
              render={
                <Link to="/admin/people/teachers/$userId" params={{ userId: state.teacherId }} />
              }
            >
              {t('action.cancel')}
            </Button>
          }
        >
          <features.form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="teacher-rename-name">
                  {t('admin.teachers.rename.name-label')}
                </FieldLabel>
                <Input
                  id="teacher-rename-name"
                  name={field.name}
                  value={state.proposedName}
                  maxLength={200}
                  autoComplete="off"
                  placeholder={t('admin.teachers.rename.name-placeholder')}
                  aria-invalid={!!field.state.meta.errors.length}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                />
                {!!field.state.meta.errors.length && (
                  <FieldError>{t('admin.teachers.rename.name-error')}</FieldError>
                )}
                {state.isUnchanged && (
                  <FieldDescription>{t('admin.teachers.rename.same')}</FieldDescription>
                )}
              </Field>
            )}
          </features.form.Field>
        </TeacherForm>
      )}

      {state.isAvailable && !!state.renamedName && (
        <TeacherResultPanel
          title={t('admin.teachers.rename.result-title')}
          description={t('admin.teachers.rename.result-description')}
          details={[
            {
              label: t('admin.teachers.rename.current'),
              value: state.name,
            },
            {
              label: t('admin.teachers.rename.proposed'),
              value: state.renamedName,
            },
          ]}
        >
          <div className={styles.actions}>
            <Button
              nativeButton={false}
              render={
                <Link to="/admin/people/teachers/$userId" params={{ userId: state.teacherId }} />
              }
            >
              {t('admin.teachers.back-to-profile')}
            </Button>
            <Button
              variant="ghost"
              nativeButton={false}
              render={<Link to="/admin/people/teachers" />}
            >
              {t('admin.teachers.result.list')}
            </Button>
          </div>
        </TeacherResultPanel>
      )}
    </TeacherPageLayout>
  )
}
