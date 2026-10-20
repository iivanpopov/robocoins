import { useGetStudentTransactionHistoryStudentStudentIdTransactionsGet } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import { compareTransactionsByNewest } from '#/routes/-utils'

interface UseRecentTransactionsProps {
  studentId: number
  enabled: boolean
}

export function useRecentTransactions(props: UseRecentTransactionsProps) {
  const transactionsQuery = useGetStudentTransactionHistoryStudentStudentIdTransactionsGet(
    { path: { student_id: props.studentId } },
    { query: { enabled: props.enabled } },
  )
  const transactions = (transactionsQuery.data?.transactions ?? [])
    .toSorted(compareTransactionsByNewest)
    .slice(0, 3)

  return { state: { transactions }, queries: { transactionsQuery } }
}
