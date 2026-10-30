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
  loader: async ({ context }) =>
    Promise.all([
      context.queryClient.query(getCoursesCourseGetQueryOptions()),
      context.queryClient.query(getTeacherGroupsTeacherGroupsGetQueryOptions()),
    ]),
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
          {state.groups.map((group) => {
            return (
              <LearningCard.Root key={group.id}>
                <LearningCard.Row
                  render={<Link to="/group/$groupId" params={{ groupId: String(group.id) }} />}
                >
                  <LearningCard.Icon category={group.category} />
                  <LearningCard.Content>
                    <LearningCard.Title>
                      {group.course_name}
                      {group.isActive && (
                        <span className={styles['current-badge']}>{t('group.current')}</span>
                      )}
                    </LearningCard.Title>
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
            )
          })}
        </div>
      )}
    </PageLayout.Root>
  )
}
