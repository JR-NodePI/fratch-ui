import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../..';
import Select from '../Select';

const SelectFocusFromButton = (): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);

  const options = Array.from(Array(25).keys()).map(index => ({
    label: `Option ${index + 1} -  label`,
    value: {
      opt: `opt-${index + 1}`,
      prop: `prop-${index}`,
    },
  }));

  const handleClick = (): void => {
    ref.current?.focus();
  };

  return (
    <>
      <Button onClick={handleClick} size="small" type="primary">
        Focus
      </Button>
      <br />
      <br />
      <Select triggerElementRef={ref} options={options} searchable />
    </>
  );
};

const meta = {
  title: 'Example/Form/Select/Focus from button',
  component: SelectFocusFromButton,
  tags: ['autodocs'],
} satisfies Meta<typeof SelectFocusFromButton>;

export default meta;
type Story = StoryObj<typeof SelectFocusFromButton>;

export const Docs: Story = {
  args: {},
};
