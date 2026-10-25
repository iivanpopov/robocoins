import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/_navigation/_student')({
  beforeLoad: ({ context }) => {
    if (context.user?.role !== 'student') throw redirect({ to: '/group' })
  },
})
