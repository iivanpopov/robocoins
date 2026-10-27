import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import * as v from 'valibot'

import { getCoursesCourseGetQueryOptions } from '#/api/hooks/useGetCoursesCourseGet'
import { getStudentByIdStudentStudentIdGetQueryOptions } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { IconButton, Loader } from '#/components/ui'
import { CategoryIcon } from '#/routes/-components'

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
    <section className={styles.page}>
      <header className={styles.header}>
        <IconButton onClick={functions.handleBack} title={t('students.profile.back')}>
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <div className={styles['header-copy']}>
          <h1 className={styles.title}>{state.student?.name ?? t('students.profile.title')}</h1>
          {!!state.student && <p className={styles.role}>{t('role.student')}</p>}
        </div>
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
          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('students.profile.manage')}</h2>
            <div className={styles.actions}>
              <Link
                to="/admin/people/students/$studentId/edit"
                params={{ studentId: state.student.id }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:pencil-simple-duotone" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('students.edit.title')}</span>
                  <span className={styles['action-description']}>
                    {t('students.edit.description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </Link>

              <Link
                to="/admin/people/students/$studentId/access"
                params={{ studentId: state.student.id }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:key-duotone" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('students.access.title')}</span>
                  <span className={styles['action-description']}>
                    {t('students.access.description-empty')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </Link>

              <Link
                to="/admin/people/students/$studentId/balance"
                params={{ studentId: state.student.id }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:coins-duotone" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('admin.balance.profile.link')}</span>
                  <span className={styles['action-description']}>
                    {t('admin.balance.profile.description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </Link>

              <Link
                to="/admin/people/students/$studentId/streak"
                params={{ studentId: state.student.id }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:fire-duotone" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('admin.streak.title')}</span>
                  <span className={styles['action-description']}>
                    {t('admin.streak.description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </Link>

              <Link
                to="/admin/people/students/$studentId/delete"
                params={{ studentId: state.student.id }}
                className={styles.action}
                data-tone="error"
              >
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:user-minus-duotone" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('students.delete.title')}</span>
                  <span className={styles['action-description']}>
                    {t('students.profile.delete-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </Link>
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
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </Link>
            </div>
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
        </>
      )}
    </section>
  )
}
