import { cn } from 'cn'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui'

import styles from './admin-select.module.css'

export interface AdminSelectOption {
  value: string
  label: string
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
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
