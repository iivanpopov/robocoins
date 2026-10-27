import { cn } from 'cn'
import type { ReactNode } from 'react'

import styles from './teacher-result-panel.module.css'

export interface TeacherResultDetail {
  label: string
  value: string
}

export interface TeacherResultPanelProps {
  title: string
  description: string
  details?: TeacherResultDetail[]
  children?: ReactNode
  className?: string
}

export function TeacherResultPanel({
  title,
  description,
  details,
  children,
  className,
}: TeacherResultPanelProps) {
  return (
    <section className={cn(styles.panel, className)}>
      <div role="status" className={styles.summary}>
        <span aria-hidden="true" className={cn(styles.icon, 'i-ph:info-duotone')} />
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
