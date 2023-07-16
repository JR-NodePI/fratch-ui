import InputText from './InputText';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Form/InputText',
  component: InputText,
  tags: ['autodocs'],
  argTypes: { onChange: { action: 'onChange' } },
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof InputText>;

export const Docs: Story = {
  args: {
    type: 'text',
    value: 'Input value',
  },
};
