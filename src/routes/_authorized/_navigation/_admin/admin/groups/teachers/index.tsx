import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, useSearch } from '@tanstack/react-router'
import * as v from 'valibot'

import { Button, IconButton, Loader } from '#/components/ui'

import {
  GroupEmptyState,
  GroupForm,
  GroupPageLayout,
  GroupRequestError,
  TeacherPicker,
} from '../-components'
import { TeacherAssignmentSearchSchema } from '../-schemas'
import { GroupAssignmentResultRow, GroupSelectionList } from './-components'
import { useGroupTeachersBulkPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/groups/teachers/')({
  head: () => ({ meta: [{ title: 'Масове призначення | Robocoins' }] }),
  validateSearch: (search) => {
    const result = v.safeParse(TeacherAssignmentSearchSchema, search)
    return result.success ? result.output : {}
  },
  component: GroupTeachersBulkRoute,
})

function GroupTeachersBulkRoute() {
  const search = useSearch({
    from: '/_authorized/_navigation/_admin/admin/groups/teachers/',
  })

  return <GroupTeachersBulkPage key={String(search.teacherId ?? '')} />
}

function GroupTeachersBulkPage() {
  const { state, functions } = useGroupTeachersBulkPage()

  const t = useTranslate()

  return (
    <GroupPageLayout
      title={t('admin.groups.bulk.title')}
      description={t('admin.groups.bulk.description')}
      back={
        <IconButton
          nativeButton={false}
          render={<Link to="/admin" />}
          title={t('admin.groups.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
      }
    >
      {state.isPending && <Loader grow />}
      {state.isError && state.errorKey && (
        <GroupRequestError
          messageKey={state.errorKey}
          onRetry={functions.handleRetryRead}
          isRetrying={state.isFetching}
        />
      )}
      {!state.isPending && !state.isError && !state.hasGroups && (
        <GroupEmptyState
          icon="i-ph:users-three-duotone"
          title={t('admin.groups.bulk.groups.empty-title')}
          description={t('admin.groups.bulk.groups.empty-description')}
        >
          <Button nativeButton={false} render={<Link to="/admin/groups/create" />}>
            {t('admin.groups.create')}
          </Button>
        </GroupEmptyState>
      )}

      {!state.isPending && !state.isError && state.hasGroups && (
        <GroupForm
          onSubmit={functions.handleSubmit}
          submitLabel={t(state.submitLabelKey)}
          submitDisabled={!state.canSubmit}
          isSubmitting={state.isOperating}
          note={t('admin.groups.bulk.note')}
          cancel={
            <Button variant="ghost" nativeButton={false} render={<Link to="/admin" />}>
              {t('action.cancel')}
            </Button>
          }
        >
          <TeacherPicker
            label={t('admin.groups.teachers.picker.label')}
            options={state.teacherOptions}
            selectedIds={state.selectedTeacherIds}
            onChange={functions.handleTeacherIdsChange}
            disabled={state.isOperating}
          />
          <GroupSelectionList
            label={t('admin.groups.bulk.groups.label')}
            groups={state.groups}
            selectedIds={state.selectedGroupIds}
            onChange={functions.handleGroupIdsChange}
            disabled={state.isOperating}
          />
        </GroupForm>
      )}

      {state.sessionErrorKey && <GroupRequestError messageKey={state.sessionErrorKey} />}

      {!!state.results?.length && (
        <section className={styles.results}>
          <div className={styles['results-header']}>
            <h2 className={styles['results-title']}>{t('admin.groups.bulk.results.title')}</h2>
            {state.canRetry && (
              <Button type="button" variant="ghost" onClick={functions.handleRetryFailures}>
                <span aria-hidden="true" className="i-ph:arrow-clockwise-bold" />
                {t('admin.groups.bulk.results.retry')}
              </Button>
            )}
          </div>
          {state.canRetry && (
            <p className={styles['results-note']}>{t('admin.groups.bulk.results.retry-note')}</p>
          )}
          <div className={styles['results-list']}>
            {state.results.map((result) => (
              <GroupAssignmentResultRow key={result.groupId} result={result} />
            ))}
          </div>
        </section>
      )}
    </GroupPageLayout>
  )
}
