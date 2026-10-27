import { cn } from 'cn'
import type { ComponentProps } from 'react'

import styles from './admin-page-layout.module.css'

interface AdminPageLayoutRootProps extends ComponentProps<'section'> {
  bottomSpace?: boolean
}

interface AdminPageLayoutHeaderProps extends ComponentProps<'header'> {
  align?: 'start' | 'end'
  centered?: boolean
}

function AdminPageLayoutRoot({ bottomSpace, className, ...props }: AdminPageLayoutRootProps) {
  return (
    <section
      className={cn(styles.page, bottomSpace && styles['bottom-space'], className)}
      {...props}
    />
  )
}

function AdminPageLayoutHeader({
  align = 'start',
  centered,
  className,
  ...props
}: AdminPageLayoutHeaderProps) {
  return (
    <header
      className={cn(styles.header, centered && styles.centered, className)}
      data-align={align}
      {...props}
    />
  )
}

function AdminPageLayoutHeading({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn(styles.heading, className)} {...props} />
}

function AdminPageLayoutTitle({ className, ...props }: ComponentProps<'h1'>) {
  return <h1 className={cn(styles.title, className)} {...props} />
}

function AdminPageLayoutDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn(styles.description, className)} {...props} />
}

function AdminPageLayoutActions({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn(styles.actions, className)} {...props} />
}

export const AdminPageLayout = {
  Root: AdminPageLayoutRoot,
  Header: AdminPageLayoutHeader,
  Heading: AdminPageLayoutHeading,
  Title: AdminPageLayoutTitle,
  Description: AdminPageLayoutDescription,
  Actions: AdminPageLayoutActions,
}
