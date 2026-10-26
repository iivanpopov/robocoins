import { useTranslate } from '@kanjou/react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { cn } from 'cn'
import * as v from 'valibot'

import { getCoursesCourseGetQueryOptions } from '#/api/hooks/useGetCoursesCourseGet'
import { getStudentByIdStudentStudentIdGetQueryOptions } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { getTeacherGroupsTeacherGroupsGetQueryOptions } from '#/api/hooks/useGetTeacherGroupsTeacherGroupsGet'
import { showStudentCredentialsStudentStudentIdCredentialsGetQueryOptions } from '#/api/hooks/useShowStudentCredentialsStudentStudentIdCredentialsGet'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Field,
  FieldLabel,
  IconButton,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  Loader,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'
import type { Avatar as AvatarName } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'

import { AvatarPicker, StudentGroupAssignment } from './-components'
import { useStudentEditPage } from './-hooks'

import styles from './index.module.css'

const EditParamsSchema = v.object({
  studentId: v.pipe(
    v.string(),
    v.regex(/^\d+$/),
    v.transform(Number),
    v.safeInteger(),
    v.minValue(1),
  ),
})

const EditSearchSchema = v.object({
  fromGroupId: v.optional(v.pipe(v.number(), v.safeInteger(), v.minValue(1))),
})

export const Route = createFileRoute('/_authorized/_teacher/student/$studentId/edit/')({
  head: () => ({ meta: [{ title: 'Налаштування учня | Robocoins' }] }),
  params: {
    parse: (params) => {
      const result = v.safeParse(EditParamsSchema, params)
      if (!result.success) throw notFound()
      return result.output
    },
  },
  validateSearch: (search) => {
    const result = v.safeParse(EditSearchSchema, search)
    return result.success ? result.output : {}
  },
  loader: async ({ context, params }) => {
    const student = await context.queryClient
      .query(
        getStudentByIdStudentStudentIdGetQueryOptions({ path: { student_id: params.studentId } }),
      )
      .catch(() => undefined)
    if (!student) throw notFound()

    const [groups, _courses] = await Promise.all([
      context.queryClient.query(getTeacherGroupsTeacherGroupsGetQueryOptions()),
      context.queryClient.query(getCoursesCourseGetQueryOptions()),
    ])
    const isStudentAccessible = student.group_ids.some((groupId) =>
      groups.some((group) => group.id === groupId),
    )
    if (!isStudentAccessible) throw notFound()

    void context.queryClient
      .prefetchQuery(
        showStudentCredentialsStudentStudentIdCredentialsGetQueryOptions({
          path: { student_id: params.studentId },
        }),
      )
      .catch(() => undefined)
  },
  component: StudentEditPage,
})

