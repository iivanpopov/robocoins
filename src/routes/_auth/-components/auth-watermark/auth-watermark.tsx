import { cn } from 'cn'

import styles from './auth-watermark.module.css'

export function AuthWatermark() {
  return (
    <div aria-hidden="true" className={styles.root}>
      <span className={cn('i-ph:coins', styles.icon)} />
    </div>
  )
}
