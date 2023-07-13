import Header from './Header';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: 'This is the title  ',
  },
};
