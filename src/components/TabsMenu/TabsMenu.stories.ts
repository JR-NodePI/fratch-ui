import type { Meta, StoryObj } from '@storybook/react';

import IconCheck from '../Icons/IconCheck';
import IconInfo from '../Icons/IconInfo';
import IconSuccess from '../Icons/Icons/IconSuccess';
import TabsMenu from './TabsMenu';

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
      },
      {
        Icon: IconInfo,
        label: 'Tab 2 with more text',
      },
      {
        Icon: IconSuccess,
        label: 'Tab 3',
      },
      {
        label: 'Tab 4 with much more text',
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

export const EditableWithTemplate: Story = {
  args: {
    editable: true,
    newTabTemplate: {
      label: 'Template tab',
      Icon: IconInfo,
    },
    tabs: [
      {
        label: 'Tab 1',
        active: true,
      },
    ],
  },
};
