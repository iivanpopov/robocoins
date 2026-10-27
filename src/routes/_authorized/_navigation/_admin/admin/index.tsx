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
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'

import { AdminGroupRow, AdminSelect } from './-components'
import { GROUP_FILTER_ALL } from './-constants'
import { useAdminGroupsPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/')({
  head: () => ({ meta: [{ title: 'Навчання | Robocoins' }] }),
  component: AdminGroupsPage,
})

function AdminGroupsPage() {
  const { state, functions } = useAdminGroupsPage()

  const t = useTranslate()

  const courseItems = [
    { value: GROUP_FILTER_ALL, label: t('admin.groups.filters.course-all') },
    ...state.courses.map((course) => ({ value: String(course.id), label: course.name })),
  ]
  const categoryItems = [
    { value: GROUP_FILTER_ALL, label: t('admin.groups.filters.category-all') },
    ...Object.values(courseCategory).map((category) => ({
      value: category,
      label: t('course.category', { category }),
    })),
  ]
  const teacherItems = [
    { value: GROUP_FILTER_ALL, label: t('admin.groups.filters.teacher-all') },
    ...state.teacherOptions.map((teacher) => ({
      value: String(teacher.userId),
      label: teacher.name ?? t('admin.groups.teacher-unknown', { id: teacher.userId }),
    })),
  ]

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div className={styles.heading}>
          <h1 className={styles.title}>{t('admin.groups.title')}</h1>
          <div className={styles['header-actions']}>
            <Popover>
              <PopoverTrigger
                render={
                  <IconButton
                    aria-label={t('admin.groups.actions.more')}
                    title={t('admin.groups.actions.more')}
                  />
                }
              >
                <span aria-hidden="true" className="i-ph:dots-three-bold" />
              </PopoverTrigger>
              <PopoverContent align="end" sideOffset={8}>
                <PopoverClose
                  render={<Link to="/admin/groups/teachers" className={styles['menu-item']} />}
                >
                  <span aria-hidden="true" className="i-ph:chalkboard-teacher-duotone" />
                  {t('admin.groups.bulk.entry')}
                </PopoverClose>
              </PopoverContent>
            </Popover>
            <Button nativeButton={false} render={<Link to="/admin/groups/create" />}>
              <span aria-hidden="true" className="i-ph:plus-bold" />
              {t('admin.learning.create')}
            </Button>
          </div>
        </div>
      </header>

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
              aria-label={t('admin.groups.search.label')}
              autoComplete="off"
            />
          </InputGroup>
          <IconButton
            aria-label={t('admin.groups.filters.toggle')}
            title={t('admin.groups.filters.toggle')}
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
              placeholder={t('admin.groups.filters.course-all')}
              ariaLabel={t('admin.groups.filters.course')}
            />
            <AdminSelect
              value={state.categoryFilter}
              onValueChange={functions.handleCategoryFilterChange}
              items={categoryItems}
              placeholder={t('admin.groups.filters.category-all')}
              ariaLabel={t('admin.groups.filters.category')}
            />
            <AdminSelect
              value={state.teacherFilter}
              onValueChange={functions.handleTeacherFilterChange}
              items={teacherItems}
              placeholder={t('admin.groups.filters.teacher-all')}
              ariaLabel={t('admin.groups.filters.teacher')}
            />
          </div>
        )}
        <div className={styles.summary}>
          <span>{t('admin.groups.found', { count: state.foundCount })}</span>
          {state.hasFilters && (
            <Button type="button" variant="link" onClick={functions.handleClearFilters}>
              {t('admin.groups.filters.clear')}
            </Button>
          )}
        </div>
      </div>

      {state.isPending && <Loader grow />}
      {state.isError && (
        <div className={styles.error}>
          <InlineError onRetry={functions.handleRetry} isRetrying={state.isFetching}>
            {t(state.errorKey)}
          </InlineError>
          {state.errorKey === 'admin.groups.error.unauthorized' && (
            <Button
              variant="link"
              nativeButton={false}
              render={<Link to="/login" />}
              className={styles.login}
            >
              <span aria-hidden="true" className="i-ph:sign-in" />
              {t('admin.groups.error.login')}
            </Button>
          )}
        </div>
      )}
      {!state.isPending && !state.isError && !state.totalCount && (
        <div className={styles.empty}>
          <span aria-hidden="true" className="i-ph:users-three-duotone" />
          <p>{t('admin.groups.empty')}</p>
          <Button nativeButton={false} render={<Link to="/admin/groups/create" />}>
            {t('admin.groups.create-first')}
          </Button>
        </div>
      )}
      {!state.isPending && !state.isError && !!state.totalCount && !state.foundCount && (
        <div className={styles.empty}>
          <span aria-hidden="true" className="i-ph:magnifying-glass" />
          <p>{t('admin.groups.empty-filtered')}</p>
          <Button type="button" variant="ghost" onClick={functions.handleClearFilters}>
            {t('admin.groups.filters.clear')}
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
    </section>
  )
}
