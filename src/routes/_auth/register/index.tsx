import { createFileRoute } from '@tanstack/react-router'
import { ComponentType } from 'react'

import { StepAvatar, StepCourse, StepGroup, StepName, StepView } from './-components/steps'
import { RegisterStep } from './-constants'

const STEPS: Record<RegisterStep, ComponentType> = {
  name: StepName,
  course: StepCourse,
  schedule: StepGroup,
  avatar: StepAvatar,
  view: StepView,
}

export const Route = createFileRoute('/_auth/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { step } = Route.useSearch()

  const Step = STEPS[step]

  return <Step />
}
