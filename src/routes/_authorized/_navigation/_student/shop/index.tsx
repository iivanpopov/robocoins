import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'
import { cn } from 'cn'

import { getShopRewardsShopGetQueryOptions } from '#/api/hooks/useGetShopRewardsShopGet'

import { ShopErrorComponent, StarBackground } from './-components'
import { useShopPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_student/shop/')({
  head: () => ({ meta: [{ title: 'Магазин | Robocoins' }] }),
  loader: async ({ context }) => ({
    rewards: await context.queryClient.query(getShopRewardsShopGetQueryOptions()),
    seed: context.user!.id,
  }),
  component: ShopPage,
  errorComponent: ShopErrorComponent,
})

function ShopPage() {
  const { refs, state, functions } = useShopPage()
  const t = useTranslate()

  return (
    <main
      className={cn('galaxy', styles.galaxy)}
      data-galaxy=""
      onPointerDown={functions.handlePointerDown}
      onPointerMove={functions.handlePointerMove}
      onPointerUp={functions.handlePointerUp}
      onPointerCancel={functions.handlePointerCancel}
      onPointerLeave={functions.handlePointerLeave}
      onLostPointerCapture={functions.handleLostPointerCapture}
      onWheel={functions.handleWheel}
      ref={refs.map}
    >
      <header className={styles['shop-header']}>
        <div className={styles.balance} aria-label={t('shop.balance', { count: state.balance })}>
          <span>{t('shop.balance.amount', { count: state.balance })}</span>
          <span className="i-ph:coins-bold" aria-hidden="true" />
        </div>
      </header>
      <div className={styles['star-field']}>
        <StarBackground backgroundRef={refs.background} />
        {state.stars.map((star) => (
          <button
            className={cn(
              styles.star,
              state.selectedReward?.id === star.reward.id && styles['star-selected'],
            )}
            key={star.reward.id}
            ref={(element) => {
              if (element) refs.starElements.current.set(star.reward.id, element)
              else refs.starElements.current.delete(star.reward.id)
            }}
            onClick={(event) => functions.handleOpenReward(star, event)}
            style={{ '--glow': star.glow } as React.CSSProperties}
            aria-label={star.reward.name}
          >
            <span className={styles['star-visual']} aria-hidden="true">
              <span className={cn('i-ph:star-four-fill', styles['star-point'])} />
            </span>
            <span className={styles['star-label']} data-star-label="" aria-hidden="true">
              {star.reward.name}
            </span>
          </button>
        ))}
      </div>
      {state.isRewardVisible && state.selectedReward && (
        <section
          className={cn(styles.detail, state.isClosingReward && styles['detail-closing'])}
          data-shop-reward={state.isRewardOpen || undefined}
          data-shop-reward-closing={state.isClosingReward || undefined}
          aria-label={state.selectedReward.name}
        >
          <div className={styles['detail-content']}>
            <button className={styles.back} onClick={functions.handleCloseReward}>
              <span className="i-ph:caret-left-bold" aria-hidden="true" />
              {t('shop.reward.back')}
            </button>
            <div className={styles['detail-heading']}>
              <span
                className={cn('i-ph:star-four-fill', styles['detail-icon'])}
                aria-hidden="true"
              />
              <h1>{state.selectedReward.name}</h1>
            </div>
            {state.selectedReward.description && <p>{state.selectedReward.description}</p>}
            <div className={styles.price}>
              {t('shop.reward.price', { count: state.selectedReward.price })}
              <span className="i-ph:coins-bold" aria-hidden="true" />
            </div>
            <button className={styles.buy} disabled={!state.canClaimReward}>
              {state.canClaimReward && t('shop.reward.claim')}
              {!state.canClaimReward && t('shop.reward.insufficient')}
            </button>
          </div>
        </section>
      )}
    </main>
  )
}
