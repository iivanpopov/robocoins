import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'
import { cn } from 'cn'
import { ComponentProps } from 'react'

import styles from './avatar.module.css'

export interface AvatarProps extends AvatarPrimitive.Root.Props {
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ className, size = 'md', ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      {...props}
      data-slot="avatar"
      data-size={size}
      className={cn(styles.avatar, className)}
    />
  )
}

export function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      draggable={false}
      {...props}
      data-slot="avatar-image"
      className={cn(styles.image, className)}
    />
  )
}

export function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      {...props}
      data-slot="avatar-fallback"
      className={cn(styles.fallback, className)}
    />
  )
}

export function AvatarBadge({ className, ...props }: ComponentProps<'span'>) {
  return <span {...props} data-slot="avatar-badge" className={cn(styles.badge, className)} />
}

export function AvatarGroup({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} data-slot="avatar-group" className={cn(styles.group, className)} />
}

export function AvatarGroupCount({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} data-slot="avatar-group-count" className={cn(styles.count, className)} />
}
