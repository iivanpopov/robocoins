import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import * as v from 'valibot'

import { getGroupByIdGroupIdGroupIdGetQueryOptions } from '#/api/hooks/useGetGroupByIdGroupIdGroupIdGet'
import { getTeacherGroupsTeacherGroupsGetQueryOptions } from '#/api/hooks/useGetTeacherGroupsTeacherGroupsGet'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  IconButton,
  Loader,
} from '#/components/ui'
import {
  getRewardHistoryQueryOptions,
  RewardHistory,
} from '#/routes/_authorized/-components/reward-history'

import { useStudentHistoryPage } from './-hooks'

const HistoryParamsSchema = v.object({
  groupId: v.pipe(
    v.string(),
    v.regex(/^\d+$/),
    v.transform(Number),
    v.safeInteger(),
    v.minValue(1),
  ),
  studentId: v.pipe(
    v.string(),
    v.regex(/^\d+$/),
    v.transform(Number),
    v.safeInteger(),
    v.minValue(1),
  ),
})

export const Route = createFileRoute(
  '/_authorized/_teacher/group/$groupId_/student/$studentId/history/',
)({
  params: {
    parse: (params) => {
      const result = v.safeParse(HistoryParamsSchema, params)
      if (!result.success) throw notFound()
      return result.output
    },
  },
  loader: async ({ context, params }) => {
    const groups = await context.queryClient.query(getTeacherGroupsTeacherGroupsGetQueryOptions())
    if (!groups.some((group) => group.id === params.groupId)) throw notFound()

    const group = await context.queryClient.query(
      getGroupByIdGroupIdGroupIdGetQueryOptions({ path: { group_id: params.groupId } }),
    )
    const student = group.students?.find((value) => value.id === params.studentId)
    if (!student) throw notFound()

    await context.queryClient
      .infiniteQuery(getRewardHistoryQueryOptions(student.id))
      .catch(() => undefined)
    return student
  },
  component: StudentHistoryPage,
})

function StudentHistoryPage() {
  const { state, mutations, functions } = useStudentHistoryPage()
  const t = useTranslate()

  return (
    <>
      <RewardHistory
        studentId={state.studentId}
        studentName={state.studentName}
        omitLeadingCoinZero
        isCancelling={mutations.cancelTransactionMutation.isPending}
        onCancel={functions.handleCancel}
        backLink={
          <IconButton
            nativeButton={false}
            render={<Link to="/group/$groupId" params={{ groupId: String(state.groupId) }} />}
            title={t('history.back')}
          >
            <span aria-hidden="true" className="i-ph:arrow-left" />
          </IconButton>
        }
      />
      <AlertDialog open={!!state.transaction} onOpenChange={functions.handleCancelOpenChange}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('balance.cancel.action')}</AlertDialogTitle>
            {state.transaction && (
              <AlertDialogDescription>
                {t('award.cancel.confirm.trigger', { amount: state.transaction.amount })}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={mutations.cancelTransactionMutation.isPending}>
              {t('action.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={functions.handleConfirmCancel}
              disabled={mutations.cancelTransactionMutation.isPending}
              aria-busy={mutations.cancelTransactionMutation.isPending}
            >
              {mutations.cancelTransactionMutation.isPending && <Loader />}
              {t('action.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
