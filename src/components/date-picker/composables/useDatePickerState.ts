import { reactive, readonly, computed } from 'vue'
import type { Ref } from 'vue'
import { parseDate, isValidDateString, formatDate } from '../utils/dateUtils'

export interface DatePickerState {
  /** Открыт ли календарь */
  isOpen: boolean
  /** Выбранная дата */
  selectedDate: Date | null
  /** Отображаемый месяц (0-11) */
  viewMonth: number
  /** Отображаемый год */
  viewYear: number
}

export function useDatePickerState(modelValue: Ref<string>) {
  const initialDate = computed(() => {
    if (modelValue.value && isValidDateString(modelValue.value)) {
      return parseDate(modelValue.value)
    }
    return new Date()
  })

  const state = reactive<DatePickerState>({
    isOpen: false,
    selectedDate: modelValue.value && isValidDateString(modelValue.value)
      ? parseDate(modelValue.value)
      : null,
    viewMonth: initialDate.value.getMonth(),
    viewYear: initialDate.value.getFullYear()
  })

  // Форматированное значение для инпута (ДД.ММ.ГГГГ)
  const inputValue = computed(() => {
    if (state.selectedDate) {
      const day = String(state.selectedDate.getDate()).padStart(2, '0')
      const month = String(state.selectedDate.getMonth() + 1).padStart(2, '0')
      const year = state.selectedDate.getFullYear()
      return `${day}.${month}.${year}`
    }
    return ''
  })

  // Форматированное значение для modelValue (YYYY-MM-DD)
  const formattedDate = computed(() => {
    return state.selectedDate ? formatDate(state.selectedDate) : ''
  })

  function openCalendar() {
    state.isOpen = true
  }

  function closeCalendar() {
    state.isOpen = false
  }

  function toggleCalendar() {
    if (state.isOpen) {
      closeCalendar()
    } else {
      openCalendar()
    }
  }

  function setViewDate(year: number, month: number) {
    state.viewYear = year
    state.viewMonth = month
  }

  function selectDate(date: Date) {
    state.selectedDate = new Date(date)
    state.selectedDate.setHours(0, 0, 0, 0)
  }

  function updateFromModelValue(newValue: string) {
    if (newValue && isValidDateString(newValue)) {
      const date = parseDate(newValue)
      state.selectedDate = date
      state.viewMonth = date.getMonth()
      state.viewYear = date.getFullYear()
    } else {
      state.selectedDate = null
      // Сбросить на текущую дату при очистке
      const today = new Date()
      state.viewMonth = today.getMonth()
      state.viewYear = today.getFullYear()
    }
  }

  return {
    state: readonly(state),
    inputValue,
    formattedDate,
    openCalendar,
    closeCalendar,
    toggleCalendar,
    setViewDate,
    selectDate,
    updateFromModelValue
  }
}

