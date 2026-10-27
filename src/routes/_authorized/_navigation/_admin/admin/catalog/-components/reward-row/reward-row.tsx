import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import type { RewardResponse } from '#/api/types'

import { RewardCategoryName } from '../reward-category-name'

import styles from './reward-row.module.css'

export interface RewardRowProps {
  reward: RewardResponse
}

export function RewardRow({ reward }: RewardRowProps) {
  const t = useTranslate()

  return (
    <Link to="/admin/catalog/$rewardId" params={{ rewardId: reward.id }} className={styles.row}>
      <span className={styles.icon} aria-hidden="true">
        <span
          className={cn(
            styles.symbol,
            reward.type === 'reward' && 'i-ph:cube-duotone',
            reward.type === 'privilege' && 'i-ph:star-four-fill',
          )}
        />
      </span>
      <span className={styles.details}>
        <span className={styles.name}>{reward.name}</span>
        <span className={styles.meta}>
          <span>{t(`admin.catalog.type.${reward.type}`)}</span>
          <span aria-hidden="true">·</span>
          <RewardCategoryName category={reward.course_category} />
        </span>
      </span>
      <span className={styles.price}>
        {t('shop.reward.price', { count: reward.price })}
        <span className="i-ph:coins-bold" aria-hidden="true" />
      </span>
      <span className={cn('i-ph:caret-right-bold', styles.chevron)} aria-hidden="true" />
    </Link>
  )
}
