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

export const AVATAR_RING_CATALOGUE = [
  { id: 'none', isLocked: false },
  { id: 'outline', isLocked: false },
  { id: 'double', isLocked: false },
  { id: 'orbital', isLocked: true },
  { id: 'star', isLocked: true },
] as const

export type AvatarRingOption = (typeof AVATAR_RING_CATALOGUE)[number]
export type AvatarRing = AvatarRingOption['id']
export type AvailableAvatarRing = Extract<AvatarRingOption, { isLocked: false }>['id']

export function isAvatarRing(value: string | null | undefined): value is AvatarRing {
  return AVATAR_RING_CATALOGUE.some((option) => option.id === value)
}

export function isAvatarRingAvailable(ring: AvatarRing): ring is AvailableAvatarRing {
  return AVATAR_RING_CATALOGUE.some((option) => option.id === ring && !option.isLocked)
}

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
