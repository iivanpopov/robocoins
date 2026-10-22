import { createFileRoute } from '@tanstack/react-router'

import { getShopRewardsShopGetQueryOptions } from '#/api/hooks/useGetShopRewardsShopGet'

export const Route = createFileRoute('/_authorized/_navigation/_student/shop/')({
  loader: async ({ context }) => context.queryClient.query(getShopRewardsShopGetQueryOptions()),
  component: ShopPage,
})

function ShopPage() {
  return <div>Hello "/_student/shop/"!</div>
}
