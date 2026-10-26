import { useTranslate } from '@kanjou/react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Checkbox,
  Field,
  FieldDescription,
  FieldLabel,
  Loader,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'
import type { Avatar as AvatarName } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'

import { GroupSelect } from './-components'
import { useStudentGroupAssignment } from './-hooks'

import styles from './student-group-assignment.module.css'

export interface StudentGroupAssignmentProps {
  studentId: number
  studentName: string
  studentAvatar: AvatarName
  groupIds: number[]
  fromGroupId: number | null
  onSuccess: () => void
}

export function StudentGroupAssignment(props: StudentGroupAssignmentProps) {
  const assignment = useStudentGroupAssignment(props)

  const t = useTranslate()

  return (
    <div className={styles.layout}>
      <GroupSelect
        label={t('student.edit.groups.source-label')}
        groups={assignment.state.sourceGroups}
        value={assignment.state.sourceId}
        placeholder={t('student.edit.groups.placeholder')}
        emptyLabel={t('student.edit.groups.source-empty')}
        isPending={assignment.state.isOptionsPending}
        isError={assignment.state.isOptionsError}
        isRetrying={assignment.state.isOptionsRetrying}
        disabled={assignment.state.isOperating}
        isNotice={assignment.state.isSourceNotice}
        notice={t('student.edit.groups.membership-changed')}
        onRetry={assignment.functions.handleRetryOptions}
        onSelect={assignment.functions.handleSourceSelect}
      />
      <GroupSelect
        label={t('student.edit.groups.target-label')}
        groups={assignment.state.targetGroups}
        value={assignment.state.targetId}
        placeholder={t('student.edit.groups.placeholder')}
        emptyLabel={t('student.edit.groups.target-empty')}
        isPending={assignment.state.isOptionsPending}
        isError={assignment.state.isOptionsError}
        isRetrying={assignment.state.isOptionsRetrying}
        disabled={assignment.state.isOperating}
        isNotice={assignment.state.isTargetNotice}
        notice={t('student.edit.groups.membership-changed')}
        onRetry={assignment.functions.handleRetryOptions}
        onSelect={assignment.functions.handleTargetSelect}
      />
      <Field orientation="horizontal">
        <Checkbox
          id="student-assignment-remove-previous"
          size="lg"
          className={styles['remove-checkbox']}
          checked={assignment.state.removePrevious}
          disabled={assignment.state.isOperating || !assignment.state.canRemovePrevious}
          onCheckedChange={assignment.functions.handleRemovePreviousChange}
          aria-describedby="student-assignment-remove-previous-description"
        />
        <FieldLabel className={styles['remove-label']} htmlFor="student-assignment-remove-previous">
          {t('student.edit.groups.remove.label')}
        </FieldLabel>
      </Field>
      {assignment.state.removePrevious && assignment.state.sourceName && (
        <FieldDescription id="student-assignment-remove-previous-description">
          {t('student.edit.groups.remove.description', {
            group: assignment.state.sourceName,
          })}
        </FieldDescription>
      )}
      {!assignment.state.removePrevious && assignment.state.sourceName && (
        <FieldDescription id="student-assignment-remove-previous-description">
          {t('student.edit.groups.confirm.keep-source', {
            group: assignment.state.sourceName,
          })}
        </FieldDescription>
      )}
      <div className={styles.actions}>
        <AlertDialog
          open={assignment.state.isConfirmOpen}
          onOpenChange={assignment.functions.handleConfirmOpenChange}
        >
          {assignment.state.isTransfer && (
            <AlertDialogTrigger
              render={<Button variant="contain" className={styles.submit} />}
              disabled={assignment.state.isOperating || !assignment.state.canSubmit}
            >
              <span aria-hidden="true" className="i-ph:arrows-left-right-bold" />
              {t('student.edit.groups.transfer-action')}
            </AlertDialogTrigger>
          )}
          {!assignment.state.isTransfer && (
            <AlertDialogTrigger
              render={<Button variant="contain" className={styles.submit} />}
              disabled={assignment.state.isOperating || !assignment.state.canSubmit}
            >
              <span aria-hidden="true" className="i-ph:plus-bold" />
              {t('student.edit.groups.add-action')}
            </AlertDialogTrigger>
          )}
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <div className={styles['confirm-identity']}>
                <Avatar size="sm">
                  <AvatarImage src={getAvatarUrl(props.studentAvatar)} alt="" aria-hidden="true" />
                  <AvatarFallback role="img" aria-label={props.studentName}>
                    {getInitial(props.studentName)}
                  </AvatarFallback>
                </Avatar>
                <span>{props.studentName}</span>
              </div>
              <AlertDialogTitle>{t('student.edit.groups.confirm.title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {assignment.state.isTransfer &&
                  assignment.state.targetName &&
                  assignment.state.sourceName &&
                  t('student.edit.groups.confirm.transfer-description', {
                    student: props.studentName,
                    source: assignment.state.sourceName,
                    target: assignment.state.targetName,
                  })}
                {!assignment.state.isTransfer &&
                  assignment.state.targetName &&
                  t('student.edit.groups.confirm.add-description', {
                    student: props.studentName,
                    group: assignment.state.targetName,
                  })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            {assignment.state.isTransfer && assignment.state.sourceName && (
              <FieldDescription className={styles.outcome}>
                {assignment.state.removePrevious &&
                  t('student.edit.groups.confirm.remove-source', {
                    group: assignment.state.sourceName,
                  })}
                {!assignment.state.removePrevious &&
                  t('student.edit.groups.confirm.keep-source', {
                    group: assignment.state.sourceName,
                  })}
              </FieldDescription>
            )}
            {assignment.state.outcome === 'error' && (
              <InlineError onRetry={assignment.functions.handleConfirm}>
                {t('student.edit.groups.error')}
              </InlineError>
            )}
            {assignment.state.outcome === 'partial' && (
              <InlineError onRetry={assignment.functions.handleRetryRemoval}>
                {t('student.edit.groups.partial-error')}
              </InlineError>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel disabled={assignment.state.isOperating}>
                {t('action.cancel')}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={assignment.functions.handleConfirm}
                disabled={assignment.state.isOperating || !assignment.state.canSubmit}
                aria-busy={assignment.state.isOperating}
              >
                {assignment.state.isOperating && <Loader />}
                {t('student.edit.groups.confirm.submit')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog
          open={assignment.state.isKickConfirmOpen}
          onOpenChange={assignment.functions.handleKickOpenChange}
        >
          <AlertDialogTrigger
            render={<Button variant="contain" className={styles.kick} />}
            disabled={
              assignment.state.isOperating ||
              assignment.state.sourceId === null ||
              assignment.state.isKickOperating
            }
          >
            <span aria-hidden="true" className="i-ph:sign-out-bold" />
            {t('student.edit.groups.kick-action')}
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <div className={styles['confirm-identity']}>
                <Avatar size="sm">
                  <AvatarImage src={getAvatarUrl(props.studentAvatar)} alt="" aria-hidden="true" />
                  <AvatarFallback role="img" aria-label={props.studentName}>
                    {getInitial(props.studentName)}
                  </AvatarFallback>
                </Avatar>
                <span>{props.studentName}</span>
              </div>
              <AlertDialogTitle>{t('student.edit.groups.kick.confirm.title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {assignment.state.sourceId !== null &&
                  t('student.edit.groups.kick.confirm.description', {
                    student: props.studentName,
                    group: assignment.state.sourceName ?? '',
                  })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            {assignment.state.isKickError && (
              <InlineError onRetry={assignment.functions.handleKick}>
                {t('student.edit.groups.error')}
              </InlineError>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel disabled={assignment.state.isKickOperating}>
                {t('action.cancel')}
              </AlertDialogCancel>
              <AlertDialogAction
                className={styles.kick}
                onClick={assignment.functions.handleKick}
                disabled={assignment.state.isOperating || assignment.state.sourceId === null}
                aria-busy={assignment.state.isKickOperating}
              >
                {assignment.state.isKickOperating && <Loader />}
                {t('student.edit.groups.kick.confirm.action')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
