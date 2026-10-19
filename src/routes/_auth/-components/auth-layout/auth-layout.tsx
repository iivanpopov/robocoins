import { cn } from 'cn'
import type { ComponentProps } from 'react'

import styles from './auth-layout.module.css'

function AuthLayoutRoot({ className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div {...props} className={cn(styles.root, className)}>
      {children}
    </div>
  )
}

function AuthLayoutTop({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn(styles.top, className)} />
}

function AuthLayoutBottom({ className, ...props }: ComponentProps<'div'>) {
  return (
    <>
      <div aria-hidden="true" className={styles.spacer} />
      <div {...props} className={cn(styles.bottom, className)} />
    </>
  )
}

export const AuthLayout = {
  Root: AuthLayoutRoot,
  Top: AuthLayoutTop,
  Bottom: AuthLayoutBottom,
}
