export const AVATARS = ['skull', 'devil', 'dreamy', 'star-struck', 'cold'] as const
export type Avatar = (typeof AVATARS)[number]

export const RegisterStep = {
  Name: 'name',
  Course: 'course',
  Schedule: 'schedule',
  Avatar: 'avatar',
  View: 'view',
} as const
export type RegisterStep = (typeof RegisterStep)[keyof typeof RegisterStep]
