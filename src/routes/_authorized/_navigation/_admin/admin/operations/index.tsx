import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { getAllStudentsStudentGetQueryOptions } from '#/api/hooks/useGetAllStudentsStudentGet'
import { getBalanceChangeReasonsExtBalanceBalanceChangeReasonsGetQueryOptions } from '#/api/hooks/useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet'
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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Loader,
} from '#/components/ui'

import { ApiErrorNotice } from '../-components'
import {
  BulkStudentRow,
  OperationSummary,
  OperationsLinks,
  StudentOperationResultRow,
} from './-components'
import { OperationBatchKind, OperationDirection } from './-constants'
import { useOperationsPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/operations/')({
  head: () => ({ meta: [{ title: 'Операції з балансом | Robocoins' }] }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.prefetchQuery(getAllStudentsStudentGetQueryOptions()),
      context.queryClient.prefetchQuery(
        getBalanceChangeReasonsExtBalanceBalanceChangeReasonsGetQueryOptions(),
      ),
    ])
  },
  component: OperationsPage,
})

function OperationsPage() {
  const { state, functions } = useOperationsPage()

  const t = useTranslate()

  const confirmStudentCount = state.pendingOperation?.studentIds.length ?? 0
  const isRetry = state.pendingOperation?.kind === OperationBatchKind.Retry
  const reasonsLabel = state.selectedReasons
    .map((reason) => t.unsafe(`reason.${reason}`))
    .join(', ')

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <IconButton
          nativeButton={false}
          render={<Link to="/admin" />}
          title={t('admin.operations.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <div className={styles.heading}>
          <h1 className={styles.title}>{t('admin.operations.title')}</h1>
          <p className={styles.description}>{t('admin.operations.description')}</p>
        </div>
      </header>

      <OperationsLinks />

      <article className={styles.card}>
        <header className={styles['card-header']}>
          <h2 className={styles['card-title']}>{t('admin.operations.bulk.title')}</h2>
          <p className={styles['card-description']}>{t('admin.operations.bulk.description')}</p>
        </header>

        {state.studentsIsPending && <Loader grow />}
        {state.studentsIsError && !!state.studentsErrorKind && (
          <ApiErrorNotice
            kind={state.studentsErrorKind}
            fallback={t('admin.operations.students.error')}
            onRetry={functions.handleRetryStudents}
            isRetrying={state.studentsIsFetching}
            onLogin={functions.handleLogin}
          />
        )}

        {!state.studentsIsPending && !state.studentsIsError && (
          <>
            {!state.totalCount && (
              <p className={styles.empty}>{t('admin.operations.students.empty')}</p>
            )}
            {!!state.totalCount && (
              <>
                <InputGroup>
                  <InputGroupAddon aria-hidden="true">
                    <span className="i-ph:magnifying-glass" />
                  </InputGroupAddon>
                  <InputGroupInput
                    type="search"
                    value={state.query}
                    onChange={(event) => functions.handleQueryChange(event.target.value)}
                    placeholder={t('admin.operations.students.search-placeholder')}
                    aria-label={t('admin.operations.students.search-label')}
                    autoComplete="off"
                  />
                </InputGroup>

                <div className={styles.summary}>
                  <span>{t('admin.operations.students.found', { count: state.foundCount })}</span>
                  <span>
                    {t('admin.operations.students.selected', { count: state.selectedCount })}
                  </span>
                </div>

                <div className={styles['selection-actions']}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={functions.handleSelectFiltered}
                    disabled={state.isRunning || !state.foundCount}
                  >
                    {t('admin.operations.students.select-found')}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={functions.handleClearSelection}
                    disabled={state.isRunning || !state.selectedCount}
                  >
                    {t('admin.operations.students.clear')}
                  </Button>
                </div>

                {!state.foundCount && (
                  <p className={styles.empty}>{t('admin.operations.students.empty-filtered')}</p>
                )}
                {!!state.foundCount && (
                  <div className={styles.students}>
                    {state.filteredStudents.map((student) => (
                      <BulkStudentRow
                        key={student.id}
                        student={student}
                        selected={state.selectedIds.includes(student.id)}
                        disabled={state.isRunning}
                        onToggle={functions.handleStudentToggle}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        <div
          className={styles.directions}
          role="group"
          aria-label={t('admin.operations.direction.label')}
        >
          <Chip
            selected={state.direction === OperationDirection.Reward}
            disabled={state.isRunning}
            onClick={() => functions.handleDirectionChange(OperationDirection.Reward)}
          >
            {t('admin.balance.operation.reward')}
          </Chip>
          <Chip
            selected={state.direction === OperationDirection.Punish}
            disabled={state.isRunning}
            onClick={() => functions.handleDirectionChange(OperationDirection.Punish)}
          >
            {t('admin.balance.operation.punish')}
          </Chip>
        </div>

        {state.reasonsIsPending && <Loader grow />}
        {state.reasonsIsError && !!state.reasonsErrorKind && (
          <ApiErrorNotice
            kind={state.reasonsErrorKind}
            fallback={t('admin.operations.reasons.error')}
            onRetry={functions.handleRetryReasons}
            isRetrying={state.reasonsIsFetching}
            onLogin={functions.handleLogin}
          />
        )}

        {!state.reasonsIsPending && !state.reasonsIsError && (
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
                    disabled={state.isRunning}
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
          </>
        )}

        {state.hasUnresolvedUnknown && (
          <p className={styles.warning}>{t('admin.operations.result.unknown-blocked')}</p>
        )}

        <Button
          className={styles.submit}
          disabled={
            !state.selectedCount ||
            !state.selectedReasons.length ||
            state.isRunning ||
            state.hasUnresolvedUnknown ||
            state.studentsIsPending ||
            state.studentsIsError ||
            state.reasonsIsPending ||
            state.reasonsIsError
          }
          aria-busy={state.isRunning}
          onClick={functions.handleRequestSubmit}
        >
          {state.isRunning && <Loader />}
          {t('admin.operations.bulk.submit')}
        </Button>
      </article>

      {!!state.results.length && (
        <article className={styles.card}>
          <header className={styles['card-header']}>
            <h2 className={styles['card-title']}>{t('admin.operations.result.title')}</h2>
            <p className={styles['card-description']}>{t('admin.operations.result.description')}</p>
          </header>

          <OperationSummary
            successCount={state.successCount}
            failureCount={state.failureCount}
            unknownCount={state.unknownCount}
            retryableCount={state.retryableCount}
            pendingCount={state.pendingCount}
            hasUnresolvedUnknown={state.hasUnresolvedUnknown}
            isRunning={state.isRunning}
            refreshError={state.refreshError}
            isRefreshing={state.isRefreshing}
            onRetryFailed={functions.handleRequestRetry}
            onRefreshData={functions.handleRefreshData}
          />

          <ol className={styles.results}>
            {state.results.map((result) => (
              <StudentOperationResultRow
                key={result.studentId}
                result={result}
                isRunning={state.isRunning}
                onCheckHistory={functions.handleCheckHistory}
              />
            ))}
          </ol>
        </article>
      )}

      <AlertDialog open={!!state.pendingOperation} onOpenChange={functions.handleConfirmOpenChange}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.operations.confirm.title')}</AlertDialogTitle>
            {!isRetry && (
              <AlertDialogDescription>
                {t('admin.operations.confirm.description', {
                  count: confirmStudentCount,
                  reasons: reasonsLabel,
                })}
              </AlertDialogDescription>
            )}
            {isRetry && (
              <AlertDialogDescription>
                {t('admin.operations.confirm.retry-description', { count: confirmStudentCount })}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={state.isRunning}>{t('action.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={functions.handleConfirm}
              disabled={state.isRunning}
              aria-busy={state.isRunning}
            >
              {state.isRunning && <Loader />}
              {!isRetry && t('admin.operations.confirm.action')}
              {isRetry && t('admin.operations.confirm.retry-action')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
