import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'

import { getBalanceChangeReasonsExtBalanceBalanceChangeReasonsGetQueryOptions } from '#/api/hooks/useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet'
import { getStudentRewardProgressStudentStudentIdRewardProgressGetQueryOptions } from '#/api/hooks/useGetStudentRewardProgressStudentStudentIdRewardProgressGet'
import { getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryOptions } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import { StudentProfileResponse } from '#/api/types'
import { Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { COOKIE_MAX_AGE, LAST_LOG_ON_COOKIE } from '#/routes/-constants'
import { readCookie } from '#/utils/cookies'

import {
  CyberweenBanner,
  EarnWays,
  GoalCard,
  HistoryPreview,
  LeaderboardPreview,
  StudentHero,
} from './-components'
import {
  getWeeklyLeaderboardQueryOptions,
  getWeeklyLeaderboardRankQueryOptions,
} from './-components/leaderboard'
import { HISTORY_TRANSACTION_FETCH_LIMIT } from './-constants'
import { useStudentPage } from './-hooks'
import { getGoalProgressCookieName, getStudentRewardCategoriesQueryOptions } from './-utils'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_student/')({
  head: () => ({ meta: [{ title: 'Головна | Robocoins' }] }),
  beforeLoad: async ({ context }) => {
    const renderedAt = Date.now()
    const lastLogOn = Number(await readCookie(LAST_LOG_ON_COOKIE)) || Date.now()
    const goalProgressSnapshot = await readCookie(
      getGoalProgressCookieName((context.user as StudentProfileResponse).id),
    )
    return { lastLogOn, renderedAt, goalProgressSnapshot }
  },
  loader: async ({ context }) => {
    const profile = context.user as StudentProfileResponse
    return Promise.all([
      context.queryClient.query(
        getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryOptions({
          path: { student_id: profile.id },
          query: { limit: HISTORY_TRANSACTION_FETCH_LIMIT },
        }),
      ),
      context.queryClient.query(
        getBalanceChangeReasonsExtBalanceBalanceChangeReasonsGetQueryOptions(),
      ),
      context.queryClient.query(
        getStudentRewardProgressStudentStudentIdRewardProgressGetQueryOptions({
          path: { student_id: profile.id },
        }),
      ),
      context.queryClient
        .query(getStudentRewardCategoriesQueryOptions(context.queryClient, profile))
        .catch(() => undefined),
      context.queryClient.infiniteQuery(getWeeklyLeaderboardQueryOptions(3)).catch(() => undefined),
      context.queryClient
        .query(getWeeklyLeaderboardRankQueryOptions(profile.id))
        .catch(() => undefined),
    ])
  },
  onEnter: () => {
    if (import.meta.env.SSR) return
    void cookieStore.set({
      name: LAST_LOG_ON_COOKIE,
      value: String(Date.now()),
      path: '/',
      expires: Date.now() + COOKIE_MAX_AGE,
      sameSite: 'lax',
    })
  },
  component: StudentPage,
})

function StudentPage() {
  const { state, queries, functions } = useStudentPage()
  const t = useTranslate()

  return (
    <main className={styles.page} data-gradient={state.gradientVariant}>
      <StudentHero
        name={state.profile.name}
        avatar={state.avatar}
        balance={state.profile.balance}
        hasNewReward={state.hasNewReward}
        greetingVariant={state.greetingVariant}
        captionVariant={state.captionVariant}
        onOpenProfile={functions.handleOpenProfile}
        onOpenShop={functions.handleNavigateToShop}
      />
      {state.isGoalPending && <Loader grow role="status" aria-label={t('profile.goal.loading')} />}
      {state.isGoalError && (
        <InlineError onRetry={functions.handleRetryGoal} isRetrying={state.isGoalFetching}>
          {t('group.error')}
        </InlineError>
      )}
      {!state.isGoalPending && !state.isGoalError && (
        <GoalCard
          goal={state.goal}
          balance={state.profile.balance}
          remainingBalance={state.remainingBalance}
          progressPercent={state.goalProgressDisplay}
          isCompleted={state.goalCompleted}
          onOpenShop={functions.handleNavigateToShop}
        />
      )}
      <EarnWays />
      <CyberweenBanner />
      <LeaderboardPreview />
      <HistoryPreview
        groups={state.groups}
        isPending={queries.history.isPending}
        isError={queries.history.isError}
        isFetching={queries.history.isFetching}
        onRetry={functions.handleRetryHistory}
        onViewAll={functions.handleViewHistory}
      />
    </main>
  )
}
