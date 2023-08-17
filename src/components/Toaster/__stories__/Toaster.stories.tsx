import { useContext, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { c } from '../../../helpers/classNameHelpers';
import { Button, ToasterListContext } from '../..';
import type { Toaster } from '../ToasterListContextProps';
import ToasterProvider from '../ToasterProvider';

import styles from './Toaster.stories.module.css';

const StoryRenderer = (props: Toaster): JSX.Element => {
  const [counter, setCounter] = useState<number>(1);
  const { addToaster } = useContext(ToasterListContext);
  const title = props.title ? `${props.title} - ${counter}` : '';

  const onClick = (type: Toaster['type']) => {
    addToaster?.({ ...props, type, title });
    setCounter(counter + 1);
  };

  return (
    <div className={c(styles.toaster_story_renderer)}>
      <Button
        onClick={() => onClick('success')}
        label="Show success toaster"
        size="smaller"
        type="primary"
      />
      <Button
        onClick={() => onClick('error')}
        label="Show error toaster"
        size="smaller"
        type="secondary"
      />
      <Button
        onClick={() => onClick('warning')}
        label="Show warning toaster"
        size="smaller"
      />
      <Button
        onClick={() => onClick('info')}
        label="Show info toaster"
        size="smaller"
        type="tertiary"
      />
    </div>
  );
};

const meta = {
  title: 'Example/Toaster',
  component: StoryRenderer,
  argTypes: {
    id: { table: { disable: true } },
    type: { table: { disable: true } },
    nlToBr: {
      description: 'Convert new lines to <br> tags',
      defaultValue: false,
    },
  },
  decorators: [
    Story => (
      <ToasterProvider listClassName={c(styles.toaster_story_list)}>
        <Story />
      </ToasterProvider>
    ),
  ],
} satisfies Meta<Toaster>;

export default meta;

type Story = StoryObj<Toaster>;

export const _Toaster: Story = {
  args: {
    type: 'info',
    title: `Toaster title`,
    message: `Toaster message \n new line  \n \t tab new line`,
    nlToBr: true,
    duration: 5000,
    stoppable: false,
  },
};
