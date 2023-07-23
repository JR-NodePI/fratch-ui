import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '..';
import Modal from './Modal';
import { type ModalProps, ModalTypes } from './ModalProps';

function StoryRenderer({ visible, type, ...props }: ModalProps): JSX.Element {
  const [currentVisible, setVisible] = useState(visible);
  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  const buttonAcceptType = type === ModalTypes.CONFIRM ? 'tertiary' : 'primary';

  return (
    <>
      <Button
        onClick={() => setVisible(true)}
        type={buttonAcceptType}
        size="small"
      >
        Open modal, {type}
      </Button>
      <Modal
        {...props}
        visible={currentVisible}
        type={type}
        onClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
}

const meta = {
  title: 'Example/Modal',
  component: StoryRenderer,
  argTypes: {
    type: {
      options: Object.values(ModalTypes),
      control: { type: 'radio' },
    },
    onClose: { action: 'onClose' },
    onOpen: { action: 'onOpen' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;

export const Docs: Story = {
  args: {
    type: 'info',
    visible: false,
    title: 'This is the title',
    children: 'This is the content',
  },
};
