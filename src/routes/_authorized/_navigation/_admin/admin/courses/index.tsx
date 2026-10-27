import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import {
  Button,
  IconButton,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Loader,
} from '#/components/ui'

import {
  CourseCategoryChips,
  CourseEmptyState,
  CoursePageLayout,
  CourseRequestError,
  CourseRow,
} from './-components'
import { useCoursesPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/courses/')({
  head: () => ({ meta: [{ title: 'Курси | Robocoins' }] }),
  component: CoursesPage,
})

function CoursesPage() {
  const { state, functions } = useCoursesPage()

  const t = useTranslate()

  return (
    <CoursePageLayout
      title={t('admin.courses.title')}
      description={t('admin.courses.description')}
      back={
        <IconButton nativeButton={false} render={<Link to="/admin" />} title={t('navbar.learning')}>
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
      }
      actions={
        <>
          <Button nativeButton={false} render={<Link to="/admin/courses/create" />}>
            <span aria-hidden="true" className="i-ph:plus-bold" />
            {t('admin.courses.create')}
          </Button>
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link to="/admin/courses/categories" />}
          >
            <span aria-hidden="true" className="i-ph:shapes-duotone" />
            {t('admin.courses.categories')}
          </Button>
        </>
      }
    >
      <div className={styles.controls}>
        <InputGroup>
          <InputGroupAddon aria-hidden="true">
            <span className="i-ph:magnifying-glass" />
          </InputGroupAddon>
          <InputGroupInput
            type="search"
            value={state.query}
            onChange={(event) => functions.handleQueryChange(event.target.value)}
            placeholder={t('admin.courses.search.placeholder')}
            aria-label={t('admin.courses.search.label')}
            autoComplete="off"
          />
        </InputGroup>
        <CourseCategoryChips
          value={state.category}
          onSelect={functions.handleCategorySelect}
          counts={state.categoryCounts}
          allCount={state.totalCount}
          showAll
        />
      </div>

      {state.isPending && <Loader grow />}
      {state.isError && state.errorKey && (
        <CourseRequestError
          messageKey={state.errorKey}
          onRetry={functions.handleRetry}
          isRetrying={state.isFetching}
        />
      )}
      {!state.isPending && !state.isError && !state.totalCount && (
        <CourseEmptyState
          icon="i-ph:books-duotone"
          title={t('admin.courses.list.empty-all')}
          description={t('admin.courses.list.empty-all-description')}
        >
          <Button nativeButton={false} render={<Link to="/admin/courses/create" />}>
            {t('admin.courses.create')}
          </Button>
        </CourseEmptyState>
      )}
      {!state.isPending && !state.isError && !!state.totalCount && !state.courses.length && (
        <CourseEmptyState
          icon="i-ph:magnifying-glass"
          title={t('admin.courses.list.empty')}
          description={t('admin.courses.list.empty-description')}
        />
      )}
      {!state.isPending && !state.isError && !!state.courses.length && (
        <div className={styles.list}>
          {state.courses.map((course) => (
            <CourseRow key={course.id} course={course} />
          ))}
        </div>
      )}
    </CoursePageLayout>
  )
}
