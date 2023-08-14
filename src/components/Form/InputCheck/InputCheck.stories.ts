import type { Meta, StoryObj } from '@storybook/react';

import InputCheck from './InputCheck';

const meta = {
  title: 'Example/Form/InputCheck',
  component: InputCheck,
  // tags: ['autodocs'],
  argTypes: {
    checked: {
      control: false,
      description: 'The initial checked state',
    },
  },
} satisfies Meta<typeof InputCheck>;

export default meta;
type Story = StoryObj<typeof InputCheck>;

export const _InputCheck: Story = {
  args: {
    label: 'Label input checkbox',
    checked: true,
  },
};
