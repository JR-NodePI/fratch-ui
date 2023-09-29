import type { Meta, StoryObj } from '@storybook/react';

import DragAndDropSorter from './DragAndDropSorter';

const meta = {
  title: 'Components/DragAndDropSorter',
  component: DragAndDropSorter,
  argTypes: {
    onChange: { action: 'changed', table: { disable: true } },
  },
} satisfies Meta<typeof DragAndDropSorter>;

export default meta;
type Story = StoryObj<typeof meta>;

const itemStyles = {
  border: '1px solid var(--ft-color-grey-4)',
  margin: '2px 0',
  padding: '16px 24px',
  borderRadius: '16px',
  backgroundColor: 'var(--ft-color-grey-3)',
};

export const _DragAndDropSorter: Story = {
  args: {
    items: [
      {
        children: <div style={itemStyles}> Item 1</div>,
        dataItem: { data: 'item-1' },
      },
      {
        children: <div style={itemStyles}> Item 2</div>,
        dataItem: { data: 'item-2' },
      },
      {
        children: <div style={itemStyles}> Item 3</div>,
        dataItem: { data: 'item-3' },
      },
      {
        children: <div style={itemStyles}> Item 4</div>,
        dataItem: { data: 'item-4' },
      },
      {
        children: <div style={itemStyles}> Item 5</div>,
        dataItem: { data: 'item-5' },
      },
    ],
  },
};
