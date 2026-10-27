// @unocss-include

import {
  useLocation,
  useNavigate,
  useRouteContext,
  type NavigateOptions,
} from '@tanstack/react-router'

import type { UserRoleKey } from '#/api/types'

interface NavigationItem {
  to: NonNullable<NavigateOptions['to']>
  icon: string
  label: string
}

const NAVIGATION_ITEMS = {
  admin: [
    { to: '/admin', icon: 'i-ph:graduation-cap-bold', label: 'navbar.learning' },
    { to: '/admin/people', icon: 'i-ph:users-three-bold', label: 'navbar.people' },
    { to: '/admin/catalog', icon: 'i-ph:storefront-bold', label: 'navbar.catalog' },
    { to: '/settings', icon: 'i-ph:gear-bold', label: 'navbar.settings' },
  ],
  teacher: [
    { to: '/settings', icon: 'i-ph:gear', label: 'navbar.settings' },
    { to: '/group', icon: 'i-ph:users-three', label: 'navbar.groups' },
  ],
  student: [
    { to: '/settings', icon: 'i-ph:gear-bold', label: 'navbar.settings' },
    { to: '/', icon: 'i-ph:house-bold', label: 'navbar.home' },
    { to: '/shop', icon: 'i-ph:planet-bold', label: 'navbar.shop' },
  ],
} as const satisfies Record<UserRoleKey, readonly NavigationItem[]>

export function useAppNavbar() {
  const { user } = useRouteContext({ from: '/_authorized' })
  const role = user?.role ?? 'student'

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
