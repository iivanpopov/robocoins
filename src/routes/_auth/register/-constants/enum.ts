export const AVATARS = ['skull', 'devil', 'dreamy', 'star-struck', 'cold'] as const
export type Avatar = (typeof AVATARS)[number]

export const RegisterStep = {
  Name: 'name',
  Category: 'category',
  Course: 'course',
  Avatar: 'avatar',
  View: 'view',
  Success: 'success',
} as const
export type RegisterStep = (typeof RegisterStep)[keyof typeof RegisterStep]
