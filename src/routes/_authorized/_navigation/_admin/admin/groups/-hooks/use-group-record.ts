import { useGetGroupByIdGroupIdGroupIdGet } from '#/api/hooks/useGetGroupByIdGroupIdGroupIdGet'

export function useGroupRecord(groupId: number) {
  const groupQuery = useGetGroupByIdGroupIdGroupIdGet({ path: { group_id: groupId } })

  return {
    group: groupQuery.data ?? null,
    groupQuery,
  }
}
