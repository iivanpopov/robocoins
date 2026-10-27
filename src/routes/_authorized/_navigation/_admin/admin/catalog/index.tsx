import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'

import { SectionPlaceholder } from '../-components'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/catalog/')({
  head: () => ({ meta: [{ title: 'Каталог | Robocoins' }] }),
  component: CatalogPage,
})

function CatalogPage() {
  const t = useTranslate()

  return (
    <SectionPlaceholder
      title={t('admin.catalog.title')}
      description={t('admin.catalog.description')}
    />
  )
}
