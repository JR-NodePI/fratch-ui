import type { Meta, StoryObj } from '@storybook/react';

import { IconCheck, IconClose } from '../../Icons/Icons';
import Switcher from './Switcher';

const meta = {
  title: 'Example/Form/Switcher',
  component: Switcher,
  argTypes: {},
} satisfies Meta<typeof Switcher>;

export default meta;
type Story = StoryObj<typeof Switcher>;

export const Default: Story = {
  args: {
    title: 'Switch to the left or right',
    labelLeft: 'Label left',
    labelRight: 'Label right',
    IconOff: IconClose,
    IconOn: IconCheck,
  },
};
