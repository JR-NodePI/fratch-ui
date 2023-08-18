import type { Meta, StoryObj } from '@storybook/react';

import Spinner from '../Spinner';
import StoryRenderer from './StoryRenderer';

const meta = {
  title: 'Components/Spinner',
  component: StoryRenderer,
  argTypes: {},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _Spinner: Story = {
  args: {
    cover: false,
    type: 'primary',
    inverted: false,
    label: 'Loading...',
  },
};
