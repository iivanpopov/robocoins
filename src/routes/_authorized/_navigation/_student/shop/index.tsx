import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/_navigation/_student/shop/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_student/shop/"!</div>
}
