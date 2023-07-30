import type { Meta, StoryObj } from '@storybook/react';

import { IconCheck, IconInfo } from '../../Icons/Icons';
import IconSuccess from '../../Icons/Icons/IconSuccess';
import TabsMenu from '../TabsMenu';

const meta = {
  title: 'Example/Tabs Menu',
  component: TabsMenu,
  argTypes: {
    onTabClick: { action: 'tab clicked' },
    onTabAdd: { action: 'tab added' },
    onTabRemove: { action: 'tab removed' },
    onTabEdit: { action: 'tab edited' },
    onTabsChange: { action: 'tabs changed' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TabsMenu>;

export default meta;

type Story = StoryObj<typeof TabsMenu>;

export const Default: Story = {
  args: {
    tabs: [
      {
        Icon: IconCheck,
        label: 'Tab 1',
        active: true,
        color: '#08d799',
      },
      {
        Icon: IconInfo,
        label: 'Tab 2 with more text',
        color: '#0857d7',
      },
      {
        Icon: IconSuccess,
        label: 'Tab 3',
        color: '#7d08d7',
      },
      {
        label: 'Tab 4 with much more text',
        color: '#d70873',
      },
    ],
  },
};

export const Editable: Story = {
  args: {
    editable: true,
    tabs: [
      {
        label: 'Tab 1',
        active: true,
      },
      {
        label: 'Tab 2 with more text',
      },
      {
        label: 'Tab 3',
      },
    ],
  },
};

export const AddFromTemplate: Story = {
  args: {
    addable: true,
    newTabTemplate: {
      label: 'Template tab',
      Icon: IconInfo,
      color: 'rgba(215, 8, 115, 0.5)',
    },
    tabs: [
      {
        label: 'Label tab text 1',
        active: true,
      },
    ],
  },
};

export const Removable: Story = {
  args: {
    removable: true,
    tabs: [
      {
        label: 'Tab 1',
        active: true,
      },
      {
        label: 'Tab 2',
      },
      {
        label: 'Tab 3',
      },
    ],
  },
};

export const EditableAddableRemovable: Story = {
  args: {
    removable: true,
    editable: true,
    addable: true,
    tabs: [
      {
        label: 'Tab 1',
        active: true,
      },
      {
        label: 'Tab 2',
      },
      {
        label: 'Tab 3',
      },
    ],
  },
};
