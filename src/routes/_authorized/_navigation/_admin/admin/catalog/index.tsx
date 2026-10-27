import { useTranslate } from '@kanjou/react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { cn } from 'cn'

import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  Loader,
} from '#/components/ui'
import { InlineError, ThemedChip } from '#/routes/-components'
import { AdminPageLayout } from '#/routes/_authorized/_navigation/_admin/admin/-components'

import { RewardRow } from './-components'
import { ALL_FILTER, REWARD_FILTER_CATEGORY_OPTIONS, REWARD_TYPE_OPTIONS } from './-constants'
import { useCatalogPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/catalog/')({
  head: () => ({ meta: [{ title: 'Каталог нагород | Robocoins' }] }),
  component: CatalogPage,
})

function CatalogPage() {
  const { state, functions } = useCatalogPage()

  const t = useTranslate()

  return (
    <AdminPageLayout.Root className={styles.page}>
      <AdminPageLayout.Header centered>
        <AdminPageLayout.Heading>
          <AdminPageLayout.Title>{t('admin.catalog.title')}</AdminPageLayout.Title>
        </AdminPageLayout.Heading>
        <AdminPageLayout.Actions>
          <Button nativeButton={false} render={<Link to="/admin/catalog/create" />}>
            <span className="i-ph:plus-bold" aria-hidden="true" />
            {t('admin.catalog.add')}
          </Button>
        </AdminPageLayout.Actions>
      </AdminPageLayout.Header>

      <div className={styles.filters}>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <span className="i-ph:magnifying-glass" aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput
            type="search"
            autoComplete="off"
            value={state.searchQuery}
            placeholder={t('admin.catalog.search.placeholder')}
            onChange={(event) => functions.handleSearchChange(event.target.value)}
          />
          {!!state.searchQuery && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                onClick={functions.handleClearSearch}
                title={t('action.clear-search.title')}
              >
                <span className="i-ph:x" aria-hidden="true" />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>

        <div className={styles['filter-group']}>
          <span className={styles['filter-label']}>{t('admin.catalog.type.label')}</span>
          <div className={styles.chips} role="group" aria-label={t('admin.catalog.type.label')}>
            <ThemedChip
              icon={false}
              selected={state.type === ALL_FILTER}
              onClick={() => functions.handleTypeChange(ALL_FILTER)}
            >
              {t('filters.all-types')}
            </ThemedChip>
            {REWARD_TYPE_OPTIONS.map((type) => (
              <ThemedChip
                key={type}
                type={type}
                selected={state.type === type}
                onClick={() => functions.handleTypeChange(type)}
              >
                {t(`admin.catalog.type.${type}`)}
              </ThemedChip>
            ))}
          </div>
        </div>

        <div className={styles['filter-group']}>
          <span className={styles['filter-label']}>{t('categories.label')}</span>
          <div className={cn(styles.chips, styles.scroll)}>
            <ThemedChip
              icon={false}
              selected={state.category === ALL_FILTER}
              onClick={() => functions.handleCategoryChange(ALL_FILTER)}
            >
              {t('filters.all-catalog-categories')}
            </ThemedChip>
            {REWARD_FILTER_CATEGORY_OPTIONS.map((category) => (
              <ThemedChip
                key={category}
                type="category"
                value={category}
                selected={state.category === category}
                onClick={() => functions.handleCategoryChange(category)}
              >
                {category === 'no category' && t('admin.catalog.category.none')}
                {category !== 'no category' && t('course.category', { category })}
              </ThemedChip>
            ))}
          </div>
        </div>
      </div>

      {state.isPending && <Loader grow />}

      {state.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={state.isFetching}>
          {t(state.errorKey ?? 'admin.catalog.error.load')}
        </InlineError>
      )}

      {!state.isPending && !state.isError && !state.rewards.length && (
        <div className={styles.empty}>
          <span className="i-ph:storefront-duotone" aria-hidden="true" />
          {!state.hasFilters && <p>{t('admin.catalog.empty')}</p>}
          {state.hasFilters && <p>{t('admin.catalog.empty.filtered')}</p>}
          {state.hasFilters && (
            <button
              type="button"
              className={styles['reset-button']}
              onClick={functions.handleResetFilters}
            >
              {t('filters.clear')}
            </button>
          )}
        </div>
      )}

      {!state.isPending && !state.isError && !!state.rewards.length && (
        <ul className={styles.list}>
          {state.rewards.map((reward) => (
            <li key={reward.id}>
              <RewardRow reward={reward} />
            </li>
          ))}
        </ul>
      )}
    </AdminPageLayout.Root>
  )
}
