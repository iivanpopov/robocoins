import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { cn } from 'cn'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/people/')({
  head: () => ({ meta: [{ title: 'Люди | Robocoins' }] }),
  component: PeoplePage,
})

function PeoplePage() {
  const t = useTranslate()

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('admin.people.title')}</h1>
        <p className={styles.description}>{t('admin.people.description')}</p>
      </header>

      <div className={styles.cards}>
        <Link to="/admin/people/students" className={styles.card}>
          <div className={styles.icon}>
            <span aria-hidden="true" className="i-ph:student-duotone" />
          </div>
          <div className={styles.details}>
            <h2 className={styles['card-title']}>{t('students.title')}</h2>
            <p className={styles['card-description']}>{t('admin.people.students.description')}</p>
          </div>
          <span aria-hidden="true" className={cn('i-ph:caret-right-bold', styles.arrow)} />
        </Link>

        <article className={cn(styles.card, styles.disabled)} aria-disabled="true">
          <div className={styles.icon}>
            <span aria-hidden="true" className="i-ph:chalkboard-teacher-duotone" />
          </div>
          <div className={styles.details}>
            <h2 className={styles['card-title']}>{t('admin.people.teachers.title')}</h2>
            <p className={styles['card-description']}>{t('admin.people.teachers.description')}</p>
          </div>
          <span className={styles.badge}>{t('admin.people.soon')}</span>
        </article>
      </div>
    </section>
  )
}
