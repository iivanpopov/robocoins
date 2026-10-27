import { cn } from 'cn'
import type { ReactNode } from 'react'

import styles from './course-page-layout.module.css'

export interface CoursePageLayoutProps {
  title: ReactNode
  description?: ReactNode
  back?: ReactNode
  headingAction?: ReactNode
  actions?: ReactNode
  children: ReactNode
  className?: string
}

export function CoursePageLayout({
  title,
  description,
  back,
  headingAction,
  actions,
  children,
  className,
}: CoursePageLayoutProps) {
  return (
    <section className={cn(styles.page, className)}>
      <header className={styles.header}>
        <div className={cn(styles.heading, back && !headingAction && styles['heading-split'])}>
          {back}
          <div className={styles.copy}>
            <h1 className={styles.title}>{title}</h1>
          </div>
          {headingAction && <div className={styles['heading-action']}>{headingAction}</div>}
        </div>
        {description && <p className={styles.description}>{description}</p>}
      </header>
      {actions && <div className={styles.actions}>{actions}</div>}
      {children}
    </section>
  )
}
