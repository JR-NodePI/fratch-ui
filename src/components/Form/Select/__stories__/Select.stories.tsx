import type { Meta, StoryObj } from '@storybook/react';

import { IconCheck } from '../../../Icons';
import Select from '../Select';

type TesOptionValue = { opt: string; prop: string };

const meta = {
  title: 'Components/Form/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    onChange: { table: { disable: true } },
    onClean: { table: { disable: true } },
    options: { table: { disable: true } },
    value: { table: { disable: true } },
    noResultsElement: { table: { disable: true } },
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
    title: 'Title of a select...',
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

export const CustomLabelOptions: Story = {
  args: {
    cleanable: true,
    searchable: true,
    disabled: false,
    placeholder: 'Select an option...',
    value: { opt: 'opt-3', prop: 'prop-3' },
    options: Array.from(Array(10).keys()).map(i => ({
      label: `Option ${i + 1} label`,
      labelElement: (
        <>
          <IconCheck /> Option <b>{i + 1}</b> <i>component</i> label
        </>
      ),
      value: { opt: `opt-${i + 1}`, prop: `prop-${i + 1}` },
    })),
    noResultsElement: (
      <div style={{ padding: '8px 16px', fontSize: '25px' }}>
        No results found...
      </div>
    ),
  },
};
