// @unocss-include
import {
  useLocation,
  useNavigate,
  useRouteContext,
  type NavigateOptions,
} from '@tanstack/react-router'

const NAVIGATION_ITEMS = {
  teacher: [
    { to: '/settings', icon: 'i-ph:gear', label: 'navbar.settings' },
    { to: '/group', icon: 'i-ph:users-three', label: 'navbar.groups' },
  ],
  student: [
    { to: '/settings', icon: 'i-ph:gear-bold', label: 'navbar.settings' },
    { to: '/', icon: 'i-ph:house-bold', label: 'navbar.home' },
    { to: '/shop', icon: 'i-ph:planet-bold', label: 'navbar.shop' },
  ],
} as const

export function useAppNavbar() {
  const { user } = useRouteContext({ from: '/_authorized' })
  const role = user?.role!

  const navigate = useNavigate()
  const pathname = useLocation({ select: (location) => location.pathname })
  const currentPath = pathname.replace(/\/+$/, '') || '/'

  function handleNavigate(to: NonNullable<NavigateOptions['to']>) {
    if (to === currentPath) return

    const items = NAVIGATION_ITEMS[role]
    const currentIndex = items.findIndex((item) => item.to === currentPath)
    const nextIndex = items.findIndex((item) => item.to === to)
    let viewTransition: NavigateOptions['viewTransition'] = false

    if (currentIndex >= 0 && nextIndex >= 0 && currentIndex !== nextIndex) {
      let direction = 'slide-forward'
      if (nextIndex < currentIndex) direction = 'slide-backward'
      viewTransition = { types: [direction] }
    }

    return navigate({ to, viewTransition })
  }

  const items = NAVIGATION_ITEMS[role]

  return { currentPath, handleNavigate, items }
}
