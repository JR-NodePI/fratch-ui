import Input from './Input';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Form/Imput',
  component: Input,
  tags: ['autodocs'],
  argTypes: { onChange: { action: 'onChange' } },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Docs: Story = {
  args: {
    type: 'text',
    value: 'Input value',
  },
};
