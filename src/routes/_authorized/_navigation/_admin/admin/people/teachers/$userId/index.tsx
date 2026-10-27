import { useTranslate } from '@kanjou/react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import * as v from 'valibot'

import { IconButton, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { getInitial } from '#/routes/-utils'

import { TeacherGroupRow } from '../-components'
import { useTeacherProfilePage } from '../-hooks'

import styles from './index.module.css'

const TeacherParamsSchema = v.object({
  userId: v.pipe(v.string(), v.regex(/^\d+$/), v.transform(Number), v.safeInteger(), v.minValue(1)),
})

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/people/teachers/$userId/',
)({
  head: () => ({ meta: [{ title: 'Профіль викладача | Robocoins' }] }),
  params: {
    parse: (params) => {
      const result = v.safeParse(TeacherParamsSchema, params)
      if (!result.success) throw notFound()
      return result.output
    },
  },
  component: TeacherProfilePage,
})

function TeacherProfilePage() {
  const { state, functions } = useTeacherProfilePage()

  const t = useTranslate()

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <IconButton
          onClick={functions.handleBack}
          title={t('admin.teachers.profile.back')}
          aria-label={t('admin.teachers.profile.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
      </header>

      {state.isPending && <Loader grow />}
      {state.notFound && (
        <div className={styles.empty}>
          <span aria-hidden="true" className="i-ph:user-minus-duotone" />
          <p>{t('admin.teachers.profile.not-found')}</p>
        </div>
      )}
      {!state.notFound && state.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={state.isRetrying}>
          {state.errorStatus === 401 && t('admin.teachers.error.unauthorized')}
          {state.errorStatus === 403 && t('admin.teachers.error.forbidden')}
          {state.errorStatus !== 401 &&
            state.errorStatus !== 403 &&
            t('admin.teachers.profile.error')}
        </InlineError>
      )}
      {!state.isPending && !state.isError && state.notTeacher && (
        <InlineError>{t('admin.teachers.profile.not-teacher')}</InlineError>
      )}
      {!state.isPending && !state.isError && state.isMismatch && (
        <InlineError>{t('admin.teachers.profile.mismatch')}</InlineError>
      )}

      {state.profile && (
        <>
          <article className={styles.identity}>
            <span className={styles.avatar} aria-hidden="true">
              {getInitial(state.name)}
            </span>
            <div className={styles['identity-info']}>
              <h1 className={styles.name}>{state.name}</h1>
              <span className={styles.role}>{t('role.teacher')}</span>
            </div>
          </article>

          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('admin.teachers.profile.groups')}</h2>
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
        </>
      )}
    </section>
  )
}
