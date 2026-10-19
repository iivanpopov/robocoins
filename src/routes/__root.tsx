import { Outlet, createRootRoute } from '@tanstack/react-router'

import { ResponseError } from '#/api/.kubb/client'
import { getCurrentUserAuthMeGet } from '#/api/clients/getCurrentUserAuthMeGet'
import { getCurrentUserAuthMeGetQueryKey } from '#/api/hooks/useGetCurrentUserAuthMeGet'
import { queryClient } from '#/lib/query'

export const Route = createRootRoute({
  beforeLoad: () => ({
    user: queryClient.query({
      queryKey: getCurrentUserAuthMeGetQueryKey(),
      queryFn: ({ signal }) =>
        getCurrentUserAuthMeGet({ signal })
          .unwrap()
          .catch((error) => {
            if (ResponseError.is(error) && error.status === 401) return null
            throw error
          }),
      retry: false,
    }),
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="h-dvh">
      <Outlet />
    </div>
  )
}
