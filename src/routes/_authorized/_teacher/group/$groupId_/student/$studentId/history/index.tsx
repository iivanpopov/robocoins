import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { getGroupByIdGroupIdGroupIdGetQueryOptions } from '#/api/hooks/useGetGroupByIdGroupIdGroupIdGet'
import { getTeacherGroupsTeacherGroupsGetQueryOptions } from '#/api/hooks/useGetTeacherGroupsTeacherGroupsGet'
import { IconButton } from '#/components/ui'
import { RewardHistory } from '#/routes/_authorized/-components/reward-history'

import { useStudentHistoryPage } from './-hooks'

export const Route = createFileRoute(
  '/_authorized/_teacher/group/$groupId_/student/$studentId/history/',
)({
  loader: async ({ context, params }) => {
    const groupId = Number(params.groupId)
    const studentId = Number(params.studentId)
    if (
      !/^\d+$/.test(params.groupId) ||
      !/^\d+$/.test(params.studentId) ||
      !Number.isSafeInteger(groupId) ||
      !Number.isSafeInteger(studentId) ||
      groupId <= 0 ||
      studentId <= 0
    )
      throw notFound()

    const groups = await context.queryClient.query(getTeacherGroupsTeacherGroupsGetQueryOptions())
    if (!groups.some((group) => group.id === groupId)) throw notFound()

    const group = await context.queryClient.query(
      getGroupByIdGroupIdGroupIdGetQueryOptions({ path: { group_id: groupId } }),
    )
    const student = group.students?.find((value) => value.id === studentId)
    if (!student) throw notFound()
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
          render={<Link to="/group/$groupId" params={{ groupId: state.groupId }} />}
          title={t('history.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
      }
    />
  )
}
