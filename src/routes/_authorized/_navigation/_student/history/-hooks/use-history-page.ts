import { useRouteContext } from '@tanstack/react-router'

export function useHistoryPage() {
  const context = useRouteContext({ from: '/_authorized/_navigation/_student/history/' })

  return { state: { studentId: context.user!.id } }
}
