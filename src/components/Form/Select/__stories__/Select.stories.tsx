import type { Meta, StoryObj } from '@storybook/react';

import Select from '../Select';

type TesOptionValue = { opt: string; prop: string };

const meta = {
  title: 'Example/Form/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    onChange: { control: false },
    onClean: { control: false },
    options: { control: false },
    value: { control: false },
    noResultsElement: { control: false },
  },
} satisfies Meta<typeof Select<TesOptionValue>>;

export default meta;

type Story = StoryObj<typeof Select<TesOptionValue>>;

export const Default: Story = {
  args: {
    cleanable: true,
    searchable: true,
    disabled: false,
    placeholder: 'Select an option...',
    value: { opt: 'opt-3', prop: 'prop-3' },
    options: Array.from(Array(25).keys()).map(i => ({
      label: `Option ${i + 1} label`,
      value: { opt: `opt-${i + 1}`, prop: `prop-${i + 1}` },
    })),
    noResultsElement: (
      <div style={{ padding: '8px 16px', fontSize: '25px' }}>
        No results found...
      </div>
    ),
  },
};
