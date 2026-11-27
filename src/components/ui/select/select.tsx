import { Select as SelectPrimitive } from '@base-ui/react/select'
import type { ReactNode } from 'react'

import { cn } from '#/utils/cn'

import styles from './select.module.css'

function SelectGroup(props: SelectPrimitive.Group.Props) {
  return <SelectPrimitive.Group {...props} className={cn(styles.group, props.className)} />
}

function SelectValue(props: SelectPrimitive.Value.Props) {
  return <SelectPrimitive.Value {...props} className={cn(styles.value, props.className)} />
}

function SelectTrigger(props: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger {...props} className={cn(styles.trigger, props.className)}>
      {props.children}
      <SelectPrimitive.Icon className={styles.icon} render={<span className="i-ph:caret-down" />} />
    </SelectPrimitive.Trigger>
  )
}

interface SelectContentProps extends SelectPrimitive.Popup.Props {
  positioner?: Pick<
    SelectPrimitive.Positioner.Props,
    'side' | 'sideOffset' | 'align' | 'alignOffset'
  >
}

function SelectContent(props: SelectContentProps) {
  const popupProps = { ...props }
  delete popupProps.positioner

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={props.positioner?.side ?? 'bottom'}
        sideOffset={props.positioner?.sideOffset ?? 6}
        align={props.positioner?.align ?? 'center'}
        alignOffset={props.positioner?.alignOffset ?? 0}
        alignItemWithTrigger={false}
        className={styles.positioner}
      >
        <SelectPrimitive.Popup {...popupProps} className={cn(styles.content, props.className)}>
          <SelectPrimitive.List>{props.children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel(props: SelectPrimitive.GroupLabel.Props) {
  return <SelectPrimitive.GroupLabel {...props} className={cn(styles.label, props.className)} />
}

function SelectItem(props: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item {...props} className={cn(styles.item, props.className)}>
      <SelectPrimitive.ItemText className={styles['item-text']}>
        {props.children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        className={styles.indicator}
        render={<span className="i-ph:check" />}
      />
    </SelectPrimitive.Item>
  )
}

interface SelectOptionLabelProps {
  icon: ReactNode
  children: ReactNode
}

function SelectOptionLabel(props: SelectOptionLabelProps) {
  return (
    <span className={styles['option-label']}>
      <span className={styles['option-icon']} aria-hidden="true">
        {props.icon}
      </span>
      <span className={styles['item-text']}>{props.children}</span>
    </span>
  )
}

function SelectSeparator(props: SelectPrimitive.Separator.Props) {
  return <SelectPrimitive.Separator {...props} className={cn(styles.separator, props.className)} />
}

export const Select = {
  Root: SelectPrimitive.Root,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Content: SelectContent,
  Group: SelectGroup,
  Label: SelectLabel,
  Item: SelectItem,
  OptionLabel: SelectOptionLabel,
  Separator: SelectSeparator,
}
