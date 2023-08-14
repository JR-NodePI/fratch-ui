import type { Preview } from '@storybook/react';

import '../src/styles/styles.css';
import React from 'react';
import ColorSchemeProvider from '../src/components/ColorScheme/ColorSchemeProvider';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    Story => (
      <ColorSchemeProvider>
        <Story />
      </ColorSchemeProvider>
    ),
  ],
};

export default preview;
