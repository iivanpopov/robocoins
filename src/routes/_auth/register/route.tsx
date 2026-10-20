import { createFileRoute, Outlet } from '@tanstack/react-router'
import { z } from 'zod'

import { getCoursesCourseGetQueryOptions } from '#/api/hooks/useGetCoursesCourseGet'
import { courseCategory } from '#/api/types'

import { RegisterProvider } from './-components/register-provider'
import { RegisterStep } from './-constants'
import { registerDraft } from './-utils/register-draft'

const RouteSearchSchema = z.object({
  step: z.enum(RegisterStep).default(RegisterStep.Name),
  category: z.enum(courseCategory).optional(),
  drawer: z.literal('group').optional(),
})

export const Route = createFileRoute('/_auth/register')({
  component: RouteComponent,
  validateSearch: RouteSearchSchema,
  loader: async ({ context }) => {
    await context.queryClient.query(getCoursesCourseGetQueryOptions())
    return registerDraft.get()
  },
})

function RouteComponent() {
  const initialState = Route.useLoaderData()

  return (
    <RegisterProvider initialState={initialState}>
      <Outlet />
    </RegisterProvider>
  )
}
