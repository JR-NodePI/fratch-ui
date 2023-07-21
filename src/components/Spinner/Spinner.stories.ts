import Spinner from './Spinner';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: {},
};
