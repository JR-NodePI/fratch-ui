import { useEffect, useRef } from 'react';
import Select from '../Select';
import type { Meta, StoryObj } from '@storybook/react';

const SelectListTest = ({ numberSelects }: { numberSelects: number }): JSX.Element => {
  const refFirstSelectInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('refFirstSelectInput', refFirstSelectInput);
  }, [refFirstSelectInput]);

  return (
    <>
      <h1>Select component list</h1>
      <p>
        In order to test the zindex between the select and the options list, we need to have more
        than one select in the page.
      </p>

      {Array.from(Array(numberSelects).keys()).map(index => {
        return (
          <div key={index} style={{ width: `${(100 / numberSelects) * (index + 1)}%` }}>
            <Select
              triggerElementRef={index === 0 ? refFirstSelectInput : undefined}
              placeholder={`Instance ${index + 1}...`}
              options={Array.from(Array(25).keys()).map(i => ({
                label: `Option ${index + 1} - ${i + 1} label`,
                value: { opt: `opt-${index + 1}-${i + 1}`, prop: `prop-${index}-${i + 1}` },
              }))}
            />
          </div>
        );
      })}
    </>
  );
};

const meta = {
  title: 'Example/Form/SelectList',
  component: SelectListTest,
  tags: [],
} satisfies Meta<typeof SelectListTest>;

export default meta;
type Story = StoryObj<typeof SelectListTest>;

export const SelectList: Story = {
  args: { numberSelects: 5 },
};
