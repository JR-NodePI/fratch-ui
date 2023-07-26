import type { Meta, StoryObj } from '@storybook/react';

import IconCheck from '../Icon/IconCheck';
import TabsMenu from './TabsMenu';
import IconInfo from '../Icon/IconInfo';
import IconSuccess from '../Icon/IconSuccess';

const meta = {
  title: 'Example/Tabs Menu',
  component: TabsMenu,
  argTypes: {
    onTabClick: { action: 'tab clicked' },
    onTabAdd: { action: 'tab added' },
    onTabRemove: { action: 'tab removed' },
    onTabEdit: { action: 'tab edited' },
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
        label: 'Tab 2',
      },
      {
        Icon: IconSuccess,
        label: 'Tab 3',
      },
      {
        label: 'Tab 4',
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
