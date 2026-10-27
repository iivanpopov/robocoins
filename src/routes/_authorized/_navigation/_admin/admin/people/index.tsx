import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'

import { SectionPlaceholder } from '../-components'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/people/')({
  head: () => ({ meta: [{ title: 'Люди | Robocoins' }] }),
  component: PeoplePage,
})

function PeoplePage() {
  const t = useTranslate()

  return (
    <SectionPlaceholder
      title={t('admin.people.title')}
      description={t('admin.people.description')}
    />
  )
}
