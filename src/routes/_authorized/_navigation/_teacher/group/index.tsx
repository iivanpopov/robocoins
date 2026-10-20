import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'
import { cn } from 'cn'

import { Chip, Loader } from '#/components/ui'
import { CategoryIcon } from '#/routes/-components'

import { GroupFilter } from './-constants'
import { useGroupPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_teacher/group/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { state, functions } = useGroupPage()

  const t = useTranslate()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('group.select.title')}</h1>
      </header>

      <div className={styles['themes-bar']}>
        <Chip
          selected={state.selectedTheme === GroupFilter.All}
          onClick={() => functions.handleThemeSelect(GroupFilter.All)}
        >
          {t('group.filter.all', { count: state.allGroupsCount })}
        </Chip>
        {state.categories.map((category) => {
          return (
            <Chip
              key={category}
              selected={state.selectedTheme === category}
              onClick={() => functions.handleThemeSelect(category)}
            >
              <CategoryIcon category={category} />
              <span>{t('course.category', { category })}</span>
            </Chip>
          )
        })}
      </div>

      {state.isPending && (
        <div className="flex flex-1 justify-center items-center">
          <Loader />
        </div>
      )}
      {state.isError && <div role="alert">{t('group.error')}</div>}
      {!state.isPending && !state.isError && (
        <div className={styles.grid}>
          {state.groups.map((group) => {
            return (
              <article
                key={group.id}
                className={styles.card}
                data-category={group.category}
                onClick={() => functions.handleGroupClick(group.id)}
              >
                <div className={styles['card-top']}>
                  <div className={styles['card-title-group']}>
                    <div className={styles['card-icon']}>
                      <CategoryIcon category={group.category} />
                    </div>
                    <div>
                      <h2 className={styles['card-title']}>{group.course_name}</h2>
                    </div>
                  </div>

                  <div className={styles['card-meta']}>
                    <span className={styles['students-count']}>
                      {t('group.students-count', { count: group.students_count })}
                    </span>
                    <span className={cn('i-ph:caret-right-bold', styles['arrow-icon'])} />
                  </div>
                </div>

                <div className={styles['card-footer']}>
                  <div className={styles['schedule-block']}>
                    <span
                      aria-hidden="true"
                      className={cn('i-ph:clock-bold', styles['schedule-icon'])}
                    />
                    <span>
                      {group.schedule.weekday && <>{t(`weekday.${group.schedule.weekday}`)}, </>}
                      {group.schedule.time}
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
