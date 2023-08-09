import type { Meta, StoryObj } from '@storybook/react';

import logo from '../../assets/logo.png';
import Header from './Header';

const meta = {
  title: 'Example/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const _Header: Story = {
  args: {
    title: 'This is the title  ',
    iconSrc: logo,
  },
};
