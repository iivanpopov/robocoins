import { createFileRoute } from '@tanstack/react-router'

import { SettingsContent } from '#/routes/-components'
import { useSettingsPage } from '#/routes/-hooks'

import styles from '#/routes/-components/settings-content/settings-content.module.css'

export const Route = createFileRoute('/_student/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  const context = Route.useRouteContext()
  const { mutations, functions } = useSettingsPage()

  return (
    <section className={styles.page}>
      <SettingsContent
        name={context.user.name}
        isPending={mutations.logout.isPending}
        onLogout={functions.handleLogout}
      />
    </section>
  )
}
