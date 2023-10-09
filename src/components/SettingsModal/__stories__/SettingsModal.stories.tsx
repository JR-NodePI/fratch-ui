import type { Meta, StoryObj } from '@storybook/react';

import { Button, ColorSchemeSwitcher } from '../..';
import { InputCheck } from '../../Form';
import SettingsModal from '../SettingsModal';
import StoryRenderer from './StoryRenderer';

const meta = {
  title: 'Components/SettingsModal',
  component: StoryRenderer,
  argTypes: {
    items: { table: { disable: true } },
  },
} satisfies Meta<typeof SettingsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _SettingsModal: Story = {
  args: {
    position: 'left',
    items: [
      <ColorSchemeSwitcher />,
      <InputCheck label="Setting menu item 1" position="right" />,
      <InputCheck label="Setting menu item 2" position="left" />,
      <a href="javascript:void(0)">Setting menu item 3</a>,
      <a href="javascript:void(0)">Setting menu item 4</a>,
      <Button size="small">Setting menu item 5</Button>,
      <Button size="small" type="primary">
        Setting menu item 6
      </Button>,
      <Button size="small" type="secondary">
        Setting menu item 7
      </Button>,
      <Button size="small" type="tertiary">
        Setting menu item 8
      </Button>,
    ],
  },
};
