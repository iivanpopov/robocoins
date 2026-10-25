import { createFileRoute, redirect } from '@tanstack/react-router'

import { getShopRewardsShopGetQueryOptions } from '#/api/hooks/useGetShopRewardsShopGet'
import type { StudentProfileResponse } from '#/api/types'
import { getStudentRewardCategoriesQueryOptions } from '#/routes/_authorized/_navigation/_student/-utils'

export const Route = createFileRoute('/_authorized/_navigation/_student')({
  beforeLoad: ({ context }) => {
    if (context.user?.role !== 'student') throw redirect({ to: '/group' })
    if (import.meta.env.SSR) return

    const profile = context.user as StudentProfileResponse

    void context.queryClient.query(getShopRewardsShopGetQueryOptions()).catch(() => undefined)
    void context.queryClient
      .query(getStudentRewardCategoriesQueryOptions(context.queryClient, profile))
      .catch(() => undefined)
  },
})
