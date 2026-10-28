import { useRender } from '@base-ui/react/use-render'
import { cn } from 'cn'
import type { ComponentProps } from 'react'

import type { CourseCategoryKey } from '#/api/types'

import { CategoryIcon } from '../category-icon'

import styles from './learning-card.module.css'

export interface LearningCardRootProps extends useRender.ComponentProps<'div'> {
  size?: 'md' | 'lg'
  selection?: 'highlight' | 'check'
}

function Root({
  size = 'md',
  selection = 'highlight',
  className,
  render,
  ...props
}: LearningCardRootProps) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: {
      ...props,
      'data-size': size,
      'data-selection': selection,
      className: cn(styles.root, className),
    },
  })
}

export interface LearningCardRowProps extends useRender.ComponentProps<'div'> {}

function Row({ className, render, ...props }: LearningCardRowProps) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: { ...props, className: cn(styles.row, className) },
  })
}

export interface LearningCardIconProps extends ComponentProps<'span'> {
  category?: CourseCategoryKey
}

function Icon({ category, children, className, ...props }: LearningCardIconProps) {
  return (
    <span
      {...props}
      aria-hidden="true"
      data-category={category}
      className={cn(styles.icon, className)}
    >
      {children}
      {!children && !!category && <CategoryIcon category={category} />}
    </span>
  )
}

function Content({ className, ...props }: ComponentProps<'span'>) {
  return <span {...props} className={cn(styles.content, className)} />
}

function Title({ className, ...props }: ComponentProps<'span'>) {
  return <span {...props} className={cn(styles.title, className)} />
}

function Description({ className, ...props }: ComponentProps<'span'>) {
  return <span {...props} className={cn(styles.description, className)} />
}

function Meta({ className, ...props }: ComponentProps<'span'>) {
  return <span {...props} className={cn(styles.meta, className)} />
}

export interface LearningCardIndicatorProps extends ComponentProps<'span'> {
  kind: 'navigate' | 'expand' | 'select'
}

function Indicator({ kind, className, ...props }: LearningCardIndicatorProps) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={cn(
        styles.indicator,
        kind === 'navigate' && 'i-ph:caret-right',
        kind === 'expand' && cn('i-ph:caret-down', styles.expand),
        kind === 'select' && cn('i-ph:check', styles.select),
        className,
      )}
    />
  )
}

function Actions({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn(styles.actions, className)} />
}

export const LearningCard = {
  Root,
  Row,
  Icon,
  Content,
  Title,
  Description,
  Meta,
  Indicator,
  Actions,
}
