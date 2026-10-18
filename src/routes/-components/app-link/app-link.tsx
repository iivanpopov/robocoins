import { Link } from '@tanstack/react-router'
import { cn } from 'cn'
import type { ComponentProps } from 'react'

import styles from './app-link.module.css'

type AppLinkProps = ComponentProps<typeof Link>

export function AppLink(props: AppLinkProps) {
  return <Link {...props} className={cn(styles.link, props.className)} />
}
