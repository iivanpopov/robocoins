import { memo, useId, type Ref } from 'react'

const STRIPS = [
  { x: 0, width: 50, top: 36, bottom: 944 },
  { x: 50, width: 32, top: 8, bottom: 966 },
  { x: 82, width: 63, top: 23, bottom: 928 },
  { x: 145, width: 29, top: 0, bottom: 952 },
  { x: 174, width: 55, top: 16, bottom: 976 },
  { x: 229, width: 43, top: 50, bottom: 950 },
  { x: 272, width: 38, top: 4, bottom: 987 },
  { x: 310, width: 60, top: 12, bottom: 961 },
  { x: 370, width: 44, top: 32, bottom: 932 },
  { x: 414, width: 60, top: 8, bottom: 958 },
  { x: 474, width: 27, top: 54, bottom: 934 },
  { x: 501, width: 49, top: 15, bottom: 969 },
  { x: 550, width: 18, top: 38, bottom: 946 },
  { x: 568, width: 32, top: 2, bottom: 979 },
]

const STARS = Array.from({ length: 150 }, (_, i) => ({
  x: (i * 137.508) % 600,
  y: (i * 219.73) % 1000,
  radius: 0.45 + (i % 4) * 0.3,
  opacity: 0.2 + (i % 6) * 0.12,
}))

const NEBULAE = {
  mission: [
    { x: 530, y: 280, radiusX: 460, radiusY: 400, rotation: 0 },
    { x: 40, y: 780, radiusX: 380, radiusY: 300, rotation: 0 },
  ],
  home: [
    { x: 100, y: 300, radiusX: 310, radiusY: 230, rotation: -28 },
    { x: 480, y: 720, radiusX: 260, radiusY: 360, rotation: 32 },
  ],
  shop: [
    { x: 280, y: 420, radiusX: 520, radiusY: 200, rotation: -35 },
    { x: 550, y: 850, radiusX: 270, radiusY: 380, rotation: 20 },
    { x: -140, y: 100, radiusX: 250, radiusY: 300, rotation: -15 },
  ],
}

export const SpaceBackground = memo(function SpaceBackground({
  className,
  variant = 'mission',
  ref,
}: {
  className?: string
  variant?: 'mission' | 'home' | 'shop'
  ref?: Ref<SVGSVGElement>
}) {
  const id = useId()

  const seamless = variant !== 'mission'
  const strips = STRIPS
  const viewBox = variant === 'shop' ? '-600 -1000 1800 3000' : '0 0 600 1000'
  const clipPath = seamless ? undefined : `url(#${id})`

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={className}
      ref={ref}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={id}>
          {strips.map((strip) => (
            <rect
              key={strip.x}
              x={strip.x}
              y={strip.top}
              width={strip.width + 0.5}
              height={strip.bottom - strip.top}
            />
          ))}
        </clipPath>
        <radialGradient id={`${id}-nebula`}>
          <stop stopColor="#27354c" stopOpacity="0.55" />
          <stop offset="1" stopColor="#050608" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-trail`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#647287" stopOpacity="0" />
          <stop offset="1" stopColor="#647287" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${id}-lower-trail`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#647287" stopOpacity="0.9" />
          <stop offset="1" stopColor="#647287" stopOpacity="0" />
        </linearGradient>
        <pattern id={`${id}-stars`} width="600" height="1000" patternUnits="userSpaceOnUse">
          {STARS.map((star, i) => (
            <circle
              key={i}
              cx={star.x}
              cy={star.y}
              r={star.radius}
              fill="#e5edff"
              opacity={star.opacity}
            />
          ))}
        </pattern>
      </defs>
      {!seamless &&
        strips.map((strip, i) => (
          <g key={strip.x}>
            {strip.top !== strips[i - 1]?.top && (
              <rect
                x={strip.x}
                y={strip.top - 36}
                width="1.6"
                height="36"
                fill={`url(#${id}-trail)`}
              />
            )}
            {strip.top !== strips[i + 1]?.top && (
              <rect
                x={strip.x + strip.width - 1}
                y={strip.top - 18}
                width="1"
                height="18"
                fill={`url(#${id}-trail)`}
              />
            )}
            {strip.bottom !== strips[i + 1]?.bottom && (
              <rect
                x={strip.x + strip.width - 1.6}
                y={strip.bottom}
                width="1.6"
                height="36"
                fill={`url(#${id}-lower-trail)`}
              />
            )}
          </g>
        ))}
      <g clipPath={clipPath}>
        <path fill="#050608" d="M-600-1000h1800v3000H-600z" />
        {NEBULAE[variant].map((nebula, i) => (
          <ellipse
            key={i}
            cx={nebula.x}
            cy={nebula.y}
            rx={nebula.radiusX}
            ry={nebula.radiusY}
            transform={`rotate(${nebula.rotation} ${nebula.x} ${nebula.y})`}
            fill={`url(#${id}-nebula)`}
          />
        ))}
        <path fill={`url(#${id}-stars)`} d="M-600-1000h1800v3000H-600z" />
      </g>
    </svg>
  )
})
