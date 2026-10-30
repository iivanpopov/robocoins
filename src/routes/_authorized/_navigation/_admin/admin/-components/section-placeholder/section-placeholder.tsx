import { cn } from 'cn'

import styles from './section-placeholder.module.css'

export interface SectionPlaceholderProps {
  title: string
  description: string
  className?: string
}

export function SectionPlaceholder({ title, description, className }: SectionPlaceholderProps) {
  return (
    <section className={cn(styles.page, className)}>
      <span aria-hidden="true" className="i-ph:hammer" />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </section>
  )
}
