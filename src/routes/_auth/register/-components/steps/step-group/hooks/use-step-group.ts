import type { SyntheticEvent } from 'react'

import { useGetCoursesCourseGet } from '#/api/hooks'

import { useRegisterCategoryStep } from '../../../../-hooks'
import { filterGroupIdsByCourses, getSelectedCoursesOutsideCategory } from '../../../../-utils'
import { useRegisterDraft } from '../../../register-provider'

export function useStepGroup() {
  const register = useRegisterDraft()
  const coursesQuery = useGetCoursesCourseGet()
  const navigation = useRegisterCategoryStep()

  const course = coursesQuery.data?.find(
    (item) => item.category === navigation.category && register.state.courseIds?.includes(item.id),
  )
  const group = course?.groups?.find((item) => register.state.groupIds?.includes(item.id))
  const canSubmit = coursesQuery.isSuccess && !!group

  const handleSelectGroup = (id: number) => {
    const otherCourses = getSelectedCoursesOutsideCategory(
      coursesQuery.data!,
      register.state,
      navigation.category,
    )
    const otherGroupIds = filterGroupIdsByCourses(otherCourses, register.state.groupIds) ?? []
    void register.setState({ groupIds: [...otherGroupIds, id] })
  }

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) return
    navigation.handleNextCategory()
  }

  return {
    state: {
      course,
      selectedGroupId: group?.id,
      canSubmit,
    },
    queries: { courses: coursesQuery },
    functions: { handleSelectGroup, handleSubmit },
  }
}
