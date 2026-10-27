import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { Button, IconButton, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'

import { TeacherRow, TeacherSearch } from './-components'
import { useTeachersPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/people/teachers/')({
  head: () => ({ meta: [{ title: 'Викладачі | Robocoins' }] }),
  component: TeachersPage,
})

function TeachersPage() {
  const { state, functions } = useTeachersPage()

  const t = useTranslate()

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div className={styles.heading}>
          <IconButton
            nativeButton={false}
            render={<Link to="/admin/people" />}
            title={t('admin.teachers.back')}
            aria-label={t('admin.teachers.back')}
          >
            <span aria-hidden="true" className="i-ph:arrow-left" />
          </IconButton>
          <div className={styles['header-text']}>
            <h1 className={styles.title}>{t('admin.teachers.title')}</h1>
            <p className={styles.description}>{t('admin.teachers.description')}</p>
          </div>
        </div>
        <div className={styles['header-actions']}>
          <Button type="button" onClick={functions.handleRegister}>
            <span aria-hidden="true" className="i-ph:plus-bold" />
            {t('admin.teachers.register')}
          </Button>
        </div>
      </header>

      <TeacherSearch
        searchQuery={state.searchQuery}
        onSearchChange={functions.handleSearchChange}
      />

      {state.isPending && <Loader grow />}
      {state.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={state.isRetrying}>
          {state.errorStatus === 401 && t('admin.teachers.error.unauthorized')}
          {state.errorStatus === 403 && t('admin.teachers.error.forbidden')}
          {state.errorStatus !== 401 && state.errorStatus !== 403 && t('admin.teachers.error')}
        </InlineError>
      )}
      {state.isReady && !state.teachers.length && (
        <div className={styles.empty}>
          <span aria-hidden="true" className="i-ph:users-three-duotone" />
          <p>
            {state.hasSearch && t('admin.teachers.search.empty')}
            {!state.hasSearch && t('admin.teachers.empty')}
          </p>
        </div>
      )}
      {state.isReady && !!state.teachers.length && (
        <div className={styles.list}>
          {state.teachers.map((teacher) => (
            <TeacherRow key={teacher.userId} teacher={teacher} />
          ))}
        </div>
      )}
    </section>
  )
}
