import { cn } from 'cn'
import type { ReactNode } from 'react'

import styles from './course-empty-state.module.css'

export interface CourseEmptyStateProps {
  icon: string
  title: string
  description?: string
  children?: ReactNode
  className?: string
}

export function CourseEmptyState({
  icon,
  title,
  description,
  children,
  className,
}: CourseEmptyStateProps) {
  return (
    <div className={cn(styles.empty, className)}>
      <span aria-hidden="true" className={cn(icon, styles.icon)} />
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  )
}
