import type { Meta, StoryObj } from '@storybook/react';

import { Button, InputCheck } from '../..';
import SettingsMenu from '../SettingsMenu';
import StoryRenderer from './StoryRenderer';

const meta = {
  title: 'Example/SettingsMenu',
  component: StoryRenderer,
  tags: ['autodocs'],
  argTypes: {
    items: { control: false },
  },
} satisfies Meta<typeof SettingsMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: {
    position: 'left',
    items: [
      <a href="javascript:void(0)">Setting menu item 1</a>,
      <a href="javascript:void(0)">Setting menu item 2</a>,
      <Button>Setting menu item 3</Button>,
      <Button size="small" type="primary">
        Setting menu item 4
      </Button>,
      <Button size="small" type="secondary">
        Setting menu item 5
      </Button>,
      <Button size="small" type="tertiary">
        Setting menu item 6
      </Button>,
      <InputCheck label="Setting menu item 7" position="right" />,
    ],
  },
};