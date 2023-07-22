import type { Meta, StoryObj } from '@storybook/react';

import * as Icons from '../Icon/Icons';
import Button from './Button';
import { ButtonSize, ButtonType } from './ButtonProps';

const IconOptions = { Default: undefined, ...Icons };

const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    Icon: {
      options: Object.keys(IconOptions),
      mapping: IconOptions,
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: {
    label: 'Default',
    type: ButtonType.DEFAULT,
    size: ButtonSize.MEDIUM,
  },
};
