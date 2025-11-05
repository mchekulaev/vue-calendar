<script setup lang="ts">
import { ref, computed, watch, toRef, onMounted, onBeforeUnmount } from 'vue'
import type { LocaleConfig, LocaleCode } from './types/locale'
import { locales, defaultLocale } from './types/locale'
import type { DatePickerProps, DatePickerEmits, DateConstraints } from './types/datePicker'
import { getCalendarDays } from './utils/dateUtils'
import { useDatePickerState } from './composables/useDatePickerState'
import { useCalendarNavigation } from './composables/useCalendarNavigation'
import { useDateValidation } from './composables/useDateValidation'
import DatePickerInput from './DatePickerInput.vue'
import DatePickerCalendar from './DatePickerCalendar.vue'

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: '',
  locale: 'ru-RU'
})

const emit = defineEmits<DatePickerEmits>()

// Refs
const inputRef = ref<{ rootEl: HTMLInputElement | null } | null>(null)
const calendarRef = ref<{ rootEl: HTMLDivElement | null } | null>(null)

// Реактивные значения для composables
const modelValueRef = toRef(props, 'modelValue')

// State management
const {
  state,
  inputValue,
  formattedDate,
  closeCalendar,
  toggleCalendar,
  setViewDate,
  selectDate: selectDateAction,
  updateFromModelValue
} = useDatePickerState(modelValueRef)

// Локализация
const currentLocale = computed<LocaleConfig>(() => {
  return locales[props.locale as LocaleCode] || defaultLocale
})

// Валидация дат
const constraints = computed<DateConstraints>(() => ({
  minDate: props.minDate,
  maxDate: props.maxDate,
  disabledDates: props.disabledDates,
  disabledWeekdays: props.disabledWeekdays
}))

const { isDateDisabled } = useDateValidation(constraints)

// Календарные дни с учетом валидации
const calendarDays = computed(() => {
  const days = getCalendarDays(
    state.viewYear,
    state.viewMonth,
    currentLocale.value.firstDayOfWeek
  )
  
  // Добавляем информацию о disabled состоянии
  return days.map(day => ({
    ...day,
    isDisabled: isDateDisabled.value(day.date)
  }))
})

// Заголовок календаря
const calendarHeader = computed(() => {
  return `${currentLocale.value.monthsShort[state.viewMonth]} ${state.viewYear}`
})

// Дни недели
const weekdaysShort = computed(() => {
  const days = [...currentLocale.value.weekdaysShort]
  const firstDay = currentLocale.value.firstDayOfWeek
  return [...days.slice(firstDay), ...days.slice(0, firstDay)]
})

// Navigation
const { prevMonth, nextMonth, prevYear, nextYear } = useCalendarNavigation(
  state,
  setViewDate
)

// Click outside handler
function handleDocumentClick(event: MouseEvent) {
  if (!state.isOpen) return
  
  const target = event.target as Node
  const clickedInput = inputRef.value?.rootEl?.contains(target)
  const clickedCalendar = calendarRef.value?.rootEl?.contains(target)
  
  if (!clickedInput && !clickedCalendar) {
    closeCalendar()
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

// Обработчик выбора даты
function handleSelectDate(date: Date) {
  // Проверяем валидность
  if (isDateDisabled.value(date)) {
    return
  }
  
  selectDateAction(date)
  const formatted = formattedDate.value
  emit('update:modelValue', formatted)
  emit('change', formatted)
  closeCalendar()
}

// Следим за изменением modelValue извне
watch(() => props.modelValue, (newValue) => {
  updateFromModelValue(newValue)
})
</script>

<template>
  <div class="date-picker">
    <!-- Input field -->
    <DatePickerInput
      ref="inputRef"
      :value="inputValue"
      @click="toggleCalendar"
    />

    <!-- Calendar -->
    <DatePickerCalendar
      v-if="state.isOpen"
      ref="calendarRef"
      :current-month="calendarHeader"
      :weekdays="weekdaysShort"
      :days="calendarDays"
      :selected-date="state.selectedDate"
      @prev-year="prevYear"
      @prev-month="prevMonth"
      @next-month="nextMonth"
      @next-year="nextYear"
      @select-date="handleSelectDate"
    />
  </div>
</template>

<style scoped>
.date-picker {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 280px;
}
</style>
