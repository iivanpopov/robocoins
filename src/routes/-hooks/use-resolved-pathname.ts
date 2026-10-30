import { useRouterState } from '@tanstack/react-router'

export function useResolvedPathname() {
  const pathname = useRouterState({
    select: (state) => (state.resolvedLocation ?? state.location).pathname,
  })

  return pathname.replace(/\/+$/, '') || '/'
}
