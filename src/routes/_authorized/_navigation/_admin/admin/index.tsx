import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { courseCategory } from '#/api/types'
import {
  Button,
  IconButton,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Loader,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { AdminPageLayout } from '#/routes/_authorized/_navigation/_admin/admin/-components'

import { AdminGroupRow, AdminSelect } from './-components'
import { GROUP_FILTER_ALL } from './-constants'
import { useAdminGroupsPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/')({
  head: () => ({ meta: [{ title: 'Групи | Robocoins' }] }),
  component: AdminGroupsPage,
})

function AdminGroupsPage() {
  const { state, functions } = useAdminGroupsPage()

  const t = useTranslate()

  const courseItems = [
    { value: GROUP_FILTER_ALL, label: t('filters.all-courses') },
    ...state.courses.map((course) => ({ value: String(course.id), label: course.name })),
  ]
  const categoryItems = [
    { value: GROUP_FILTER_ALL, label: t('filters.all-categories') },
    ...Object.values(courseCategory).map((category) => ({
      value: category,
      label: t('course.category', { category }),
    })),
  ]
  const teacherItems = [
    { value: GROUP_FILTER_ALL, label: t('filters.all-teachers') },
    ...state.teacherOptions.map((teacher) => ({
      value: String(teacher.userId),
      label: teacher.name ?? t('admin.groups.teacher-unknown', { id: teacher.userId }),
    })),
  ]

  return (
    <AdminPageLayout.Root>
      <AdminPageLayout.Header>
        <AdminPageLayout.Heading>
          <AdminPageLayout.Title>{t('groups.title')}</AdminPageLayout.Title>
        </AdminPageLayout.Heading>
        <AdminPageLayout.Actions>
          <Button nativeButton={false} render={<Link to="/admin/groups/create" />}>
            <span aria-hidden="true" className="i-ph:plus-bold" />
            {t('admin.learning.create')}
          </Button>
        </AdminPageLayout.Actions>
      </AdminPageLayout.Header>

      <div className={styles.controls}>
        <div className={styles['search-row']}>
          <InputGroup>
            <InputGroupAddon aria-hidden="true">
              <span className="i-ph:magnifying-glass" />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              value={state.query}
              onChange={(event) => functions.handleQueryChange(event.target.value)}
              placeholder={t('admin.groups.search.placeholder')}
              aria-label={t('groups.search.label')}
              autoComplete="off"
            />
          </InputGroup>
          <IconButton
            aria-label={t('filters.toggle')}
            title={t('filters.toggle')}
            aria-expanded={state.isFiltersOpen}
            aria-pressed={state.isFiltersOpen}
            onClick={functions.handleFiltersToggle}
          >
            <span aria-hidden="true" className="i-ph:funnel-duotone" />
          </IconButton>
        </div>
        {state.isFiltersOpen && (
          <div className={styles.filters}>
            <AdminSelect
              value={state.courseFilter}
              onValueChange={functions.handleCourseFilterChange}
              items={courseItems}
              placeholder={t('filters.all-courses')}
              ariaLabel={t('filters.course')}
            />
            <AdminSelect
              value={state.categoryFilter}
              onValueChange={functions.handleCategoryFilterChange}
              items={categoryItems}
              placeholder={t('filters.all-categories')}
              ariaLabel={t('filters.category')}
            />
            <AdminSelect
              value={state.teacherFilter}
              onValueChange={functions.handleTeacherFilterChange}
              items={teacherItems}
              placeholder={t('filters.all-teachers')}
              ariaLabel={t('filters.teacher')}
            />
          </div>
        )}
        {state.hasFilters && (
          <div className={styles.summary}>
            <Button type="button" variant="link" onClick={functions.handleClearFilters}>
              {t('filters.clear')}
            </Button>
          </div>
        )}
      </div>

      {state.isPending && <Loader grow />}
      {state.isError && (
        <div className={styles.error}>
          <InlineError onRetry={functions.handleRetry} isRetrying={state.isFetching}>
            {t(state.errorKey)}
          </InlineError>
          {state.errorKey === 'error.session' && (
            <Button
              variant="link"
              nativeButton={false}
              render={<Link to="/login" />}
              className={styles.login}
            >
              <span aria-hidden="true" className="i-ph:sign-in" />
              {t('action.enter.title')}
            </Button>
          )}
        </div>
      )}
      {!state.isPending && !state.isError && !state.totalCount && (
        <div className={styles.empty}>
          <span aria-hidden="true" className="i-ph:users-three-duotone" />
          <p>{t('groups.empty')}</p>
          <Button nativeButton={false} render={<Link to="/admin/groups/create" />}>
            {t('admin.groups.create-first')}
          </Button>
        </div>
      )}
      {!state.isPending && !state.isError && !!state.totalCount && !state.foundCount && (
        <div className={styles.empty}>
          <span aria-hidden="true" className="i-ph:magnifying-glass" />
          <p>{t('groups.empty-filtered')}</p>
          <Button type="button" variant="ghost" onClick={functions.handleClearFilters}>
            {t('filters.clear')}
          </Button>
        </div>
      )}
      {!state.isPending && !state.isError && !!state.foundCount && (
        <div className={styles.groups}>
          {state.groups.map((group) => (
            <AdminGroupRow key={group.id} group={group} />
          ))}
        </div>
      )}
    </AdminPageLayout.Root>
  )
}
