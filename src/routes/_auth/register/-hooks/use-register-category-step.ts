import { useNavigate, useSearch } from '@tanstack/react-router'

import { CourseCategoryKey } from '#/api/types'

import { useRegisterDraft } from '../-components/register-provider'
import { RegisterStep } from '../-constants'

export interface RegisterStepSearch {
  step: RegisterStep
  category?: CourseCategoryKey
  drawer?: 'group'
}

export function useRegisterCategoryStep() {
  const register = useRegisterDraft()

  const search = useSearch({ from: '/_auth/register' })
  const navigate = useNavigate({ from: '/register' })

  const categories = register.state.categories!
  const category = search.category!

  const index = categories.indexOf(category)

  let previousSearch: RegisterStepSearch = { step: RegisterStep.Category }

  if (index > 0) previousSearch = { step: RegisterStep.Course, category: categories[index - 1] }

  const handleNextCategory = () => {
    const nextCategory = categories[categories.indexOf(category) + 1]

    if (nextCategory) {
      void navigate({ search: { step: RegisterStep.Course, category: nextCategory } })
      return
    }

    void navigate({ search: { step: RegisterStep.Avatar } })
  }

  return { category, index, total: categories.length, previousSearch, handleNextCategory }
}
