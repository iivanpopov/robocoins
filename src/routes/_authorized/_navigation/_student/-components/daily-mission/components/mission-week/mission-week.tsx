import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'
import { useId } from 'react'

import type { DailyTaskResponse, StreakResponse } from '#/api/types'
import { SpaceBackground } from '#/routes/_authorized/-components/space-background'
import { getMissionWeek } from '#/routes/_authorized/-utils'

import { getWeeklyConstellation } from '../../lib'
import { PortalDepth } from './portal-depth'

import styles from '../../daily-mission.module.css'

const WEEKDAYS = [
  'weekday.monday',
  'weekday.tuesday',
  'weekday.wednesday',
  'weekday.thursday',
  'weekday.friday',
  'weekday.saturday',
  'weekday.sunday',
] as const

export function MissionWeek({
  task,
  streak,
}: {
  task?: DailyTaskResponse
  streak?: StreakResponse
}) {
  const id = useId()
  const t = useTranslate()

  const week = getMissionWeek(task, streak)
  const weekday = week.weekday
  const isCompleted = Boolean(task?.completed_at)
  const constellation = getWeeklyConstellation(task?.date)
  const todayStar = weekday === undefined ? undefined : constellation.stars[weekday]
  const todayLabelOffset = todayStar && todayStar.y > 340 ? -55 : 34

  return (
    <div className={styles.week}>
      <div className={styles.portal} style={{ clipPath: `url(#${id}-opening)` }}>
        <SpaceBackground className={styles.space} variant="home" />
        {todayStar && (
          <span
            className={styles['today-label']}
            style={{
              left: `${(todayStar.x / 600) * 100}%`,
              top: `${((todayStar.y + todayLabelOffset * todayStar.scale) / 480) * 100}%`,
            }}
          >
            {t('daily-mission.today')}
          </span>
        )}
        <ol
          className={styles.stars}
          aria-label={t('daily-mission.constellation.label', {
            name: t(`daily-mission.constellation.${constellation.name}`),
          })}
        >
          {WEEKDAYS.map((day, i) => (
            <li
              key={day}
              aria-current={i === weekday && 'date'}
              className={cn(
                styles['constellation-node'],
                weekday !== undefined && i < weekday && styles['past-unknown'],
                i === weekday && styles.today,
                week.completedDays[i] && styles['star-completed'],
              )}
            >
              {constellation.stars[i].satellites.map((satellite, j) => (
                <span
                  key={j}
                  aria-hidden="true"
                  className={cn(styles['sub-star'], 'i-ph:star-four-fill')}
                  style={{
                    left: `${(satellite[0] / 600) * 100}%`,
                    top: `${(satellite[1] / 480) * 100}%`,
                  }}
                />
              ))}
              <span
                className={styles['constellation-star']}
                style={{
                  left: `${(constellation.stars[i].x / 600) * 100}%`,
                  top: `${(constellation.stars[i].y / 480) * 100}%`,
                  width: `${((62 * constellation.stars[i].scale) / 600) * 100}%`,
                }}
              >
                <span
                  className={cn(styles['star-depth'], 'i-ph:star-four-fill')}
                  aria-hidden="true"
                />
                <span
                  className={cn(styles['star-bevel'], 'i-ph:star-four-fill')}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    styles['star-symbol'],
                    week.completedDays[i] && 'i-ph:star-four-fill',
                    !week.completedDays[i] && 'i-ph:star-four',
                  )}
                  aria-hidden="true"
                />
              </span>
              <span className={styles['day-label']}>
                {t(day)}
                {i === weekday && t('daily-mission.day.today')}
                {week.completedDays[i] && t('daily-mission.day.completed')}
                {i === weekday && !isCompleted && t('daily-mission.day.pending')}
                {i !== weekday && !week.completedDays[i] && t('daily-mission.day.unlit')}
              </span>
            </li>
          ))}
        </ol>
        <PortalDepth id={id} />
        <Link
          to="/daily-mission"
          className={styles['portal-link']}
          aria-label={t('daily-mission.start.label')}
        />
      </div>
      {!isCompleted && <p className={styles.hint}>{t('daily-mission.stars.hint')}</p>}
    </div>
  )
}
