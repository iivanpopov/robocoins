import { cn } from 'cn'
import type { ComponentProps, MouseEvent, ReactNode } from 'react'

import { focusInputGroup } from '../utils'

import styles from './hero-input-group.module.css'

export interface HeroInputGroupProps extends ComponentProps<'div'> {
  children?: ReactNode
}

export function HeroInputGroup({ className, children, onClick, ...props }: HeroInputGroupProps) {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event)
    focusInputGroup(event, event.currentTarget)
  }

  return (
    <div
      {...props}
      role="group"
      data-slot="input-group"
      className={cn(styles.group, className)}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

export interface HeroInputGroupButtonProps extends ComponentProps<'button'> {}

export function HeroInputGroupButton({
  className,
  type = 'button',
  ...props
}: HeroInputGroupButtonProps) {
  return (
    <button
      {...props}
      type={type}
      data-slot="input-group-button"
      className={cn(styles.button, className)}
    />
  )
}
