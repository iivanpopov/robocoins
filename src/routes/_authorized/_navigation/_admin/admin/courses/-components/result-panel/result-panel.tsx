import { cn } from 'cn'
import type { ReactNode } from 'react'

import styles from './result-panel.module.css'

export interface ResultPanelDetail {
  label: string
  value: string
}

export interface ResultPanelProps {
  tone: 'success' | 'local'
  title: string
  description: string
  details?: ResultPanelDetail[]
  children?: ReactNode
  className?: string
}

export function ResultPanel({
  tone,
  title,
  description,
  details,
  children,
  className,
}: ResultPanelProps) {
  return (
    <section className={cn(styles.panel, className)} data-tone={tone}>
      <span
        aria-hidden="true"
        className={cn(
          styles.icon,
          tone === 'success' && 'i-ph:check-circle-duotone',
          tone === 'local' && 'i-ph:info-duotone',
        )}
      />
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
      {children && <div className={styles.actions}>{children}</div>}
    </section>
  )
}
