import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { cn } from 'cn'

import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  Loader,
} from '#/components/ui'
import { ThemedChip } from '#/routes/-components'

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

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('students.title')}</h1>
        <Button nativeButton={false} render={<Link to="/admin/people/students/register" />}>
          <span aria-hidden="true" className="i-ph:plus-bold" />
          {t('students.register.action')}
        </Button>
      </header>

      <div className={styles.controls}>
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
                aria-label={t('students.search.clear')}
                title={t('students.search.clear')}
              >
                <span aria-hidden="true" className="i-ph:x" />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>

        {!!state.categories.length && (
          <div className={styles['filter-block']}>
            <span className={styles['filter-label']}>{t('students.filters.category')}</span>
            <div
              className={styles.filters}
              role="group"
              aria-label={t('students.filters.category')}
            >
              <ThemedChip
                icon={false}
                selected={state.selectedCategory === 'all'}
                onClick={() => functions.handleCategorySelect('all')}
              >
                {t('students.filters.all-categories')}
              </ThemedChip>
              {state.categories.map((category) => (
                <ThemedChip
                  key={category}
                  type="category"
                  value={category}
                  selected={state.selectedCategory === category}
                  onClick={() => functions.handleCategorySelect(category)}
                >
                  {t('course.category', { category })}
                </ThemedChip>
              ))}
            </div>
          </div>
        )}

        {!!state.courses.length && (
          <div className={styles['filter-block']}>
            <span className={styles['filter-label']}>{t('students.filters.courses')}</span>
            <div className={styles.filters} role="group" aria-label={t('students.filters.courses')}>
              <ThemedChip
                icon={false}
                selected={state.selectedCourseId === null}
                onClick={() => functions.handleCourseSelect(null)}
              >
                {t('students.filters.all-courses')}
              </ThemedChip>
              {state.courses.map((course) => (
                <ThemedChip
                  key={course.id}
                  type="course"
                  category={course.category}
                  selected={state.selectedCourseId === course.id}
                  onClick={() => functions.handleCourseSelect(course.id)}
                >
                  {course.name}
                </ThemedChip>
              ))}
            </div>
          </div>
        )}

        {state.selectedCourseId !== null && !!state.groupsForCourse.length && (
          <div className={styles['filter-block']}>
            <span className={styles['filter-label']}>{t('students.filters.groups')}</span>
            <div className={styles.filters} role="group" aria-label={t('students.filters.groups')}>
              <ThemedChip
                icon={false}
                selected={state.selectedGroupId === null}
                onClick={() => functions.handleGroupSelect(null)}
              >
                {t('students.filters.all-groups')}
              </ThemedChip>
              {state.groupsForCourse.map((group) => (
                <ThemedChip
                  key={group.id}
                  selected={state.selectedGroupId === group.id}
                  onClick={() => functions.handleGroupSelect(group.id)}
                >
                  {group.name}
                </ThemedChip>
              ))}
            </div>
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
    </section>
  )
}
