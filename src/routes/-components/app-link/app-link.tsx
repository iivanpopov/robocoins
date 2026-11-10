import { createLink } from '@tanstack/react-router'
import type { ComponentProps } from 'react'

import { cn } from '#/utils/cn'

import styles from './app-link.module.css'

type _LinkProps = ComponentProps<'a'>

function _Link({ className, ...props }: _LinkProps) {
  return <a {...props} className={cn(styles.link, className)} />
}

export const AppLink = createLink(_Link)
