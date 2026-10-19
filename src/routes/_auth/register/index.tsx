import { createFileRoute } from '@tanstack/react-router'
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
  const { step } = Route.useSearch()

  const Step = STEPS[step]

  return <Step />
}
