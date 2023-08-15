import type { Meta, StoryObj } from '@storybook/react';

import * as Icons from '../Icons/Icons';
import Button from './Button';
import { ButtonSize, ButtonType } from './ButtonConstants';

const IconOptions = { Default: undefined, ...Icons };

const meta = {
  title: 'Example/Button',
  component: Button,
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

export const _Button: Story = {
  args: {
    label: 'Default',
    type: ButtonType.DEFAULT,
    size: ButtonSize.MEDIUM,
  },
};
