import { useEffect, useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Select from '../Select';

const ListExample = ({
  numberSelects,
}: {
  numberSelects: number;
}): JSX.Element => {
  const refFirstSelectInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('refFirstSelectInput', refFirstSelectInput);
  }, [refFirstSelectInput]);

  return (
    <>
      <h1>Select component list</h1>
      <p>
        In order to test the zindex between the select and the options list, we
        need to have more than one select in the page.
      </p>

      {Array.from(Array(numberSelects).keys()).map(index => {
        return (
          <div
            key={index}
            style={{
              padding: '4px 0',
              width: `${(100 / numberSelects) * (index + 1)}%`,
            }}
          >
            <Select
              triggerElementRef={index === 0 ? refFirstSelectInput : undefined}
              placeholder={`Instance ${index + 1}...`}
              options={Array.from(Array(25).keys()).map(i => ({
                label: `Option ${index + 1} - ${i + 1} label`,
                value: {
                  opt: `opt-${index + 1}-${i + 1}`,
                  prop: `prop-${index}-${i + 1}`,
                },
              }))}
            />
          </div>
        );
      })}
    </>
  );
};

const meta = {
  title: 'Components/Form/Select/ListExample',
  component: ListExample,
} satisfies Meta<typeof ListExample>;

export default meta;
type Story = StoryObj<typeof ListExample>;

export const _ListExample: Story = {
  args: { numberSelects: 5 },
};
