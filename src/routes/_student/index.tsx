import { createFileRoute } from '@tanstack/react-router'
import { cn } from 'cn'

import { Button, Typography } from '#/components/ui'

import { getAvatarUrl } from '../-utils/get-avatar-url'

import styles from './index.module.css'

export const Route = createFileRoute('/_student/')({
  component: MockHomePage,
})

function MockHomePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <img className={styles.avatar} src={getAvatarUrl('dreamy')} alt="Аватар Аліси" />
        <Typography className={styles.name} variant="subtitle">
          Аліса
        </Typography>
        <Button className={styles.balance} variant="ghost">
          <span>120</span>
          <div aria-hidden="true" className={cn('i-ph:coins-bold', styles['coin-icon'])} />
        </Button>
      </header>
      <article className={styles.goal} onClick={() => {}} role="button" tabIndex={0}>
        <img className={styles.product} src="/images/products/arduino-uno.webp" alt="Arduino Uno" />
        <div className={styles['product-heading']}>
          <Typography className={styles['product-name']} variant="subtitle">
            Набір Arduino Uno
          </Typography>
          <div aria-hidden="true" className={cn('i-ph:caret-right-bold', styles.chevron)} />
        </div>
        <p className={styles.amount}>
          <strong>120</strong> із 200 <span aria-hidden="true" className="i-ph:coins-bold" />
        </p>
        <div className={styles.progress}>
          <span />
        </div>
        <Typography className={styles.label} variant="caption">
          Залишилося 80 робокоїнів
        </Typography>
      </article>
      <section className={styles.history}>
        <div className={styles['section-heading']}>
          <Typography className={styles['history-title']} variant="subtitle">
            Історія
          </Typography>
          <Button className={styles['all-button']} variant="link">
            Усі ›
          </Button>
        </div>
        <div className={styles['day-heading']}>
          <span>Сьогодні</span>
          <span>+5</span>
        </div>
        <div className={cn(styles.operation, styles['operation-today'])}>
          <div className={styles['operation-icon']}>
            <div aria-hidden="true" className="i-ph:trophy-bold" />
            <div className={styles['icon-dot']} />
          </div>
          <span>Завершив проєкт</span>
          <strong className={styles['new-amount']}>+2</strong>
        </div>
        <div className={cn(styles.operation, styles['operation-today'])}>
          <div className={styles['operation-icon']}>
            <div aria-hidden="true" className="i-ph:handshake-bold" />
            <div className={styles['icon-dot']} />
          </div>
          <span>Допоміг команді</span>
          <strong className={styles['new-amount']}>+3</strong>
        </div>
        <div className={styles['day-heading']}>
          <span>Учора</span>
          <span>−3</span>
        </div>
        <div className={styles.operation}>
          <div className={styles['operation-icon']}>
            <div aria-hidden="true" className="i-ph:shopping-bag-bold" />
          </div>
          <span>Набір для експериментів</span>
          <strong>−3</strong>
        </div>
        <Button className={styles['rules-button']} variant="link">
          За що дають робокоїни?
        </Button>
      </section>
    </main>
  )
}
