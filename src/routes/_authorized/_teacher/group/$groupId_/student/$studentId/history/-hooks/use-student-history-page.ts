import { useLoaderData, useParams } from '@tanstack/react-router'

export function useStudentHistoryPage() {
  const params = useParams({
    from: '/_authorized/_teacher/group/$groupId_/student/$studentId/history/',
  })
  const student = useLoaderData({
    from: '/_authorized/_teacher/group/$groupId_/student/$studentId/history/',
  })

  return {
    state: { studentId: student.id, studentName: student.name, groupId: params.groupId },
  }
}
