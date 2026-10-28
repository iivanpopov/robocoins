import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import * as v from 'valibot'

import { getCoursesCourseGetQueryOptions } from '#/api/hooks/useGetCoursesCourseGet'
import { getStudentByIdStudentStudentIdGetQueryOptions } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { IconButton, Loader } from '#/components/ui'
import { LearningCard } from '#/routes/-components'
import { PageLayout } from '#/routes/-components/page-layout'

import { ApiErrorNotice } from '../-components'
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
    <PageLayout.Root>
      <PageLayout.Header align="end">
        <IconButton onClick={functions.handleBack} title={t('students.profile.back')}>
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <PageLayout.Heading>
          <PageLayout.Title className={styles.title}>
            {state.student?.name ?? t('students.profile.title')}
          </PageLayout.Title>
          {!!state.student && <PageLayout.Description>{t('role.student')}</PageLayout.Description>}
        </PageLayout.Heading>
      </PageLayout.Header>

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
          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('students.profile.manage')}</h2>
            <div className={styles.actions}>
              <Link
                to="/admin/people/students/$studentId/edit"
                params={{ studentId: state.student.id }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:pencil-simple" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('students.edit.title')}</span>
                  <span className={styles['action-description']}>
                    {t('students.edit.description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right" />
              </Link>

              <Link
                to="/admin/people/students/$studentId/access"
                params={{ studentId: state.student.id }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:key" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('students.access.title')}</span>
                  <span className={styles['action-description']}>
                    {t('students.access.description-empty')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right" />
              </Link>

              <Link
                to="/admin/people/students/$studentId/balance"
                params={{ studentId: state.student.id }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:coins" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('admin.balance.profile.link')}</span>
                  <span className={styles['action-description']}>
                    {t('admin.balance.profile.description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right" />
              </Link>

              <Link
                to="/admin/people/students/$studentId/streak"
                params={{ studentId: state.student.id }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:fire" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('admin.streak.title')}</span>
                  <span className={styles['action-description']}>
                    {t('admin.streak.description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right" />
              </Link>

              {/* No API integration: student deletion only updates local state.
              <Link
                to="/admin/people/students/$studentId/delete"
                params={{ studentId: state.student.id }}
                className={styles.action}
                data-tone="error"
              >
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:user-minus" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('students.delete.title')}</span>
                  <span className={styles['action-description']}>
                    {t('students.profile.delete-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right" />
              </Link>
              */}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles['section-header']}>
              <h2 className={styles['section-title']}>{t('students.profile.memberships')}</h2>
              <Link
                to="/admin/people/students/$studentId/groups"
                params={{ studentId: state.student.id }}
                className={styles['manage-link']}
              >
                <span>{t('students.profile.memberships.manage')}</span>
                <span aria-hidden="true" className="i-ph:caret-right" />
              </Link>
            </div>
            {!!state.memberships.length && (
              <div className={styles.memberships}>
                {state.memberships.map((group) => (
                  <LearningCard.Root key={group.id} render={<article />}>
                    <LearningCard.Row>
                      <LearningCard.Icon category={group.category} />
                      <LearningCard.Content>
                        <LearningCard.Title>{group.courseName}</LearningCard.Title>
                        <LearningCard.Description>{group.name}</LearningCard.Description>
                      </LearningCard.Content>
                    </LearningCard.Row>
                  </LearningCard.Root>
                ))}
              </div>
            )}
            {!state.memberships.length && (
              <p className={styles.empty}>{t('students.groups.empty')}</p>
            )}
          </section>
        </>
      )}
    </PageLayout.Root>
  )
}
