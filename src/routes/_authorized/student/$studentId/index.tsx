import { useTranslate } from '@kanjou/react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import * as v from 'valibot'

import { getCoursesCourseGetQueryOptions } from '#/api/hooks/useGetCoursesCourseGet'
import { getStudentByIdStudentStudentIdGetQueryOptions } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { getTeacherGroupsTeacherGroupsGetQueryOptions } from '#/api/hooks/useGetTeacherGroupsTeacherGroupsGet'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  IconButton,
  Loader,
  Typography,
} from '#/components/ui'
import { Feedback } from '#/routes/-components'
import { InlineError } from '#/routes/-components'
import { PageLayout } from '#/routes/-components/page-layout'
import { UserAvatar } from '#/routes/-components/user-avatar'
import { GroupCard } from '#/routes/_authorized/-components/group-card'
import { cn } from '#/utils/cn'

import { ProfileEditor } from './-components'
import { useStudentProfilePage } from './-hooks'

import styles from './index.module.css'

const StudentParamsSchema = v.object({
  studentId: v.pipe(
    v.string(),
    v.regex(/^\d+$/),
    v.transform(Number),
    v.safeInteger(),
    v.minValue(1),
  ),
})

const ProfileSearchSchema = v.object({
  fromGroupId: v.optional(v.pipe(v.number(), v.safeInteger(), v.minValue(1))),
})

export const Route = createFileRoute('/_authorized/student/$studentId/')({
  head: () => ({ meta: [{ title: 'Профіль | Robocoins' }] }),
  params: {
    parse: (params) => {
      const result = v.safeParse(StudentParamsSchema, params)
      if (!result.success) throw notFound()
      return result.output
    },
  },
  validateSearch: (search) => {
    const result = v.safeParse(ProfileSearchSchema, search)
    return result.success ? result.output : {}
  },
  loader: async ({ context, params }) => {
    const user = context.user

    const student = await context.queryClient
      .query(
        getStudentByIdStudentStudentIdGetQueryOptions({ path: { student_id: params.studentId } }),
      )
      .catch(() => undefined)
    if (!student) throw notFound()
    if (user?.role === 'student') return student

    const [groups, _courses] = await Promise.all([
      context.queryClient.query(getTeacherGroupsTeacherGroupsGetQueryOptions()),
      context.queryClient.query(getCoursesCourseGetQueryOptions()),
    ])
    const isStudentAccessible = student.group_ids.some((groupId) =>
      groups.some((group) => group.id === groupId),
    )
    if (!isStudentAccessible) throw notFound()
  },
  component: StudentProfilePage,
})

function StudentProfilePage() {
  const { state, queries, functions } = useStudentProfilePage()

  const t = useTranslate()

  return (
    <PageLayout.Root
      variant="comfortable"
      bottomSpace
      className={cn(state.isEditing && styles['editing-page'])}
      style={{ '--keyboard-inset': `${state.keyboardInset}px` } as CSSProperties}
    >
      <PageLayout.Header centered>
        <IconButton onClick={functions.handleBack} title={t('history.back')}>
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        {state.isTeacher && (
          <PageLayout.Actions>
            <Button
              variant="ghost"
              onClick={functions.handleEdit}
              className={styles['edit-button']}
            >
              <span aria-hidden="true" className="i-ph:pencil-simple" />
              {t('student.profile.edit')}
            </Button>
          </PageLayout.Actions>
        )}
        {state.isOwnProfile && !state.isEditing && (
          <PageLayout.Actions>
            <IconButton
              variant="ghost"
              onClick={functions.handleStartEditing}
              title={t('profile.edit.action')}
              aria-label={t('profile.edit.action')}
            >
              <span aria-hidden="true" className="i-ph:pencil-simple" />
            </IconButton>
          </PageLayout.Actions>
        )}
      </PageLayout.Header>
      {queries.student.isPending && <Loader grow className={styles.loader} />}
      {queries.student.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={queries.student.isFetching}>
          {t('group.error')}
        </InlineError>
      )}
      {state.profile && (
        <>
          {state.isEditing && (
            <ProfileEditor
              name={state.profile.name}
              nicknameDraft={state.nicknameDraft}
              avatarDraft={state.avatarDraft}
              ringDraft={state.ringDraft}
              persistedRing={state.persistedRing}
              activeTab={state.activeTab}
              fieldSaveStates={state.fieldSaveStates}
              saveOutcome={state.saveOutcome}
              isSaving={state.isSaving}
              isNicknameEmpty={state.isNicknameEmpty}
              hasUnsavedChanges={state.hasUnsavedChanges}
              onNicknameChange={functions.handleNicknameChange}
              onAvatarSelect={functions.handleAvatarSelect}
              onRingSelect={functions.handleRingSelect}
              onTabChange={functions.handleTabChange}
              onSave={functions.handleSave}
              onCancel={functions.handleCancelEditing}
            />
          )}
          {!state.isEditing && (
            <article className={styles.identity}>
              <UserAvatar
                name={state.profile.name}
                avatar={state.avatar}
                avatarRing={state.avatarRing}
                className={styles.avatar}
              />
              <div className={styles['identity-info']}>
                <Typography className={styles.name} variant="subtitle">
                  {state.profile.name}
                </Typography>
                <div
                  className={styles.balance}
                  aria-label={`${t('coins.amount', { count: state.profile.balance })} ${t('coins.unit', { count: state.profile.balance })}`}
                >
                  <span aria-hidden="true">
                    {t('coins.amount', { count: state.profile.balance })}
                  </span>
                  <span aria-hidden="true" className={cn('i-ph:coins', styles['coin-icon'])} />
                </div>
              </div>
            </article>
          )}
          {state.isOwnProfile && !state.isEditing && (
            <Feedback source="profile_avatar" className={styles.feedback} />
          )}
          {state.isTeacher && (
            <section className={styles.section}>
              <h2 className={styles['section-title']}>{t('groups.title')}</h2>
              {!!state.groupCards.length && (
                <div className={styles['group-list']}>
                  {state.groupCards.map((group) => (
                    <GroupCard key={group.id} group={group} />
                  ))}
                </div>
              )}
              {!state.groupCards.length && (
                <p className={styles.empty}>{t('profile.groups.empty')}</p>
              )}
            </section>
          )}
          {!state.isTeacher && !state.isEditing && !!state.profile.course_names.length && (
            <section className={styles.section}>
              <div className={styles['course-list']}>
                {state.profile.course_names.map((courseName) => (
                  <span key={courseName} className={styles['course-chip']}>
                    {courseName}
                  </span>
                ))}
              </div>
            </section>
          )}
        </>
      )}
      <AlertDialog
        open={state.isNavigationBlocked}
        onOpenChange={functions.handleNavigationDialogOpenChange}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('profile.edit.leave.title')}</AlertDialogTitle>
            <AlertDialogDescription>{t('profile.edit.leave.description')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('profile.edit.leave.stay')}</AlertDialogCancel>
            <AlertDialogAction onClick={functions.handleConfirmNavigation}>
              {t('profile.edit.leave.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout.Root>
  )
}
