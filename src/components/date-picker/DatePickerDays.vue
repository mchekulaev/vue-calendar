<script setup lang="ts">
import type { DayInfo } from './types/datePicker'
import { isSameDay } from './utils/dateUtils'

interface Props {
  days: DayInfo[]
  selectedDate: Date | null
}

defineProps<Props>()

const emit = defineEmits<{
  selectDate: [date: Date]
}>()
</script>

<template>
  <div class="date-picker-days">
    <button
      v-for="(dayInfo, index) in days"
      :key="`${dayInfo.date.getTime()}-${index}`"
      type="button"
      class="date-picker-days__day"
      :class="{
        'date-picker-days__day--other-month': !dayInfo.isCurrentMonth,
        'date-picker-days__day--today': dayInfo.isToday,
        'date-picker-days__day--selected': isSameDay(dayInfo.date, selectedDate),
        'date-picker-days__day--disabled': dayInfo.isDisabled
      }"
      :disabled="dayInfo.isDisabled"
      @click="!dayInfo.isDisabled && emit('selectDate', dayInfo.date)"
    >
      {{ dayInfo.day }}
    </button>
  </div>
</template>

<style scoped>
.date-picker-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.date-picker-days__day {
  aspect-ratio: 1;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  font-family: inherit;
  border-radius: 8px;
  transition: all 0.2s ease;
  color: var(--dp-color-text);
  font-weight: 500;
  position: relative;
}

.date-picker-days__day:hover:not(.date-picker-days__day--disabled) {
  background-color: var(--dp-color-bg-hover);
  color: var(--dp-color-primary);
}

.date-picker-days__day--other-month {
  color: var(--dp-color-text-disabled);
}

.date-picker-days__day--today {
  font-weight: 700;
  color: var(--dp-color-primary);
}

.date-picker-days__day--selected {
  background: var(--dp-color-primary);
  color: white;
  font-weight: 700;
}

.date-picker-days__day--selected:hover {
  background: var(--dp-color-primary-hover);
  color: white;
}

.date-picker-days__day--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
