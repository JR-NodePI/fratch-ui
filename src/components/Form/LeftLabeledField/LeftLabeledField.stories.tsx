import type { Meta, StoryObj } from '@storybook/react';

import Select from '../../../components/Form/Select/Select';
import LeftLabeledField from './LeftLabeledField';

const meta = {
  title: 'Example/Form/LeftLabeledField',
  component: LeftLabeledField,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof LeftLabeledField>;

export default meta;
type Story = StoryObj<typeof LeftLabeledField>;

export const Docs: Story = {
  args: {
    label: <label>Label</label>,
    field: <Select options={[]} />,
  },
};
