import { createFileRoute } from '@tanstack/react-router'
import { ComponentType, lazy, Suspense } from 'react'

import { PendingComponent } from '#/routes/-components/pending-component'

import { StepName } from './-components/steps/step-name'
import { RegisterStep } from './-constants'

import styles from './index.module.css'

const STEPS: Record<RegisterStep, ComponentType> = {
  name: StepName,
  category: lazy(() => import('./-components/steps/step-category')),
  course: lazy(() => import('./-components/steps/step-course')),
  avatar: lazy(() => import('./-components/steps/step-avatar')),
  view: lazy(() => import('./-components/steps/step-view')),
  success: lazy(() => import('./-components/steps/step-success')),
}

export const Route = createFileRoute('/_auth/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { step } = Route.useSearch()

  const Step = STEPS[step]

  return (
    <main className={styles.root}>
      <div className={styles.content}>
        <Suspense fallback={<PendingComponent />}>
          <Step />
        </Suspense>
      </div>
    </main>
  )
}
