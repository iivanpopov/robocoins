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
}

export function StudentDrawer(props: StudentDrawerProps) {
  const studentDrawer = useStudentDrawer(props)

  const t = useTranslate()

  return (
    <Drawer open={props.open} onOpenChange={studentDrawer.handleOpenChange} showSwipeHandle>
      <DrawerContent>
        {props.student && (
          <div className={styles.layout}>
            <DrawerHeader>
              <DrawerTitle>
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
                    <span className={styles['student-balance']}>
                      {t('profile.balance.amount', { count: props.student.balance })}{' '}
                      {t('profile.balance.caption', { count: props.student.balance })}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn('i-ph:caret-right', styles['profile-arrow'])}
                  />
                </button>
              </DrawerTitle>
            </DrawerHeader>
            <BalanceChange
              studentId={props.student.id}
              groupId={studentDrawer.groupId}
              enabled={props.open}
              onSuccess={studentDrawer.handleClose}
            >
              <RecentTransactions
                studentId={props.student.id}
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
