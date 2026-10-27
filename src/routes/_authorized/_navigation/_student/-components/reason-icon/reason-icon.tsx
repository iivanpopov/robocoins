import { cn } from 'cn'

const REASON_ICONS: Record<string, string> = {
  activity: 'i-ph:lightning-bold',
  homework: 'i-ph:notebook-bold',
  teamwork: 'i-ph:users-three-bold',
  answer: 'i-ph:chat-circle-dots-bold',
  initiative: 'i-ph:rocket-launch-bold',
  theory: 'i-ph:book-open-text-bold',
  practice_completed: 'i-ph:code-bold',
  additional_task_completed: 'i-ph:star-bold',
  discipline: 'i-ph:warning-circle-bold',
  discipline_breakdown: 'i-ph:warning-circle-bold',
  middle_level_violation: 'i-ph:warning-circle-bold',
  serious_violation: 'i-ph:warning-circle-bold',
  late: 'i-ph:warning-circle-bold',
  incomplete: 'i-ph:check-circle-bold',
  mistake: 'i-ph:warning-circle-bold',
}

const FALLBACK_ICON = 'i-ph:sparkle-bold'

export interface ReasonIconProps {
  reason?: string | null
}

export function ReasonIcon(props: ReasonIconProps) {
  return (
    <span aria-hidden="true" className={cn(REASON_ICONS[props.reason ?? ''] ?? FALLBACK_ICON)} />
  )
}
