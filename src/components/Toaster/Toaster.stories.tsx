import { useContext } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Button from '../Button/Button';
import ToasterItem from './ToasterItem';
import ToasterListContext, { Toaster } from './ToasterListContext';
import ToasterProvider from './ToasterProvider';

const ItemCaller = (props: Toaster): JSX.Element => {
  const { addToaster } = useContext(ToasterListContext);

  const onClick = () => {
    addToaster?.(props);
  };

  return (
    <Button
      onClick={onClick}
      label="Show toaster"
      size="small"
      type="primary"
    />
  );
};

function ToasterLoader(props: Toaster): JSX.Element {
  console.log('>>>----->> props', props);
  return (
    <ToasterProvider>
      <ItemCaller {...props} />
    </ToasterProvider>
  );
}

const meta = {
  title: 'Example/ToasterList',
  component: ToasterLoader,
  tags: ['autodocs'],
} satisfies Meta<typeof ToasterItem>;

export default meta;

type Story = StoryObj<typeof ToasterItem>;

export const Docs: Story = {
  args: {
    type: 'error',
    title: `Toaster title`,
    message: `Toaster message \n new line  \n \t tab new line`,
    nlToBr: true,
    duration: 3000,
  },
};
