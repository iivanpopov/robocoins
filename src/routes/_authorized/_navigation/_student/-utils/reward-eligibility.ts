import { queryOptions, type QueryClient } from '@tanstack/react-query'

import { getCoursesCourseGetQueryOptions } from '#/api/hooks/useGetCoursesCourseGet'
import { getGroupByIdGroupIdGroupIdGetQueryOptions } from '#/api/hooks/useGetGroupByIdGroupIdGroupIdGet'
import type { CourseCategoryKey, RewardResponse, StudentProfileResponse } from '#/api/types'

export function isRewardEligible(
  reward: RewardResponse,
  categories: CourseCategoryKey[] | undefined,
) {
  return (
    reward.course_category === null ||
    reward.course_category === 'no category' ||
    Boolean(categories?.includes(reward.course_category))
  )
}

export function getStudentRewardCategoriesQueryOptions(
  queryClient: QueryClient,
  profile: StudentProfileResponse,
) {
  const groupIds = [...new Set(profile.group_ids)].toSorted((first, second) => first - second)

  return queryOptions({
    queryKey: ['student-reward-categories', profile.id, groupIds],
    queryFn: async () => {
      if (!groupIds.length) return []

      const enrollment = await Promise.all([
        queryClient.query(getCoursesCourseGetQueryOptions()),
        Promise.all(
          groupIds.map((groupId) =>
            queryClient.query(
              getGroupByIdGroupIdGroupIdGetQueryOptions({ path: { group_id: groupId } }),
            ),
          ),
        ),
      ])
      const categories = enrollment[1].map((group) => {
        const course = enrollment[0].find((course) => course.id === group.course_id)

        if (!course) throw new Error('Enrolled course is missing from the course catalog')

        return course.category
      })

      return [...new Set(categories)]
    },
  })
}
