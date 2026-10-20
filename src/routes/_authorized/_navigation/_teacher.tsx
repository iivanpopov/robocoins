import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/_navigation/_teacher')({
  beforeLoad: ({ context }) => {
    if (context.user?.role !== 'teacher') throw redirect({ to: '/' })
  },
})
