import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const _Header: Story = {
  args: {
    title: 'This is the title  ',
  },
};
