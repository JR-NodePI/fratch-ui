import InputCheck from './InputCheck';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Form/InputCheck',
  component: InputCheck,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof InputCheck>;

export default meta;
type Story = StoryObj<typeof InputCheck>;

export const Docs: Story = {
  args: {
    label: 'Label input checkbox',
    checked: true,
  },
};
