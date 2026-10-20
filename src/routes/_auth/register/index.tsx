import { createFileRoute } from '@tanstack/react-router'
import { cn } from 'cn'
import { ComponentType } from 'react'

import {
  StepAvatar,
  StepCategory,
  StepCourse,
  StepName,
  StepSuccess,
  StepView,
} from './-components/steps'
import { RegisterStep } from './-constants'
import { useRegisterPage } from './-hooks'

import styles from './index.module.css'

const STEPS: Record<RegisterStep, ComponentType> = {
  name: StepName,
  category: StepCategory,
  course: StepCourse,
  avatar: StepAvatar,
  view: StepView,
  success: StepSuccess,
}

export const Route = createFileRoute('/_auth/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { state } = useRegisterPage()

  const Step = STEPS[state.step]

  return (
    <div className={styles.root}>
      <div aria-hidden="true" className={styles.decoration}>
        <span className={cn('i-ph:coins', styles.watermark)} />
      </div>
      <div className={styles.content}>
        <Step />
      </div>
    </div>
  )
}
