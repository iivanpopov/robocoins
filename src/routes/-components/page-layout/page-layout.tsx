import { useRender } from '@base-ui/react/use-render'
import type { ComponentProps } from 'react'

import { cn } from '#/utils/cn'

import styles from './page-layout.module.css'

export type PageLayoutVariant = 'compact' | 'comfortable'

export interface PageLayoutRootProps extends useRender.ComponentProps<'section'> {
  bottomSpace?: boolean
  variant?: PageLayoutVariant
}

export interface PageLayoutHeaderProps extends ComponentProps<'header'> {
  align?: 'start' | 'end'
  centered?: boolean
  size?: 'default' | 'compact'
}

function Root(props: PageLayoutRootProps) {
  return useRender({
    defaultTagName: 'section',
    render: props.render,
    props: {
      ...props,
      className: cn(styles.page, props.bottomSpace && styles['bottom-space'], props.className),
      'data-variant': props.variant ?? 'compact',
      bottomSpace: undefined,
      render: undefined,
      variant: undefined,
    },
  })
}

function Header({
  align = 'start',
  centered,
  size = 'default',
  className,
  ...props
}: PageLayoutHeaderProps) {
  return (
    <header
      className={cn(styles.header, centered && styles.centered, className)}
      data-align={align}
      data-size={size}
      {...props}
    />
  )
}

function Heading({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn(styles.heading, className)} {...props} />
}

function Title({ className, ...props }: ComponentProps<'h1'>) {
  return <h1 className={cn(styles.title, className)} {...props} />
}

function Description({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn(styles.description, className)} {...props} />
}

function Actions({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn(styles.actions, className)} {...props} />
}

export const PageLayout = { Root, Header, Heading, Title, Description, Actions }
