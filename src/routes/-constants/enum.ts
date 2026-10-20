export const AVATARS = [
  'skull',
  'alien-monster',
  'devil',
  'robot',
  'cold',
  'dreamy',
  'frog',
  'star-struck',
  'cat',
] as const
export type Avatar = (typeof AVATARS)[number]

export const Weekday = {
  Monday: 'monday',
  Tuesday: 'tuesday',
  Wednesday: 'wednesday',
  Thursday: 'thursday',
  Friday: 'friday',
  Saturday: 'saturday',
  Sunday: 'sunday',
} as const

export type Weekday = (typeof Weekday)[keyof typeof Weekday]
