import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/catalog')({
  component: CatalogLayout,
})

function CatalogLayout() {
  return <Outlet />
}
