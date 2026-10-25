import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import { getStudentTransactionHistoryStudentStudentIdTransactionsGet } from '#/api/clients/getStudentTransactionHistoryStudentStudentIdTransactionsGet'
import { getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import { compareTransactionsByNewest } from '#/routes/-utils'

const PAGE_SIZE = 30

export function getRewardHistoryQueryOptions(studentId: number) {
  return infiniteQueryOptions({
    queryKey: [
      ...getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey({
        path: { student_id: studentId },
      }),
      'infinite',
      { pageSize: PAGE_SIZE },
    ],
    initialPageParam: 0,
    queryFn: ({ pageParam, signal }) =>
      getStudentTransactionHistoryStudentStudentIdTransactionsGet({
        path: { student_id: studentId },
        query: { limit: PAGE_SIZE, offset: pageParam },
        signal,
        throwOnError: true,
      }).unwrap(),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.transactions.length < PAGE_SIZE) return undefined
      return pages.reduce((count, page) => count + page.transactions.length, 0)
    },
  })
}

export function useRewardHistory(studentId: number) {
  const sentinel = useRef<HTMLDivElement>(null)

  const historyQuery = useInfiniteQuery(getRewardHistoryQueryOptions(studentId))

  useEffect(() => {
    if (
      !sentinel.current ||
      typeof IntersectionObserver === 'undefined' ||
      !historyQuery.hasNextPage ||
      historyQuery.isFetching ||
      historyQuery.isError
    )
      return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void historyQuery.fetchNextPage({ cancelRefetch: false })
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(sentinel.current)
    return () => observer.disconnect()
  }, [
    historyQuery.hasNextPage,
    historyQuery.isFetching,
    historyQuery.isError,
    historyQuery.fetchNextPage,
  ])

  function handleLoadMore() {
    if (historyQuery.isFetching) return
    void historyQuery.fetchNextPage({ cancelRefetch: false })
  }

  function handleRetry() {
    if (historyQuery.isFetchNextPageError) {
      handleLoadMore()
      return
    }
    void historyQuery.refetch()
  }

  const transactions = Array.from(
    new Map(
      (historyQuery.data?.pages ?? [])
        .flatMap((page) => page.transactions)
        .map((transaction) => [transaction.id, transaction]),
    ).values(),
  ).toSorted(compareTransactionsByNewest)

  return {
    refs: { sentinel },
    state: { transactions },
    queries: { history: historyQuery },
    functions: { handleLoadMore, handleRetry },
  }
}
