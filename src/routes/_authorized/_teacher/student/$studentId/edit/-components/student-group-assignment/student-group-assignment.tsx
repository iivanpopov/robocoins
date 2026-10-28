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
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Loader,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'
import type { Avatar as AvatarName } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'
import type { GroupCardData } from '#/routes/_authorized/-components/group-card'
import { GroupCard } from '#/routes/_authorized/-components/group-card'

import { GroupPicker } from './-components'
import { useStudentGroupAssignment } from './-hooks'

import styles from './student-group-assignment.module.css'

export interface StudentGroupAssignmentProps {
  studentId: number
  studentName: string
  studentAvatar: AvatarName
  groupIds: number[]
  onSuccess: () => void
}

interface DialogStudentProps {
  name: string
  avatar: AvatarName
}

function DialogStudent(props: DialogStudentProps) {
  return (
    <div className={styles['confirm-identity']}>
      <Avatar size="sm">
        <AvatarImage src={getAvatarUrl(props.avatar)} alt="" aria-hidden="true" />
        <AvatarFallback role="img" aria-label={props.name}>
          {getInitial(props.name)}
        </AvatarFallback>
      </Avatar>
      <span>{props.name}</span>
    </div>
  )
}

interface MembershipRowProps {
  group: GroupCardData
  disabled: boolean
  onTransfer: (groupId: number) => void
  onRemove: (groupId: number) => void
}

function MembershipRow(props: MembershipRowProps) {
  const t = useTranslate()

  return (
    <GroupCard
      group={props.group}
      actions={
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => props.onTransfer(props.group.id)}
            disabled={props.disabled}
          >
            <span aria-hidden="true" className="i-ph:arrows-left-right" />
            {t('student.edit.groups.transfer-action')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={styles['remove-row']}
            onClick={() => props.onRemove(props.group.id)}
            disabled={props.disabled}
          >
            <span aria-hidden="true" className="i-ph:sign-out" />
            {t('student.edit.groups.remove-action')}
          </Button>
        </>
      }
    />
  )
}

