import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'

import { Button, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { AdminPageLayout } from '#/routes/_authorized/_navigation/_admin/admin/-components'

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
    <AdminPageLayout.Root>
      <AdminPageLayout.Header className={styles.header}>
        <AdminPageLayout.Heading>
          <AdminPageLayout.Title>{t('teachers.title')}</AdminPageLayout.Title>
        </AdminPageLayout.Heading>
        <AdminPageLayout.Actions>
          <Button type="button" onClick={functions.handleRegister}>
            <span aria-hidden="true" className="i-ph:plus-bold" />
            {t('action.register')}
          </Button>
        </AdminPageLayout.Actions>
      </AdminPageLayout.Header>

      <TeacherSearch
        searchQuery={state.searchQuery}
        onSearchChange={functions.handleSearchChange}
      />

      {state.isPending && <Loader grow />}
      {state.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={state.isRetrying}>
          {state.errorStatus === 401 && t('error.session')}
          {state.errorStatus === 403 && t('admin.teachers.error.forbidden')}
          {state.errorStatus !== 401 && state.errorStatus !== 403 && t('admin.teachers.error')}
        </InlineError>
      )}
      {state.isReady && !state.teachers.length && (
        <div className={styles.empty}>
          <span aria-hidden="true" className="i-ph:users-three-duotone" />
          <p>
            {state.hasSearch && t('admin.teachers.search.empty')}
            {!state.hasSearch && t('teachers.empty')}
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
    </AdminPageLayout.Root>
  )
}
