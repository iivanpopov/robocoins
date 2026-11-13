import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import type { AchievementResponse } from '#/api/types'
import { Button } from '#/components/ui'
import {
  AchievementArtwork,
  getAchievementArtworkTier,
} from '#/routes/_authorized/-components/achievements'

import styles from './achievement-row.module.css'

export interface AchievementRowProps {
  achievement: AchievementResponse
}

export function AchievementRow(props: AchievementRowProps) {
  const t = useTranslate()
  const tier = getAchievementArtworkTier(props.achievement.required_coins)

  return (
    <article className={styles.row}>
      <AchievementArtwork requiredCoins={props.achievement.required_coins} size="md" />
      <div className={styles.body}>
        <h2 className={styles.name}>{props.achievement.name}</h2>
        <p className={styles.description}>{props.achievement.description}</p>
        <p className={styles.meta}>
          <span>{t(`admin.achievements.form.type.${props.achievement.type}`)}</span>
          {props.achievement.required_coins !== null && <span>{t(tier.labelKey)}</span>}
          {props.achievement.required_coins !== null && (
            <span className={styles.threshold}>
              {t('achievements.required', { count: props.achievement.required_coins })}
            </span>
          )}
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={
          <Link
            to="/admin/achievements/$achievementId/delete"
            params={{ achievementId: props.achievement.id }}
          />
        }
      >
        {t('admin.achievements.list.delete')}
      </Button>
    </article>
  )
}
