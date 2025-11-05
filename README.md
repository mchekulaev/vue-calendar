# Vue Calendar

Компонент выбора даты для Vue 3 с TypeScript.

## Установка и запуск

```bash
npm install
npm run dev
```

Storybook:

```bash
npm run storybook
```

## Использование

```vue
<script setup lang="ts">
import { ref } from "vue";
import { DatePicker } from "@/components/date-picker";

const selectedDate = ref("");
</script>

<template>
  <DatePicker v-model="selectedDate" locale="ru-RU" />
</template>
```

## Props

| Prop               | Тип        | Описание                     |
| ------------------ | ---------- | ---------------------------- |
| `modelValue`       | `string`   | Выбранная дата (YYYY-MM-DD)  |
| `locale`           | `string`   | Локаль (ru-RU, en-US, de-DE) |
| `minDate`          | `string`   | Минимальная дата             |
| `maxDate`          | `string`   | Максимальная дата            |
| `disabledDates`    | `string[]` | Отключенные даты             |
| `disabledWeekdays` | `number[]` | Отключенные дни недели (0-6) |
