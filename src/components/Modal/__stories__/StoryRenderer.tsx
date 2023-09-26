import { useEffect, useState } from 'react';

import { Button } from '../..';
import Modal from '../Modal';
import { ModalTypes } from '../ModalConstants';
import { type ModalProps } from '../ModalProps';

function StoryRenderer({ visible, type, ...props }: ModalProps): JSX.Element {
  const [currentVisible, setVisible] = useState(visible);
  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  const buttonAcceptType = type === ModalTypes.CONFIRM ? 'tertiary' : 'primary';

  return (
    <>
      <Button
        onClick={(): void => setVisible(true)}
        type={buttonAcceptType}
        size="small"
      >
        Open modal
      </Button>
      <Modal
        {...props}
        visible={currentVisible}
        type={type}
        onClose={(): void => {
          setVisible(false);
        }}
      />
    </>
  );
}

export default StoryRenderer;
