import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import { HeroButton, Loader, Typography } from '#/components/ui'
import { CategoryIcon } from '#/routes/-components'
import { AuthLayout } from '#/routes/_auth/-components'

import { RegisterStep } from '../../../-constants'
import { RegisterBackCaption } from '../../register-back-caption'
import { useStepCategory } from './-hooks'

import styles from './step-category.module.css'

export function StepCategory() {
  const { state, queries, functions } = useStepCategory()

  const t = useTranslate()

  return (
    <form className="flex flex-1 flex-col" onSubmit={functions.handleSubmit}>
      <AuthLayout.Root>
        <AuthLayout.Top>
          <Typography variant="title">{t('step.category.title')}</Typography>
          <Typography variant="caption">{t('step.category.description')}</Typography>
        </AuthLayout.Top>

        <AuthLayout.Bottom style={{ marginTop: 0 }}>
          <div className={styles.categories}>
            {queries.courses.isPending && <Loader />}
            {queries.courses.isSuccess && !state.categories.length && (
              <Typography variant="caption">{t('step.selection.empty')}</Typography>
            )}
            {state.categories.map((item) => (
              <button
                type="button"
                key={item.category}
                data-category={item.category}
                className={cn('category-theme', 'category-choice', styles.category)}
                aria-pressed={state.selectedCategories.includes(item.category)}
                onClick={() => functions.handleToggleCategory(item.category)}
              >
                <div className="category-tile">
                  <CategoryIcon category={item.category} />
                </div>
                <div className={styles.details}>
                  <Typography variant="subtitle">
                    {t('course.category', { category: item.category })}
                  </Typography>
                  <Typography variant="caption">{item.courses}</Typography>
                </div>
              </button>
            ))}
          </div>

          <HeroButton
            type="submit"
            className="w-full mt-8"
            disabled={!state.selectedCategories.length || !queries.courses.isSuccess}
          >
            {t('action.next.title')}
          </HeroButton>
          <RegisterBackCaption search={{ step: RegisterStep.Name }} />
        </AuthLayout.Bottom>
      </AuthLayout.Root>
    </form>
  )
}
