import type { Meta, StoryObj } from '@storybook/react';

import ToasterLoader from './ToasterLoader';

const meta = {
  title: 'Example/ToasterList',
  component: ToasterLoader,
  tags: ['autodocs'],
} satisfies Meta<typeof ToasterLoader>;

export default meta;

type Story = StoryObj<typeof ToasterLoader>;

export const Docs: Story = {
  args: {
    type: 'error',
    title: `Toaster title`,
    message: `Toaster message \n new line  \n \t tab new line`,
    nlToBr: true,
    duration: 3000,
  },
};
