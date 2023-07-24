import coverage from '../../../coverage.json';

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
  parameters: {
    vitest: {
      testFile: 'Button.test.tsx',
      testResults: coverage,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default',
    type: ButtonType.DEFAULT,
    size: ButtonSize.MEDIUM,
  },
};
