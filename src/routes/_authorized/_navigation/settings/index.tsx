import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'

import { Button, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'

import { useSettingsPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/settings/')({
  component: SettingsPage,
})

function SettingsPage() {
  const t = useTranslate()
  const { state, queries, mutations, functions } = useSettingsPage()

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{t('navbar.settings')}</h1>
      <dl className={styles.details}>
        <dt className={styles.label}>{t('settings.name')}</dt>
        <dd className={styles.name}>{state.user?.name}</dd>
        {state.isPasswordVisible && queries.credentials.isSuccess && (
          <>
            <dt className={styles.label}>{t('settings.password')}</dt>
            <dd className={styles.name}>{queries.credentials.data.access_code}</dd>
          </>
        )}
      </dl>
      {state.user?.role === 'student' && (
        <>
          {state.isPasswordVisible && queries.credentials.isError && (
            <InlineError
              onRetry={functions.handleRetryCredentials}
              isRetrying={queries.credentials.isFetching}
            >
              {t('settings.credentials.error')}
            </InlineError>
          )}
          <Button variant="ghost" onClick={functions.handleTogglePassword}>
            {state.isPasswordVisible && queries.credentials.isFetching && <Loader />}
            {state.isPasswordVisible && !queries.credentials.isFetching && (
              <div aria-hidden="true" className="i-ph:eye-slash-bold" />
            )}
            {!state.isPasswordVisible && <div aria-hidden="true" className="i-ph:eye-bold" />}
            {state.isPasswordVisible && t('field.password.hide')}
            {!state.isPasswordVisible && t('field.password.show')}
          </Button>
        </>
      )}
      <Button onClick={functions.handleLogout} disabled={mutations.logout.isPending}>
        {!mutations.logout.isPending && <span aria-hidden="true" className="i-ph:sign-out-bold" />}
        {mutations.logout.isPending && <Loader />}
        {t('settings.logout')}
      </Button>
    </section>
  )
}
