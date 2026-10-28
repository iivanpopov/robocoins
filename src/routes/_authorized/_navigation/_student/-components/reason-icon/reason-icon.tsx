import { cn } from 'cn'

const REASON_ICONS: Record<string, string> = {
  activity: 'i-ph:lightning',
  homework: 'i-ph:notebook',
  teamwork: 'i-ph:users-three',
  answer: 'i-ph:chat-circle-dots',
  initiative: 'i-ph:rocket-launch',
  theory: 'i-ph:book-open-text',
  practice_completed: 'i-ph:code',
  additional_task_completed: 'i-ph:star',
  discipline: 'i-ph:warning-circle',
  discipline_breakdown: 'i-ph:warning-circle',
  middle_level_violation: 'i-ph:warning-circle',
  serious_violation: 'i-ph:warning-circle',
  late: 'i-ph:warning-circle',
  incomplete: 'i-ph:check-circle',
  mistake: 'i-ph:warning-circle',
}

const FALLBACK_ICON = 'i-ph:sparkle'

export interface ReasonIconProps {
  reason?: string | null
}

export function ReasonIcon(props: ReasonIconProps) {
  return (
    <span aria-hidden="true" className={cn(REASON_ICONS[props.reason ?? ''] ?? FALLBACK_ICON)} />
  )
}
