import { infiniteQueryOptions } from '@tanstack/react-query'

import { getStudentTransactionHistoryStudentStudentIdTransactionsGet } from '#/api/clients/getStudentTransactionHistoryStudentStudentIdTransactionsGet'
import { getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'

const TRANSACTIONS_PAGE_SIZE = 20

export function getStudentTransactionsQueryOptions(studentId: number) {
  return infiniteQueryOptions({
    queryKey: [
      ...getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey({
        path: { student_id: studentId },
      }),
      'infinite',
      { pageSize: TRANSACTIONS_PAGE_SIZE },
    ],
    initialPageParam: 0,
    queryFn: ({ pageParam, signal }) =>
      getStudentTransactionHistoryStudentStudentIdTransactionsGet({
        path: { student_id: studentId },
        query: { limit: TRANSACTIONS_PAGE_SIZE, offset: pageParam },
        signal,
        throwOnError: true,
      }).unwrap(),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.transactions.length < TRANSACTIONS_PAGE_SIZE) return undefined
      return pages.reduce((count, page) => count + page.transactions.length, 0)
    },
  })
}
