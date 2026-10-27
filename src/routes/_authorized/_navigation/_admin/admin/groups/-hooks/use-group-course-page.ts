import { useForm, useSelector } from '@tanstack/react-form'
import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import { ChangeGroupCourseStateSchema } from '../-schemas'
import type { GroupErrorKey } from '../-types'
import { getGroupErrorKey, getGroupErrorStatus } from '../-utils'
import { useGroupWithCourse } from './use-group-with-course'

export function useGroupCoursePage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/groups/$groupId/course/',
  })

  const groupId = params.groupId

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const syncedGroupIdReference = useRef<number | null>(null)

  const groupData = useGroupWithCourse(groupId)

  const form = useForm({
    defaultValues: { courseId: '' },
    validators: { onChange: ChangeGroupCourseStateSchema },
    onSubmit: ({ value }) => {
      const group = groupData.group
      if (!group || selectedCourseId) return
      if (value.courseId === String(group.course_id)) return
      setSelectedCourseId(value.courseId)
    },
  })

  const courseId = useSelector(form.store, (state) => state.values.courseId)

  useEffect(() => {
    const group = groupData.group
    if (!group) return
    if (syncedGroupIdReference.current === group.id) return
    syncedGroupIdReference.current = group.id
    form.setFieldValue('courseId', String(group.course_id))
  }, [groupData.group, form])

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!groupData.group || selectedCourseId) return
    void form.handleSubmit()
  }

  function handleRetry() {
    if (groupData.groupQuery.isError && !groupData.groupQuery.isFetching) {
      void groupData.groupQuery.refetch()
    }
    if (groupData.coursesQuery.isError && !groupData.coursesQuery.isFetching) {
      void groupData.coursesQuery.refetch()
    }
  }

  const isUnchanged = !!groupData.group && courseId === String(groupData.group.course_id)
  const isNotFound = getGroupErrorStatus(groupData.groupQuery.error) === 404
  const error = groupData.groupQuery.error ?? groupData.coursesQuery.error ?? null

  let errorKey: GroupErrorKey | null = null
  if (!isNotFound && error) {
    errorKey = getGroupErrorKey(error, 'admin.groups.detail.error')
  }

  const selectedCourse =
    groupData.coursesQuery.data?.find((course) => String(course.id) === selectedCourseId) ?? null

  return {
    state: {
      groupId,
      group: groupData.group,
      course: groupData.course,
      courses: groupData.coursesQuery.data ?? [],
      selectedCourseId,
      selectedCourse,
      isUnchanged,
      errorKey,
      isNotFound,
      isPending: groupData.groupQuery.isPending || groupData.coursesQuery.isPending,
      isError: !!errorKey,
      isFetching: groupData.groupQuery.isFetching || groupData.coursesQuery.isFetching,
    },
    queries: { group: groupData.groupQuery, courses: groupData.coursesQuery },
    functions: { handleSubmit, handleRetry },
    features: { form },
  }
}
