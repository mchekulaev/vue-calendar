import type { Ref } from 'vue'
import { computed } from 'vue'
import type { DateConstraints } from '../types/datePicker'
import { formatDate } from '../utils/dateUtils'

export function useDateValidation(constraints: Ref<DateConstraints>) {
  const isDateDisabled = computed(() => {
    return (date: Date): boolean => {
      const dateStr = formatDate(date)
      const dateConstraints = constraints.value

      // Проверка минимальной даты
      if (dateConstraints.minDate && dateStr < dateConstraints.minDate) {
        return true
      }

      // Проверка максимальной даты
      if (dateConstraints.maxDate && dateStr > dateConstraints.maxDate) {
        return true
      }

      // Проверка отключенных дат
      if (dateConstraints.disabledDates?.includes(dateStr)) {
        return true
      }

      // Проверка отключенных дней недели
      return !!dateConstraints.disabledWeekdays?.includes(date.getDay())
    }
  })

  const isDateSelectable = computed(() => {
    return (date: Date): boolean => {
      return !isDateDisabled.value(date)
    }
  })

  return {
    isDateDisabled,
    isDateSelectable
  }
}

