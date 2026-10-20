export const StudentSortOrder = {
  NameAsc: 'name-asc',
  NameDesc: 'name-desc',
  BalanceDesc: 'balance-desc',
  BalanceAsc: 'balance-asc',
} as const

export type StudentSortOrder = (typeof StudentSortOrder)[keyof typeof StudentSortOrder]
