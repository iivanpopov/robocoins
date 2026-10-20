import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'

import { Button, Loader } from '#/components/ui'

import { useSettingsPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  const t = useTranslate()
  const { state, mutations, functions } = useSettingsPage()

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{t('navbar.settings')}</h1>
      <dl className={styles.details}>
        <dt className={styles.label}>{t('settings.name')}</dt>
        <dd className={styles.name}>{state.user.name}</dd>
      </dl>
      <Button onClick={functions.handleLogout} disabled={mutations.logout.isPending}>
        {!mutations.logout.isPending && <span aria-hidden="true" className="i-ph:sign-out-bold" />}
        {mutations.logout.isPending && <Loader />}
        {t('settings.logout')}
      </Button>
    </section>
  )
}
