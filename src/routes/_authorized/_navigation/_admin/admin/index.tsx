import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'

import { AdminGroupRow } from './-components'
import { useAdminGroupsPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/')({
  head: () => ({ meta: [{ title: 'Навчання | Robocoins' }] }),
  component: AdminGroupsPage,
})

function AdminGroupsPage() {
  const { state, functions } = useAdminGroupsPage()

  const t = useTranslate()

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('admin.groups.title')}</h1>
        <p className={styles.description}>{t('admin.groups.description')}</p>
      </header>

      <Link to="/admin/courses" className={styles['courses-link']}>
        <span
          aria-hidden="true"
          className={cn('i-ph:books-duotone', styles['courses-link-icon'])}
        />
        <span>{t('admin.courses.link')}</span>
        <span
          aria-hidden="true"
          className={cn('i-ph:caret-right-bold', styles['courses-link-caret'])}
        />
      </Link>

      {state.isPending && <Loader grow />}
      {state.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={state.isRetrying}>
          {t('admin.groups.error')}
        </InlineError>
      )}
      {!state.isPending && !state.isError && !state.groups.length && (
        <div className={styles.empty}>
          <span aria-hidden="true" className="i-ph:users-three-duotone" />
          <p>{t('admin.groups.empty')}</p>
        </div>
      )}
      {!state.isPending && !state.isError && !!state.groups.length && (
        <div className={styles.groups}>
          {state.groups.map((group) => (
            <AdminGroupRow key={group.id} group={group} />
          ))}
        </div>
      )}
    </section>
  )
}
