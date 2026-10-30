import { useId } from 'react'

import styles from '../index.module.css'

const BANDS = [0, 9, 23, 34, 51, 63, 78, 88, 100]

export function AnswerPortal({ index }: { index: number }) {
  const id = useId()

  const strips = BANDS.slice(0, -1).map((top, i) => ({
    top,
    height: BANDS[i + 1] - top + 0.3,
    left: 12 + ((i * 17 + index * 23) % 44),
    right: 544 + ((i * 29 + index * 19) % 44),
    trail: 24 + ((i * 13 + index * 11) % 32),
  }))

  return (
    <svg
      className={styles['answer-portal']}
      viewBox="0 0 600 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-left`}>
          <stop stopColor="#62666d" stopOpacity="0" />
          <stop offset="1" stopColor="#62666d" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={`${id}-right`}>
          <stop stopColor="#62666d" stopOpacity="0.18" />
          <stop offset="1" stopColor="#62666d" stopOpacity="0" />
        </linearGradient>
      </defs>
      {strips.map((strip) => (
        <g key={strip.top}>
          <rect
            x={strip.left}
            y={strip.top}
            width={strip.right - strip.left}
            height={strip.height}
            fill="#62666d"
            fillOpacity="0.07"
          />
          <rect
            x={strip.left - strip.trail}
            y={strip.top}
            width={strip.trail + 1}
            height="0.8"
            fill={`url(#${id}-left)`}
          />
          <rect
            x={strip.right - 1}
            y={strip.top + strip.height - 0.8}
            width={strip.trail + 1}
            height="0.8"
            fill={`url(#${id}-right)`}
          />
        </g>
      ))}
    </svg>
  )
}
