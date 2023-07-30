import type { Meta, StoryObj } from '@storybook/react';

import getRandomColor from '../../../helpers/getRandomColor';
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
        color: getRandomColor(),
      },
      {
        Icon: IconInfo,
        label: 'Tab 2 with more text',
        color: getRandomColor(),
      },
      {
        Icon: IconSuccess,
        label: 'Tab 3',
        color: getRandomColor(),
      },
      {
        label: 'Tab 4 with much more text',
        color: getRandomColor(),
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
      color: getRandomColor(),
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
