import { ReactNode } from 'react';

export const ModalTypes = {
  ACCEPT: 'accept' as const,
  CONFIRM: 'confirm' as const,
  INFO: 'info' as const,
};

export const ModalCloseTypes = {
  ACCEPT: 'accept' as const,
  CANCEL: 'cancel' as const,
  CLOSE: 'close' as const,
};

export type ModalCloseType = (typeof ModalCloseTypes)[keyof typeof ModalCloseTypes];

export type ModalProps = {
  acceptButtonLabel?: string;
  cancelButtonLabel?: string;
  children: ReactNode;
  onClose?: (type: ModalCloseType) => void;
  onOpen?: () => void;
  title?: ReactNode;
  type?: (typeof ModalTypes)[keyof typeof ModalTypes];
  visible?: boolean;
};
