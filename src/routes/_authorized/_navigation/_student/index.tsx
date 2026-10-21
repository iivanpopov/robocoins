import { useTranslate } from '@kanjou/react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { cn } from 'cn'

import { getBalanceChangeReasonsExtBalanceBalanceChangeReasonsGetQueryOptions } from '#/api/hooks/useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet'
import { getStudentRewardProgressStudentStudentIdRewardProgressGetQueryOptions } from '#/api/hooks/useGetStudentRewardProgressStudentStudentIdRewardProgressGet'
import { getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryOptions } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import { StudentProfileResponse } from '#/api/types'
import { Avatar, AvatarFallback, AvatarImage, Button, Loader, Typography } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { COOKIE_MAX_AGE, LAST_LOG_ON_COOKIE, type Avatar as AvatarName } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'
import { readCookie } from '#/utils/cookies'

import { RulesDrawer } from './-components'
import { useStudentPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_student/')({
  beforeLoad: async () => {
    const renderedAt = Date.now()
    const lastLogOn = Number(await readCookie(LAST_LOG_ON_COOKIE)) || Date.now()
    return { lastLogOn, renderedAt }
  },
  loader: async ({ context }) => {
    const profile = context.user as StudentProfileResponse
    return Promise.all([
      context.queryClient.query(
        getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryOptions({
          path: { student_id: profile.id },
          query: { limit: 3 },
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
  const navigate = useNavigate()
  const t = useTranslate()
  const { state, queries, functions } = useStudentPage()

  function handleNavigateToShop() {
    void navigate({ to: '/shop' })
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Avatar>
          <AvatarImage
            src={getAvatarUrl(state.profile.avatar as AvatarName)}
            alt={state.profile.name}
          />
          <AvatarFallback role="img" aria-label={state.profile.name}>
            {getInitial(state.profile.name)}
          </AvatarFallback>
        </Avatar>
        <Typography className={styles.name} variant="subtitle">
          {state.profile.name}
        </Typography>
        <div className={styles.balance}>
          <span>{t('profile.balance.amount', { count: state.profile.balance })}</span>
          <div aria-hidden="true" className={cn('i-ph:coins-bold', styles['coin-icon'])} />
        </div>
      </header>
      {!state.goal && (
        <article className={styles.goal}>
          <Typography className={styles['product-name']} variant="subtitle">
            {t('profile.goal.none')}
          </Typography>
          <Button onClick={handleNavigateToShop}>{t('profile.goal.shop')}</Button>
        </article>
      )}
      {state.goal && (
        <article className={styles.goal}>
          <div className={styles['product-heading']}>
            <Typography className={styles['product-name']} variant="subtitle">
              {state.goal.name}
            </Typography>
            <div aria-hidden="true" className={cn('i-ph:caret-right-bold', styles.chevron)} />
          </div>
          <p className={styles.amount}>
            <strong>{t('profile.balance.amount', { count: state.profile.balance })}</strong>{' '}
            {t('profile.goal.target', { count: state.goal.price })}{' '}
            <span aria-hidden="true" className="i-ph:coins-bold" />
          </p>
          <div className={styles.progress}>
            <span
              data-active={state.profile.balance > 0}
              data-completed={state.goalCompleted}
              style={{ width: state.goalProgress }}
            />
          </div>
          <Typography className={styles.label} variant="caption">
            {state.goalCompleted && t('profile.goal.completed')}
            {!state.goalCompleted && t('profile.goal.remaining', { count: state.remainingBalance })}
          </Typography>
        </article>
      )}
      <section className={styles.history}>
        <div className={styles['section-heading']}>
          <Typography className={styles['history-title']} variant="subtitle">
            {t('profile.history.title')}
          </Typography>
          <Button className={styles['all-button']} variant="link">
            {t('profile.history.all')}
          </Button>
        </div>
        {queries.history.isPending && (
          <div
            className={styles['history-loading']}
            role="status"
            aria-label={t('profile.history.loading')}
          >
            <Loader />
          </div>
        )}
        {queries.history.isError && (
          <InlineError
            onRetry={functions.handleRetryHistory}
            isRetrying={queries.history.isFetching}
          >
            {t('group.error')}
          </InlineError>
        )}
        {queries.history.isSuccess && !state.groups.length && <p>{t('profile.history.empty')}</p>}
        {state.groups.map((group) => (
          <div key={group.date}>
            <div className={styles['day-heading']}>
              <span>{group.date}</span>
              <span>{group.total}</span>
            </div>
            {group.transactions.map((transaction) => (
              <div
                className={cn(styles.operation, transaction.isNew && styles['operation-today'])}
                key={transaction.id}
              >
                <div className={styles['operation-icon']}>
                  <div
                    aria-hidden="true"
                    className={cn(
                      transaction.isDeposit && 'i-ph:trophy-bold',
                      !transaction.isDeposit && 'i-ph:minus-circle-bold',
                    )}
                  />
                  {transaction.isNew && <span aria-hidden="true" className={styles['icon-dot']} />}
                </div>
                <span>
                  {(transaction.reason ?? [])
                    .map((reason) => t.unsafe(`reason.${reason}`))
                    .join(', ')}
                </span>
                <strong className={cn(transaction.isDeposit && styles['new-amount'])}>
                  {t('profile.history.amount', { count: transaction.signedAmount })}
                </strong>
              </div>
            ))}
          </div>
        ))}
        <RulesDrawer className={styles['rules-button']} />
      </section>
    </main>
  )
}
