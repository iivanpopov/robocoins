import { useTranslate } from '@kanjou/react'

import { parseGroupSchedule } from '../../-utils'

export function GroupSchedule(props: { name: string }) {
  const t = useTranslate()
  const schedule = parseGroupSchedule(props.name)

  return (
    <>
      {t.unsafe(schedule.weekday)}
      <br />
      {schedule.time}
    </>
  )
}
