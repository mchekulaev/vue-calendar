<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  value: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'ДД.ММ.ГГГГ'
})

defineEmits<{
  click: []
}>()

const rootEl = ref<HTMLDivElement | null>(null)

defineExpose({
  rootEl
})
</script>

<template>
  <div ref="rootEl" class="date-picker-input">
    <input
      type="text"
      class="date-picker-input__field"
      :value="value"
      :placeholder="placeholder"
      readonly
      @click="$emit('click')"
    />
    <span class="date-picker-input__icon">📅</span>
  </div>
</template>

<style scoped>
.date-picker-input {
  position: relative;
  width: 100%;
}

.date-picker-input__field {
  width: 100%;
  padding: 12px 40px 12px 12px;
  border: 1px solid var(--dp-color-border);
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: var(--dp-color-bg);
  color: var(--dp-color-text);
}

.date-picker-input__field:hover {
  border-color: var(--dp-color-border-hover);
}

.date-picker-input__field:focus {
  outline: none;
  border-color: var(--dp-color-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.date-picker-input__icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 18px;
}
</style>
