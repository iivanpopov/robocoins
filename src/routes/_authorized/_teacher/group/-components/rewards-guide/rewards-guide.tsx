import { useTranslate } from '@kanjou/react'

import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  IconButton,
} from '#/components/ui'
import { UserCard } from '#/routes/-components'
import { cn } from '#/utils/cn'

import styles from './rewards-guide.module.css'

export function RewardsGuide() {
  const t = useTranslate()

  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<IconButton title={t('group.rewards.guide.title')} />}>
        <span aria-hidden="true" className="i-ph:question-mark" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t('group.rewards.guide.title')}</DrawerTitle>
          <DrawerDescription>{t('group.rewards.guide.description')}</DrawerDescription>
        </DrawerHeader>
        <div className={styles.body}>
          <section className={styles.section}>
            <h3 className={styles.heading}>{t('group.rewards.guide.example')}</h3>
            <UserCard.Root className={styles.example}>
              <UserCard.Avatar name={t('group.rewards.guide.student')} avatar="alien-monster" />
              <UserCard.Content>
                <UserCard.Name>{t('group.rewards.guide.student')}</UserCard.Name>
                <span className={styles.strip} aria-hidden="true">
                  <span className={styles.mark}>
                    <span className={cn('i-ph:book-open', styles.recent)} />3
                  </span>
                  <span className={styles.mark}>
                    <span className={cn('i-ph:wrench', styles.older)} />1
                  </span>
                  <span className={styles.mark}>
                    <span className={cn('i-ph:lightning', styles.earlier)} />1
                  </span>
                </span>
              </UserCard.Content>
              <UserCard.Meta>
                <UserCard.Balance value={21.4} />
              </UserCard.Meta>
            </UserCard.Root>
          </section>
          <section className={styles.section}>
            <h3 className={styles.heading}>{t('group.rewards.guide.breakdown')}</h3>
            <dl className={styles.list}>
              <div className={styles.entry}>
                <dt className={styles.term}>
                  <span aria-hidden="true" className={cn(styles.mark, styles.recent)}>
                    <span className="i-ph:book-open" />3
                  </span>
                  {t('reason.theory')}
                </dt>
                <dd>{t('group.rewards.guide.theory-example')}</dd>
              </div>
              <div className={styles.entry}>
                <dt className={styles.term}>
                  <span aria-hidden="true" className={cn(styles.mark, styles.older)}>
                    <span className="i-ph:wrench" />1
                  </span>
                  {t('reason.practice_completed')}
                </dt>
                <dd>{t('group.rewards.guide.practice-example')}</dd>
              </div>
              <div className={styles.entry}>
                <dt className={styles.term}>
                  <span aria-hidden="true" className={cn(styles.mark, styles.earlier)}>
                    <span className="i-ph:lightning" />1
                  </span>
                  {t('reason.additional_task_completed')}
                </dt>
                <dd>{t('group.rewards.guide.task-example')}</dd>
              </div>
            </dl>
          </section>
          <section className={styles.section}>
            <h3 className={styles.heading}>{t('group.rewards.guide.colors')}</h3>
            <dl className={styles.timeline}>
              <div>
                <dt className={styles.recent}>{t('group.rewards.guide.red')}</dt>
                <dd>{t('group.rewards.guide.red-time')}</dd>
              </div>
              <div>
                <dt className={styles.warm}>{t('group.rewards.guide.orange')}</dt>
                <dd>{t('group.rewards.guide.orange-time')}</dd>
              </div>
              <div>
                <dt className={styles.earlier}>{t('group.rewards.guide.green')}</dt>
                <dd>{t('group.rewards.guide.green-time')}</dd>
              </div>
              <div>
                <dt className={styles.older}>{t('group.rewards.guide.brand')}</dt>
                <dd>{t('group.rewards.guide.brand-time')}</dd>
              </div>
            </dl>
          </section>
          <p className={styles.note}>{t('group.rewards.guide.counts')}</p>
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button />}>{t('group.rewards.guide.close')}</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
