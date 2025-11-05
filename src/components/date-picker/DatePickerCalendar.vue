<script setup lang="ts">
import { ref } from 'vue'
import DatePickerHeader from './DatePickerHeader.vue'
import DatePickerWeekdays from './DatePickerWeekdays.vue'
import DatePickerDays from './DatePickerDays.vue'
import type { DayInfo } from './types/datePicker'

interface Props {
  currentMonth: string
  weekdays: string[]
  days: DayInfo[]
  selectedDate: Date | null
}

defineProps<Props>()

defineEmits<{
  prevYear: []
  prevMonth: []
  nextMonth: []
  nextYear: []
  selectDate: [date: Date]
}>()

const rootEl = ref<HTMLDivElement | null>(null)

defineExpose({
  rootEl
})
</script>

<template>
  <div ref="rootEl" class="date-picker-calendar">
    <DatePickerHeader
      :current-month="currentMonth"
      @prev-year="$emit('prevYear')"
      @prev-month="$emit('prevMonth')"
      @next-month="$emit('nextMonth')"
      @next-year="$emit('nextYear')"
    />

    <DatePickerWeekdays :weekdays="weekdays" />

    <DatePickerDays
      :days="days"
      :selected-date="selectedDate"
      @select-date="$emit('selectDate', $event)"
    />
  </div>
</template>

<style scoped>
.date-picker-calendar {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 1000;
  background: var(--dp-color-bg);
  border: 1px solid var(--dp-color-border);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  padding: 16px;
  min-width: 280px;
}
</style>
