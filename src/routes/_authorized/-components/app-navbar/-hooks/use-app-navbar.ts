import { useLocation, useNavigate, type NavigateOptions } from '@tanstack/react-router'

export function useAppNavbar(paths: readonly NonNullable<NavigateOptions['to']>[]) {
  const navigate = useNavigate()
  const pathname = useLocation({ select: (location) => location.pathname })
  const currentPath = pathname.replace(/\/+$/, '') || '/'

  function handleNavigate(to: NonNullable<NavigateOptions['to']>) {
    if (to === currentPath) return

    const currentIndex = paths.findIndex((path) => path === currentPath)
    const nextIndex = paths.indexOf(to)
    let viewTransition: NavigateOptions['viewTransition'] = false

    if (currentIndex >= 0 && nextIndex >= 0 && currentIndex !== nextIndex) {
      let direction = 'slide-forward'
      if (nextIndex < currentIndex) direction = 'slide-backward'
      viewTransition = { types: [direction] }
    }

    return navigate({ to, viewTransition })
  }

  return { currentPath, handleNavigate }
}
