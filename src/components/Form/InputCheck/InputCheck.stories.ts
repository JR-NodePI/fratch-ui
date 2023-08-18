import type { Meta, StoryObj } from '@storybook/react';

import InputCheck from './InputCheck';

const meta = {
  title: 'Components/Form/InputCheck',
  component: InputCheck,
  argTypes: {
    onChange: { table: { disable: true } },
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
