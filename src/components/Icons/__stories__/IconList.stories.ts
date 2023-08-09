import type { Meta, StoryObj } from '@storybook/react';

import { IconType } from '../components/IconConstants';
import IconList from './IconList';

const meta = {
  title: 'Example/Icons',
  component: IconList,
  argTypes: {},
} satisfies Meta<typeof IconList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _Icons: Story = {
  args: {
    type: IconType.PRIMARY,
  },
};
