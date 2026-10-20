export const RegisterStep = {
  Name: 'name',
  Category: 'category',
  Course: 'course',
  Avatar: 'avatar',
  View: 'view',
  Success: 'success',
} as const
export type RegisterStep = (typeof RegisterStep)[keyof typeof RegisterStep]
