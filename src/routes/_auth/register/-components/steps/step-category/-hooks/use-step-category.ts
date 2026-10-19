import { useNavigate } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'

import { useGetCoursesCourseGet } from '#/api/hooks'
import type { CourseCategoryKey } from '#/api/types'

import { StepCategorySchema } from '../-schemas'
import { RegisterStep } from '../../../../-constants'
import { useRegisterDraft } from '../../../register-provider'

export function useStepCategory() {
  const register = useRegisterDraft()
  const navigate = useNavigate({ from: '/register' })
  const coursesQuery = useGetCoursesCourseGet()

  const categories = [...new Set(coursesQuery.data?.map((course) => course.category))].map(
    (category) => ({
      category,
      courses: coursesQuery.data
        ?.filter((course) => course.category === category)
        .slice(0, 5)
        .map((course) => course.name)
        .join(', '),
    }),
  )
  const selectedCategories = register.state.categories ?? []

  const handleToggleCategory = (category: CourseCategoryKey) => {
    if (!coursesQuery.isSuccess) return
    let nextCategories = [...selectedCategories, category]
    if (selectedCategories.includes(category)) {
      nextCategories = selectedCategories.filter((value) => value !== category)
    }

    const courses = coursesQuery.data.filter((course) => nextCategories.includes(course.category))
    const courseIds = nextCategories.flatMap((category) => {
      const course = courses.find(
        (item) => item.category === category && register.state.courseIds?.includes(item.id),
      )
      if (!course) return []
      return [course.id]
    })
    register.setState({
      categories: nextCategories,
      courseIds,
      groupIds: register.state.groupIds?.filter((groupId) =>
        courses.some(
          (course) =>
            courseIds.includes(course.id) && course.groups?.some((item) => item.id === groupId),
        ),
      ),
    })
  }

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!StepCategorySchema.safeParse(selectedCategories).success || !coursesQuery.isSuccess) return
    void navigate({
      search: { step: RegisterStep.Course, category: selectedCategories[0] },
      viewTransition: { types: ['register-forward'] },
    })
  }

  return {
    state: { categories, selectedCategories },
    queries: { courses: coursesQuery },
    functions: { handleToggleCategory, handleSubmit },
  }
}
