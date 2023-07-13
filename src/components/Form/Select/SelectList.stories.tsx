import Select from './Select';
import type { Meta, StoryObj } from '@storybook/react';

const SelectList = () => {
  return (
    <>
      <h1>Select component list</h1>
      <p>
        In order to test the zindex between the select and the options list, we need to have more than one
        select in the page.
      </p>
      <ul>
        {Array.from(Array(4).keys()).map(index => {
          return (
            <li key={index} style={{ width: `${25 * (index + 1)}%` }}>
              <Select
                placeholder={`Instance ${index + 1}...`}
                options={Array.from(Array(25).keys()).map(i => ({
                  label: `Option ${index} ${i + 1} label`,
                  value: { opt: `opt-${index}-${i + 1}`, prop: `prop-${index}-${i + 1}` },
                }))}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

const meta = {
  title: 'Example/Form/SelectList',
  component: SelectList,
  tags: [],
  argTypes: { onChange: { action: 'onChange' } },
} satisfies Meta<typeof SelectList>;

export default meta;
type Story = StoryObj<typeof SelectList>;

export const Default: Story = {
  args: {},
};
