import type { UserRoleKey } from '#/api/types'

const HOME_PATH_BY_ROLE = {
  admin: '/admin',
  student: '/',
  teacher: '/group',
} as const satisfies Record<UserRoleKey, string>

export function getHomePath(role?: UserRoleKey) {
  if (!role) return '/'
  return HOME_PATH_BY_ROLE[role]
}
