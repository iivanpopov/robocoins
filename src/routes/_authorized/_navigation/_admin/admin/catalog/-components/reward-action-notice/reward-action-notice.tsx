import { useTranslate } from '@kanjou/react'

import styles from './reward-action-notice.module.css'

export interface RewardActionNoticeProps {
  title: string
  description: string
  onDismiss?: () => void
}

export function RewardActionNotice({ title, description, onDismiss }: RewardActionNoticeProps) {
  const t = useTranslate()

  return (
    <section className={styles.notice} role="status">
      <span className="i-ph:info-duotone" aria-hidden="true" />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          className={styles.close}
          aria-label={t('action.close')}
          onClick={onDismiss}
        >
          <span className="i-ph:x-bold" aria-hidden="true" />
        </button>
      )}
    </section>
  )
}
