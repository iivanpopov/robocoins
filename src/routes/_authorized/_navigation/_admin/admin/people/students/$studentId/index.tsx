import { useTranslate } from '@kanjou/react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import * as v from 'valibot'

import { getCoursesCourseGetQueryOptions } from '#/api/hooks/useGetCoursesCourseGet'
import { getStudentByIdStudentStudentIdGetQueryOptions } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { IconButton, Loader } from '#/components/ui'
import { CategoryIcon } from '#/routes/-components'

import { ApiErrorNotice, StudentAvatar } from '../-components'
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

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/people/students/$studentId/',
)({
  head: () => ({ meta: [{ title: 'Профіль учня | Robocoins' }] }),
  params: {
    parse: (params) => {
      const result = v.safeParse(StudentParamsSchema, params)
      if (!result.success) throw notFound()
      return result.output
    },
  },
  loader: async ({ context, params }) => {
    await Promise.all([
      context.queryClient.prefetchQuery(getCoursesCourseGetQueryOptions()),
      context.queryClient.prefetchQuery(
        getStudentByIdStudentStudentIdGetQueryOptions({ path: { student_id: params.studentId } }),
      ),
    ])
  },
  component: StudentProfilePage,
})

function StudentProfilePage() {
  const { state, functions } = useStudentProfilePage()

  const t = useTranslate()

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <IconButton onClick={functions.handleBack} title={t('students.profile.back')}>
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <h1 className={styles.title}>{t('students.profile.title')}</h1>
      </header>

      {state.isPending && <Loader grow />}
      {state.isError && (
        <ApiErrorNotice
          kind={state.errorKind}
          fallback={t('students.profile.error')}
          onRetry={functions.handleRetry}
          isRetrying={state.isRetrying}
          onLogin={functions.handleLogin}
        />
      )}
      {!!state.student && !state.isError && (
        <>
          <article className={styles.identity}>
            <StudentAvatar
              name={state.student.name}
              avatar={state.student.avatar}
              size="lg"
              className={styles.avatar}
            />
            <div className={styles['identity-details']}>
              <h2 className={styles.name}>{state.student.name}</h2>
              <div className={styles.metrics}>
                <div className={styles.metric}>
                  <span className={styles['metric-value']}>{state.groupCount}</span>
                  <span className={styles['metric-label']}>
                    {t('students.profile.metrics.groups')}
                  </span>
                </div>
                <div className={styles.metric}>
                  <span className={styles['metric-value']}>{state.courseCount}</span>
                  <span className={styles['metric-label']}>
                    {t('students.profile.metrics.courses')}
                  </span>
                </div>
              </div>
            </div>
          </article>

          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('students.profile.memberships')}</h2>
            {!!state.memberships.length && (
              <div className={styles.memberships}>
                {state.memberships.map((group) => (
                  <article
                    key={group.id}
                    className={styles.membership}
                    data-category={group.category}
                  >
                    <div className={styles['membership-icon']}>
                      <CategoryIcon category={group.category} />
                    </div>
                    <div className={styles['membership-details']}>
                      <span className={styles['membership-course']}>{group.courseName}</span>
                      <span className={styles['membership-group']}>{group.name}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
            {!state.memberships.length && (
              <p className={styles.empty}>{t('students.profile.memberships.empty')}</p>
            )}
          </section>

          {!!state.courseNames.length && (
            <section className={styles.section}>
              <h2 className={styles['section-title']}>{t('students.profile.metrics.courses')}</h2>
              <div className={styles.courses}>
                {state.courseNames.map((courseName) => (
                  <span key={courseName} className={styles.course}>
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
