import { Loader } from '#/components/ui/loader'

import styles from './pending.module.css'

export function PendingComponent() {
  return (
    <div className={styles.pending} role="status" aria-busy="true">
      <Loader />
    </div>
  )
}
