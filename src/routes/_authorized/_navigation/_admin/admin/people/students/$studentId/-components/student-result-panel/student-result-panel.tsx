import { cn } from 'cn'
import type { ReactNode } from 'react'

import styles from './student-result-panel.module.css'

export interface StudentResultDetail {
  label: string
  value: string
}

export interface StudentResultPanelProps {
  title: string
  description: string
  details?: StudentResultDetail[]
  children?: ReactNode
  className?: string
}

export function StudentResultPanel({
  title,
  description,
  details,
  children,
  className,
}: StudentResultPanelProps) {
  return (
    <section className={cn(styles.panel, className)}>
      <div role="status" className={styles.summary}>
        <span aria-hidden="true" className={cn(styles.icon, 'i-ph:info')} />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        {!!details?.length && (
          <dl className={styles.details}>
            {details.map((detail) => (
              <div key={detail.label} className={styles.detail}>
                <dt className={styles.label}>{detail.label}</dt>
                <dd className={styles.value}>{detail.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      {children && <div className={styles.actions}>{children}</div>}
    </section>
  )
}
