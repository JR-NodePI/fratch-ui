import type { Meta, StoryObj } from '@storybook/react';

import { IconType } from '../components/IconConstants';
import IconList from './IconList';

const meta = {
  title: 'Example/Icons',
  component: IconList,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof IconList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: {
    type: IconType.PRIMARY,
  },
};
