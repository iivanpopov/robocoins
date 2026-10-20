import { useNavigate, useSearch } from '@tanstack/react-router'

import { useGetCoursesCourseGet } from '#/api/hooks'

import { RegisterStep } from '../../../../-constants'
import { useRegisterCategoryStep } from '../../../../-hooks'
import { filterGroupIdsByCourses, getSelectedCoursesOutsideCategory } from '../../../../-utils'
import { useRegisterDraft } from '../../../register-provider'

export function useStepCourse() {
  const register = useRegisterDraft()
  const navigate = useNavigate({ from: '/register' })
  const search = useSearch({ from: '/_auth/register' })
  const coursesQuery = useGetCoursesCourseGet()
  const navigation = useRegisterCategoryStep()

  const courses =
    coursesQuery.data?.filter((course) => course.category === navigation.category) ?? []
  const selectedCourse = courses.find((course) => register.state.courseIds?.includes(course.id))
  const selectedGroup = selectedCourse?.groups?.find((group) =>
    register.state.groupIds?.includes(group.id),
  )

  const handleNext = () => {
    if (!selectedCourse || !coursesQuery.isSuccess) return
    if (!selectedGroup) {
      void navigate({
        search: { step: RegisterStep.Course, category: navigation.category, drawer: 'group' },
      })
      return
    }
    navigation.handleNextCategory()
  }

  const handleSelectCourse = async (id: number) => {
    const course = courses.find((item) => item.id === id)!

    const otherCourses = getSelectedCoursesOutsideCategory(
      coursesQuery.data!,
      register.state,
      navigation.category,
    )
    const selectedCourses = [...otherCourses, course]

    await register.setState({
      courseIds: selectedCourses.map((course) => course.id),
      groupIds: filterGroupIdsByCourses(selectedCourses, register.state.groupIds),
    })
    await navigate({
      search: { step: RegisterStep.Course, category: navigation.category, drawer: 'group' },
    })
  }

  const handleDrawerOpenChange = (open: boolean) => {
    if (open) return
    void navigate({
      search: { step: RegisterStep.Course, category: navigation.category },
      replace: true,
    })
  }

  return {
    state: {
      courses,
      selectedCourseId: selectedCourse?.id,
      selectedGroup,
      isDrawerOpen: search.drawer === 'group',
      category: navigation.category,
      index: navigation.index,
      total: navigation.total,
      previousSearch: navigation.previousSearch,
    },
    queries: { courses: coursesQuery },
    functions: { handleSelectCourse, handleDrawerOpenChange, handleNext },
  }
}
