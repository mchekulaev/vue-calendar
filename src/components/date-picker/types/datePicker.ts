import type { LocaleCode } from './locale'

export interface DateConstraints {
  minDate?: string
  maxDate?: string
  disabledDates?: string[]
  disabledWeekdays?: number[]
}

export interface DatePickerProps {
  modelValue?: string  // YYYY-MM-DD
  locale?: LocaleCode
  minDate?: string
  maxDate?: string
  disabledDates?: string[]
  disabledWeekdays?: number[]
}

export interface DatePickerEmits {
  'update:modelValue': [value: string]
  change: [value: string]
}

export interface DayInfo {
  date: Date
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  isDisabled?: boolean
}
