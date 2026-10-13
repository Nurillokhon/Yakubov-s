import '@material/web/focus/md-focus-ring.js'
import '@material/web/ripple/ripple.js'
import { Icon } from '../icon'
import type { IconName } from '../icon'

export interface IconSwitchOption<T extends string> {
  value: T
  icon: IconName
  /** Not shown; read by screen readers and used as the hover tooltip. */
  label: string
}

interface IconSwitchProps<T extends string> {
  label: string
  options: IconSwitchOption<T>[]
  value: T
  onChange: (value: T) => void
}

// Icon-only switch: a pill with one icon per option and a thumb that slides to the selected one.
export function IconSwitch<T extends string>({ label, options, value, onChange }: IconSwitchProps<T>) {
  const selectedIndex = options.findIndex((option) => option.value === value)

  return (
    <div
      role="group"
      aria-label={label}
      className="relative inline-flex rounded-full border border-outline-variant bg-surface-container-lowest p-1 [--md-icon-size:1.25rem]"
    >
      <span
        className="absolute inset-y-1 start-1 w-11 rounded-full bg-secondary-container transition-transform duration-200 motion-reduce:transition-none"
        style={{ transform: `translateX(${selectedIndex * 100}%)` }}
      />

      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          title={option.label}
          aria-label={option.label}
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
          className="relative flex h-8 w-11 cursor-pointer items-center justify-center rounded-full text-on-surface-variant outline-none aria-pressed:text-on-secondary-container"
        >
          <md-ripple />
          <md-focus-ring />
          <Icon name={option.icon} />
        </button>
      ))}
    </div>
  )
}
