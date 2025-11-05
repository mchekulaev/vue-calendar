<script setup lang="ts">
interface Props {
  currentMonth: string
}

defineProps<Props>()

defineEmits<{
  prevYear: []
  prevMonth: []
  nextMonth: []
  nextYear: []
}>()
</script>

<template>
  <div class="date-picker-header">
    <button
      type="button"
      class="date-picker-header__btn"
      title="Предыдущий год"
      @click="$emit('prevYear')"
    >
      ‹‹
    </button>
    <button
      type="button"
      class="date-picker-header__btn"
      title="Предыдущий месяц"
      @click="$emit('prevMonth')"
    >
      ‹
    </button>
    <div class="date-picker-header__title">
      {{ currentMonth }}
    </div>
    <button
      type="button"
      class="date-picker-header__btn"
      title="Следующий месяц"
      @click="$emit('nextMonth')"
    >
      ›
    </button>
    <button
      type="button"
      class="date-picker-header__btn"
      title="Следующий год"
      @click="$emit('nextYear')"
    >
      ››
    </button>
  </div>
</template>

<style scoped>
.date-picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 8px;
}

.date-picker-header__btn {
  background: none;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 18px;
  color: var(--dp-color-text-muted);
  transition: color 0.15s ease, background-color 0.15s ease;
  border-radius: 4px;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.date-picker-header__btn:hover {
  color: var(--dp-color-primary);
  background-color: var(--dp-color-bg-hover);
}


.date-picker-header__title {
  flex: 1;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  color: var(--dp-color-text);
}
</style>
