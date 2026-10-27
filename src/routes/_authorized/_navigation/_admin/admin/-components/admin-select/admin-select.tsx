import { cn } from 'cn'

import type { CourseCategoryKey } from '#/api/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui'
import { CategoryIcon } from '#/routes/-components'

import styles from './admin-select.module.css'

export interface AdminSelectOption {
  value: string
  label: string
  category?: CourseCategoryKey
}

export interface AdminSelectProps {
  value: string
  onValueChange: (value: string) => void
  items: AdminSelectOption[]
  placeholder: string
  ariaLabel: string
  disabled?: boolean
  id?: string
  name?: string
  className?: string
}

export function AdminSelect({
  value,
  onValueChange,
  items,
  placeholder,
  ariaLabel,
  disabled,
  id,
  name,
  className,
}: AdminSelectProps) {
  function handleValueChange(nextValue: string | null) {
    onValueChange(nextValue ?? '')
  }

  const selectedItem = items.find((item) => item.value === value)

  return (
    <Select
      value={value}
      onValueChange={handleValueChange}
      items={items}
      disabled={disabled}
      name={name}
    >
      <SelectTrigger
        id={id}
        aria-label={ariaLabel}
        className={cn(styles.trigger, className)}
        disabled={disabled}
      >
        {selectedItem?.category && (
          <span className={styles['trigger-icon']} aria-hidden="true">
            <CategoryIcon category={selectedItem.category} />
          </span>
        )}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            <span className={styles['item-content']}>
              {item.category && (
                <span className={styles['item-icon']} aria-hidden="true">
                  <CategoryIcon category={item.category} />
                </span>
              )}
              <span className={styles['item-label']}>{item.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
