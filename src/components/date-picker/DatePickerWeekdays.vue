<script setup lang="ts">
interface Props {
  weekdays: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="date-picker-weekdays">
    <div
      v-for="(day, index) in weekdays"
      :key="index"
      class="date-picker-weekdays__day"
    >
      {{ day }}
    </div>
  </div>
</template>

<style scoped>
.date-picker-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.date-picker-weekdays__day {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--dp-color-text-muted);
  padding: 8px 0;
  text-transform: uppercase;
}
</style>
