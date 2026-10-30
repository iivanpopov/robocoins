import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/groups/')({
  beforeLoad: () => {
    throw redirect({ to: '/admin' })
  },
  component: GroupsIndexRedirect,
})

function GroupsIndexRedirect() {
  return null
}
