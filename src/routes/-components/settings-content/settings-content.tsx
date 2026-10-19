import { useTranslate } from '@kanjou/react'

import { Button, Loader } from '#/components/ui'

import styles from './settings-content.module.css'

interface SettingsContentProps {
  name: string
  isPending: boolean
  onLogout: () => void
}

export function SettingsContent(props: SettingsContentProps) {
  const t = useTranslate()

  return (
    <>
      <h1 className={styles.title}>{t('navbar.settings')}</h1>
      <dl className={styles.details}>
        <dt className={styles.label}>{t('settings.name')}</dt>
        <dd className={styles.name}>{props.name}</dd>
      </dl>
      <Button onClick={props.onLogout} disabled={props.isPending}>
        {!props.isPending && <span aria-hidden="true" className="i-ph:sign-out-bold" />}
        {props.isPending && <Loader />}
        {t('settings.logout')}
      </Button>
    </>
  )
}
