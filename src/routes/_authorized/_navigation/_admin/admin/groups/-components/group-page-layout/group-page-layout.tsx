import { cn } from 'cn'
import type { ReactNode } from 'react'

import styles from './group-page-layout.module.css'

export interface GroupPageLayoutProps {
  title: ReactNode
  description?: ReactNode
  back?: ReactNode
  children: ReactNode
  className?: string
}

export function GroupPageLayout({
  title,
  description,
  back,
  children,
  className,
}: GroupPageLayoutProps) {
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
      {children}
    </section>
  )
}
