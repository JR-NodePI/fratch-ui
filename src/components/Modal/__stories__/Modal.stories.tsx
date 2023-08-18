import type { Meta, StoryObj } from '@storybook/react';

import StoryRenderer from './StoryRenderer';

const meta = {
  title: 'Components/Modal',
  component: StoryRenderer,
  argTypes: {
    onClose: { action: 'onClose', table: { disable: true } },
    onOpen: { action: 'onOpen', table: { disable: true } },
  },
} satisfies Meta<typeof StoryRenderer>;

export default meta;

type Story = StoryObj<typeof StoryRenderer>;

export const _Modal: Story = {
  args: {
    type: 'info',
    visible: false,
    title: 'This is the title',
    children: 'This is the content',
  },
};
