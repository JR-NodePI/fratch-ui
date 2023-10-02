import type { Meta, StoryObj } from '@storybook/react';

import * as Icons from '../Icons/Icons';
import Spinner from '../Spinner/Spinner';
import Button from './Button';
import { ButtonSize, ButtonType } from './ButtonConstants';

const IconOptions = { Default: undefined, Spinner, ...Icons };

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    Icon: {
      options: Object.keys(IconOptions),
      mapping: IconOptions,
      control: { type: 'select' },
    },
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
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
