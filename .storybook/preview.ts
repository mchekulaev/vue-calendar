import type { Preview } from '@storybook/vue3'
import '../src/components/date-picker/design-tokens.css'
import '../src/style.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview

