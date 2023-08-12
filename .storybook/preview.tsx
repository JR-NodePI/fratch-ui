import type { Preview } from '@storybook/react';

import '../src/styles/styles.css';
import React from 'react';
import ColorSchemeProvider from '../src/components/ColorScheme/ColorSchemeProvider';
import ColorSchemeSwitcher from '../src/components/ColorScheme/ColorSchemeSwitcher';

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
        <div
          style={{
            position: 'fixed',
            top: '2px',
            right: '2px',
            zIndex: 999999,
          }}
        >
          <ColorSchemeSwitcher />
        </div>
        <div style={{ padding: '32px 0 0 0' }}>
          <Story />
        </div>
      </ColorSchemeProvider>
    ),
  ],
};

export default preview;