function StudentEditPage() {
  const { state, queries, mutations, functions } = useStudentEditPage()

  const t = useTranslate()

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <IconButton
          className={styles['back-button']}
          onClick={functions.handleBack}
          title={t('history.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        {!queries.student.isPending && !queries.student.isError && (
          <div className={styles['header-identity']}>
            <span className={styles['header-name']}>{state.name}</span>
            <Avatar>
              <AvatarImage
                src={getAvatarUrl(state.avatar as AvatarName)}
                alt=""
                aria-hidden="true"
              />
              <AvatarFallback role="img" aria-label={state.name}>
                {getInitial(state.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </header>
      {queries.student.isPending && <Loader grow className={styles.loader} />}
      {queries.student.isError && (
        <InlineError onRetry={functions.handleRetryStudent} isRetrying={queries.student.isFetching}>
          {t('group.error')}
        </InlineError>
      )}
      {state.isAvailable && (
        <>
          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('settings.section.account')}</h2>
            <Field>
              <FieldLabel htmlFor="student-edit-nickname">
                {t('student.edit.nickname.label')}
              </FieldLabel>
              <div className={styles['nickname-row']}>
                <Input
                  id="student-edit-nickname"
                  value={state.nickname}
                  placeholder={t('student.edit.nickname.placeholder')}
                  maxLength={200}
                  autoComplete="off"
                  onChange={(event) => functions.handleNicknameChange(event.target.value)}
                />
                <IconButton
                  className={styles['nickname-save']}
                  onClick={functions.handleSaveNickname}
                  disabled={mutations.nickname.isPending || !state.canSaveNickname}
                  aria-label={t('student.edit.nickname.save')}
                  title={t('student.edit.nickname.save')}
                >
                  {mutations.nickname.isPending && <Loader />}
                  {!mutations.nickname.isPending && (
                    <span aria-hidden="true" className="i-ph:check-bold" />
                  )}
                </IconButton>
              </div>
              {mutations.nickname.isError && (
                <InlineError>{t('student.edit.nickname.error')}</InlineError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="student-edit-password">{t('settings.password')}</FieldLabel>
              <div className={styles['password-row']}>
                <InputGroup>
                  <InputGroupInput
                    id="student-edit-password"
                    type={state.isPasswordVisible ? 'text' : 'password'}
                    value={state.password}
                    readOnly
                    autoComplete="new-password"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      onClick={functions.handleTogglePassword}
                      disabled={state.isPasswordLoading}
                      aria-label={
                        state.isPasswordVisible
                          ? t('field.password.hide')
                          : t('field.password.show')
                      }
                      aria-pressed={state.isPasswordVisible}
                    >
                      {state.isPasswordLoading && <Loader />}
                      {!state.isPasswordLoading && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            state.isPasswordVisible && 'i-ph:eye-slash-bold',
                            !state.isPasswordVisible && 'i-ph:eye-bold',
                          )}
                        />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <IconButton
                  className={styles['password-regenerate']}
                  onClick={functions.handleOpenPasswordDialog}
                  aria-label={t('student.password.regenerate')}
                  title={t('student.password.regenerate')}
                >
                  <span aria-hidden="true" className="i-ph:arrows-clockwise-bold" />
                </IconButton>
              </div>
              {state.isPasswordUnavailable && (
                <InlineError>{t('student.password.unavailable')}</InlineError>
              )}
              {mutations.passwordRegeneration.isError && (
                <InlineError
                  onRetry={functions.handleRetryPasswordRegeneration}
                  isRetrying={mutations.passwordRegeneration.isPending}
                >
                  {t('student.password.regenerate.error')}
                </InlineError>
              )}
            </Field>
            <Field>
              <FieldLabel>{t('student.edit.avatar.label')}</FieldLabel>
              <div className={styles['avatar-field']}>
                <Avatar size="lg">
                  <AvatarImage
                    src={getAvatarUrl(state.selectedAvatar as AvatarName)}
                    alt=""
                    aria-hidden="true"
                  />
                  <AvatarFallback role="img" aria-label={state.name}>
                    {getInitial(state.name)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="ghost" onClick={functions.handleOpenAvatarPicker}>
                  {t('student.edit.avatar.change')}
                </Button>
              </div>
            </Field>
            <AvatarPicker
              open={state.isAvatarPickerOpen}
              onOpenChange={functions.handleAvatarPickerOpenChange}
              value={state.pickerAvatar}
              name={state.name}
              onSelect={functions.handlePickerAvatarSelect}
              onSave={functions.handleSaveAvatar}
              isSaving={mutations.avatar.isPending}
              isError={mutations.avatar.isError}
              onRetry={functions.handleRetryAvatar}
            />
            <AlertDialog
              open={state.isPasswordDialogOpen}
              onOpenChange={functions.handlePasswordDialogOpenChange}
            >
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {t('student.password.regenerate.confirm.title')}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('student.password.regenerate.confirm.description', { student: state.name })}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
                  <AlertDialogAction onClick={functions.handleConfirmPasswordRegeneration}>
                    {t('student.password.regenerate.confirm.action')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </section>
          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('student.edit.section.groups')}</h2>
            <StudentGroupAssignment
              studentId={state.studentId}
              studentName={state.name}
              studentAvatar={state.avatar}
              groupIds={state.groupIds}
              fromGroupId={state.fromGroupId}
              onSuccess={functions.handleAssignmentSuccess}
            />
          </section>
        </>
      )}
    </section>
  )
}
