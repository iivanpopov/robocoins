import type { GroupCardData } from '#/routes/_authorized/-components/group-card'

export type GroupSelection = { kind: 'add' } | { kind: 'transfer'; source: GroupCardData }

export interface GroupOptions {
  groups: GroupCardData[]
  isPending: boolean
  isError: boolean
  isRetrying: boolean
}
