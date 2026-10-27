import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { cn } from 'cn'

import {
  Button,
  IconButton,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  Loader,
} from '#/components/ui'
import { AdminPageLayout } from '#/routes/_authorized/_navigation/_admin/admin/-components'

import { AdminSelect } from '../../-components'
import { GROUP_FILTER_ALL } from '../../-constants'
import { ApiErrorNotice, StudentRow } from './-components'
import { useStudentsPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/people/students/')({
  head: () => ({ meta: [{ title: 'Учні | Robocoins' }] }),
  component: StudentsPage,
})

function StudentsPage() {
  const { state, functions } = useStudentsPage()

  const t = useTranslate()

  const categoryItems = [
    { value: GROUP_FILTER_ALL, label: t('filters.all-categories') },
    ...state.categories.map((category) => ({
      value: category,
      label: t('course.category', { category }),
    })),
  ]
  const courseItems = [
    { value: GROUP_FILTER_ALL, label: t('filters.all-courses') },
    ...state.courses.map((course) => ({ value: String(course.id), label: course.name })),
  ]
  const groupItems = [
    { value: GROUP_FILTER_ALL, label: t('filters.all-groups') },
    ...state.groupsForSelect.map((group) => ({ value: String(group.id), label: group.name })),
  ]

  return (
    <AdminPageLayout.Root>
      <AdminPageLayout.Header className={styles.header}>
        <AdminPageLayout.Heading>
          <AdminPageLayout.Title>{t('students.title')}</AdminPageLayout.Title>
        </AdminPageLayout.Heading>
        <AdminPageLayout.Actions>
          <Button nativeButton={false} render={<Link to="/admin/people/students/register" />}>
            <span aria-hidden="true" className="i-ph:plus-bold" />
            {t('students.register.action')}
          </Button>
        </AdminPageLayout.Actions>
      </AdminPageLayout.Header>

      <div className={styles.controls}>
        <div className={styles['search-row']}>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <span aria-hidden="true" className="i-ph:magnifying-glass" />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              value={state.search}
              placeholder={t('students.search.placeholder')}
              aria-label={t('students.search.placeholder')}
              onChange={(event) => functions.handleSearchChange(event.target.value)}
            />
            {!!state.search && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  onClick={functions.handleClearSearch}
                  aria-label={t('action.clear-search.title')}
                  title={t('action.clear-search.title')}
                >
                  <span aria-hidden="true" className="i-ph:x" />
                </InputGroupButton>
              </InputGroupAddon>
            )}
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
              value={state.selectedCategory}
              onValueChange={functions.handleCategorySelect}
              items={categoryItems}
              placeholder={t('filters.all-categories')}
              ariaLabel={t('students.filters.category')}
            />
            <AdminSelect
              value={
                state.selectedCourseId === null ? GROUP_FILTER_ALL : String(state.selectedCourseId)
              }
              onValueChange={functions.handleCourseSelect}
              items={courseItems}
              placeholder={t('filters.all-courses')}
              ariaLabel={t('courses.title')}
            />
            <AdminSelect
              value={
                state.selectedGroupId === null ? GROUP_FILTER_ALL : String(state.selectedGroupId)
              }
              onValueChange={functions.handleGroupSelect}
              items={groupItems}
              placeholder={t('filters.all-groups')}
              ariaLabel={t('groups.title')}
            />
          </div>
        )}
      </div>

      {state.isPending && <Loader grow />}
      {state.isError && (
        <ApiErrorNotice
          kind={state.errorKind}
          fallback={t('students.error.load')}
          onRetry={functions.handleRetry}
          isRetrying={state.isRetrying}
          onLogin={functions.handleLogin}
        />
      )}
      {!state.isPending && !state.isError && !state.allCount && (
        <div className={styles.empty}>
          <span
            aria-hidden="true"
            className={cn('i-ph:users-three-duotone', styles['empty-icon'])}
          />
          <p>{t('students.empty')}</p>
        </div>
      )}
      {!state.isPending && !state.isError && !!state.allCount && !state.students.length && (
        <div className={styles.empty}>
          <span aria-hidden="true" className={cn('i-ph:magnifying-glass', styles['empty-icon'])} />
          <p>{t('students.empty-filtered')}</p>
        </div>
      )}
      {!state.isPending && !state.isError && !!state.students.length && (
        <div className={styles.list}>
          {state.students.map((student) => (
            <StudentRow key={student.id} student={student} />
          ))}
        </div>
      )}
    </AdminPageLayout.Root>
  )
}
