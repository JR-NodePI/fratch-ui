import { useContext } from 'react';

import { Button, SettingsModal } from '../../../components';
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

const inlineStyles: React.CSSProperties = {
  position: 'fixed',
  zIndex: 999999,
  top: '10%',
  left: '20%',
  boxShadow: 'border-box',
  width: '60%',
  height: '80%',
  backgroundColor: 'var(--ft-color-background)',
  border: '1px solid var(--ft-color-grey-1)',
  padding: '0 20px',
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
    <div style={inlineStyles}>
      <SettingsModal
        position="right"
        items={[
          <Button
            onClick={(): void =>
              showModalAccept({
                title: 'Accept modal title',
                content: <>Accept modal content</>,
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
          </Button>,
        ]}
      />

      <SettingsModal
        items={[
          <Button
            onClick={(): void =>
              showModalConfirm({
                title: 'Confirm modal title',
                content: <>Confirm modal content</>,
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
          </Button>,
        ]}
      />

      <br />
      <br />
      <br />
      <br />
      <Button
        onClick={(): void =>
          showModalAccept({
            title: 'Accept modal title',
            content: <>Accept modal content</>,
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
            content: <>Confirm modal content</>,
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
            content: <>Info modal content</>,
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
    </div>
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
