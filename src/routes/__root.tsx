import { Outlet, createRootRoute } from '@tanstack/react-router'

import { NotFound } from './-components/not-found'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <div className="h-dvh">
      <Outlet />
    </div>
  )
}
