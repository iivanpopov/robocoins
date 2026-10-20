export const AwardDirection = {
  Reward: 1,
  Punish: -1,
} as const

export type AwardDirection = (typeof AwardDirection)[keyof typeof AwardDirection]

export const StudentSortOrder = {
  NameAsc: 'name-asc',
  NameDesc: 'name-desc',
  BalanceDesc: 'balance-desc',
  BalanceAsc: 'balance-asc',
} as const

export type StudentSortOrder = (typeof StudentSortOrder)[keyof typeof StudentSortOrder]
