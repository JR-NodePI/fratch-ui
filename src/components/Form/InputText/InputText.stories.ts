import type { Meta, StoryObj } from '@storybook/react';

import InputText from './InputText';

const meta = {
  title: 'Components/Form/InputText',
  component: InputText,
  argTypes: {
    onChange: { table: { disable: true } },
    onClean: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    onClick: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    onKeyDownCapture: { table: { disable: true } },
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
