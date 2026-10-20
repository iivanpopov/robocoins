import { Button as ButtonPrimitive } from '@base-ui/react'
import { cn } from 'cn'
import { type ComponentProps } from 'react'

import styles from './navbar.module.css'

export interface NavbarProps extends ComponentProps<'nav'> {}

export function Navbar({ className, ...props }: NavbarProps) {
  return <nav {...props} className={cn(styles.navbar, className)} />
}

export interface NavbarItemProps extends ButtonPrimitive.Props {
  active?: boolean
}

export function NavbarItem({ active = false, className, ...props }: NavbarItemProps) {
  return (
    <ButtonPrimitive
      aria-current={active && 'page'}
      {...props}
      data-active={active}
      className={cn(styles.item, className)}
    />
  )
}
