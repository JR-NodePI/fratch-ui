import { ReactNode, useCallback, useMemo, useState } from 'react';

import Modal from './Modal';
import { ModalTypes } from './ModalConstants';
import ModalContext from './ModalContext';
import {
  ModalCloseType,
  ModalContextProps,
  ModalProps,
  ModalType,
  ShowModalProps,
} from './ModalProps';

const defaultModalProps = {
  children: <></>,
  title: '',
  visible: false,
};

function ModalProvider({ children }: { children: ReactNode }): JSX.Element {
  const [modalProps, setModalProps] = useState<ModalProps>(defaultModalProps);

  const handleModalOpen = useCallback(
    (props: ShowModalProps, type: ModalType) => {
      setModalProps(state => {
        if (state.visible) {
          return state;
        }

        const handleClose = (type: ModalCloseType): void => {
          setModalProps(defaultModalProps);
          props.onClose?.(type);
        };

        return {
          ...props,
          children: props.content,
          onClose: handleClose,
          type,
          visible: !state.visible,
        };
      });
    },
    []
  );

  const value = useMemo<ModalContextProps>(
    () => ({
      showModalAccept: (props: ShowModalProps): void => {
        handleModalOpen(props, ModalTypes.ACCEPT);
      },
      showModalConfirm: (props): void => {
        handleModalOpen(props, ModalTypes.CONFIRM);
      },
      showModalInfo: (props): void => {
        handleModalOpen(props, ModalTypes.INFO);
      },
    }),
    [handleModalOpen]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal {...modalProps} />
    </ModalContext.Provider>
  );
}

export default ModalProvider;
