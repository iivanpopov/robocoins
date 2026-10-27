import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'
import { cn } from 'cn'

import { getShopRewardsShopGetQueryOptions } from '#/api/hooks/useGetShopRewardsShopGet'
import type { StudentProfileResponse } from '#/api/types'

import { getStudentRewardCategoriesQueryOptions, isRewardEligible } from '../-utils'
import { RewardArtwork, RewardSymbol, ShopErrorComponent, StarBackground } from './-components'
import { useShopPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_student/shop/')({
  head: () => ({ meta: [{ title: 'Магазин | Robocoins' }] }),
  loader: async ({ context }) => {
    const profile = context.user as StudentProfileResponse
    const shop = await Promise.all([
      context.queryClient.query(getShopRewardsShopGetQueryOptions()),
      context.queryClient.query(
        getStudentRewardCategoriesQueryOptions(context.queryClient, profile),
      ),
    ])

    return {
      rewards: shop[0].filter((reward) => isRewardEligible(reward, shop[1])),
      seed: profile.id,
    }
  },
  component: ShopPage,
  errorComponent: ShopErrorComponent,
})

function ShopPage() {
  const { refs, state, functions } = useShopPage()
  const t = useTranslate()

  return (
    <main
      className={cn('galaxy', styles.galaxy, state.isListView && styles['list-view'])}
      data-galaxy=""
      ref={refs.map}
    >
      <header className={styles['shop-header']}>
        {!state.isRewardActive && (
          <div className={styles['view-switch']} role="group" aria-label={t('shop.view.label')}>
            <button
              type="button"
              aria-pressed={!state.isListView}
              onClick={functions.handleShowGalaxy}
            >
              <span aria-hidden="true" className="i-ph:planet" />
              {t('shop.view.galaxy')}
            </button>
            <button
              type="button"
              aria-pressed={state.isListView}
              onClick={functions.handleShowList}
            >
              <span aria-hidden="true" className="i-ph:list-dashes" />
              {t('shop.view.list')}
            </button>
          </div>
        )}
        <div className={styles.balance} aria-label={t('shop.balance', { count: state.balance })}>
          <span>{t('coins.amount', { count: state.balance })}</span>
          <span className="i-ph:coins-bold" aria-hidden="true" />
        </div>
      </header>
      <StarBackground backgroundRef={refs.background} />
      <div
        className={cn(
          styles['star-field'],
          (state.isRewardVisible || state.isListView) && styles['star-field-hidden'],
        )}
        inert={state.isRewardActive || state.isListView}
        onPointerDown={functions.handlePointerDown}
        onPointerMove={functions.handlePointerMove}
        onPointerUp={functions.handlePointerUp}
        onPointerCancel={functions.handlePointerCancel}
        onPointerLeave={functions.handlePointerLeave}
        onLostPointerCapture={functions.handleLostPointerCapture}
        onWheel={functions.handleWheel}
      >
        {state.stars.map((star) => (
          <button
            className={cn(styles.star)}
            key={star.reward.id}
            ref={(element) => {
              if (element) refs.starElements.current.set(star.reward.id, element)
              else refs.starElements.current.delete(star.reward.id)
            }}
            onClick={(event) => functions.handleOpenReward(star, event)}
            onFocus={(event) => functions.handleFocusStar(star, event)}
            style={{ '--glow': star.glow } as React.CSSProperties}
            aria-label={star.reward.name}
            aria-description={`${t(`shop.reward.type.${star.reward.type}`)} · ${t('shop.reward.cost')}: ${t('coins.amount', { count: star.reward.price })}`}
          >
            <span className={styles['star-visual']} aria-hidden="true">
              {star.reward.type === 'privilege' && (
                <span className={cn('i-ph:star-four-fill', styles['star-point'])} />
              )}
              {star.reward.type === 'reward' && (
                <span className={cn('i-ph:cube-duotone', styles['star-point'])} />
              )}
              <RewardSymbol reward={star.reward} className={styles['star-symbol']} />
            </span>
            <span className={styles['star-label']} data-star-label="" aria-hidden="true">
              <span className={styles['star-name']}>{star.reward.name}</span>
              <span className={styles['star-price']}>
                {t('coins.amount', { count: star.reward.price })}
                <span className="i-ph:coins-bold" />
              </span>
            </span>
          </button>
        ))}
      </div>
      {state.isListView && (
        <section
          className={styles.catalog}
          aria-label={t('shop.view.list')}
          inert={state.isRewardActive}
        >
          <ul className={styles['reward-list']}>
            {state.rewards.map((reward) => (
              <li key={reward.id}>
                <button
                  type="button"
                  className={styles['reward-card']}
                  onClick={(event) => functions.handleOpenListReward(reward, event)}
                >
                  <div className={styles['card-artwork']}>
                    <RewardArtwork reward={reward} compact />
                  </div>
                  <span className={styles['card-content']}>
                    <span className={styles['card-name']}>{reward.name}</span>
                    <span className={styles['card-type']}>
                      {t(`shop.reward.type.${reward.type}`)}
                    </span>
                    <span className={styles['card-price']}>
                      {t('coins.amount', { count: reward.price })}
                      <span className="i-ph:coins-bold" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
      {state.isRewardVisible && state.selectedReward && (
        <section
          className={cn(styles.detail, state.isClosingReward && styles['detail-closing'])}
          data-shop-reward={state.isRewardOpen || undefined}
          data-shop-reward-closing={state.isClosingReward || undefined}
          onAnimationEnd={functions.handleRewardAnimationEnd}
          aria-label={state.selectedReward.name}
        >
          <div className={styles['detail-header']}>
            <button
              className={styles.back}
              onClick={functions.handleCloseReward}
              ref={refs.rewardBack}
            >
              <span className="i-ph:caret-left-bold" aria-hidden="true" />
              {t('shop.reward.back')}
            </button>
          </div>
          <div className={styles['detail-scroll']}>
            <RewardArtwork reward={state.selectedReward} />
            <div className={styles['detail-content']}>
              <div className={styles['reward-meta']}>
                <span className={styles['reward-type']}>
                  <span
                    className={cn(
                      state.selectedReward.type === 'reward' && 'i-ph:cube-duotone',
                      state.selectedReward.type === 'privilege' && 'i-ph:star-four-fill',
                    )}
                    aria-hidden="true"
                  />
                  {t(`shop.reward.type.${state.selectedReward.type}`)}
                </span>
                {state.selectedReward.course_category &&
                  state.selectedReward.course_category !== 'no category' && (
                    <span className={styles['reward-category']}>
                      {t('course.category', { category: state.selectedReward.course_category })}
                    </span>
                  )}
              </div>
              <h1 className={styles['detail-heading']}>{state.selectedReward.name}</h1>
              {state.rewardDescription && (
                <p className={styles.description}>{state.rewardDescription}</p>
              )}
            </div>
          </div>
          <div className={styles['detail-footer']}>
            <div className={styles.price}>
              {t('coins.amount', { count: state.selectedReward.price })}
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
