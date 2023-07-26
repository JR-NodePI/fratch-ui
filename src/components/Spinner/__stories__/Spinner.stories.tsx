import type { Meta, StoryObj } from '@storybook/react';

import Spinner from '../Spinner';
import StoryRenderer from './StoryRenderer';

const meta = {
  title: 'Example/Spinner',
  component: StoryRenderer,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: {
    cover: false,
    type: 'primary',
    inverted: false,
    label: 'Loading...',
  },
};
