import type { Meta, StoryObj } from '@storybook/react';

import { IconCheck, IconInfo } from '../../Icons/Icons';
import IconSuccess from '../../Icons/Icons/IconSuccess';
import TabsMenu from '../TabsMenu';

const meta = {
  title: 'Example/Tabs Menu',
  component: TabsMenu,
  argTypes: {
    onTabClick: { action: 'tab clicked', table: { disable: true } },
    onTabAdd: { action: 'tab added', table: { disable: true } },
    onTabRemove: { action: 'tab removed', table: { disable: true } },
    onTabEdit: { action: 'tab edited', table: { disable: true } },
    onTabsChange: { action: 'tabs changed', table: { disable: true } },
    newTabTemplate: { table: { disable: true } },
    tabs: { table: { disable: true } },
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
        color: 'Red',
      },
      {
        Icon: IconInfo,
        label: 'Tab 2 with more text',
        color: 'Blue',
      },
      {
        Icon: IconSuccess,
        label: 'Tab 3',
        color: 'Green',
      },
      {
        label: 'Tab 4 with much more text',
        color: 'Magenta',
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
      color: 'Green',
    },
    tabs: [
      {
        label: 'Label tab text 1',
        Icon: IconSuccess,
        active: true,
        color: 'Blue',
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
