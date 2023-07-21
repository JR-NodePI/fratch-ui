import type { Meta, StoryObj } from '@storybook/react';
import IconList from './IconList';
import { IconType } from '../components/IconProps';

const meta = {
  title: 'Example/Icon list',
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
