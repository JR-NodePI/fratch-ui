import type { Meta, StoryObj } from '@storybook/react';

import StoryRenderer from './StoryRenderer';

const meta = {
  title: 'Example/Toaster',
  component: StoryRenderer,
  tags: ['autodocs'],
} satisfies Meta<typeof StoryRenderer>;

export default meta;

type Story = StoryObj<typeof StoryRenderer>;

export const Docs: Story = {
  args: {
    type: 'info',
    title: `Toaster title`,
    message: `Toaster message \n new line  \n \t tab new line`,
    nlToBr: true,
    duration: 5000,
  },
};
