import { useContext } from 'react';

import { Button } from '../..';
import ModalContext from '../ModalContext';
import { ModalCloseType } from '../ModalProps';
import ModalProvider from '../ModalProvider';

type ModalDisplayButtonsProps = {
  acceptButtonLabel?: string;
  cancelButtonLabel?: string;
  onAcceptOpen?: () => void;
  onAcceptClose?: (type: ModalCloseType) => void;
  onConfirmOpen?: () => void;
  onConfirmClose?: (type: ModalCloseType) => void;
  onInfoClose?: (type: ModalCloseType) => void;
  onInfoOpen?: () => void;
};

function ModalDisplayButtons({
  acceptButtonLabel,
  cancelButtonLabel,
  onAcceptOpen,
  onAcceptClose,
  onConfirmOpen,
  onConfirmClose,
  onInfoClose,
  onInfoOpen,
}: ModalDisplayButtonsProps): JSX.Element {
  const { showModalAccept, showModalConfirm, showModalInfo } =
    useContext(ModalContext);

  return (
    <>
      <Button
        onClick={(): void =>
          showModalAccept({
            title: 'Accept modal title',
            children: <>Accept modal content</>,
            onClose: onAcceptClose,
            onOpen: onAcceptOpen,
            acceptButtonLabel,
            cancelButtonLabel,
          })
        }
        size="small"
        type="primary"
      >
        Show accept modal
      </Button>
      <br />
      <br />
      <Button
        onClick={(): void =>
          showModalConfirm({
            title: 'Confirm modal title',
            children: <>Confirm modal content</>,
            onClose: onConfirmClose,
            onOpen: onConfirmOpen,
            acceptButtonLabel,
            cancelButtonLabel,
          })
        }
        size="small"
        type="tertiary"
      >
        Show confirm modal
      </Button>
      <br />
      <br />
      <Button
        onClick={(): void =>
          showModalInfo({
            title: 'Info modal title',
            children: <>Info modal content</>,
            onClose: onInfoClose,
            onOpen: onInfoOpen,
            acceptButtonLabel,
            cancelButtonLabel,
          })
        }
        size="small"
      >
        Show info modal
      </Button>
    </>
  );
}

function StoryRenderer({
  acceptButtonLabel,
  cancelButtonLabel,
  onAcceptOpen,
  onAcceptClose,
  onConfirmOpen,
  onConfirmClose,
  onInfoClose,
  onInfoOpen,
}: ModalDisplayButtonsProps): JSX.Element {
  return (
    <ModalProvider>
      <ModalDisplayButtons
        acceptButtonLabel={acceptButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        onAcceptOpen={onAcceptOpen}
        onAcceptClose={onAcceptClose}
        onConfirmOpen={onConfirmOpen}
        onConfirmClose={onConfirmClose}
        onInfoClose={onInfoClose}
        onInfoOpen={onInfoOpen}
      />
    </ModalProvider>
  );
}

export default StoryRenderer;
