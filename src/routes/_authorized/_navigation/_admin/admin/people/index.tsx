import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/people/')({
  beforeLoad: () => {
    throw redirect({ to: '/admin/people/students' })
  },
})
