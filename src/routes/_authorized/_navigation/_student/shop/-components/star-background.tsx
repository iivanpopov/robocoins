import { memo, useId } from 'react'

import { getBackgroundStars } from '../../-utils'

import styles from '../index.module.css'

const BACKGROUND_STARS = getBackgroundStars()

export const StarBackground = memo(function StarBackground(props: {
  backgroundRef: React.RefObject<SVGSVGElement | null>
}) {
  const patternId = useId()

  return (
    <svg
      className={styles['star-background']}
      ref={props.backgroundRef}
      viewBox="-1000 -2000 3000 6000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id={patternId} width="1000" height="2000" patternUnits="userSpaceOnUse">
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
      <rect x="-1000" y="-2000" width="3000" height="6000" fill={`url(#${patternId})`} />
    </svg>
  )
})
