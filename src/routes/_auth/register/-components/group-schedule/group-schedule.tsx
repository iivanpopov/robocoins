import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import { Typography } from '#/components/ui'

import { parseGroupSchedule } from '../../-utils'

import styles from './group-schedule.module.css'

interface GroupScheduleProps {
  name: string
  variant?: 'default' | 'caption'
  className?: string
}

export function GroupSchedule({ name, variant = 'default', className }: GroupScheduleProps) {
  const t = useTranslate()

  const schedule = parseGroupSchedule(name)

  return (
    <div className={cn(styles.schedule, variant === 'default' && styles.default, className)}>
      {variant === 'default' && (
        <span aria-hidden="true" className={cn('i-ph:clock', styles.clock)} />
      )}
      {variant === 'default' && (
        <span className={styles.label}>
          <span className={styles.weekday}>{t.unsafe(schedule.weekday)}</span>
          <span className={styles.time}>{schedule.time}</span>
        </span>
      )}
      {variant === 'caption' && (
        <Typography variant="caption">
          {t.unsafe(schedule.weekday)}
          <br />
          {schedule.time}
        </Typography>
      )}
    </div>
  )
}
