import { useTranslate } from '@kanjou/react'
import { createFileRoute, notFound, useParams } from '@tanstack/react-router'
import * as v from 'valibot'

import { getBalanceChangeReasonsExtBalanceBalanceChangeReasonsGetQueryOptions } from '#/api/hooks/useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet'
import { getBalanceLeaderboardRankStudentLeaderboardBalanceStudentIdGetQueryOptions } from '#/api/hooks/useGetBalanceLeaderboardRankStudentLeaderboardBalanceStudentIdGet'
import { getStudentBalanceByIdStudentStudentIdBalanceGetQueryOptions } from '#/api/hooks/useGetStudentBalanceByIdStudentStudentIdBalanceGet'
import { getStudentByIdStudentStudentIdGetQueryOptions } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { getStudentRewardProgressStudentStudentIdRewardProgressGetQueryOptions } from '#/api/hooks/useGetStudentRewardProgressStudentStudentIdRewardProgressGet'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Chip,
  IconButton,
  Loader,
} from '#/components/ui'

import { ApiErrorNotice } from '../../-components'
import { CancelTransactionDialog, TransactionRow } from './-components'
import { BalanceMutationKind, BalanceDirection } from './-constants'
import { useStudentBalancePage } from './-hooks'
import { getStudentTransactionsQueryOptions } from './-utils'

import styles from './index.module.css'

const BalanceStudentParamsSchema = v.object({
  studentId: v.pipe(
    v.string(),
    v.regex(/^\d+$/),
    v.transform(Number),
    v.safeInteger(),
    v.minValue(1),
  ),
})

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/people/students/$studentId/balance/',
)({
  head: () => ({ meta: [{ title: 'Баланс учня | Robocoins' }] }),
  params: {
    parse: (params) => {
      const result = v.safeParse(BalanceStudentParamsSchema, params)
      if (!result.success) throw notFound()
      return result.output
    },
  },
  loader: async ({ context, params }) => {
    const path = { student_id: params.studentId }

    await Promise.all([
      context.queryClient.prefetchQuery(getStudentByIdStudentStudentIdGetQueryOptions({ path })),
      context.queryClient.prefetchQuery(
        getStudentBalanceByIdStudentStudentIdBalanceGetQueryOptions({ path }),
      ),
      context.queryClient.prefetchQuery(
        getStudentRewardProgressStudentStudentIdRewardProgressGetQueryOptions({ path }),
      ),
      context.queryClient.prefetchQuery(
        getBalanceLeaderboardRankStudentLeaderboardBalanceStudentIdGetQueryOptions({ path }),
      ),
      context.queryClient.prefetchQuery(
        getBalanceChangeReasonsExtBalanceBalanceChangeReasonsGetQueryOptions(),
      ),
      context.queryClient
        .infiniteQuery(getStudentTransactionsQueryOptions(params.studentId))
        .catch(() => undefined),
    ])
  },
  component: StudentBalancePage,
})

function StudentBalancePage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/students/$studentId/balance/',
  })

  return <StudentBalanceContent key={params.studentId} studentId={params.studentId} />
}

interface StudentBalanceContentProps {
  studentId: number
}

