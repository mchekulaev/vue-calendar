import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { DatePicker } from './index'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Выбранная дата в формате YYYY-MM-DD',
    },
    locale: {
      control: 'select',
      options: ['ru-RU', 'en-US', 'de-DE'],
      description: 'Локаль для отображения месяцев и дней недели',
    },
    minDate: {
      control: 'text',
      description: 'Минимальная дата (YYYY-MM-DD)',
    },
    maxDate: {
      control: 'text',
      description: 'Максимальная дата (YYYY-MM-DD)',
    },
    disabledDates: {
      control: 'object',
      description: 'Массив отключенных дат',
    },
    disabledWeekdays: {
      control: 'object',
      description: 'Отключенные дни недели (0 = Вс, 6 = Сб)',
    },
  },
  args: {
    locale: 'ru-RU',
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

// Базовый DatePicker с инпутом
export const Default: Story = {
  render: (args: any) => ({
    components: { DatePicker },
    setup() {
      const selectedDate = ref('')
      
      const handleChange = (date: string) => {
        selectedDate.value = date
        console.log('Selected date:', date)
      }

      return { args, selectedDate, handleChange }
    },
    template: `
      <div>
        <DatePicker
          v-bind="args"
          v-model="selectedDate"
          @change="handleChange"
        />
        <p style="margin-top: 16px; color: #666;">
          Выбранная дата: <strong>{{ selectedDate || 'не выбрана' }}</strong>
        </p>
      </div>
    `,
  }),
}

// С предустановленной датой
export const WithPreselectedDate: Story = {
  render: (args: any) => ({
    components: { DatePicker },
    setup() {
      const selectedDate = ref('2025-01-15')
      
      const handleChange = (date: string) => {
        selectedDate.value = date
      }

      return { args, selectedDate, handleChange }
    },
    template: `
      <div>
        <DatePicker
          v-bind="args"
          v-model="selectedDate"
          @change="handleChange"
        />
        <p style="margin-top: 16px; color: #666;">
          Выбранная дата: <strong>{{ selectedDate }}</strong>
        </p>
      </div>
    `,
  }),
}

// Все три локали
export const AllLocales: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const dateRu = ref('2025-05-09')
      const dateEn = ref('2025-07-04')
      const dateDe = ref('2025-10-03')

      return { dateRu, dateEn, dateDe }
    },
    template: `
      <div style="display: flex; gap: 32px; flex-wrap: wrap;">
        <div>
          <h3 style="margin-bottom: 16px;">Русский</h3>
          <DatePicker v-model="dateRu" locale="ru-RU" />
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px;">English</h3>
          <DatePicker v-model="dateEn" locale="en-US" />
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px;">Deutsch</h3>
          <DatePicker v-model="dateDe" locale="de-DE" />
        </div>
      </div>
    `,
  }),
}

