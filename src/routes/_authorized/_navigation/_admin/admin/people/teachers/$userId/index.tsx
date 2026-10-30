import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'

import { IconButton, Loader } from '#/components/ui'
// import { Link } from '@tanstack/react-router'
import { PageLayout } from '#/routes/-components/page-layout'

import { TeacherGroupRow, TeacherRequestError, TeacherUnavailable } from '../-components'
import { useTeacherProfilePage } from '../-hooks'
import { parseTeacherIdParams } from '../-utils'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/people/teachers/$userId/',
)({
  head: () => ({ meta: [{ title: 'Профіль викладача | Robocoins' }] }),
  params: { parse: (params) => parseTeacherIdParams(params) },
  component: TeacherProfilePage,
})

function TeacherProfilePage() {
  const { state, functions } = useTeacherProfilePage()

  const t = useTranslate()

  return (
    <PageLayout.Root bottomSpace>
      <PageLayout.Header>
        <IconButton
          onClick={functions.handleBack}
          title={t('admin.teachers.profile.back')}
          aria-label={t('admin.teachers.profile.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <PageLayout.Heading>
          <PageLayout.Title>{state.name ?? t('role.teacher')}</PageLayout.Title>
          {state.profile && <PageLayout.Description>{t('role.teacher')}</PageLayout.Description>}
        </PageLayout.Heading>
      </PageLayout.Header>
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

      {state.profile && (
        <>
          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('groups.title')}</h2>
            {!!state.groups.length && (
              <div className={styles.groups}>
                {state.groups.map((group) => (
                  <TeacherGroupRow key={group.id} group={group} />
                ))}
              </div>
            )}
            {!state.groups.length && (
              <p className={styles['groups-empty']}>{t('admin.teachers.profile.groups.empty')}</p>
            )}
          </section>

          {/* No API integration: rename, access management, and deletion only update local state.
          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('admin.teachers.profile.manage')}</h2>
            <div className={styles.actions}>
              <Link
                to="/admin/people/teachers/$userId/rename"
                params={{ userId: state.teacherId }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:pencil-simple" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>
                    {t('admin.teachers.profile.rename')}
                  </span>
                  <span className={styles['action-description']}>
                    {t('admin.teachers.profile.rename-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right" />
              </Link>
              <Link
                to="/admin/people/teachers/$userId/access"
                params={{ userId: state.teacherId }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:lock-key" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>
                    {t('admin.teachers.profile.access')}
                  </span>
                  <span className={styles['action-description']}>
                    {t('admin.teachers.profile.access-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right" />
              </Link>
              <Link
                to="/admin/people/teachers/$userId/delete"
                params={{ userId: state.teacherId }}
                className={styles.action}
                data-tone="error"
              >
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:trash" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>
                    {t('admin.teachers.delete.action')}
                  </span>
                  <span className={styles['action-description']}>
                    {t('admin.teachers.profile.delete-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right" />
              </Link>
            </div>
          </section>
          */}
        </>
      )}
    </PageLayout.Root>
  )
}
