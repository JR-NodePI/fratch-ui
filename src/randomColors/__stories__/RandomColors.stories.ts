import type { Meta, StoryObj } from '@storybook/react';

import StoryRenderer from './StoryRenderer';

const meta = {
  title: 'Colors/RandomColors',
  component: StoryRenderer,
  argTypes: {},
} satisfies Meta<typeof StoryRenderer>;

export default meta;

type Story = StoryObj<typeof StoryRenderer>;

export const RandomColors: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
