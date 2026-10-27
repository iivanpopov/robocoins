// @unocss-include

import { useNavigate, useRouteContext, type NavigateOptions } from '@tanstack/react-router'

import type { UserRoleKey } from '#/api/types'
import { useResolvedPathname } from '#/routes/-hooks'
import { getTabViewTransition } from '#/routes/-utils'

interface NavigationItem {
  to: NonNullable<NavigateOptions['to']>
  path?: NonNullable<NavigateOptions['to']>
  icon: string
  label: string
}

const NAVIGATION_ITEMS = {
  admin: [
    { to: '/settings', icon: 'i-ph:gear-bold', label: 'navbar.settings' },
    { to: '/admin', icon: 'i-ph:graduation-cap-bold', label: 'navbar.learning' },
    {
      to: '/admin/people',
      path: '/admin/people/students',
      icon: 'i-ph:users-three-bold',
      label: 'people.title',
    },
    { to: '/admin/catalog', icon: 'i-ph:storefront-bold', label: 'navbar.catalog' },
  ],
  teacher: [
    { to: '/settings', icon: 'i-ph:gear', label: 'navbar.settings' },
    { to: '/group', icon: 'i-ph:users-three', label: 'groups.title' },
  ],
  student: [
    { to: '/settings', icon: 'i-ph:gear-bold', label: 'navbar.settings' },
    { to: '/', icon: 'i-ph:house-bold', label: 'navbar.home' },
    { to: '/shop', icon: 'i-ph:planet-bold', label: 'navbar.shop' },
  ],
} as const satisfies Record<UserRoleKey, readonly NavigationItem[]>

function getActivePath(items: readonly NavigationItem[], currentPath: string) {
  const matches = items
    .map((item) => item.to)
    .filter((to) => {
      if (to === currentPath) return true
      if (to === '/') return false
      return currentPath.startsWith(`${to}/`)
    })
    .sort((first, second) => second.length - first.length)

  return matches[0] ?? currentPath
}

export function useAppNavbar() {
  const { user } = useRouteContext({ from: '/_authorized' })
  const role = user?.role ?? 'student'

  const navigate = useNavigate()
  const currentPath = useResolvedPathname()

  function handleNavigate(to: NonNullable<NavigateOptions['to']>) {
    const items = NAVIGATION_ITEMS[role]
    const item = items.find((candidate) => candidate.to === to)
    let target: NonNullable<NavigateOptions['to']> = to
    if (item && 'path' in item && item.path) target = item.path
    if (target === currentPath) return

    const currentIndex = items.findIndex((item) => item.to === getActivePath(items, currentPath))
    const nextIndex = items.findIndex((item) => item.to === to)
    const viewTransition = getTabViewTransition(currentIndex, nextIndex)

    return navigate({ to: target, viewTransition })
  }

  const items = NAVIGATION_ITEMS[role]
  const activePath = getActivePath(items, currentPath)

  return { activePath, currentPath, handleNavigate, items }
}
