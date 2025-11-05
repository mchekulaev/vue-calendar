<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker } from './components/date-picker'

const selectedDate = ref('')
</script>

<template>
  <div class="app">
    <header>
      <h1>Vue Calendar</h1>
    </header>
    
    <main>
      <div class="demo">
        <label>Выберите дату:</label>
        <DatePicker v-model="selectedDate" />
        <p class="selected-value">
          Выбранная дата: <strong>{{ selectedDate || 'не выбрана' }}</strong>
        </p>
      </div>

      <div class="info">
        <h2>Примеры и документация</h2>
        <p>
          Запустите Storybook для просмотра всех возможностей компонента:
        </p>
        <code class="command">npm run storybook</code>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  padding: 32px;
  max-width: 600px;
  margin: 0 auto;
}

header {
  text-align: center;
  margin-bottom: 48px;
}

header h1 {
  font-size: 40px;
  margin-bottom: 8px;
  color: #4f46e5;
}

header p {
  color: #666;
  font-size: 16px;
}

main {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.demo {
  background: rgba(255, 255, 255, 0.5);
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.demo label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.selected-value {
  color: #666;
  font-size: 14px;
  margin-top: 16px;
}

.info {
  background: #f8fafc;
  padding: 32px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  text-align: center;
}

.info h2 {
  margin: 0 0 16px 0;
  color: #333;
  font-size: 20px;
}

.info p {
  color: #666;
  margin: 8px 0;
}

.command {
  display: block;
  background: #9b97e3;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-family: monospace;
  margin: 16px 0;
  font-size: 16px;
}
</style>
