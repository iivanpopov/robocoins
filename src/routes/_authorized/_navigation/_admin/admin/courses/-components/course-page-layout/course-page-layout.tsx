import { cn } from 'cn'
import type { ReactNode } from 'react'

import styles from './course-page-layout.module.css'

export interface CoursePageLayoutProps {
  title: string
  description?: string
  back?: ReactNode
  actions?: ReactNode
  children: ReactNode
  className?: string
}

export function CoursePageLayout({
  title,
  description,
  back,
  actions,
  children,
  className,
}: CoursePageLayoutProps) {
  return (
    <section className={cn(styles.page, className)}>
      <header className={styles.header}>
        <div className={styles.heading}>
          {back}
          <div className={styles.copy}>
            <h1 className={styles.title}>{title}</h1>
            {description && <p className={styles.description}>{description}</p>}
          </div>
        </div>
      </header>
      {actions && <div className={styles.actions}>{actions}</div>}
      {children}
    </section>
  )
}
