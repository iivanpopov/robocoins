import { useTranslate } from '@kanjou/react'
import { ChangeEvent } from 'react'

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '#/components/ui'

import styles from './teacher-search.module.css'

export interface TeacherSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function TeacherSearch({ searchQuery, onSearchChange }: TeacherSearchProps) {
  const t = useTranslate()

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value)
  }

  function handleClearSearch() {
    onSearchChange('')
  }

  return (
    <InputGroup className={styles.search}>
      <InputGroupAddon align="inline-start">
        <span className="i-ph:magnifying-glass" />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        placeholder={t('admin.teachers.search.placeholder')}
        value={searchQuery}
        onChange={handleInputChange}
      />
      {!!searchQuery && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={handleClearSearch} title={t('action.clear-search.title')}>
            <span className="i-ph:x" />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
