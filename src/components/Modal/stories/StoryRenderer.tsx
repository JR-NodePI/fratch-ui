import { useEffect, useState } from 'react';

import { Button } from '../..';
import Modal from '../Modal';
import { type ModalProps, ModalTypes } from '../ModalProps';

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

export default StoryRenderer;
