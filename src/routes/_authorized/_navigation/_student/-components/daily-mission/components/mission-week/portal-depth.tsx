import styles from '../../daily-mission.module.css'

const OPENING_POINTS = '0,7 7,7 13,2 74,2 80,7 100,7 100,93 93,93 87,98 29,98 23,93 0,93'

export function PortalDepth({ id }: { id: string }) {
  return (
    <svg
      className={styles['portal-depth']}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={`${id}-opening`} clipPathUnits="objectBoundingBox">
          <polygon points={OPENING_POINTS} transform="scale(0.01)" />
        </clipPath>
        <linearGradient id={`${id}-upper-edge`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#111a28" />
          <stop offset="1" stopColor="#050608" />
        </linearGradient>
        <linearGradient id={`${id}-lower-edge`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#050608" />
          <stop offset="1" stopColor="#142033" />
        </linearGradient>
      </defs>
      <path
        d="M0 7H7L13 2H74L80 7H100V9H79.5L73.5 4H13.5L7.5 9H0Z"
        fill={`url(#${id}-upper-edge)`}
      />
      <path
        d="M0 91H23.5L29.5 96H86.5L92.5 91H100V93H93L87 98H29L23 93H0Z"
        fill={`url(#${id}-lower-edge)`}
      />
    </svg>
  )
}
