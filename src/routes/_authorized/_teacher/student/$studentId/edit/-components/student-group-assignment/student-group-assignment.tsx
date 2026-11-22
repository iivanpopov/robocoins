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
  Button,
  Loader,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { UserAvatar } from '#/routes/-components/user-avatar'
import type { Avatar as AvatarName } from '#/routes/-constants'
import { cn } from '#/utils/cn'

import { GroupPicker, MembershipRow } from './components'
import { useStudentGroupAssignment } from './hooks'

import styles from './student-group-assignment.module.css'

export interface StudentGroupAssignmentProps {
  studentId: number
  studentName: string
  studentAvatar: AvatarName
  studentAvatarRing: string | null
  groupIds: number[]
  onSuccess: () => void
}

const CONFIRM_LABELS = {
  add: 'student.edit.groups.add-action',
  transfer: 'student.edit.groups.transfer-action',
  remove: 'student.edit.groups.remove-confirm-action',
} as const

export function StudentGroupAssignment(props: StudentGroupAssignmentProps) {
  const assignment = useStudentGroupAssignment(props)
  const t = useTranslate()

  const isBusy = assignment.state.isOperating
  const options = assignment.state.groupOptions
  const hasOptions = !options.isPending && !options.isError
  const confirmation = assignment.state.confirmation

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
          disabled={!options.groups.length || isBusy}
        >
          <span aria-hidden="true" className="i-ph:plus" />
          {t('student.edit.groups.add-action')}
        </Button>
      </div>

      {options.isPending && <Loader className={styles.loader} />}
      {options.isError && (
        <InlineError
          onRetry={assignment.functions.handleRetryOptions}
          isRetrying={options.isRetrying}
        >
          {t('group.error')}
        </InlineError>
      )}
      {hasOptions && !assignment.state.memberships.length && (
        <p className={styles.empty}>{t('student.edit.groups.source-empty')}</p>
      )}
      {hasOptions && !!assignment.state.memberships.length && (
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

      {assignment.state.selection && (
        <GroupPicker
          mode={assignment.state.selection.kind}
          options={options}
          onClose={assignment.functions.handleCloseDialog}
          onRetry={assignment.functions.handleRetryOptions}
          onSelect={assignment.functions.handleSelectTarget}
        />
      )}

      {confirmation && (
        <AlertDialog
          open
          onOpenChange={(open) => {
            if (!open) assignment.functions.handleCloseDialog()
          }}
        >
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <div className={styles['confirm-identity']}>
                <UserAvatar
                  name={props.studentName}
                  avatar={props.studentAvatar}
                  avatarRing={props.studentAvatarRing}
                  size="sm"
                />
                <span>{props.studentName}</span>
              </div>
              <AlertDialogTitle>
                {t(`student.edit.groups.${confirmation.action.kind}-confirm-title`)}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {confirmation.action.kind === 'add' &&
                  t('student.edit.groups.confirm.add-description', {
                    student: props.studentName,
                    group: confirmation.action.target.name,
                  })}
                {confirmation.action.kind === 'transfer' &&
                  t('student.edit.groups.confirm.transfer-description', {
                    student: props.studentName,
                    source: confirmation.action.source.name,
                    target: confirmation.action.target.name,
                  })}
                {confirmation.action.kind === 'remove' &&
                  t('student.edit.groups.remove-confirm-description', {
                    student: props.studentName,
                    group: confirmation.action.source.name,
                  })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            {confirmation.action.kind === 'transfer' && (
              <p className={styles.note}>
                {t('student.edit.groups.remove.description', {
                  group: confirmation.action.source.name,
                })}
              </p>
            )}
            {confirmation.failure && (
              <InlineError onRetry={assignment.functions.handleConfirm} isRetrying={isBusy}>
                {confirmation.failure === 'partial' && t('student.edit.groups.partial-error')}
                {confirmation.failure === 'error' && t('student.edit.groups.error')}
              </InlineError>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isBusy}>{t('action.cancel')}</AlertDialogCancel>
              <AlertDialogAction
                className={cn(confirmation.action.kind === 'remove' && styles.remove)}
                onClick={assignment.functions.handleConfirm}
                disabled={isBusy}
                aria-busy={isBusy}
              >
                {isBusy && <Loader />}
                {t(CONFIRM_LABELS[confirmation.action.kind])}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
