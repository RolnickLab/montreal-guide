import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import classNames from 'classnames'
import styles from './Select.module.css'

interface SelectProps {
  items: { label: string; value: string }[]
  placeholder?: string
  value?: string
  onValueChange?: (value?: string) => void
}

export const Select = ({
  items,
  placeholder = 'Pick a value...',
  value,
  onValueChange,
}: SelectProps) => (
  <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
    <SelectPrimitive.Trigger
      className={classNames('text-base', styles.trigger)}
    >
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon className={styles.icon}>
        <ChevronDownIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className={styles.content}>
        <SelectPrimitive.Viewport>
          {items.map((item) => (
            <SelectPrimitive.Item
              key={item.value}
              className={classNames('text-base', styles.item)}
              value={item.value}
            >
              <SelectPrimitive.ItemText>{item.label}</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className={styles.icon}>
                <CheckIcon />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
)
