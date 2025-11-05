import type { DatePickerState } from './useDatePickerState'
import { addMonths, addYears } from '../utils/dateUtils'

export function useCalendarNavigation(
  state: DatePickerState,
  setViewDate: (year: number, month: number) => void
) {
  function prevMonth() {
    const newDate = addMonths(new Date(state.viewYear, state.viewMonth, 1), -1)
    setViewDate(newDate.getFullYear(), newDate.getMonth())
  }

  function nextMonth() {
    const newDate = addMonths(new Date(state.viewYear, state.viewMonth, 1), 1)
    setViewDate(newDate.getFullYear(), newDate.getMonth())
  }

  function prevYear() {
    const newDate = addYears(new Date(state.viewYear, state.viewMonth, 1), -1)
    setViewDate(newDate.getFullYear(), newDate.getMonth())
  }

  function nextYear() {
    const newDate = addYears(new Date(state.viewYear, state.viewMonth, 1), 1)
    setViewDate(newDate.getFullYear(), newDate.getMonth())
  }

  return {
    prevMonth,
    nextMonth,
    prevYear,
    nextYear
  }
}

