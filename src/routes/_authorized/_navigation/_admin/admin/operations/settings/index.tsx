import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { getAllStudentsStudentGetQueryOptions } from '#/api/hooks/useGetAllStudentsStudentGet'
import { getBalanceChangeReasonsExtBalanceBalanceChangeReasonsGetQueryOptions } from '#/api/hooks/useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet'
import {
  Button,
  Field,
  FieldDescription,
  FieldLabel,
  IconButton,
  Input,
  Loader,
} from '#/components/ui'

import {
  AMOUNT_INPUT_MAX_LENGTH,
  EXPLANATION_MAX_LENGTH,
  TARIFF_INPUT_MAX_LENGTH,
} from '../-constants'
import { AdminSelect, ApiErrorNotice } from '../../-components'
import { LocalDraftNotice } from './-components'
import { useLocalSettingsPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/operations/settings/')({
  head: () => ({ meta: [{ title: 'Локальні налаштування балансу | Robocoins' }] }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.prefetchQuery(getAllStudentsStudentGetQueryOptions()),
      context.queryClient.prefetchQuery(
        getBalanceChangeReasonsExtBalanceBalanceChangeReasonsGetQueryOptions(),
      ),
    ])
  },
  component: LocalSettingsPage,
})

function LocalSettingsPage() {
  const { state, functions, features } = useLocalSettingsPage()

  const t = useTranslate()

  const studentItems = state.students.map((student) => ({
    value: String(student.id),
    label: `${student.name} · ${t('admin.balance.coins', { count: student.balance })}`,
  }))

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/operations" />}
          title={t('admin.operations.settings.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <div className={styles.heading}>
          <h1 className={styles.title}>{t('admin.operations.settings.title')}</h1>
          <p className={styles.description}>{t('admin.operations.settings.description')}</p>
        </div>
      </header>

      <article className={styles.card}>
        <header className={styles['card-header']}>
          <h2 className={styles['card-title']}>
            {t('admin.operations.settings.correction.title')}
          </h2>
          <p className={styles['card-description']}>
            {t('admin.operations.settings.correction.description')}
          </p>
        </header>

        {state.studentsIsPending && <Loader grow />}
        {state.studentsIsError && !!state.studentsErrorKind && (
          <ApiErrorNotice
            kind={state.studentsErrorKind}
            fallback={t('admin.operations.students.error')}
            onRetry={functions.handleRetryStudents}
            isRetrying={state.studentsIsFetching}
            onLogin={functions.handleLogin}
          />
        )}

        {!state.studentsIsPending && !state.studentsIsError && (
          <form className={styles.form} onSubmit={functions.handleCorrectionSubmit} noValidate>
            {!state.students.length && (
              <p className={styles.empty}>{t('admin.operations.settings.correction.empty')}</p>
            )}

            <features.correctionForm.Field name="studentId">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="operations-correction-student">
                    {t('admin.operations.settings.correction.student')}
                  </FieldLabel>
                  <AdminSelect
                    id="operations-correction-student"
                    value={field.state.value}
                    onValueChange={field.handleChange}
                    items={studentItems}
                    placeholder={t('admin.operations.settings.correction.student-placeholder')}
                    ariaLabel={t('admin.operations.settings.correction.student')}
                    disabled={!state.students.length}
                  />
                  {!!field.state.meta.errors.length && (
                    <p className={styles.validation}>
                      {t('admin.operations.settings.correction.student-error')}
                    </p>
                  )}
                  {!!state.selectedStudent && (
                    <FieldDescription>
                      {t('admin.operations.settings.correction.current-balance', {
                        count: state.selectedStudent.balance,
                      })}
                    </FieldDescription>
                  )}
                </Field>
              )}
            </features.correctionForm.Field>

            <features.correctionForm.Field name="amount">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="operations-correction-amount">
                    {t('admin.operations.settings.correction.amount')}
                  </FieldLabel>
                  <Input
                    id="operations-correction-amount"
                    name={field.name}
                    value={field.state.value}
                    inputMode="decimal"
                    maxLength={AMOUNT_INPUT_MAX_LENGTH}
                    placeholder={t('admin.operations.settings.correction.amount-placeholder')}
                    aria-invalid={!!field.state.meta.errors.length}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {!!field.state.meta.errors.length && (
                    <p className={styles.validation}>
                      {t('admin.operations.settings.correction.amount-error')}
                    </p>
                  )}
                </Field>
              )}
            </features.correctionForm.Field>

            <features.correctionForm.Field name="explanation">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="operations-correction-explanation">
                    {t('admin.operations.settings.correction.explanation')}
                  </FieldLabel>
                  <textarea
                    id="operations-correction-explanation"
                    name={field.name}
                    className={styles.textarea}
                    value={field.state.value}
                    maxLength={EXPLANATION_MAX_LENGTH}
                    rows={4}
                    placeholder={t('admin.operations.settings.correction.explanation-placeholder')}
                    aria-invalid={!!field.state.meta.errors.length}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldDescription>
                    {t('admin.operations.settings.correction.explanation-hint', {
                      count: EXPLANATION_MAX_LENGTH,
                    })}
                  </FieldDescription>
                  {!!field.state.meta.errors.length && (
                    <p className={styles.validation}>
                      {t('admin.operations.settings.correction.explanation-error')}
                    </p>
                  )}
                </Field>
              )}
            </features.correctionForm.Field>

            <div className={styles.actions}>
              <Button type="submit" disabled={!state.students.length}>
                {t('admin.operations.settings.correction.submit')}
              </Button>
              <Button type="button" variant="ghost" onClick={functions.handleCorrectionReset}>
                {t('admin.operations.settings.reset')}
              </Button>
            </div>
          </form>
        )}

        {!!state.correctionDraft && (
          <LocalDraftNotice
            title={t('admin.operations.settings.correction.result.title')}
            description={t('admin.operations.settings.correction.result.description')}
          >
            <dl className={styles.draft}>
              <div className={styles['draft-row']}>
                <dt>{t('admin.operations.settings.correction.student')}</dt>
                <dd>{state.correctionDraft.studentName}</dd>
              </div>
              <div className={styles['draft-row']}>
                <dt>{t('admin.operations.settings.correction.amount')}</dt>
                <dd>{t('admin.balance.coins', { count: state.correctionDraft.amount })}</dd>
              </div>
              <div className={styles['draft-row']}>
                <dt>{t('admin.operations.settings.correction.explanation')}</dt>
                <dd>{state.correctionDraft.explanation}</dd>
              </div>
            </dl>
          </LocalDraftNotice>
        )}
      </article>

      <article className={styles.card}>
        <header className={styles['card-header']}>
          <h2 className={styles['card-title']}>{t('admin.operations.settings.tariffs.title')}</h2>
          <p className={styles['card-description']}>
            {t('admin.operations.settings.tariffs.description')}
          </p>
        </header>

        {state.reasonsIsPending && <Loader grow />}
        {state.reasonsIsError && !!state.reasonsErrorKind && (
          <ApiErrorNotice
            kind={state.reasonsErrorKind}
            fallback={t('admin.operations.reasons.error')}
            onRetry={functions.handleRetryReasons}
            isRetrying={state.reasonsIsFetching}
            onLogin={functions.handleLogin}
          />
        )}

        {!state.reasonsIsPending && !state.reasonsIsError && (
          <>
            {!state.reasons.length && (
              <p className={styles.empty}>{t('admin.operations.settings.tariffs.empty')}</p>
            )}
            {!!state.reasons.length && (
              <form className={styles.form} onSubmit={functions.handleTariffSubmit} noValidate>
                <features.tariffForm.Field name="tariffs">
                  {(field) => (
                    <div className={styles.reasons}>
                      {state.reasons.map((reason) => (
                        <div key={reason.reason} className={styles.reason}>
                          <div className={styles['reason-copy']}>
                            <span className={styles['reason-name']}>
                              {t.unsafe(`reason.${reason.reason}`)}
                            </span>
                            <span className={styles['reason-type']}>
                              {t.unsafe(`admin.operations.direction.${reason.type}`)}
                            </span>
                          </div>
                          <Input
                            value={field.state.value[reason.reason] ?? ''}
                            inputMode="decimal"
                            maxLength={TARIFF_INPUT_MAX_LENGTH}
                            placeholder={t('admin.operations.settings.tariffs.placeholder')}
                            aria-label={t('admin.operations.settings.tariffs.input-label', {
                              reason: t.unsafe(`reason.${reason.reason}`),
                            })}
                            onChange={(event) =>
                              field.handleChange({
                                ...field.state.value,
                                [reason.reason]: event.target.value,
                              })
                            }
                            onBlur={field.handleBlur}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </features.tariffForm.Field>

                {!!state.configuredTariffCount && (
                  <p className={styles.note}>
                    {t('admin.operations.settings.tariffs.configured', {
                      count: state.configuredTariffCount,
                    })}
                  </p>
                )}

                <div className={styles.actions}>
                  <Button type="submit">{t('admin.operations.settings.tariffs.submit')}</Button>
                  <Button type="button" variant="ghost" onClick={functions.handleTariffReset}>
                    {t('admin.operations.settings.reset')}
                  </Button>
                </div>
              </form>
            )}
            <p className={styles.note}>{t('admin.operations.settings.tariffs.note')}</p>
          </>
        )}

        {!!state.tariffDraft && (
          <LocalDraftNotice
            title={t('admin.operations.settings.tariffs.result.title')}
            description={t('admin.operations.settings.tariffs.result.description', {
              count: state.tariffDraft.reasonCount,
            })}
          />
        )}
      </article>
    </section>
  )
}
