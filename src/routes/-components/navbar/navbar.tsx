import { createLink } from '@tanstack/react-router'
import { cn } from 'cn'
import type { ComponentProps } from 'react'

import styles from './navbar.module.css'

function NavbarRoot(props: ComponentProps<'nav'>) {
  return <nav {...props} className={cn(styles.navbar, props.className)} />
}

function NavbarLink(props: ComponentProps<'a'>) {
  return <a {...props} className={cn(styles.item, props.className)} />
}

export const Navbar = Object.assign(NavbarRoot, {
  Item: createLink(NavbarLink),
})
