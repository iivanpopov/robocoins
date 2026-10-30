import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import * as v from 'valibot'

import { getGroupByIdGroupIdGroupIdGetQueryOptions } from '#/api/hooks/useGetGroupByIdGroupIdGroupIdGet'
import { getTeacherGroupsTeacherGroupsGetQueryOptions } from '#/api/hooks/useGetTeacherGroupsTeacherGroupsGet'
import { IconButton } from '#/components/ui'
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
  const { state } = useStudentHistoryPage()
  const t = useTranslate()

  return (
    <RewardHistory
      studentId={state.studentId}
      studentName={state.studentName}
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
  )
}
