import type { Meta, StoryObj } from '@storybook/react';

import InputText from './InputText';

const meta = {
  title: 'Example/Form/InputText',
  component: InputText,
  // tags: ['autodocs'],
  argTypes: {
    onChange: { control: false },
    onBlur: { control: false },
    onClick: { control: false },
    onFocus: { control: false },
    onKeyDownCapture: { control: false },
  },
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof InputText>;

export const _InputText: Story = {
  args: {
    cleanable: true,
    type: 'text',
    value: 'Input value',
  },
};
