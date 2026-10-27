import { useState } from 'react'

import { useGetAllRewardsRewardsGet } from '#/api/hooks/useGetAllRewardsRewardsGet'
import type { CourseCategoryKey, RewardTypeKey } from '#/api/types'

import { ALL_FILTER } from '../-constants'
import { getRewardRequestErrorKey } from '../-utils'

export function useCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState<CourseCategoryKey | typeof ALL_FILTER>(ALL_FILTER)
  const [type, setType] = useState<RewardTypeKey | typeof ALL_FILTER>(ALL_FILTER)

  const rewardsQuery = useGetAllRewardsRewardsGet(getRewardsRequest(category), {
    query: { retry: false },
  })

  function handleSearchChange(value: string) {
    setSearchQuery(value)
  }

  function handleClearSearch() {
    setSearchQuery('')
  }

  function handleCategoryChange(nextCategory: CourseCategoryKey | typeof ALL_FILTER) {
    setCategory(nextCategory)
  }

  function handleTypeChange(nextType: RewardTypeKey | typeof ALL_FILTER) {
    setType(nextType)
  }

  function handleResetFilters() {
    setSearchQuery('')
    setCategory(ALL_FILTER)
    setType(ALL_FILTER)
  }

  function handleRetry() {
    void rewardsQuery.refetch()
  }

  const normalizedSearch = searchQuery.trim().toLowerCase()
  const rewards = (rewardsQuery.data ?? []).filter((reward) => {
    if (type !== ALL_FILTER && reward.type !== type) return false
    if (!normalizedSearch) return true

    return (
      reward.name.toLowerCase().includes(normalizedSearch) ||
      (reward.description ?? '').toLowerCase().includes(normalizedSearch)
    )
  })

  const hasFilters = category !== ALL_FILTER || type !== ALL_FILTER || !!normalizedSearch
  const errorKey = rewardsQuery.isError
    ? getRewardRequestErrorKey(rewardsQuery.error, 'admin.catalog.error.load')
    : null

  return {
    state: {
      searchQuery,
      category,
      type,
      rewards,
      hasFilters,
      isPending: rewardsQuery.isPending,
      isError: rewardsQuery.isError,
      isFetching: rewardsQuery.isFetching,
      errorKey,
    },
    queries: {
      rewards: rewardsQuery,
    },
    functions: {
      handleSearchChange,
      handleClearSearch,
      handleCategoryChange,
      handleTypeChange,
      handleResetFilters,
      handleRetry,
    },
  }
}

function getRewardsRequest(category: CourseCategoryKey | typeof ALL_FILTER) {
  if (category === ALL_FILTER) return {}
  return { query: { course_category: category } }
}
