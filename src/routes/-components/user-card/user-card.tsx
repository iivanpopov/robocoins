import { useRender } from '@base-ui/react/use-render'
import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import type { ComponentProps } from 'react'

import { UserAvatar, type UserAvatarProps } from '../user-avatar'

import styles from './user-card.module.css'

export interface UserCardRootProps extends useRender.ComponentProps<'div'> {
  selected?: boolean
}

function Root({ selected, className, render, ...props }: UserCardRootProps) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: { ...props, 'data-selected': selected, className: cn(styles.root, className) },
  })
}

function Avatar({ size = 'lg', ...props }: UserAvatarProps) {
  return <UserAvatar {...props} size={size} />
}

export interface UserCardContentProps extends useRender.ComponentProps<'span'> {}

function Content({ className, render, ...props }: UserCardContentProps) {
  return useRender({
    defaultTagName: 'span',
    render,
    props: { ...props, className: cn(styles.content, className) },
  })
}

function Name({ className, ...props }: ComponentProps<'span'>) {
  return <span {...props} className={cn(styles.name, className)} />
}

function Description({ className, ...props }: ComponentProps<'span'>) {
  return <span {...props} className={cn(styles.description, className)} />
}

function Meta({ className, ...props }: ComponentProps<'span'>) {
  return <span {...props} className={cn(styles.meta, className)} />
}

export interface UserCardBalanceProps extends ComponentProps<'span'> {
  value: number
}

function Balance({ value, className, ...props }: UserCardBalanceProps) {
  const t = useTranslate()

  return (
    <span
      {...props}
      className={cn(styles.balance, className)}
      aria-label={`${t('coins.amount', { count: value })} ${t('coins.unit', { count: value })}`}
    >
      <span aria-hidden="true" className={cn('i-ph:coins', styles['balance-icon'])} />
      <span aria-hidden="true">{t('coins.amount', { count: value })}</span>
    </span>
  )
}

function Indicator({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={cn('i-ph:caret-right', styles.indicator, className)}
    />
  )
}

export const UserCard = { Root, Avatar, Content, Name, Description, Meta, Balance, Indicator }
