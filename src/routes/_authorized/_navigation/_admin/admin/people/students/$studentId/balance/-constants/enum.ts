export const BalanceDirection = {
  Reward: 'reward',
  Punish: 'punish',
} as const

export type BalanceDirection = (typeof BalanceDirection)[keyof typeof BalanceDirection]

export const BalanceMutationKind = {
  Change: 'change',
  Cancel: 'cancel',
} as const

export type BalanceMutationKind = (typeof BalanceMutationKind)[keyof typeof BalanceMutationKind]
