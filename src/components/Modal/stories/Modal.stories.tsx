import type { Meta, StoryObj } from '@storybook/react';

import StoryRenderer from './StoryRenderer';

const meta = {
  title: 'Example/Modal',
  component: StoryRenderer,
  argTypes: {
    onClose: { action: 'onClose' },
    onOpen: { action: 'onOpen' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StoryRenderer>;

export default meta;

type Story = StoryObj<typeof StoryRenderer>;

export const Docs: Story = {
  args: {
    type: 'info',
    visible: false,
    title: 'This is the title',
    children: 'This is the content',
  },
};
