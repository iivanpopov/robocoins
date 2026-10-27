import { useTranslate } from '@kanjou/react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { cn } from 'cn'
import * as v from 'valibot'

import { getCoursesCourseGetQueryOptions } from '#/api/hooks/useGetCoursesCourseGet'
import { getStudentByIdStudentStudentIdGetQueryOptions } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { getTeacherGroupsTeacherGroupsGetQueryOptions } from '#/api/hooks/useGetTeacherGroupsTeacherGroupsGet'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  IconButton,
  Loader,
  Typography,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { getAvatarUrl, getInitial } from '#/routes/-utils'
import { GroupCard } from '#/routes/_authorized/-components/group-card'

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
    <section className={styles.page}>
      <header className={styles.header}>
        <IconButton
          className={styles['back-button']}
          onClick={functions.handleBack}
          title={t('history.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        {state.isTeacher && (
          <Button variant="ghost" onClick={functions.handleEdit} className={styles['edit-button']}>
            <span aria-hidden="true" className="i-ph:pencil-simple-bold" />
            {t('student.profile.edit')}
          </Button>
        )}
      </header>
      {queries.student.isPending && <Loader grow className={styles.loader} />}
      {queries.student.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={queries.student.isFetching}>
          {t('group.error')}
        </InlineError>
      )}
      {state.profile && (
        <>
          <article className={styles.identity}>
            <Avatar className={styles.avatar}>
              <AvatarImage src={getAvatarUrl(state.avatar)} alt="" aria-hidden="true" />
              <AvatarFallback role="img" aria-label={state.profile.name}>
                {getInitial(state.profile.name)}
              </AvatarFallback>
            </Avatar>
            <div className={styles['identity-info']}>
              <Typography className={styles.name} variant="subtitle">
                {state.profile.name}
              </Typography>
              <div
                className={styles.balance}
                aria-label={`${t('profile.balance.amount', { count: state.profile.balance })} ${t('profile.balance.caption', { count: state.profile.balance })}`}
              >
                <span aria-hidden="true">
                  {t('profile.balance.amount', { count: state.profile.balance })}
                </span>
                <span aria-hidden="true" className={cn('i-ph:coins-bold', styles['coin-icon'])} />
              </div>
            </div>
          </article>
          {state.isTeacher && (
            <section className={styles.section}>
              <h2 className={styles['section-title']}>{t('profile.groups')}</h2>
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
          {!state.isTeacher && !!state.profile.course_names.length && (
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
    </section>
  )
}