export function StudentGroupAssignment(props: StudentGroupAssignmentProps) {
  const assignment = useStudentGroupAssignment(props)

  const t = useTranslate()

  const isBusy = assignment.state.isOperating
  const canAdd = !!assignment.state.targetGroups.length && !isBusy

  return (
    <div className={styles.layout}>
      <div className={styles.toolbar}>
        <span className={styles.hint}>
          {t('groups.count', { count: assignment.state.memberships.length })}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={assignment.functions.handleOpenAdd}
          disabled={!canAdd}
        >
          <span aria-hidden="true" className="i-ph:plus" />
          {t('student.edit.groups.add-action')}
        </Button>
      </div>

      {assignment.state.isOptionsPending && <Loader className={styles.loader} />}
      {assignment.state.isOptionsError && (
        <InlineError
          onRetry={assignment.functions.handleRetryOptions}
          isRetrying={assignment.state.isOptionsRetrying}
        >
          {t('group.error')}
        </InlineError>
      )}
      {!assignment.state.isOptionsPending &&
        !assignment.state.isOptionsError &&
        !assignment.state.memberships.length && (
          <p className={styles.empty}>{t('student.edit.groups.source-empty')}</p>
        )}
      {!assignment.state.isOptionsPending &&
        !assignment.state.isOptionsError &&
        !!assignment.state.memberships.length && (
          <div className={styles.memberships}>
            {assignment.state.memberships.map((group) => (
              <MembershipRow
                key={group.id}
                group={group}
                disabled={isBusy}
                onTransfer={assignment.functions.handleOpenTransfer}
                onRemove={assignment.functions.handleOpenRemove}
              />
            ))}
          </div>
        )}

      <GroupPicker
        open={assignment.state.isAddOpen}
        title={t('student.edit.groups.add-picker-title')}
        groups={assignment.state.targetGroups}
        emptyLabel={t('student.edit.groups.target-empty')}
        isPending={assignment.state.isOptionsPending}
        isError={assignment.state.isOptionsError}
        isRetrying={assignment.state.isOptionsRetrying}
        onOpenChange={assignment.functions.handleAddOpenChange}
        onRetry={assignment.functions.handleRetryOptions}
        onSelect={assignment.functions.handleAddTargetSelect}
      />
      <GroupPicker
        open={assignment.state.isTransferOpen}
        title={t('student.edit.groups.transfer-picker-title')}
        groups={assignment.state.targetGroups}
        emptyLabel={t('student.edit.groups.target-empty')}
        isPending={assignment.state.isOptionsPending}
        isError={assignment.state.isOptionsError}
        isRetrying={assignment.state.isOptionsRetrying}
        onOpenChange={assignment.functions.handleTransferOpenChange}
        onRetry={assignment.functions.handleRetryOptions}
        onSelect={assignment.functions.handleTransferTargetSelect}
      />

      <AlertDialog
        open={assignment.state.isAddConfirmOpen}
        onOpenChange={assignment.functions.handleAddConfirmOpenChange}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <DialogStudent name={props.studentName} avatar={props.studentAvatar} />
            <AlertDialogTitle>{t('student.edit.groups.add-confirm-title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {!!assignment.state.addTargetName &&
                t('student.edit.groups.confirm.add-description', {
                  student: props.studentName,
                  group: assignment.state.addTargetName,
                })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {assignment.state.addFailure?.kind === 'error' && (
            <InlineError onRetry={assignment.functions.handleRetry}>
              {t('student.edit.groups.error')}
            </InlineError>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isBusy}>{t('action.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={assignment.functions.handleAddConfirm}
              disabled={isBusy}
              aria-busy={isBusy}
            >
              {isBusy && <Loader />}
              {t('student.edit.groups.add-action')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={assignment.state.isTransferConfirmOpen}
        onOpenChange={assignment.functions.handleTransferConfirmOpenChange}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <DialogStudent name={props.studentName} avatar={props.studentAvatar} />
            <AlertDialogTitle>{t('student.edit.groups.transfer-confirm-title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {!!assignment.state.transferSourceName &&
                !!assignment.state.transferTargetName &&
                t('student.edit.groups.confirm.transfer-description', {
                  student: props.studentName,
                  source: assignment.state.transferSourceName,
                  target: assignment.state.transferTargetName,
                })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {!!assignment.state.transferSourceName && (
            <p className={styles.note}>
              {t('student.edit.groups.remove.description', {
                group: assignment.state.transferSourceName,
              })}
            </p>
          )}
          {assignment.state.transferFailure?.kind === 'partial' && (
            <InlineError onRetry={assignment.functions.handleRetry}>
              {t('student.edit.groups.partial-error')}
            </InlineError>
          )}
          {assignment.state.transferFailure?.kind === 'error' && (
            <InlineError onRetry={assignment.functions.handleRetry}>
              {t('student.edit.groups.error')}
            </InlineError>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isBusy}>{t('action.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={assignment.functions.handleTransferConfirm}
              disabled={isBusy}
              aria-busy={isBusy}
            >
              {isBusy && <Loader />}
              {t('student.edit.groups.transfer-action')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={assignment.state.isRemoveConfirmOpen}
        onOpenChange={assignment.functions.handleRemoveConfirmOpenChange}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <DialogStudent name={props.studentName} avatar={props.studentAvatar} />
            <AlertDialogTitle>{t('student.edit.groups.remove-confirm-title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {!!assignment.state.removeSourceName &&
                t('student.edit.groups.remove-confirm-description', {
                  student: props.studentName,
                  group: assignment.state.removeSourceName,
                })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {assignment.state.removeFailure?.kind === 'error' && (
            <InlineError onRetry={assignment.functions.handleRetry}>
              {t('student.edit.groups.error')}
            </InlineError>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isBusy}>{t('action.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              className={styles.remove}
              onClick={assignment.functions.handleRemoveConfirm}
              disabled={isBusy}
              aria-busy={isBusy}
            >
              {isBusy && <Loader />}
              {t('student.edit.groups.remove-confirm-action')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