function StudentBalanceContent(props: StudentBalanceContentProps) {
  const { state, queries, mutations, functions } = useStudentBalancePage(props.studentId)

  const t = useTranslate()

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <IconButton onClick={functions.handleBack} title={t('admin.balance.back')}>
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <div className={styles.heading}>
          <h1 className={styles.title}>{t('admin.balance.title')}</h1>
          {!!state.studentName && <p className={styles.student}>{state.studentName}</p>}
        </div>
      </header>

      {!!state.unknownResult && (
        <section className={styles.unknown} role="alert">
          <span aria-hidden="true" className={styles['unknown-icon']}>
            <span className="i-ph:warning-circle-duotone" />
          </span>
          <div className={styles['unknown-details']}>
            <h2 className={styles['unknown-title']}>{t('admin.balance.unknown.title')}</h2>
            {state.unknownResult === BalanceMutationKind.Change && (
              <p className={styles['unknown-description']}>{t('admin.balance.unknown.change')}</p>
            )}
            {state.unknownResult === BalanceMutationKind.Cancel && (
              <p className={styles['unknown-description']}>{t('admin.balance.unknown.cancel')}</p>
            )}
            {state.isUnknownHistoryChecked && (
              <p className={styles['unknown-success']}>{t('admin.balance.unknown.checked')}</p>
            )}
            {state.unknownReadError && (
              <p className={styles['unknown-error']} role="status">
                {t('admin.balance.unknown.verify-error')}
              </p>
            )}
          </div>
          {!state.isUnknownHistoryChecked && (
            <Button
              variant="ghost"
              onClick={functions.handleVerifyUnknownResult}
              disabled={state.isVerifyingUnknown}
              aria-busy={state.isVerifyingUnknown}
            >
              {state.isVerifyingUnknown && <Loader />}
              {t('admin.balance.unknown.verify')}
            </Button>
          )}
          {state.isUnknownHistoryChecked && (
            <Button variant="ghost" onClick={functions.handleAcknowledgeUnknownResult}>
              {t('admin.balance.unknown.acknowledge')}
            </Button>
          )}
        </section>
      )}

      {state.readRefreshError && !state.unknownResult && (
        <section className={styles.unknown} role="alert">
          <span aria-hidden="true" className={styles['unknown-icon']}>
            <span className="i-ph:arrows-clockwise" />
          </span>
          <div className={styles['unknown-details']}>
            <h2 className={styles['unknown-title']}>{t('admin.balance.refresh.title')}</h2>
            <p className={styles['unknown-description']}>{t('admin.balance.refresh.error')}</p>
          </div>
          <Button
            variant="ghost"
            onClick={functions.handleRefreshReadData}
            disabled={state.isRefreshingRead}
            aria-busy={state.isRefreshingRead}
          >
            {state.isRefreshingRead && <Loader />}
            {t('admin.balance.refresh.action')}
          </Button>
        </section>
      )}

      <article className={styles.card}>
        <header className={styles['card-header']}>
          <h2 className={styles['card-title']}>{t('admin.balance.summary.title')}</h2>
          <p className={styles['card-description']}>{t('admin.balance.summary.description')}</p>
        </header>

        {state.summaryIsPending && !state.summaryIsError && <Loader grow />}
        {state.summaryIsError && !!state.summaryErrorKind && (
          <ApiErrorNotice
            kind={state.summaryErrorKind}
            fallback={t('admin.balance.summary.error')}
            onRetry={functions.handleRetrySummary}
            isRetrying={state.summaryIsRetrying}
            onLogin={functions.handleLogin}
          />
        )}

        {!state.summaryIsPending && !state.summaryIsError && (
          <div className={styles.summary}>
            <div className={styles.metric}>
              <span className={styles.label}>{t('admin.balance.summary.balance')}</span>
              <span className={styles['balance-value']}>
                {t('profile.balance.amount', { count: state.balance })}
              </span>
              <span className={styles['balance-unit']}>
                {t('admin.balance.coins', { count: state.balance })}
              </span>
            </div>

            <div className={styles.metric}>
              <span className={styles.label}>{t('admin.balance.summary.reward')}</span>
              {!!state.rewardProgress?.reward && (
                <>
                  <span className={styles['reward-name']}>{state.rewardProgress.reward.name}</span>
                  {state.rewardProgressPercent !== null && (
                    <div
                      className={styles.progress}
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={state.rewardProgressPercent}
                      aria-label={t('admin.balance.summary.reward')}
                    >
                      <div
                        className={styles['progress-fill']}
                        style={{ width: `${state.rewardProgressPercent}%` }}
                      />
                    </div>
                  )}
                  <span className={styles.caption}>
                    {t('admin.balance.summary.reward-progress', {
                      saved: state.rewardProgress.balance,
                      price: state.rewardProgress.reward.price,
                    })}
                  </span>
                  {state.rewardProgress.coins_remaining !== null &&
                    state.rewardProgress.coins_remaining > 0 && (
                      <span className={styles.caption}>
                        {t('admin.balance.summary.reward-remaining', {
                          count: state.rewardProgress.coins_remaining,
                        })}
                      </span>
                    )}
                  {state.rewardProgress.coins_remaining === 0 && (
                    <span className={styles['reward-ready']}>
                      {t('admin.balance.summary.reward-ready')}
                    </span>
                  )}
                </>
              )}
              {!state.rewardProgress?.reward && (
                <span className={styles.caption}>{t('admin.balance.summary.reward-none')}</span>
              )}
            </div>

            <div className={styles.metric}>
              <span className={styles.label}>{t('admin.balance.summary.rank')}</span>
              {!!state.rank && state.rank.rank > 0 && (
                <span className={styles['rank-value']}>
                  {t('admin.balance.summary.rank-value', { rank: state.rank.rank })}
                </span>
              )}
              {(!state.rank || state.rank.rank <= 0) && (
                <span className={styles.caption}>{t('admin.balance.summary.rank-none')}</span>
              )}
            </div>
          </div>
        )}
      </article>

      <article className={styles.card}>
        <header className={styles['card-header']}>
          <h2 className={styles['card-title']}>{t('admin.balance.operation.title')}</h2>
          <p className={styles['card-description']}>{t('admin.balance.operation.description')}</p>
        </header>

        <div
          className={styles.directions}
          role="group"
          aria-label={t('admin.balance.operation.direction')}
        >
          <Chip
            selected={state.direction === BalanceDirection.Reward}
            disabled={mutations.changeBalance.isPending || !!state.unknownResult}
            onClick={() => functions.handleDirectionChange(BalanceDirection.Reward)}
          >
            {t('admin.balance.operation.reward')}
          </Chip>
          <Chip
            selected={state.direction === BalanceDirection.Punish}
            disabled={mutations.changeBalance.isPending || !!state.unknownResult}
            onClick={() => functions.handleDirectionChange(BalanceDirection.Punish)}
          >
            {t('admin.balance.operation.punish')}
          </Chip>
        </div>

        {queries.reasons.isPending && <Loader grow />}
        {queries.reasons.isError && !!state.reasonsErrorKind && (
          <ApiErrorNotice
            kind={state.reasonsErrorKind}
            fallback={t('admin.balance.operation.reasons-error')}
            onRetry={functions.handleRetryReasons}
            isRetrying={queries.reasons.isFetching}
            onLogin={functions.handleLogin}
          />
        )}

        {!queries.reasons.isPending && !queries.reasons.isError && (
          <>
            {!!state.reasons.length && (
              <div
                className={styles.reasons}
                role="group"
                aria-label={t('admin.balance.operation.reasons')}
              >
                {state.reasons.map((reason) => (
                  <Chip
                    key={reason}
                    selected={state.selectedReasons.includes(reason)}
                    disabled={
                      mutations.changeBalance.isPending ||
                      !!state.pendingDeductionReasons ||
                      !!state.unknownResult
                    }
                    onClick={() => functions.handleReasonToggle(reason)}
                  >
                    {t.unsafe(`reason.${reason}`)}
                  </Chip>
                ))}
              </div>
            )}
            {!state.reasons.length && (
              <p className={styles.empty}>{t('admin.balance.operation.reasons-empty')}</p>
            )}
            <Button
              className={styles.submit}
              disabled={
                !state.selectedReasons.length ||
                mutations.changeBalance.isPending ||
                !!state.unknownResult
              }
              aria-busy={mutations.changeBalance.isPending}
              onClick={functions.handleChangeSubmit}
            >
              {mutations.changeBalance.isPending && <Loader />}
              {t('admin.balance.operation.submit')}
            </Button>
          </>
        )}

        {!!state.changeErrorKind && !state.unknownResult && (
          <ApiErrorNotice
            kind={state.changeErrorKind}
            fallback={t('admin.balance.operation.error')}
            onLogin={functions.handleLogin}
          />
        )}
      </article>

      <article className={styles.card}>
        <header className={styles['card-header']}>
          <h2 className={styles['card-title']}>{t('admin.balance.history.title')}</h2>
          <p className={styles['card-description']}>{t('admin.balance.history.description')}</p>
        </header>

        {queries.history.isPending && (
          <div role="status" aria-label={t('admin.balance.history.loading')}>
            <Loader grow />
          </div>
        )}
        {queries.history.isError && !!state.historyErrorKind && (
          <ApiErrorNotice
            kind={state.historyErrorKind}
            fallback={t('admin.balance.history.error')}
            onRetry={functions.handleRetryHistory}
            isRetrying={queries.history.isFetching}
            onLogin={functions.handleLogin}
          />
        )}
        {queries.history.isSuccess && !state.transactions.length && (
          <p className={styles.empty} role="status">
            {t('admin.balance.history.empty')}
          </p>
        )}
        {!!state.transactions.length && (
          <ol className={styles.history}>
            {state.transactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                cancelDisabled={state.isCancelling || !!state.unknownResult}
                onCancel={functions.handleRequestCancel}
              />
            ))}
          </ol>
        )}
        {queries.history.isFetchingNextPage && (
          <div role="status" aria-label={t('admin.balance.history.loading')}>
            <Loader grow />
          </div>
        )}
        {queries.history.hasNextPage && !queries.history.isError && (
          <Button
            variant="ghost"
            onClick={functions.handleLoadMore}
            disabled={queries.history.isFetching}
            aria-busy={queries.history.isFetchingNextPage}
          >
            {t('admin.balance.history.load-more')}
          </Button>
        )}
        {queries.history.isSuccess &&
          !queries.history.hasNextPage &&
          !!state.transactions.length && (
            <p className={styles.status} role="status">
              {t('admin.balance.history.end')}
            </p>
          )}
      </article>

      <CancelTransactionDialog
        open={!!state.pendingCancelTransaction}
        transaction={state.pendingCancelTransaction}
        isPending={state.isCancelling}
        errorKind={state.cancelErrorKind}
        onOpenChange={functions.handleCancelDialogOpenChange}
        onConfirm={functions.handleConfirmCancel}
      />

      <AlertDialog
        open={!!state.pendingDeductionReasons}
        onOpenChange={functions.handleDeductionDialogOpenChange}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.balance.operation.confirm.title')}</AlertDialogTitle>
            {!!state.pendingDeductionReasons && (
              <AlertDialogDescription>
                {t('admin.balance.operation.confirm.description', {
                  reasons: state.pendingDeductionReasons
                    .map((reason) => t.unsafe(`reason.${reason}`))
                    .join(', '),
                })}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={mutations.changeBalance.isPending}>
              {t('action.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={functions.handleConfirmDeduction}
              disabled={mutations.changeBalance.isPending}
              aria-busy={mutations.changeBalance.isPending}
            >
              {mutations.changeBalance.isPending && <Loader />}
              {t('admin.balance.operation.confirm.action')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
