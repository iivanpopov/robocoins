import { createFileRoute, Outlet } from '@tanstack/react-router'
import * as v from 'valibot'

import { getCoursesCourseGetQueryOptions } from '#/api/hooks/useGetCoursesCourseGet'
import { courseCategory } from '#/api/types'

import { RegisterProvider } from './-components/register-provider'
import { RegisterStep } from './-constants'
import { registerDraft } from './-utils/register-draft'

const RouteSearchSchema = v.object({
  step: v.optional(v.enum(RegisterStep), RegisterStep.Name),
  category: v.optional(v.enum(courseCategory)),
  drawer: v.optional(v.literal('group')),
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
