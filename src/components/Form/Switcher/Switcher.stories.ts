import type { Meta, StoryObj } from '@storybook/react';

import { IconCheck, IconClose } from '../../Icons/Icons';
import * as Icons from '../../Icons/Icons';
import Switcher from './Switcher';

const IconOptions = { Default: undefined, ...Icons };

const meta = {
  title: 'Example/Form/Switcher',
  component: Switcher,
  argTypes: {
    IconOff: {
      options: Object.keys(IconOptions),
      mapping: IconOptions,
      control: { type: 'select' },
    },
    IconOn: {
      options: Object.keys(IconOptions),
      mapping: IconOptions,
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Switcher>;

export default meta;
type Story = StoryObj<typeof Switcher>;

export const _Switcher: Story = {
  args: {
    title: 'Switch to the left or right',
    labelLeft: 'Label left',
    labelRight: 'Label right',
    IconOff: IconClose,
    IconOn: IconCheck,
  },
};
