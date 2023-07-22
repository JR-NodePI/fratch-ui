import { createPortal } from 'react-dom';

import type { Meta, StoryObj } from '@storybook/react';

import { Button, InputCheck } from '..';
import SettingsMenu from './SettingsMenu';
import { SettingsMenuPosition } from './SettingsMenuProps';

const inlineStyles: React.CSSProperties = {
  position: 'fixed',
  zIndex: 999999,
  top: 0,
  width: '100%',
  height: '64px',
  backgroundColor: '#e6e6e6',
};

function StoryRenderer(args: StoryObj['args']) {
  return createPortal(
    <div style={inlineStyles}>
      <SettingsMenu {...args} />
    </div>,
    document.body
  );
}

const meta = {
  title: 'Example/SettingsMenu',
  component: StoryRenderer,
  tags: ['autodocs'],
  argTypes: {
    position: {
      options: Object.values(SettingsMenuPosition),
      control: { type: 'radio' },
    },
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
