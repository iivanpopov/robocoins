import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { getCoursesCourseGetQueryOptions } from '#/api/hooks/useGetCoursesCourseGet'
import { getTeacherGroupsTeacherGroupsGetQueryOptions } from '#/api/hooks/useGetTeacherGroupsTeacherGroupsGet'
import { Loader } from '#/components/ui'
import { LearningCard, InlineError, PageLayout, ThemedChip } from '#/routes/-components'

import { GroupFilter } from './-constants'
import { useGroupPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_teacher/group/')({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.query(getCoursesCourseGetQueryOptions()),
      context.queryClient.query(getTeacherGroupsTeacherGroupsGetQueryOptions()),
    ])
    return { now: Date.now() }
  },
  component: GroupPage,
})

function GroupPage() {
  const { state, functions } = useGroupPage()

  const t = useTranslate()

  return (
    <PageLayout.Root>
      <PageLayout.Header>
        <PageLayout.Heading>
          <PageLayout.Title>{t('group.select.title')}</PageLayout.Title>
        </PageLayout.Heading>
      </PageLayout.Header>

      <div className={styles['themes-bar']}>
        <ThemedChip
          icon={false}
          selected={state.selectedTheme === GroupFilter.All}
          onClick={() => functions.handleThemeSelect(GroupFilter.All)}
        >
          {t('group.filter.all', { count: state.allGroupsCount })}
        </ThemedChip>
        {state.categories.map((category) => (
          <ThemedChip
            key={category}
            type="category"
            value={category}
            selected={state.selectedTheme === category}
            onClick={() => functions.handleThemeSelect(category)}
          >
            {t('course.category', { category })}
          </ThemedChip>
        ))}
      </div>

      {state.isPending && <Loader grow />}
      {state.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={state.isRetrying}>
          {t('group.error')}
        </InlineError>
      )}
      {!state.isPending && !state.isError && (
        <div className={styles.grid}>
          {state.groups.map((group, i) => {
            return (
              <div
                key={group.id}
                className={styles['group-entry']}
                data-current={group.isActive || undefined}
              >
                {group.isActive && i === 0 && (
                  <p className={styles['current-caption']}>
                    {!state.hasMultipleActiveGroups && t('group.current')}
                    {state.hasMultipleActiveGroups && t('group.current.multiple')}
                  </p>
                )}
                <LearningCard.Root>
                  <LearningCard.Row
                    render={<Link to="/group/$groupId" params={{ groupId: String(group.id) }} />}
                  >
                    <LearningCard.Icon category={group.category} />
                    <LearningCard.Content>
                      <LearningCard.Title>{group.course_name}</LearningCard.Title>
                      <LearningCard.Description>
                        {group.schedule.weekday && <>{t(`weekday.${group.schedule.weekday}`)}, </>}
                        {group.schedule.time}
                      </LearningCard.Description>
                    </LearningCard.Content>
                    <LearningCard.Meta>
                      <span>{t('group.students-count', { count: group.students_count })}</span>
                      <LearningCard.Indicator kind="navigate" />
                    </LearningCard.Meta>
                  </LearningCard.Row>
                </LearningCard.Root>
              </div>
            )
          })}
        </div>
      )}
    </PageLayout.Root>
  )
}
