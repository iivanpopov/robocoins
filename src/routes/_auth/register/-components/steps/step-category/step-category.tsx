import { useTranslate } from '@kanjou/react'

import { HeroButton, Loader, Typography } from '#/components/ui'
import { LearningCard } from '#/routes/-components'
import { AuthLayout } from '#/routes/_auth/-components'

import { RegisterStep } from '../../../-constants'
import { RegisterBackCaption } from '../../register-back-caption'
import { useStepCategory } from './hooks'

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
              <LearningCard.Root key={item.category} size="lg" selection="check">
                <LearningCard.Row
                  render={
                    <button
                      type="button"
                      aria-pressed={state.selectedCategories.includes(item.category)}
                      onClick={() => functions.handleToggleCategory(item.category)}
                    />
                  }
                >
                  <LearningCard.Icon category={item.category} />
                  <LearningCard.Content>
                    <LearningCard.Title>
                      {t('course.category', { category: item.category })}
                    </LearningCard.Title>
                    <LearningCard.Description>{item.courses}</LearningCard.Description>
                  </LearningCard.Content>
                  <LearningCard.Indicator kind="select" />
                </LearningCard.Row>
              </LearningCard.Root>
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
