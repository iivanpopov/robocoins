import { createFileRoute, Outlet } from '@tanstack/react-router'
import { z } from 'zod'

import { RegisterProvider } from './-components/register-provider'
import { RegisterStep } from './-constants'
import { registerDraft } from './-utils/register-draft'

const RouteSearch = z.object({
  step: z.enum(RegisterStep).default(RegisterStep.Name),
})

export const Route = createFileRoute('/_auth/register')({
  component: RouteComponent,
  validateSearch: RouteSearch,
  loader: () => registerDraft.get(),
})

function RouteComponent() {
  const initialState = Route.useLoaderData()

  return (
    <RegisterProvider initialState={initialState}>
      <Outlet />
    </RegisterProvider>
  )
}
