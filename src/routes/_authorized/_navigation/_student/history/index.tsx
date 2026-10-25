import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { IconButton } from '#/components/ui'
import { RewardHistory } from '#/routes/_authorized/-components/reward-history'

import { useHistoryPage } from './-hooks'

export const Route = createFileRoute('/_authorized/_navigation/_student/history/')({
  component: HistoryPage,
})

function HistoryPage() {
  const { state } = useHistoryPage()
  const t = useTranslate()

  return (
    <RewardHistory
      studentId={state.studentId}
      backLink={
        <IconButton nativeButton={false} render={<Link to="/" />} title={t('history.back')}>
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
      }
    />
  )
}
