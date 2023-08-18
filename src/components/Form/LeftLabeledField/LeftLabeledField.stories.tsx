import type { Meta, StoryObj } from '@storybook/react';

import Select from '../Select/Select';
import { SelectOption } from '../Select/SelectProps';
import LeftLabeledField from './LeftLabeledField';

const meta = {
  title: 'Components/Form/LeftLabeledField',
  component: LeftLabeledField,
  argTypes: {
    field: { control: false },
    label: { control: false },
  },
} satisfies Meta<typeof LeftLabeledField>;

export default meta;
type Story = StoryObj<typeof LeftLabeledField>;

const labelId = 'labelId';
const options: SelectOption<string>[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
];

export const _LeftLabeledField: Story = {
  args: {
    label: (
      <label style={{ padding: '8px' }} htmlFor={labelId}>
        Label text...
      </label>
    ),
    field: <Select id={labelId} searchable options={options} />,
  },
};
