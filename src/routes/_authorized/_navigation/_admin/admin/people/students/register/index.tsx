import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { getCoursesCourseGetQueryOptions } from '#/api/hooks/useGetCoursesCourseGet'
import { Button, Field, FieldLabel, IconButton, Input, Loader } from '#/components/ui'
import { LearningCard, ThemedChip } from '#/routes/-components'
import { PageLayout } from '#/routes/-components/page-layout'
import { AVATARS } from '#/routes/-constants'
import { getAvatarUrl } from '#/routes/-utils'

import { ApiErrorNotice } from '../-components'
import { useRegisterStudentPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/people/students/register/',
)({
  head: () => ({ meta: [{ title: 'Новий учень | Robocoins' }] }),
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(getCoursesCourseGetQueryOptions())
  },
  component: RegisterStudentPage,
})

function RegisterStudentPage() {
  const { state, mutations, functions, features } = useRegisterStudentPage()

  const t = useTranslate()

  return (
    <PageLayout.Root className={styles.page}>
      <PageLayout.Header align="end" centered>
        <IconButton onClick={functions.handleBack} title={t('students.profile.back')}>
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <PageLayout.Heading>
          <PageLayout.Title>{t('students.register.title')}</PageLayout.Title>
        </PageLayout.Heading>
      </PageLayout.Header>

      {state.created && (
        <article className={styles.success}>
          <span aria-hidden="true" className={cn('i-ph:check-circle', styles['success-icon'])} />
          <h2 className={styles['success-title']}>{t('students.register.success.title')}</h2>
          <p className={styles['success-description']}>
            {t('students.register.success.description', { name: state.created.name })}
          </p>
          <div className={styles['code-block']}>
            <span className={styles['code-label']}>{t('access.code.label')}</span>
            <output className={styles.code} aria-label={t('access.code.label')}>
              {state.created.accessCode}
            </output>
          </div>
          <Button
            variant="contain"
            className={styles['copy-button']}
            onClick={features.clipboard.functions.handleCopy}
          >
            {features.clipboard.state.isCopied && (
              <span aria-hidden="true" className="i-ph:check" />
            )}
            {!features.clipboard.state.isCopied && (
              <span aria-hidden="true" className="i-ph:copy" />
            )}
            {t('students.register.success.copy')}
          </Button>
          <p
            role="status"
            aria-live="polite"
            className={cn(
              styles['copy-status'],
              features.clipboard.state.isCopyError && styles['copy-status-error'],
            )}
          >
            {features.clipboard.state.isCopied && t('access.code.copied')}
            {features.clipboard.state.isCopyError && t('students.register.success.copy-error')}
          </p>
          <div className={styles['success-actions']}>
            <Link
              to="/admin/people/students/$studentId"
              params={{ studentId: state.created.id }}
              className={styles['primary-link']}
            >
              {t('profile.open')}
            </Link>
            <Link to="/admin/people/students" className={styles['secondary-link']}>
              {t('students.register.success.list')}
            </Link>
          </div>
        </article>
      )}

      {!state.created && (
        <form className={styles.form} onSubmit={functions.handleSubmit} noValidate>
          <section className={styles.section}>
            <features.form.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="student-register-name">
                    {t('students.register.name.label')}
                  </FieldLabel>
                  <Input
                    id="student-register-name"
                    name={field.name}
                    value={field.state.value}
                    placeholder={t('students.register.name.placeholder')}
                    autoComplete="name"
                    maxLength={200}
                    aria-invalid={!!field.state.meta.errors.length}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {!!field.state.meta.errors.length && (
                    <p className={styles.validation}>{t('students.register.name.error')}</p>
                  )}
                </Field>
              )}
            </features.form.Field>
          </section>

          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('field.avatar.label')}</h2>
            <features.form.Field name="avatar">
              {(field) => (
                <div className={styles.avatars} role="group" aria-label={t('field.avatar.label')}>
                  {AVATARS.map((avatar, index) => (
                    <button
                      key={avatar}
                      type="button"
                      className={cn(
                        styles['avatar-option'],
                        field.state.value === avatar && styles.selected,
                      )}
                      aria-pressed={field.state.value === avatar}
                      aria-label={t('students.register.avatar.option', { number: index + 1 })}
                      title={t('students.register.avatar.option', { number: index + 1 })}
                      onClick={() => field.handleChange(avatar)}
                    >
                      <img src={getAvatarUrl(avatar)} alt="" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              )}
            </features.form.Field>
          </section>

          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('groups.title')}</h2>
            <p className={styles['section-description']}>
              {t('students.register.groups.description')}
            </p>
            {state.isGroupsPending && <Loader grow />}
            {state.isGroupsError && (
              <ApiErrorNotice
                kind={state.groupsErrorKind}
                fallback={t('groups.error.load')}
                onRetry={functions.handleRetryGroups}
                isRetrying={state.isGroupsRetrying}
                onLogin={functions.handleLogin}
              />
            )}
            {state.isGroupsEmpty && (
              <p className={styles.empty}>{t('students.register.groups.empty')}</p>
            )}
            {!state.isGroupsPending && !state.isGroupsError && !!state.groups.length && (
              <features.form.Field name="groupIds">
                {(field) => (
                  <>
                    <div className={styles.filters}>
                      <div className={styles['filter-group']}>
                        <span className={styles['filter-label']}>{t('categories.label')}</span>
                        <div className={cn(styles.chips, styles.scroll)}>
                          <ThemedChip
                            icon={false}
                            selected={state.categoryFilter === 'all'}
                            onClick={() => functions.handleCategoryChange('all')}
                          >
                            {t('filters.all-catalog-categories')}
                          </ThemedChip>
                          {state.categories.map((category) => (
                            <ThemedChip
                              key={category}
                              type="category"
                              value={category}
                              selected={state.categoryFilter === category}
                              onClick={() => functions.handleCategoryChange(category)}
                            >
                              {t('course.category', { category })}
                            </ThemedChip>
                          ))}
                        </div>
                      </div>
                      <div className={styles['filter-group']}>
                        <span className={styles['filter-label']}>{t('courses.title')}</span>
                        <div className={cn(styles.chips, styles.scroll)}>
                          {state.courses.map((course) => (
                            <ThemedChip
                              key={course.id}
                              type="course"
                              category={course.category}
                              selected={state.courseFilter === course.id}
                              onClick={() => functions.handleCourseFilterChange(course.id)}
                            >
                              {course.name}
                            </ThemedChip>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className={styles.groups} role="group" aria-label={t('groups.title')}>
                      {state.filteredGroups.map((group) => {
                        const isSelected = field.state.value.includes(group.id)

                        return (
                          <LearningCard.Root key={group.id}>
                            <LearningCard.Row
                              render={
                                <button
                                  type="button"
                                  aria-pressed={isSelected}
                                  onClick={() => functions.handleGroupToggle(group.id)}
                                />
                              }
                            >
                              <LearningCard.Icon category={group.category} />
                              <LearningCard.Content>
                                <LearningCard.Title>{group.courseName}</LearningCard.Title>
                                <LearningCard.Description>{group.name}</LearningCard.Description>
                              </LearningCard.Content>
                              <LearningCard.Indicator kind="select" />
                            </LearningCard.Row>
                          </LearningCard.Root>
                        )
                      })}
                    </div>
                    {!!field.state.meta.errors.length && (
                      <p className={styles.validation}>
                        {t('students.register.groups.validation')}
                      </p>
                    )}
                  </>
                )}
              </features.form.Field>
            )}
          </section>

          {mutations.create.isError && (
            <ApiErrorNotice
              kind={state.errorKind}
              fallback={t('students.register.error')}
              onRetry={functions.handleRetrySubmit}
              isRetrying={mutations.create.isPending}
              onLogin={functions.handleLogin}
            />
          )}

          <Button
            type="submit"
            variant="contain"
            className={styles.submit}
            disabled={
              state.isGroupsPending ||
              state.isGroupsError ||
              !state.groups.length ||
              mutations.create.isPending
            }
            aria-busy={mutations.create.isPending}
          >
            {mutations.create.isPending && <Loader />}
            {t('action.register')}
          </Button>
        </form>
      )}
    </PageLayout.Root>
  )
}
