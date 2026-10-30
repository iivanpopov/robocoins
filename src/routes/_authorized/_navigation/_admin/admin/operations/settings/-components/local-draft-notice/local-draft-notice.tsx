import type { ReactNode } from 'react'

import styles from './local-draft-notice.module.css'

export interface LocalDraftNoticeProps {
  title: string
  description: string
  children?: ReactNode
}

export function LocalDraftNotice({ title, description, children }: LocalDraftNoticeProps) {
  return (
    <section className={styles.notice} role="status">
      <span aria-hidden="true" className={styles.icon}>
        <span className="i-ph:info" />
      </span>
      <div className={styles.copy}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {children}
      </div>
    </section>
  )
}
