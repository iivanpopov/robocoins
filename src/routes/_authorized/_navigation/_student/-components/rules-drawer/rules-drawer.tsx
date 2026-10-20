import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import { useState } from 'react'

import { useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet } from '#/api/hooks/useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet'
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Loader,
} from '#/components/ui'

import styles from './rules-drawer.module.css'

const RULE_SECTIONS = [
  { type: 'reward', title: 'profile.rules.reward', icon: 'i-ph:star-bold' },
  { type: 'punish', title: 'profile.rules.punish', icon: 'i-ph:gavel-bold' },
] as const

interface RulesDrawerProps {
  className?: string
}

export function RulesDrawer(props: RulesDrawerProps) {
  const [open, setOpen] = useState(false)
  const t = useTranslate()
  const reasonsQuery = useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet({
    query: { enabled: open },
  })

  function handleOpenChange(value: boolean) {
    setOpen(value)
  }

  function handleRetry() {
    void reasonsQuery.refetch()
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} showSwipeHandle>
      <DrawerTrigger render={<Button className={props.className} variant="link" />}>
        {t('profile.rules')}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className={styles.header}>
          <DrawerTitle>{t('profile.rules.title')}</DrawerTitle>
          <DrawerDescription>{t('profile.rules.description')}</DrawerDescription>
        </DrawerHeader>
        <div className={styles.body}>
          {reasonsQuery.isPending && (
            <div className={styles.loading} role="status" aria-label={t('profile.rules.loading')}>
              <Loader />
            </div>
          )}
          {reasonsQuery.isError && (
            <div role="alert">
              <p>{t('profile.rules.error')}</p>
              <Button variant="link" onClick={handleRetry}>
                {t('error.retry')}
              </Button>
            </div>
          )}
          {reasonsQuery.isSuccess &&
            RULE_SECTIONS.map((section) => (
              <section className={styles[section.type]} key={section.type}>
                <h2 className={styles.heading}>
                  <span aria-hidden="true" className={cn(styles.icon, section.icon)} />
                  {t(section.title)}
                </h2>
                <ul className={styles.reasons}>
                  {reasonsQuery.data.reasons
                    .filter((item) => item.type === section.type)
                    .map((item) => (
                      <li key={item.reason}>
                        {t.unsafe(`reason.${item.reason}`, { fallback: item.reason })}
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          <DrawerClose render={<Button variant="contain" />} className={styles.close}>
            {t('profile.rules.close')}
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
