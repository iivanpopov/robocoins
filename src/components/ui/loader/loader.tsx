import { cn } from 'cn'
import { ComponentProps } from 'react'

import styles from './loader.module.css'

export interface LoaderProps extends ComponentProps<'div'> {
  grow?: boolean
}

export function Loader({ grow, className, ...props }: LoaderProps) {
  return (
    <div {...props} className={cn(styles.loader, grow && styles.grow, className)}>
      <div className={cn('i-ph:circle-notch', styles.icon)} />
    </div>
  )
}
