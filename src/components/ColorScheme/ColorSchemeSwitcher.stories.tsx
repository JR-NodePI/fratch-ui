import type { Meta, StoryObj } from '@storybook/react';

import ColorSchemeSwitcher from './ColorSchemeSwitcher';

const meta = {
  title: 'Example/ColorSchemeSwitcher',
  component: ColorSchemeSwitcher,
  argTypes: {
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof ColorSchemeSwitcher>;

export default meta;

type Story = StoryObj<typeof ColorSchemeSwitcher>;

export const _ColorSchemeSwitcher: Story = {
  args: {},
};
