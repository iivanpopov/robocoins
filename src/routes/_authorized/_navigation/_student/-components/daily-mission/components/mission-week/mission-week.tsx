import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'
import { useId } from 'react'

import type { DailyTaskResponse, StreakResponse } from '#/api/types'
import { getMissionWeek } from '#/routes/_authorized/-utils'

import { getBackgroundStars } from '../../../../-utils'
import { getWeeklyConstellation } from '../../lib'

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

const PORTAL_STRIPS = [
  { x: 0, width: 50, top: 86, bottom: 424, fray: 12 },
  { x: 50, width: 32, top: 58, bottom: 446, fray: 28 },
  { x: 82, width: 63, top: 73, bottom: 408, fray: 16 },
  { x: 145, width: 29, top: 31, bottom: 432, fray: 34 },
  { x: 174, width: 55, top: 66, bottom: 456, fray: 21 },
  { x: 229, width: 43, top: 100, bottom: 430, fray: 13 },
  { x: 272, width: 38, top: 14, bottom: 467, fray: 26 },
  { x: 310, width: 60, top: 52, bottom: 441, fray: 38 },
  { x: 370, width: 44, top: 82, bottom: 412, fray: 18 },
  { x: 414, width: 60, top: 48, bottom: 438, fray: 30 },
  { x: 474, width: 27, top: 104, bottom: 414, fray: 14 },
  { x: 501, width: 49, top: 65, bottom: 449, fray: 24 },
  { x: 550, width: 18, top: 88, bottom: 426, fray: 11 },
  { x: 568, width: 32, top: 42, bottom: 459, fray: 31 },
]

const SPACE_STARS = getBackgroundStars(112)

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
      <div className={styles.portal}>
        <svg viewBox="0 0 600 480" className={styles.space} aria-hidden="true">
          <defs>
            <clipPath id={`${id}-portal`}>
              {!isCompleted && <path d="M18 49h18V36h92v-8h103v14h43v11h60v86h-24v35H18Z" />}
              {PORTAL_STRIPS.map((strip) => (
                <rect
                  key={strip.x}
                  x={strip.x}
                  y={strip.top}
                  width={strip.width + 0.5}
                  height={strip.bottom - strip.top}
                />
              ))}
            </clipPath>
            <linearGradient id={`${id}-fray`} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#050608" stopOpacity="0" />
              <stop offset="1" stopColor="#050608" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id={`${id}-lower-fray`} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#050608" stopOpacity="0.65" />
              <stop offset="1" stopColor="#050608" stopOpacity="0" />
            </linearGradient>
            <filter
              id={`${id}-recess`}
              x="-5%"
              y="-5%"
              width="110%"
              height="110%"
              colorInterpolationFilters="sRGB"
            >
              <feOffset in="SourceAlpha" dx="0" dy="3" result="depth" />
              <feComposite in="SourceAlpha" in2="depth" operator="out" result="wall" />
              <feFlood floodColor="#647287" floodOpacity="0.25" result="wall-color" />
              <feComposite in="wall-color" in2="wall" operator="in" result="lit-wall" />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="lit-wall" />
              </feMerge>
            </filter>
          </defs>
          <g fill={`url(#${id}-fray)`}>
            {!isCompleted && (
              <g>
                <rect x="36" y="19" width="1.2" height="19" />
                <rect x="128" y="8" width="1" height="22" />
                <rect x="231" y="25" width="1.5" height="19" />
              </g>
            )}
            {PORTAL_STRIPS.map((strip) => (
              <g key={strip.x}>
                <rect
                  x={strip.x + 0.5}
                  y={strip.top - strip.fray}
                  width="1.4"
                  height={strip.fray + 2}
                />
                <rect
                  x={strip.x + strip.width - 2}
                  y={strip.top - strip.fray * 0.4}
                  width="2"
                  height={strip.fray * 0.4 + 2}
                  opacity="0.45"
                />
                <rect
                  x={strip.x + strip.width - 1.5}
                  y={strip.bottom - 1}
                  width="1.5"
                  height={strip.fray * 0.8}
                  fill={`url(#${id}-lower-fray)`}
                />
              </g>
            ))}
          </g>
          <g filter={`url(#${id}-recess)`}>
            <g clipPath={`url(#${id}-portal)`}>
              <path fill="#050608" d="M0 0h600v480H0z" />
            </g>
          </g>
          <g clipPath={`url(#${id}-portal)`}>
            {SPACE_STARS.map((star) => (
              <circle
                key={star.id}
                cx={12 + (star.x / 1000) * 576}
                cy={18 + (star.y / 2000) * 448}
                r={star.radius * 0.4}
                fill="#fff"
                opacity={star.opacity}
              />
            ))}
          </g>
        </svg>
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
        {!isCompleted && (
          <div className={styles['action-shell']}>
            <Link
              to="/daily-mission"
              className={styles.action}
              aria-label={t('daily-mission.start.label')}
            >
              {t('daily-mission.start')}
              <span className="i-ph:arrow-right-bold" aria-hidden="true" />
            </Link>
          </div>
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
        {isCompleted && (
          <Link
            to="/daily-mission"
            className={styles['portal-link']}
            aria-label={t('daily-mission.start.label')}
          />
        )}
      </div>
    </div>
  )
}
