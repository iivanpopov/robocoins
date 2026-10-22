import { memo } from 'react'

import styles from '../index.module.css'

const BACKGROUND_STARS = Array.from({ length: 150 }, (_, index) => ({
  id: index,
  x: (((index * 197.3 + Math.sin(index * 91.7) * 43) % 1000) + 1000) % 1000,
  y: (((index * 283.9 + Math.cos(index * 41.3) * 31) % 2000) + 2000) % 2000,
  radius: 2 + Number(index % 13 === 0) * 2,
  opacity: 0.2 + ((index * 17) % 70) / 100,
}))

export const StarBackground = memo(function StarBackground(props: {
  patternId: string
  backgroundRef: React.RefObject<SVGSVGElement | null>
  patternRef: React.RefObject<SVGPatternElement | null>
}) {
  return (
    <svg
      className={styles['star-background']}
      ref={props.backgroundRef}
      viewBox="0 0 1000 2000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          ref={props.patternRef}
          id={props.patternId}
          width="1000"
          height="2000"
          patternUnits="userSpaceOnUse"
        >
          {BACKGROUND_STARS.map((star) => (
            <circle
              key={star.id}
              cx={star.x}
              cy={star.y}
              r={star.radius}
              opacity={star.opacity}
              fill="var(--foreground)"
            />
          ))}
        </pattern>
      </defs>
      <rect x="-4000" y="-4000" width="9000" height="10000" fill={`url(#${props.patternId})`} />
    </svg>
  )
})
