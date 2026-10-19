import { createLink, useLocation } from '@tanstack/react-router'
import { cn } from 'cn'
import { createContext, useContext, type ComponentProps } from 'react'

import styles from './navbar.module.css'

const NavbarPathsContext = createContext<string[]>([])

function NavbarRoot({ paths, ...props }: ComponentProps<'nav'> & { paths: string[] }) {
  return (
    <NavbarPathsContext.Provider value={paths}>
      <nav {...props} className={cn(styles.navbar, props.className)} />
    </NavbarPathsContext.Provider>
  )
}

function NavbarLink(props: ComponentProps<'a'>) {
  return <a {...props} className={cn(styles.item, props.className)} />
}

const RouterNavbarLink = createLink(NavbarLink)

function NavbarItem(props: ComponentProps<typeof RouterNavbarLink>) {
  const paths = useContext(NavbarPathsContext)
  const location = useLocation()
  const currentIndex = paths.indexOf(location.pathname.replace(/\/$/, '') || '/')
  const nextIndex = paths.indexOf(String(props.to).replace(/\/$/, '') || '/')
  let viewTransition: ComponentProps<typeof RouterNavbarLink>['viewTransition'] = false

  if (currentIndex >= 0 && nextIndex >= 0 && currentIndex !== nextIndex) {
    let direction = 'slide-forward'
    if (nextIndex < currentIndex) direction = 'slide-backward'
    viewTransition = { types: [direction] }
  }

  return (
    <RouterNavbarLink activeOptions={{ exact: true }} {...props} viewTransition={viewTransition} />
  )
}

export const Navbar = Object.assign(NavbarRoot, {
  Item: NavbarItem,
})
