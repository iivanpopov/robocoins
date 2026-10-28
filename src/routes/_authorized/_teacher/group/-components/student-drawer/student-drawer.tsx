import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import { StudentProfileResponse } from '#/api/types'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '#/components/ui'
import { Avatar as AvatarName } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'

import { BalanceChange, RecentTransactions } from './-components'
import { useStudentDrawer } from './-hooks'

import styles from './student-drawer.module.css'

export interface StudentDrawerProps {
  open: boolean
  groupId: number
  student: (StudentProfileResponse & { avatar: AvatarName }) | null
  onOpenChange: (open: boolean) => void
  onOpenChangeComplete: (open: boolean) => void
}

export function StudentDrawer(props: StudentDrawerProps) {
  const studentDrawer = useStudentDrawer(props)

  const t = useTranslate()

  return (
    <Drawer
      open={props.open}
      onOpenChange={studentDrawer.handleOpenChange}
      onOpenChangeComplete={props.onOpenChangeComplete}
      showSwipeHandle
    >
      <DrawerContent>
        {props.student && (
          <div className={styles.layout}>
            <DrawerHeader>
              <DrawerTitle className={styles['title-row']}>
                <button
                  type="button"
                  className={styles['student-wrap']}
                  onClick={studentDrawer.handleViewProfile}
                  title={t('step.success.profile')}
                >
                  <Avatar className={styles.avatar}>
                    <AvatarImage
                      src={getAvatarUrl(props.student.avatar)}
                      alt={props.student.name}
                    />
                    <AvatarFallback role="img" aria-label={props.student.name}>
                      {getInitial(props.student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className={styles['student-details']}>
                    <span className={styles['student-name']}>{props.student.name}</span>
                    <span
                      className={styles['student-balance']}
                      aria-label={`${t('coins.amount', { count: props.student.balance })} ${t('coins.unit', { count: props.student.balance })}`}
                    >
                      <span aria-hidden="true">{props.student.balance}</span>
                      <span
                        aria-hidden="true"
                        className={cn('i-ph:coin', styles['balance-icon'])}
                      />
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  className={styles['student-edit']}
                  onClick={studentDrawer.handleEditStudent}
                  aria-label={t('student.profile.edit')}
                  title={t('student.profile.edit')}
                >
                  <span aria-hidden="true" className={cn('i-ph:wrench', styles['profile-arrow'])} />
                </button>
              </DrawerTitle>
            </DrawerHeader>
            <BalanceChange
              key={`${studentDrawer.groupId}:${props.student.id}:${props.open}`}
              studentId={props.student.id}
              studentName={props.student.name}
              groupId={studentDrawer.groupId}
              enabled={props.open}
              onSuccess={studentDrawer.handleClose}
            >
              <RecentTransactions
                key={props.student.id}
                studentId={props.student.id}
                studentName={props.student.name}
                groupId={studentDrawer.groupId}
                enabled={props.open}
                onViewAll={studentDrawer.handleViewHistory}
              />
            </BalanceChange>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
